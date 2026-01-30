---
title: 概览
---

# lupine.web

**lupine.web** 是一个类似 React、极快、小巧且轻量级的前端框架，专为现代 Web 开发而设计。它专注于性能、简单性，并与 `lupine.api` 搭配使用时提供全栈体验。

## 为什么选择 lupine.web?

### 🚀 零依赖且轻量级 (Zero-Dependency & Lightweight)

我们相信保持简单。`lupine.web` **没有外部依赖**，因此包体积极小，加载速度极快。它使用 TSX 语法，所以如果你熟悉 React，你会感到非常亲切。

### 🎨 内置 CSS-in-JS (Built-in CSS-in-JS)

不用再设置复杂的 CSS 加载器或外部样式库了。`lupine.web` 自带了一个强大的内置 CSS-in-JS 解决方案。

- **作用域样式 (Scoped Styles)**: 样式自动限定在组件作用域内，以防止冲突。
- **嵌套支持 (Nesting Support)**: 使用嵌套选择器编写更清晰的 CSS（例如，`&:hover`，`& > span`）。
- **主题支持 (Theming)**: 原生支持亮/暗模式和自定义主题。

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

### 🛣️ 强大的路由 (Powerful Router)

我们的函数式路由专为灵活性和控制力而设计。

- **路由守卫 (Route Guards)**: 轻松实现身份验证检查或权限控制。
- **嵌套路由 (Nested Routes)**: 使用子路由组织应用程序，实现模块化架构。
- **SSR 就绪 (SSR Ready)**: 路由在服务器和客户端上都能无缝工作。

```typescript
const pageRouter = new PageRouter();
// 中间件/守卫示例
pageRouter.setFilter(async (props) => {
  if (!checkAuth(props)) return <Redirect to='/login' />;
  return null; // Pass
});
pageRouter.use('/dashboard/*', DashboardRouter);
```

### ⚡ 服务端渲染 (SSR) 优先 (Server-Side Rendering First)

视觉性能至关重要。`lupine.web` 从第一天起就是为 SSR 构建的。

- **无闪烁 (No Flashing)**: 内容在服务器上渲染，确保用户立即看到页面。
- **SEO 友好**: 完全可定制的元数据 (Metadata) 和 Open Graph (OG) 标签，用于社交分享。
- **水合 (Hydration)**: 客户端平滑接管，无需重新渲染整个树。

### 🌍 国际化 (i18n)

轻松迈向全球。内置对多语言应用程序的支持，允许通过上下文动态切换语言，无需复杂配置。

### 🛠️ 环境配置 (Environment Configuration)

高效管理您的应用程序环境。`lupine.web` 支持加载环境变量（通过 `lupine.api` 从 `.env` 文件加载）并将经过严格过滤的配置注入到前端。
