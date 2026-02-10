# lupine.press

`lupine.press` is a lightweight, high-performance documentation site framework built on top of `lupine.web`. It provides a complete solution for rendering Markdown-based documentation websites with a responsive layout, sidebar navigation, and theming support.

It is designed to work seamlessly with the `lupine` ecosystem, powering documentation sites like the official Lupine.js documentation.

## Features

- **Responsive Layout**: Built-in `PressFrame` provides a standard documentation layout with a header, responsive sidebar, and content area.
- **Markdown Rendering**: Optimized for rendering content generated from Markdown files, including syntax highlighting and standard typography.
- **Sidebar Navigation**: Automatically generates a multi-level sidebar based on your configuration.
- **Theming**: Built-in support for multiple themes (e.g., light/dark mode) via `lupine.components` theme system.
- **Routing**: explicit integration with `PageRouter` for handling client-side navigation.
- **多语言支持**：自动扫描多语言目录的 markdown 文件，多语言显示切换。

## Usage Guide

To use `lupine.press`, you typically set up a `lupine.web` application and configure it to use `PressPage` as the main route handler.

### 1. Prerequisites

Ensure you have `lupine.web` and `lupine.components` installed in your project.

### 2. Basic Setup

In your application entry point (e.g., `src/index.tsx`), you need to bind the necessary configurations and set up the router.

```typescript
import { bindRouter, PageRouter, bindTheme, bindLang, setDefaultPageTitle } from 'lupine.components';
import { bindPressData, PressPage, pressThemes } from 'lupine.press';
import { markdownConfig } from './markdown-config'; // Your generated markdown data

// 1. Initialize core settings
bindLang('en', {}); // Set default language
bindTheme('light', pressThemes); // Bind themes (includes specific styles for press)
setDefaultPageTitle('My Documentation');

// 2. Bind documentation data
// markdownConfig is a dictionary containing HTML content and metadata generated from markdown files.
bindPressData(markdownConfig);

// 3. Configure Router
const pageRouter = new PageRouter();
// Route all requests to PressPage, which handles looking up content in markdownConfig
pageRouter.use('*', PressPage);

// 4. Start the application
bindRouter(pageRouter);
```

### 3. Data Structure (`markdownConfig`)

The `bindPressData` function expects a configuration object where keys are route paths (e.g., `/guide/started`) and values contain the content and metadata.

Typically, this data is generated at build time from your Markdown files.

```typescript
export const markdownConfig = {
  '/en/guide/started': {
    html: '<h1>Getting Started</h1><p>...</p>', // Pre-rendered HTML content
    data: {
      title: 'Getting Started',
      sidebar: [
        // Sidebar configuration for this page context
        { type: 'group', text: 'Guide', level: 0 },
        { type: 'link', text: 'Installation', link: '/en/guide/install', level: 1 },
      ],
    },
    headings: [{ level: 2, text: 'Prerequisites', id: 'prerequisites' }],
  },
  // ... other pages
};
```

## Architecture

- **`PressFrame`**: The main layout component. It handles the specific CSS and structure for a documentation site, ensuring the sidebar and content area scroll independently.
- **`PressPage`**: The "controller" component. It looks up the current URL in the bound `markdownConfig`, retrieves the corresponding HTML and metadata, and renders the `PressFrame` with the correct sidebar and content.
- **`pressLoad`**: A navigation utility to handle link clicks within the documentation, ensuring smooth client-side transitions.
