---
title: 'SSR 深度解析: React vs Angular vs Lupine.js'
published: true
description: 2026 年服务端渲染 (SSR) 技术方案的硬核对比。
tags: ssr, architecture, react, angular, performance
series: 架构对比
---

服务端渲染 (SSR) 已经从通过 SEO 锦上添花的“可选项”，变成了现代 Web 架构中提升性能和用户体验的“必选项”。

在 2026 年，开发者通常会首选 **Next.js** (React 生态) 或 **Angular SSR** (前身是 Universal)。但是，这些重量级框架与像 **Lupine.js** 这样专为性能打造的轻量级框架相比，究竟表现如何？

本文将深度解析它们在架构设计、水合 (Hydration) 成本以及开发体验上的差异。

![Lupine.js Architecture](/lupine.js/assets/ssr.png)

## 1. 渲染架构对比

### React (Next.js/Remix)

React 本身只是一个 UI 库。要实现 SSR，你通常需要引入一个元框架 (Meta-framework)。

- **机制**: 服务端将组件树渲染成 HTML 字符串。
- **成本**: 在客户端，React 必须下载完整的 JS 包，重新运行组件逻辑以构建虚拟 DOM (VDOM)，然后进行“水合” (Hydrate) —— 即把事件监听器挂载到现有的 HTML 上。
- **演进**: React 服务端组件 (RSC) 通过保留部分逻辑在服务端来减少包体积，但随之而来的是流式传输、Suspense 边界以及客户端/服务端组件拆分的高复杂度。

### Angular (SSR / Modern Hydration)

Angular 已经转向“非破坏性水合”和部分水合。

- **机制**: Angular 使用 TransferState 序列化状态传输，避免客户端重复请求数据。
- **成本**: 历史上，Angular SSR 会导致“闪烁”，因为它会销毁服务端 HTML 并重新渲染。现代版本虽然修复了这个问题，但框架本身的开销 (Zone.js, 依赖注入系统) 对于浏览器主线程来说仍然是一个不小的负担。

### Lupine.js

Lupine 采取了根本不同的架构。它从第一行代码开始，就是作为一个**全栈组件框架**设计的。

- **机制**: `serverSideRenderPage` 函数 (在 `lupine.api` 中) 直接执行组件逻辑。它精准识别并预留了关键资源（CSS, Meta, Title）的“插槽”。
- **无 VDOM**: Lupine **不使用虚拟 DOM**。在服务端，它高效地拼接字符串。在客户端，它直接绑定到真实的 DOM 节点。
- **结果**: 服务端发送的是完全样式化的 HTML 页面。客户端脚本 (~7kb) 加载后，仅仅是“绑定”到现有元素上。因为没有 VDOM 需要重建，所以没有繁重的“重计算”过程。

## 2. 解决 "FOUC" (无样式内容闪烁)

### 问题

SSR 的 HTML 先到达浏览器，然后功能加载，最后样式加载。如果样式加载晚了，用户就会看到几毫秒的页面错乱 (FOUC)。

### React / Next.js

Next.js 会收集样式（例如来自 CSS Modules 或 Tailwind）并注入。但是，如果使用运行时的 CSS-in-JS（像旧版的 styled-components），在水合期间重新计算样式可能会带来性能惩罚。

### Lupine.js

Lupine 的 `BindStyles` 和 `CssProps` 引擎会在服务端渲染期间收集所有静态和动态样式。
它会自动生成关键 CSS 代码块，并直接注入到初始 HTML 响应的 `<head>` 中。
**结果**: 页面从第一个字节开始就是完美的。无需等待 JS 加载，布局就是正确的。

## 3. 数据获取与水合

如何从数据库获取数据并显示在屏幕上？

### React (Next.js App Router)

```tsx
// Server Component
async function Page() {
  const data = await db.query();
  return <ClientComponent data={data} />;
}
```

- **优点**: 数据和 UI 紧密配合 (Co-location)。
- **缺点**: 服务端组件和客户端组件之间有严格的边界。你不能在服务端组件中使用 State 或 Effect。

### Lupine.js

Lupine 支持页面级的 `async` 组件，这使得同一套逻辑可以无缝运行在服务端和客户端（SPA 导航期间）。

```tsx
// 既运行在服务端 (SSR)，也运行在客户端 (SPA 切换)
export const ProductPage = async (props: PageProps) => {
  // SSR: 在服务端请求，发送 HTML。
  // CSR: 在客户端请求，更新 DOM。
  const data = await fetch(`/api/products/${props.urlParameters.id}`);

  return <div>{data.title}</div>;
};
```

- **设计哲学**: "同构逻辑 (Isomorphic Logic)"。你只写一个函数。它在两种环境中都能高效运行，你无需关心“序列化边界”或“客户端包装器”。

## 4. 性能与包体积

这是最显著的差异。

| 指标                 | Next.js / React            | Angular            | Lupine.js             |
| :------------------- | :------------------------- | :----------------- | :-------------------- |
| **Hello World 体积** | ~70kb - 200kb              | ~100kb+            | **~7kb**              |
| **水合策略**         | VDOM 协调 (Reconciliation) | Zone.js / 事件回放 | **直接节点绑定**      |
| **复杂度**           | 高 (Server Actions, RSC)   | 高 (模块, DI)      | **低 (函数, 信号量)** |

## 总结: 如何选择？

- **选择 React/Next.js 如果**: 你有庞大的 React 开发团队，需要海量的第三方库生态，且极度依赖 Vercel 等平台的集成。
- **选择 Angular 如果**: 你在构建企业级软件，需要严格的类型约束、依赖注入系统，且团队规模较大。
- **选择 Lupine.js 如果**:
  - **性能至上**: 你追求最快的首屏内容绘制 (FCP)。
  - **崇尚简约**: 你不想配置 Webpack, Babel 或复杂的路由中间件。
  - **SEO 很关键**: 你需要简单、可预测的 Meta 标签控制。
  - **全栈掌控**: 你希望前后端使用同一套极简框架。

Lupine.js 证明了在 2026 年，构建现代高性能 SSR 应用并不需要沉重的框架。有些时候，**少即是多**。
