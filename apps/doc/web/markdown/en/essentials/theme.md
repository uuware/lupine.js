---
title: Theme
---

# 🌗 Theme

Lupine.js provides built-in support for multiple themes (e.g., Light and Dark modes) with seamless SSR integration.

## 1. 🏁 Setup

You need to bind your themes at the application entry point (usually `index.tsx`).

### `bindTheme`

Connects your theme definitions to the Lupine runtime.

```tsx
// src/index.tsx
import { bindTheme } from 'lupine.web';
import { lightThemes, darkThemes } from './themes';

// Bind default theme and available themes
bindTheme('light', {
  light: lightThemes,
  dark: darkThemes,
});
```

- **Why**: This allows the system to know available themes and the default one.
- **Where**: Call this before rendering your app.

## 2. 🎮 Usage

### Accessing & Updating

You can get the current theme or switch themes using provided helpers.

```tsx
import { getCurrentTheme, updateTheme } from 'lupine.web';

// Get current theme info
const { themeName, themes } = getCurrentTheme();

// Switch to dark mode
const onSwitch = () => {
  updateTheme('dark');
};
```

### `ThemeSelector` Component

Lupine provides a built-in `ThemeSelector` component for easy theme switching.

```tsx
import { ThemeSelector } from 'lupine.components';

const Header = () => (
  <header>
    <h1>My App</h1>
    <ThemeSelector />
  </header>
);
```

## 3. ⚡ Server-Side Rendering (SSR)

One of Lupine's strongest features is its **FOUC-free** (Flash of Unstyled Content) theme support during SSR.

- **Cookie Injection**: The current theme is stored in a cookie.
- **Server Processing**: During SSR, the server reads this cookie.
- **Style Injection**: The server generates the CSS variables for the active theme and injects them directly into the HTML's `<style>` tag.

This ensures that when the user loads the page, it is already styled correctly (e.g., dark background) before any JavaScript runs on the client.

## 4. 🛠️ Admin Tools

To visualize your themes and debugging colors, you can use the admin helper component.

```tsx
// Helper to list all theme colors for comparison
import { TestThemes } from 'lupine.api/admin';
```

This component renders a grid showing how your defined colors look across different themes, helping you find the right keys and contrast.
