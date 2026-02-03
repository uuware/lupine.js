---
title: 快速开始
---

# 了解 Lupine.js

Lupine.js 是一个包含前后端服务的全功能 Web 应用程序框架。

- **前端 (Front-End)**: `lupine.web` 是一个极其轻量级的框架，使用 React TSX 语法，让熟悉 React 的开发者零成本上手。
- **后端 (Back-End)**: `lupine.api` 是一个高效且精简的框架（类似 Express），从底层原生支持服务端渲染 (SSR)。
- **全平台**: 通过 Capacitor 和 Electron，仅需维护一份代码，即可同时发布 Web、iOS、Android 和桌面端应用程序。

## 核心特性 (Core Essentials)

Lupine.js 的设计哲学是**简单**与**高性能**。以下是我们引以为傲的核心功能：

### [⚡ 服务端渲染 (SSR) 优先](../essentials/ssr)

Lupine 从一开始就是为 SSR 设计的。它自动处理样式注入、SEO 元数据和状态注水，确保你的应用拥有极致的首屏加载速度和搜索引擎友好性。

### [🎨 内置 CSS-in-JS](../essentials/css-in-js)

告别复杂的 CSS 配置。Lupine 内置了强大的样式系统，支持作用域样式、嵌套选择器、媒体查询和动态样式，完全无运行时负担。

### [🛣️ 强大的页面路由](../essentials/page-route)

一个灵活的函数式路由系统，支持嵌套路由、路由守卫、参数解析和中间件，为构建复杂的单页应用 (SPA) 提供了坚实基础。

### [🌗 主题系统](../essentials/theme)

开箱即用的主题支持（亮色/暗色模式）。Lupine 确保在 SSR 阶段就注入正确的主题变量，彻底消除了页面加载时的“样式闪烁” (FOUC) 问题。

### [📝 高性能列表渲染](../essentials/list)

独创的 Spot-Update 技术，使得在渲染和编辑大型列表时，能够直接更新 DOM 节点，而无需触发昂贵的 React 虚拟 DOM 重计算。

### [📡 全栈开发体验](../essentials/api)

前后端一体化设计。`lupine.api` 提供了极简的 API 定义方式，与前端配合无间，让全栈开发变得前所未有的简单。
