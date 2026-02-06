---
title: Lupine.js 介绍
description: 轻量级前端 & 高效后端框架
---

# 介绍 Lupine.js：一款"极其"高效的 Web 框架

在一个被庞大的元框架 (Meta-frameworks) 和复杂构建链主导的世界里，**Lupine.js** 提出了一个简单的问题：_如果我们能拥有现代全栈框架的威力，却不需要那些臃肿的负担，会怎样？_

Lupine.js 是一个 **轻量级 (7kb gzipped)** 的 **全栈** Web 框架，它结合了类 React 的前端体验和类 Express 的后端架构。它是完全从零开始设计，旨在实现极致的速度、简洁和高效。

![Lupine.js](/lupine.js/assets/og-image.png)

## 为什么选择 Lupine.js？

### 1. 🪶 极其轻量的前端

`lupine.web` 前端包极其小巧——仅 **7kb gzipped**。然而，它保留了你熟悉和喜爱的开发体验：**TSX 语法** (React JSX)、组件和 Hooks。没有沉重的运行时需要下载，这意味着即使在慢速网络下，你的页面也能瞬间加载。

### 2. ⚡ 内置服务端渲染 (SSR)

大多数框架将 SSR 视为附加功能。在 Lupine 中，SSR 是 **一等公民**。`lupine.api` 后端经过优化，能够自动在服务器上渲染你的前端页面。

- **无样式闪烁 (No FOUC)**: 关键 CSS 由服务端注入。
- **零配置 SEO**: Meta 标签 (`og:image`, `description`) 在页面离开服务器前就已经计算完毕。
- **社交分享就绪**: 分享到 Twitter/微信/Facebook 的链接开箱即用，效果完美。

### 3. 🎨 原生 CSS-in-JS 引擎

告别配置 PostCSS、Tailwind 或 styled-components 的烦恼。Lupine 内置了一个强大的 CSS-in-JS 引擎。

- **样式隔离**: 样式自动隔离到你的组件。
- **嵌套支持**: 支持 `.parent &` 语法。
- **高性能**: 样式在 SSR 期间被高效提取和注入。

```tsx
const Button = () => {
  const css = {
    backgroundColor: '#0ac92a',
    '&:hover': {
      backgroundColor: '#08a823',
    },
  };
  return <button css={css}>点击我</button>;
};
```

### 4. 🚀 全栈合一

Lupine 不仅仅是一个前端库；它是完整的应用解决方案。

- **后端 (`lupine.api`)**: 一个高效、极简的 Node.js 框架，类似于 Express。
- **前端 (`lupine.web`)**: 一个响应式的 UI 库。
- **开发体验**: 运行 `npm run dev`，即可在同一个 VS Code 会话中同时调试前端和后端。

## 快速开始

准备好尝试了吗？几秒钟就能搭建一个新的项目。

### 第一步：创建项目

使用我们的 CLI 工具创建一个新应用。

```bash
npx create-lupine@latest my-awesome-app
```

### 第二步：运行项目

进入目录并启动开发服务器。

```bash
cd my-awesome-app
npm install
npm run dev
```

访问 `http://localhost:11080`，你将看到你的第一个 Lupine 应用正在运行！

## 代码活跃度

Lupine 正在积极开发中。你可以直接在 GitHub 上查看我们的代码频率和贡献：
👉 [https://github.com/uuware/lupine.js](https://github.com/uuware/lupine.js)

## 总结

Lupine.js 非常适合这样的开发者：

- **掌控力**: 想要了解技术栈的每一个部分。
- **速度**: 想为用户提供最快的体验。
- **简洁**: 没有隐藏的魔法，只有干净的代码。

给 **Lupine.js** 在 GitHub 上点个 Star，并在你的下一个项目中尝试一下吧！
