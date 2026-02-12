---
title: 如何在 2026 年使用 Lupine.js 构建极速 SSR 应用
published: true
description: 探索 Lupine.js，一个仅 7kb 大小、内置 SSR、CSS-in-JS 且零配置的类 React 框架。
tags: javascript, webdev, react, performance
series: 开源聚焦
---

在 2026 年构建现代 Web 应用，往往要在“沉重但强大”（如 Next.js, Remix）与“轻量但受限”（如 Vanilla JS, 微型库）之间做选择。但如果你能同时拥有两者的优点呢？

遇见 **Lupine.js** —— 一个 **7kb** (gzipped) 的全栈框架，它带来了服务端渲染 (SSR)、CSS-in-JS 以及类 React 的 TSX 开发体验，却没有任何臃肿的打包体积。

在本文中，我将展示如何使用 Lupine.js 构建一个闪电般快速、SEO 友好的 Web 应用。

![Lupine.js Architecture](/lupine.js/assets/ssr.png)

## 为什么选择 Lupine.js？

- **⚡ 极速性能**: 没有虚拟 DOM (Virtual DOM) 的开销。通过智能绑定直接操作 DOM。
- **🪶 极小体积**: 一个功能完备、包含 SSR 和路由的 "Hello World" 应用，gzip 后仅需 ~7kb。
- **🧩 类 React 语法**: 使用 JSX/TSX。如果你熟悉 React，通过 Lupine 上手几乎只需几分钟。
- **🕸️ 原生 SSR**: 服务端渲染是的一等公民，而非事后补充。内置自动化的 SEO 支持。
- **🎨 内置 CSS-in-JS**: 支持作用域样式、嵌套和媒体查询，无需引入任何额外库。

## 1. 几秒钟内开始

Lupine.js 提供了一个命令行工具 (CLI) 来快速生成项目脚手架。

```bash
npx create-lupine@latest my-app
cd my-app
npm install
npm run dev
```

访问 `http://localhost:11080`，你就能看到你的服务端渲染应用正在运行了。

## 2. "Hello World" (亦在服务端渲染)

Lupine.js 组件看起来非常亲切。这是一个简单的计数器组件 (`src/pages/home.tsx`)：

```tsx
import { HtmlVar, CssProps } from 'lupine.web';

export const HomePage = () => {
  // 1. 响应式状态 (Signals)
  // '0' 是初始值。
  const count = new HtmlVar('0');

  // 2. CSS-in-JS (内置支持!)
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

      {/* 直接 DOM 更新，无 VDOM diffing */}
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

### 这里发生了什么？

1.  **`HtmlVar`**: 这是 Lupine 版本的 Signals（信号量）。它直接绑定到文本节点。当你更新 `count.value` 时，只有那个特定的文本节点会更新。组件本身不会重新渲染！
2.  **`css` 属性**: 样式会自动进行作用域隔离。SSR 会将关键 CSS 注入到 `<head>` 中，因此**完全没有样式闪烁 (FOUC)**。

## 3. 零配置 SSR 与 SEO

现代 SPA 开发中最大的痛点之一就是 SEO。Lupine 原生解决了这个问题。你不需要 `react-helmet` 或复杂的布局配置。

```tsx
import { MetaData, PageProps } from 'lupine.web';

export const ProductPage = async (props: PageProps) => {
  // 1. 获取数据 (在 SSR 期间运行于服务端，或者在页面导航时运行于客户端)
  // 注意：可以直接使用标准 fetch！
  const product = await fetch(`https://api.example.com/products/${props.urlParameters['id']}`).then((res) =>
    res.json()
  );

  return (
    <div>
      {/* 2. 直接在组件中定义 SEO 元数据 */}
      <MetaData property='og:title' content={product.name} />
      <MetaData property='og:description' content={product.description} />
      <MetaData property='og:image' content={product.imageUrl} />

      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
};
```

当爬虫（如 Googlebot, Twitter card）访问这个 URL 时，Lupine 的服务端会在返回 HTML 之前渲染好所有这些元标签。

## 4. 强大的路由系统

Lupine 的 `PageRouter` 开箱即支持嵌套路由、中间件 (Middleware) 和布局 (Layouts)。

```tsx
import { PageRouter, bindRouter } from 'lupine.web';

const router = new PageRouter();

// 中间件 (例如：Auth 检查)
router.setFilter(async (props) => {
  // 检查登录逻辑...
  return null; // 继续路由
});

// 定义路由
router.use('/home', HomePage);
router.use('/product/:id', ProductPage);
router.use('*', NotFoundPage);

// 绑定到应用
bindRouter(router);
```

## 总结

Lupine.js 无意在庞大的企业级生态应用中取代 React。但对于**博客、落地页、仪表盘 (Dashboards) 和追求创新的 Web 应用**，如果速度和包体积至关重要，那么 Lupine.js 将是一股清新的空气。

它将 **2026 年的开发体验 (DX)** 带回了 **2010 年的极致性能**。

**试一试吧，期待你的反馈！**

---

🔗 **Github**: [https://github.com/uuware/lupine.js](https://github.com/uuware/lupine.js)
⭐ **如果喜欢轻量级 Web 技术，请给我们点个 Star！**
