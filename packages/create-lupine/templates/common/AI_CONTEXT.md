# AI Context for Lupine.js

**SYSTEM ROLE**: You are an expert developer in `lupine.js`, a custom TypeScript full-stack framework.

**🛑 CRITICAL WARNINGS 🛑**

1.  **NO REACT HOOKS**: `useState`, `useEffect`, `useReducer`, `useCallback`, `useContext` **DO NOT EXIST**.
2.  **NO VIRTUAL DOM STATE**: Changing a variable DOES NOT re-render the component. You must manually update `HtmlVar.value`.
3.  **NO CONTROLLED INPUTS**: Do not bind `value={state}`. Read values from DOM on submit.

---

## 1. Core Philosophy & Reactivity

- **`HtmlVar` is the "State"**:
  - Use `HtmlVar` to wrap dynamic sections (lists, conditional renderings, async content).
  - **Pattern**: `const dom = new HtmlVar(initialContent);` -> JSX `{dom.node}` -> `dom.value = updatedContent`.
- **Direct DOM Access**:
  - Use `RefProps` to get reference to the component root.
  - Use `ref.$(selector)` to find elements (inputs, containers).
  - **Value Retrieval**: `const val = ref.$('input.my-class').value`.

## 2. Key Interfaces

### `RefProps` (Lifecycle & DOM)

```typescript
const ref: RefProps = {
  // Mounted: Initialize data, timers, events
  onLoad: async (el: Element) => {
    await loadData();
    // ref.$('.sub-element').addEventListener(...)
  },
  // Unmounting: Cleanup
  onUnload: async (el: Element) => {
    // Cleanup (timers, sockets)
  }
};
// Usage
<div ref={ref}>...</div>
```

### `CssProps` (Styling)

Supports nesting and media queries. **Prefer this over inline styles.**

```typescript
import { MediaQueryRange } from "lupine.components";

const css: CssProps = {
  display: "flex",
  ".child": { color: "var(--primary-color)" },
  // Responsive
  [MediaQueryRange.MobileBelow]: {
    flexDirection: "column",
  },
};
```

## 3. Styles & Themes ("The Look")

### Global Variables (Theming)

**NEVER hardcode colors** (e.g., `#000`). Always use CSS variables to support Dark/Light modes.

- **Colors**: `var(--primary-color)`, `var(--primary-bg-color)`, `var(--secondary-color)`, `var(--error-color)`.
- **Borders**: `var(--primary-border)`, `var(--border-radius-m)`.
- **Spacing**: `var(--space-m)` (8px), `var(--space-l)` (16px).

### Standard Utility Classes

- **Flexbox**: `.row-box` (flex row, align-center), `.col` (flex: 1).
- **Margins/Padding**: `m-auto`, `p-m`, `mt-s`, `pb-l` (s=small, m=medium, l=large).
- **Text**: `.text-center`, `.ellipsis`.

### Standard UI Components

#### Settings Group (Mobile/Desktop Settings)

```tsx
<div class='setting-section-group'>
  <div class='setting-section-title'>Section Title</div>
  <div class='setting-section-block'>
    <div class='setting-section-item' onClick={...}>
      <div class='setting-section-item-text'>My Option</div>
      <div class='setting-section-item-icon'><i class='ifc-icon ma-chevron-right'></i></div>
    </div>
  </div>
</div>
```

#### Admin Edit Row (Form Layout)

Standard label + input row pattern for admin pages.

```tsx
<div class="row-box mt-m">
  <div class="label-class">Title: </div>
  <div class="flex-1">
    {/* width-100p ensures input fills the flex-1 container */}
    <input
      type="text"
      class="input-base my-input-class w-100p"
      value={item.title}
    />
  </div>
</div>
```

## 4. Common Patterns ("The Lupine Way")

### List / Search (No Re-render)

**Pattern**: Create a render function (`makeList`) and assign its result to `HtmlVar`.

```typescript
const MyPage = () => {
  // 1. Logic Variables (Not State)
  let pageIndex = 0;

  // 2. Dynamic Container
  const listDom = new HtmlVar(<div>Loading...</div>);

  // 3. Render Function
  const makeList = async () => {
    const data = await fetchData(pageIndex);
    return <div>{data.map(item => <Item item={item} />)}</div>;
  };

  // 4. Events
  const onSearch = async () => {
    // Read directly from DOM
    const query = ref.$('input.search').value;
    // Update logic var
    pageIndex = 0;
    // Update UI manually
    listDom.value = await makeList();
  };

  const ref: RefProps = {
    onLoad: async () => {
      listDom.value = await makeList();
    }
  };

  return (
    <div ref={ref}>
       <input class="search" />
       <button onClick={onSearch}>Go</button>
       {/* Embed Dynamic Content */}
       {listDom.node}
    </div>
  );
};
```

### Mobile Navigation (`SliderFrame`)

Lupine uses a "Slide-over" model for navigation (Drill-down).

```typescript
import { SliderFrame, SliderFrameHookProps, HeaderWithBackFrame } from 'lupine.components';

// Parent Component
const Parent = () => {
  const sliderHook: SliderFrameHookProps = {};

  const openDetail = (id) => {
    // Push new view onto stack
    sliderHook.load!(<DetailComponent id={id} sliderFrameHook={sliderHook} />);
  };

  return (
    <div>
       <SliderFrame hook={sliderHook} />
       <div onClick={() => openDetail(1)}>Click Me</div>
    </div>
  );
}

// Child Component
const DetailComponent = (props) => {
  return (
    <HeaderWithBackFrame
      title="Detail Page"
      onBack={(e) => props.sliderFrameHook.close!(e)}
    >
      Content...
    </HeaderWithBackFrame>
  );
}
```

## 5. Architecture Cheat Sheet

- **`lupine.api` (Backend)**:
  - `req.locals.json()` to get body.
  - `apiCache.getDb().selectObject('$__table', ...)`
  - `ApiHelper.sendJson(req, res, { status: 'ok' })`
- **`lupine.web` (Frontend)**:
  - `NotificationMessage.sendMessage('Msg', NotificationColor.Success)`
  - `getRenderPageProps().renderPageFunctions.fetchData('/api/...')`

## 6. Coding Standards & Gotchas

- **❌ React Hooks**: `useState`, `useEffect` **DO NOT EXIST**. Use `HtmlVar` and `RefProps`.
- **❌ `className`**: Use standard HTML `class`.
- **⚠️ `style={{}}`**: **Allowed** for simple or dynamic inline styles (e.g., `style={{ border: '1px solid red' }}`), but **prefer `css={CssProps}`** for structural/theme styling.
- **✅ Native Events**: `onClick`, `onChange`, `onInput`, `onMouseMove` etc. are standard HTML events and **ARE ALLOWED**. Use them for triggering logic or callbacks (e.g., `onInput={(e) => updateOtherThing(e.target.value)}`).
- **✅ Uncontrolled Inputs**: While you _can_ use `onInput` to track state, the default efficient pattern is often to read `ref.$('input').value` only when the user clicks "Save" or "Search".
