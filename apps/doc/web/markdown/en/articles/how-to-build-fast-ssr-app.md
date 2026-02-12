---
title: How to build a blazing fast SSR app in 2026 with Lupine.js
published: true
description: Discover Lupine.js, a 7kb React-like framework with built-in SSR, CSS-in-JS, and zero configuration.
tags: javascript, webdev, react, performance
series: Open Source Spotlights
---

Building a modern web application in 2026 often feels like choosing between "heavy & powerful" (Next.js, Remix) or "light & limited" (Vanilla JS, micro-libraries). But what if you could have the best of both worlds?

Meet **Lupine.js** — a **7kb** (gzipped) full-stack framework that brings Server-Side Rendering (SSR), CSS-in-JS, and a React-like TSX experience without the massive bundle size.

In this article, I'll show you how to build a lightning-fast, SEO-ready web app using Lupine.js.

![Lupine.js Architecture](/lupine.js/assets/ssr.png)

## Why Lupine.js?

- **⚡ Blazing Fast**: No Virtual DOM overhead. Direct DOM manipulation with intelligent binding.
- **🪶 Tiny Footprint**: ~7kb gzipped for a fully functional "Hello World" with SSR and Routing.
- **🧩 React-like Syntax**: Uses JSX/TSX. If you know React, you already know 90% of Lupine.
- **🕸️ Native SSR**: Server-Side Rendering is a first-class citizen, not an afterthought. SEO is automatic.
- **🎨 Built-in CSS-in-JS**: Scoped styles, nesting, and media queries without extra libraries.

## 1. Get Started in Seconds

Lupine.js provides a CLI tool to scaffold your project instantly.

```bash
npx create-lupine@latest my-app
cd my-app
npm install
npm run dev
```

Visit `http://localhost:11080` and you'll see your server-rendered app running.

## 2. The "Hello World" (That Renders on the Server)

Lupine.js components look familiar. Here is a simple counter component (`src/pages/home.tsx`):

```tsx
import { HtmlVar, CssProps } from 'lupine.web';

export const HomePage = () => {
  // 1. Reactive State (Signals)
  // '0' is the initial value.
  const count = new HtmlVar('0');

  // 2. CSS-in-JS (Built-in!)
  const css: CssProps = {
    textAlign: 'center',
    padding: '50px',
    h1: {
      color: '#333',
      fontSize: '2.5rem',
    },
    button: {
      padding: '10px 20px',
      fontSize: '1.2rem',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#eee',
      },
    },
  };

  return (
    <div css={css}>
      <h1>Hello Lupine.js!</h1>
      <p>Current Count: {count.node}</p>

      {/* Direct DOM update, no VDOM diffing */}
      <button
        onClick={() => {
          const current = Number(count.value);
          count.value = (current + 1).toString();
        }}
      >
        Increment
      </button>
    </div>
  );
};
```

### What's happening here?

1.  **`HtmlVar`**: This is Lupine's version of Signals. It binds directly to the text node. When you update `count.value`, only that specific text node updates. No re-rendering of the component!
2.  **`css` prop**: Styles are scoped automatically. SSR injects the critical CSS into the `<head>` so there's **no Flash of Unstyled Content (FOUC)**.

## 3. Zero-Config SEO with SSR

One of the biggest pain points in modern SPAs is SEO. Lupine handles this natively. You don't need `react-helmet` or complex layouts.

```tsx
import { MetaData, PageProps } from 'lupine.web';

export const ProductPage = async (props: PageProps) => {
  // 1. Fetch data (runs on Server during SSR, or Client during navigation)
  // Note: Standard fetch works!
  const product = await fetch(`https://api.example.com/products/${props.urlParameters['id']}`).then((res) =>
    res.json()
  );

  return (
    <div>
      {/* 2. Define SEO Metadata directly in the component */}
      <MetaData property='og:title' content={product.name} />
      <MetaData property='og:description' content={product.description} />
      <MetaData property='og:image' content={product.imageUrl} />

      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
};
```

When a crawler (Googlebot, Twitter card) hits this URL, Lupine's server renders the HTML with all these meta tags populated **before** sending it back.

## 4. Powerful Routing

Lupine's `PageRouter` supports nested routes, middleware, and layouts out of the box.

```tsx
import { PageRouter, bindRouter } from 'lupine.web';

const router = new PageRouter();

// Middleware (e.g., Auth check)
router.setFilter(async (props) => {
  // Check auth logic...
  return null; // continue
});

// Route Definitions
router.use('/home', HomePage);
router.use('/product/:id', ProductPage);
router.use('*', NotFoundPage);

// Bind to app
bindRouter(router);
```

## Conclusion

Lupine.js isn't trying to replace React for massive enterprise ecosystem apps. But for **blogs, landing pages, dashboards, and innovative web apps** where speed and bundle size matter, it's a breath of fresh air.

It brings the **Developer Experience (DX) of 2026** back to the **Performance of 2010**.

**Give it a try and let me know what you think!**

---

🔗 **Github**: [https://github.com/uuware/lupine.js](https://github.com/uuware/lupine.js)
⭐ **Star us if you like lightweight web tech!**
