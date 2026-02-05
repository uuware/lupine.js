---
title: Press Doc Overview
---

# lupine.press

`lupine.press` is a lightweight, high-performance documentation site framework built on top of `lupine.web`. It provides a complete solution for rendering Markdown-based documentation websites with a responsive layout, sidebar navigation, and theming support.

It is designed to work seamlessly with the `lupine` ecosystem, powering documentation sites like the official LupineJS documentation.

## Features

- **Responsive Layout**: Built-in `PressFrame` provides a standard documentation layout with a header, responsive sidebar, and content area.
- **Markdown Rendering**: Optimized for rendering content generated from Markdown files, including syntax highlighting and standard typography.
- **Sidebar Navigation**: Automatically generates a multi-level sidebar based on your configuration.
- **Theming**: Built-in support for multiple themes (e.g., light/dark mode) via `lupine.components` theme system.
- **Routing**: explicit integration with `PageRouter` for handling client-side navigation.
- **Multilingual Support**: Automatically scans markdown files from multilingual directories and supports language switching.
- **Styles Support**: You can set styles in markdown files.

## Usage Guide

### 1. Create a Project

To use `lupine.press`, you typically set up a `lupine.web` application and configure it to use `PressPage` as the main route handler.
The easiest way is to use the `create-lupine` command to create a new `lupine.press` application.

```bash
npx create-lupine@latest my-docs
```

Then select `doc-starter` template.

### 2. Basic Setup

You can see these configurations in the created application.
In your application entry point (e.g., `src/index.tsx`), you can see the necessary binding configurations and router settings.

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

## Markdown File Structure & Association

### Top-level Configuration

A `index.md` file must exist in the top-level directory of your Markdown files. This file uses the `lang` field to specify all supported languages for the site.

```yaml
---
lang:
  - title: English
    id: en
  - title: 简体中文
    id: zh
---
```

### Multilingual Configuration

Each language ID (e.g., `en`, `zh`) corresponds to a subdirectory, which must contain its own `index.md` file. This file configures global settings for that language version, such as layout, page title, and sidebar width. All Markdown content files for that language should be stored within this directory or its subdirectories.

The `index.md` supports defining:

- **Hero & Features**: Homepage hero banner and feature introduction.
- **Nav**: Top navigation links.
- **GitHub**: Repository links.
- **Sidebar**: Sidebar menu configuration (Core parameter).

### Sidebar Configuration

The `sidebar` parameter is an array that supports three configuration patterns:

1.  **Submenu Pattern (`submenu`)**:
    Points to a subdirectory. The system will automatically expand the `sidebar` configuration defined in that subdirectory's `index.md` and merge its content into the current level.
2.  **Group Pattern (`text` + `items`)**:
    Defines a menu group. `text` is the group title, and `items` is the list of links under this group.
3.  **Flat Pattern (`items` only)**:
    Defines `items` without `text`. In this case, all links in `items` will be displayed directly at the current level without grouping.

## Architecture

- **`PressFrame`**: The main layout component. It handles the specific CSS and structure for a documentation site, ensuring the sidebar and content area scroll independently.
- **`PressPage`**: The "controller" component. It looks up the current URL in the bound `markdownConfig`, retrieves the corresponding HTML and metadata, and renders the `PressFrame` with the correct sidebar and content.
- **`pressLoad`**: A navigation utility to handle link clicks within the documentation, ensuring smooth client-side transitions.

## Styles

styles can define font, color styles and will be applied to all pages.

```css
styles:
  ':root': { '--primary-accent-color': '#0ac92a' }
  body: { font-family: var(--font-family-base); }
```
