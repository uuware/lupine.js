---
title: Overview
---

# lupine.web

**lupine.web** is a React-like, extremely fast, small-size, and lightweight frontend framework designed for modern web development. It focuses on performance, simplicity, and a full-stack experience when paired with `lupine.api`.

## Why lupine.web?

### 🚀 Zero-Dependency & Lightweight

We believe in keeping things simple. `lupine.web` has **zero external dependencies**, resulting in a tiny bundle size and lightning-fast load times. It uses TSX syntax, so if you know React, you already feel at home.

### 🎨 Built-in CSS-in-JS

Forget about setting up complex CSS loaders or external styling libraries. `lupine.web` comes with a powerful, built-in CSS-in-JS solution.

- **Scoped Styles**: Styles are automatically scoped to your components to prevent collisions.
- **Nesting Support**: Write cleaner CSS with nested selectors (e.g., `&:hover`, `& > span`).
- **Theming**: Native support for light/dark modes and custom themes.

```tsx
const MyButton = (props) => (
  <button
    css={{
      backgroundColor: 'blue',
      color: 'white',
      '&:hover': { backgroundColor: 'darkblue' },
      [MediaQueryRange.Mobile]: { width: '100%' },
    }}
  >
    {props.children}
  </button>
);
```

### 🛣️ Powerful Router

Our functional router is designed for flexibility and control.

- **Route Guards**: Easily implement authentication checks or permissions.
- **Nested Routes**: Organize your application with sub-routers for modular architecture.
- **SSR Ready**: Routes work seamlessly on both server and client.

```typescript
const pageRouter = new PageRouter();
// Middleware/Guard example
pageRouter.setFilter(async (props) => {
  if (!checkAuth(props)) return <Redirect to='/login' />;
  return null; // Pass
});
pageRouter.use('/dashboard/*', DashboardRouter);
```

### ⚡ Server-Side Rendering (SSR) First

Visual performance is critical. `lupine.web` is built with SSR in mind from day one.

- **No Flashing**: Content is rendered on the server, ensuring users see the page immediately.
- **SEO Friendly**: Fully customizable Metadata and Open Graph (OG) tags for social sharing.
- **Hydration**: The client takes over smoothly without re-rendering the entire tree.

### 🌍 Internationalization (i18n)

Go global with ease. Built-in support for multi-language applications allows you to switch languages dynamically without complex configuration.

### 🛠️ Environment Configuration

Manage your application environments efficiently. `lupine.web` supports loading environment variables (from `.env` files via `lupine.api`) and injecting strictly filtered configurations into the frontend.
