---
title: High Performance List Rendering & Editing
---

# High Performance List Rendering & Editing

Lupine.js adopts a unique **"Component-Level Rendering"** strategy that differs significantly from traditional Virtual DOM frameworks like React or Vue. This approach is particularly powerful for handling large lists and complex data grids (e.g., in Admin Panels).

## 1. ⚡ Why it is Fast?

In traditional frameworks (like React), when you update an item in a list:

1.  You call `setState`.
2.  The framework re-renders the **entire List component**.
3.  It runs a "Diffing Algorithm" to compare the new virtual tree of 100+ items against the old one.
4.  Finally, it updates the DOM for the one changed item.

**In Lupine.js, we skip steps 2 and 3 entirely.**

Because Lupine uses **Manual Reactivity ([HtmlVar](../lupine.components/html-var))**, you can update a specific DOM element directly by setting `dom.value = <>...</>`, without triggering a top-down re-render. This is similar to a highly optimized React component using `React.memo`, but it is the **default behavior** here, not an opt-in optimization.

## 2. 🎯 The "Spot-Update" Strategy

Each row in your list acts as an isolated island. It holds its own `HtmlVar` and `ref`. When data changes, you only call `.value = ...` on that specific row's variable. The rest of the page remains static string HTML, costing **zero** performance overhead to maintain.

### Benefits

- **Zero Diffing Cost**: Changing one row costs `O(1)`, not `O(N)` where N is the list size.
- **Predictable Performance**: No "wasted renders".
- **Low Memory Footprint**: We don't maintain a heavy Virtual DOM tree in memory for the static parts of your list.

---

## 3. 💻 Code Example: Editable List

Here is how you implement a high-performance editable list.

### 📦 Step 1: The List Container (Parent)

The parent component renders the list initially but does _not_ need to re-render when a child changes.

```tsx
// BookList.tsx
export const BookList = () => {
  // 1. Initial Data Load
  let items = getSampleData();

  // 2. Render Static List
  // Notice: We don't need a state for the whole list if we only edit items!
  return (
    <div class='list'>
      {items.map((item) => (
        <BookShowItem key={item.id} item={item} />
      ))}
    </div>
  );
};
```

### ⚡ Step 2: The Optimized Row (Child)

The child component wraps its content in `HtmlVar`. This allows it to "redraw itself" independently.

```tsx
// BookShowItem.tsx
import { HtmlVar, RefProps } from 'lupine.components';

export const BookShowItem = (props: { item: SampleDataProps }) => {
  const ref: RefProps = { id: '' };

  // 1. Define the internal render logic
  const makeDom = (item: SampleDataProps) => (
    <div class='row-box'>
      <div>Name: {item.name}</div>
      <button onClick={onEdit}>Edit</button>
    </div>
  );

  // 2. Create a "Reactive Box" for this row
  const dom = new HtmlVar(makeDom(props.item));

  // 3. Update Logic: Only updates this specific DOM!
  const update = (newItem: SampleDataProps) => {
    // Manually trigger the update for this row ONLY
    dom.value = makeDom(newItem);
  };

  const onEdit = () => {
    // Show modal, get new data, then call update(newItem)
    showEditModal(props.item, (newItem) => {
      update(newItem);
    });
  };

  return (
    <div ref={ref} class='sample-data-row'>
      {dom.node} {/* Using dom.node embeds the reactive slot */}
    </div>
  );
};
```

### ✏️ Step 3: Inline Editing (Advanced)

You can even swap the "View Mode" with "Edit Mode" completely for a single row, without touching others.

```tsx
// Inside BookShowItem
const onToggleEdit = () => {
  if (isEditing) {
    dom.value = makeViewMode(item);
  } else {
    dom.value = makeEditMode(item);
  }
  isEditing = !isEditing;
};
```

## Summary

While this approach requires writing a bit more "explicit" code (defining `HtmlVar` and `makeDom`), it gives you **control** and **performance** that are hard to beat in heavy data applications. You are effectively acting as your own "Compiler", telling the browser exactly what to update and when.
