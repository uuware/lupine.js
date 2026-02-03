---
title: HtmlVar
---

# HtmlVar

`HtmlVar` is the core primitive for reactivity in Lupine.js. Unlike modern frameworks that attempt to automatically detect state changes, `HtmlVar` gives you a manual "handle" to a specific DOM slot that you can update at any time.

## 1. Correct Usage

`HtmlVar` is not a Component you render (like `<HtmlVar />`). It is a **Class** that you instantiate.

1.  Create an instance: `const dom = new HtmlVar(initialValue)`.
2.  Embed its node in your JSX: `{dom.node}`.
3.  Update it explicitly: `dom.value = newValue`.

### Example

```tsx
import { HtmlVar, RefProps } from 'lupine.components';

const TestButton = () => {
  // 1. Create the reactive variable
  const dom = new HtmlVar('');

  // 2. Define actions that update it
  const onClick = async () => {
    // This triggers a Spot Update on the DOM element below
    dom.value = 'You clicked the button.';
  };

  const ref: RefProps = {
    onLoad: async () => {
      dom.value = 'This value is set in onLoad event.';
    },
  };

  return (
    <div ref={ref} class='row-box pt-m'>
      <button onClick={onClick} class='button-base'>
        Click me!
      </button>
      {/* 3. Drop the "Anchor" here */}
      <div class='pl-m'>{dom.node}</div>
    </div>
  );
};
```

## 2. Comparison with Modern Frameworks

If you come from React, Vue, or SolidJS, this might look verbose.

| Framework     | Mechanism                   | Code Syntax                                  |
| :------------ | :-------------------------- | :------------------------------------------- |
| **React**     | Virtual DOM Diffing         | `const [val, setVal] = useState(0);`         |
| **SolidJS**   | Fine-Grained Signals        | `const [val, setVal] = createSignal(0);`     |
| **Lupine.js** | **Manual Spot Replacement** | `const val = new HtmlVar(0); val.value = 1;` |

**The Trade-off:**

- **Modern Frameworks**: Focus on "Developer Experience". You change state, the magic happens.
- **Lupine.js**: Focuses on "Explicit Performance". You tell the browser exactly _which_ `<div>` to update. There is no guesswork or accidental re-renders.

## 3. Recommended Helper: `val<T>`

If you prefer the modern syntax of "Signals", you can use the `val` helper. It is functionally identical to `HtmlVar` but offers a syntactic sugar that feels like "Automatic Updates".

```tsx
// 1. Define the helper (or import it from lib)
export function val<T>(initial: T) {
  const internal = new HtmlVar(initial);
  // Getter
  const signal = () => internal.value;
  // Setter
  signal.set = (v: T) => {
    internal.value = v;
  };
  // Renderable Node
  signal.jsx = () => internal.node;
  return signal;
}

// 2. Usage
const Counter = () => {
  const count = val(0);

  return (
    <div>
      <button onclick={() => count.set(count() + 1)}>Add</button>

      {/* Looks like a modern framework! */}
      <span>{count.jsx()}</span>
    </div>
  );
};
```

In fact, whether you use `HtmlVar` class directly or the `val()` wrapper, the underlying mechanism is the same: **Surgical updates to DOM fragments without diffing.**
