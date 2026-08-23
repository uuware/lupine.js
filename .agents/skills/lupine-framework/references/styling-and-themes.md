# Styling & Themes

## 1. Style Binding & Ampersand (`&`) Namespace Pattern

Lupine.js uses CSS-in-JS and achieves component style isolation by dynamically generating unique class name prefixes (e.g. `l1234`) and replacing the `&` symbol.

```typescript
export const MyComponent = () => {
  const ref: RefProps = {
    onLoad: async () => {
      // Must query with ref.$(), strictly avoid native document.querySelector('.&-btn')
      const btn = ref.$('.&-btn');
    },
  };

  const css: CssProps = {
    // Top-level rules apply directly to the bound root container itself
    width: '100%',
    padding: '1rem',

    // Rules targeting descendant elements
    '.&-title': { fontWeight: 'bold' },
    '.&-btn': {
      '&:hover': { background: '#f0f0f0' },
      '&.active': { color: 'var(--primary-accent-color)' },
    },
  };

  return (
    <aside css={css} ref={ref}>
      <div class='&-title'>Hello</div>
      <button class='&-btn active'>Click Me</button>
    </aside>
  );
};
```

### Key Rules
1. **Top-Level Properties Apply to Root Element**: Do not wrap root styles in an unnecessary outer `.&-container` in `CssProps`.
2. **JSX Class Names**: Use `class="&-item"` or `class="row-box &-item"` (never write `className`).
3. **DOM Queries**: **Strictly Prohibit** `document.querySelector('.&-item')`. Always use **`ref.$('.&-item')`** or **`ref.$all('.&-item')`**.

---

## 2. Dark Mode & Color Variable Conventions (Dark Mode Semantics)

**Never hardcode color values (such as `#000`, `#fff`, `#f0f0f0`)**. Always use standardized CSS variables:

1. **Background Colors**:
   - `var(--primary-bg-color)`: Deepest background (white in light mode, **pure black** in dark mode).
   - `var(--secondary-bg-color)`: Elevated cards/panels/modal backgrounds (light gray in light mode, **dark gray** in dark mode to prevent blending into pure black backgrounds).
2. **Text Colors**:
   - `var(--primary-color)`: Primary text color (dark gray/black in light mode, **white** in dark mode).
   - ⚠️ **Dark Mode Trap**: Never use `--primary-color` as the background color for a blue primary button; otherwise, the button background turns white in dark mode.
3. **Brand & Action Highlights**:
   - `var(--primary-accent-color)`: Primary brand color (e.g. Lupine blue), used for primary button backgrounds, active tabs, etc.
   - Pair primary button text with `var(--primary-bg-color)` to ensure high contrast.
4. **Borders & Spacing**:
   - Borders: `var(--primary-border)`, `var(--secondary-border-color)`
   - Spacing: `var(--space-m)` (8px), `var(--space-l)` (16px)

---

## 3. CSS Scope Reuse & `referToCssId`

### Sharing Styles Across Component Instances (Module Level)
When rendering many identical components (such as list items), avoid injecting duplicate `<style>` tags by using `bindGlobalStyle`:

```tsx
const cssShared: CssProps = {
  display: 'flex',
  '.&-content': { color: 'red' },
};

export const ListItem = () => {
  const globalCssId = getGlobalStylesId(cssShared);
  bindGlobalStyle(globalCssId, cssShared);

  return (
    <div ref={{ referToCssId: globalCssId }} class={globalCssId}>
      <div class='&-content'>Shared CSS</div>
    </div>
  );
};
```

### Application-Level Global Styles
During application initialization (`index.tsx`), use `bindAppGlobalStyle` (with 4th parameter `noTopClassName = true`):
```tsx
bindAppGlobalStyle('app-shared-css', appSharedCss, false, true);
```
