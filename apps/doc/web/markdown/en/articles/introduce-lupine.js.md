---
title: Introducing Lupine.js
description: The Lightweight Fast Frontend & Efficient Easy Backend Framework.
---

# Introducing Lupine.js: The "Unreasonably" Efficient Web Framework

In a world dominated by massive meta-frameworks and complex build chains, **Lupine.js** asks a simple question: _What if we could have the power of a modern full-stack framework without the bloat?_

Lupine.js is a **lightweight (7kb gzipped)**, **full-stack** web framework that combines a React-like frontend with an Express-like backend. It is designed from scratch for speed, simplicity, and efficiency.

![Lupine.js](/lupine.js/assets/og-image.png)

## Why Lupine.js?

### 1. 🪶 Extremely Lightweight Frontend

The `lupine.web` frontend package is tiny—just **7kb gzipped**. Yet, it retains the developer experience you know and love: **TSX syntax** (React JSX), components, and hooks. There is no heavy runtime to download, meaning your pages load instantly even on slow connections.

### 2. ⚡ Built-in Server-Side Rendering (SSR)

Most frameworks treat SSR as an add-on. In Lupine, SSR is a **first-class citizen**. The `lupine.api` backend is optimized to render your frontend pages on the server automatically.

- **No FOUC**: Critical CSS is injected server-side.
- **Zero-Config SEO**: Meta tags (`og:image`, `description`) are calculated before the page leaves the server.
- **Sharing Ready**: Your links look great on Twitter/Facebook out of the box.

### 3. 🎨 Native CSS-in-JS Engine

Say goodbye to configuring PostCSS, Tailwind, or styled-components. Lupine includes a powerful CSS-in-JS engine built right in.

- **Scoped Styles**: Styles are automatically scoped to your component.
- **Nesting**: Support for `.parent &` syntax.
- **Performance**: Styles are extracted and injected efficiently during SSR.

```tsx
const Button = () => {
  const css = {
    backgroundColor: '#0ac92a',
    '&:hover': {
      backgroundColor: '#08a823',
    },
  };
  return <button css={css}>Click Me</button>;
};
```

### 4. 🚀 Full-Stack in One Place

Lupine isn't just a frontend library; it's a complete app solution.

- **Backend (`lupine.api`)**: An efficient, minimalist Node.js framework similar to Express.
- **Frontend (`lupine.web`)**: A reactive UI library.
- **Dev Experience**: Run `npm run dev` and debug both frontend and backend in a single VS Code session.

## Quick Start

Ready to give it a try? You can scaffold a new project in seconds.

### Step 1: Create a Project

Use our CLI tool to create a new app.

```bash
npx create-lupine@latest my-awesome-app
```

### Step 2: Run it

Enter the directory and start the dev server.

```bash
cd my-awesome-app
npm install
npm run dev
```

Visit `http://localhost:11080` and you'll see your first Lupine app running!

## Code Frequency & Activity

Lupine is actively developed. You can check our code frequency and contributions directly on GitHub:
👉 [https://github.com/uuware/lupine.js](https://github.com/uuware/lupine.js)

## Conclusion

Lupine.js is perfect for developers who want:

- **Control**: Understand every part of your stack.
- **Speed**: Deliver the fastest possible experience to users.
- **Simplicity**: No hidden magic, just clean code.

Give **Lupine.js** a star on GitHub and try it for your next project!
