---
title: CSS-in-JS
---

# CSS-in-JS

Lupine.js features a built-in, lightweight **CSS-in-JS** engine. It supports powerful features like nesting, pseudo-selectors, media queries, and scoped animations, all without needing external libraries like styled-components or emotion.

## 1. 🐣 Basic Usage

You can pass a CSS object directly to the `css` prop of any element. Lupine will automatically generate a unique class ID, preventing style conflicts.

```tsx
const MyComponent = () => {
  const css: CssProps = {
    // Basic properties use camelCase
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '8px',

    // Nested selectors
    h1: {
      color: 'blue',
    },

    // Pseudo-classes
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
  };

  return (
    <div css={css}>
      <h1>Hello</h1>
    </div>
  );
};
```

## 2. 🚀 Advanced Features

### 2.1 🎎 Nesting & Parent Selector (`&`)

Similar to SCSS/Less, use `&` to refer to the parent selector.

```tsx
const css: CssProps = {
  color: 'black',

  // Target children
  '.child': { fontWeight: 'bold' },

  // Self state
  '&:hover': { color: 'red' },

  // Multiple selectors
  '&:hover, &.active': {
    border: '1px solid blue',
  },
};
```

### 2.2 🛡️ Scoping with `&` (Dynamic Component ID)

Lupine uses a clever substitution system for `&` (or `$`).

1.  **Prefixing**: If a selector starts with `&` (e.g., `&-item`), it is effectively treating the component's unique ID as a prefix.

    - `&-item` -> `.LUPINE_ID-item`
    - This is great for BEM-like naming without long manual names.

2.  **Replacement**: If `&` is used elsewhere (e.g., `.parent &`), it inserts the unique ID there.

```tsx
// Using "$-item" or "&-item" pattern for scoped classes
const css = {
  // Defines a scoped class like .L123-item
  '&-item': {
    color: 'gray',
  },

  // You can also reference it as .&-item, meaning .L123 .L123-item (nested)
  '.&-item': {
    color: 'black', // stronger specificity if needed
  },
};

return (
  <div css={css}>
    {/* Apply the scoped class */}
    <a class='&-item'>Link</a>
  </div>
);
```

### 2.3 ⚡ One-Line Multiple Definitions

You can define multiple properties in one line for simpler syntax in some cases, or handle multiple selectors in one key.

```tsx
const css = {
  // Multiple selectors sharing styles
  '.header, .footer': {
    background: '#333',
    color: 'white',
  },
};
```

### 2.4 📱 Media Queries (`@media`)

Media queries can be nested _inside_ the selector or used at the top level.

```tsx
const css = {
  fontSize: '16px',

  // Nested inside component logic
  '@media (max-width: 600px)': {
    fontSize: '14px',
    padding: '10px',
  },
};
// Or use helper constants like [MediaQueryRange.DesktopAbove]
```

### 2.5 🎬 Keyframes (`@keyframes`)

Define animations locally within the component.

```tsx
const css = {
  '@keyframes slide-in': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(0)' },
  },
  animation: 'slide-in 0.5s ease-out',
};
```

## 3. 🌏 Global Styles (`bindGlobalStyle`)

Sometimes you want styles that are **reused** or **global**, but you still want to define them in TypeScript/JS. `bindGlobalStyle` ensures the style is generated only once and injected into `<head>`, even if the component is used multiple times.

> **Ideal for:** Animations, Utility classes, Reset CSS.

```tsx
import { bindGlobalStyle } from 'lupine.web';

const TextWave = () => {
  // 1. Define Style
  const css = {
    '@keyframes wave': {
      /* ... */
    },
    '.wave-text': { animation: 'wave 1s infinite' },
  };

  // 2. Bind it globally with a unique key 'text-wave-style'
  // This ensures it's only injected ONCE in the page
  bindGlobalStyle('text-wave-style', css);

  return (
    // 3. Use the classes defined above
    <div class='text-wave-style'>
      <span class='wave-text'>Hello</span>
    </div>
  );
};
```
