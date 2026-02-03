---
title: SSR (服务端渲染)
---

# SSR (服务端渲染)

Lupine.js 从一开始就将 **服务端渲染 (SSR)** 视为一等公民。大多数 SPA 框架将 SSR 视为事后的补充，或者需要复杂的元框架（如 React 的 Next.js）支持，而 Lupine 则直接将 SSR 集成到其核心架构中（`lupine.api` 和 `lupine.web`）。

## 1. ⚙️ 工作原理

当用户请求一个不对应静态文件（如图片或 JS 文件）的 URL 时，`serverSideRenderPage` 函数就会接管处理。

### 流程：

1.  **请求拦截**: 服务端拦截 HTTP 请求。
2.  **环境注入**: 它将服务端环境变量（以 `WEB.` 开头）注入到运行时。
3.  **页面生成**: 它调用 `_lupineJs.generatePage` **在服务端** 执行你的前端逻辑。
4.  **HTML 构建**: 它将最终的 HTML 拼接在一起，包括：
    - **主题与样式**: 关键 CSS 和当前主题被直接注入，防止“内容无样式闪烁” (FOUC)。
    - **元数据**: 计算并插入 SEO 标题和描述。
    - **状态注水 (Hydration)**: 页面被加载之后，前端会自动绑定事件。

## 2. 🔍 零配置 SEO

Lupine SSR 的最大好处之一是自动支持 SEO。通过使用 `MetaData` 等组件，你的页面在客户端运行任何 JavaScript **之前**，就已经告诉了搜索引擎它们需要知道的确切内容。

### 示例：社交分享 (OpenGraph)

在 `share-content.tsx` 中，你可以根据正在查看的内容动态设置 meta 标签：

```tsx
export const ShareContentPage = async (props: PageProps) => {
  // 1. 获取数据 (在服务端也可行！)
  const record = await fetchRecord(props.urlParameters['id']);

  // 2. 定义 SEO/社交媒体元数据
  return (
    <div>
      <MetaData property='og:title' content={record.title} />
      <MetaData property='og:description' content={record.description} />
      <MetaData property='og:image' content={record.imageUrl} />
      <MetaData property='og:url' content={props.url} />

      <h1>{record.title}</h1>
      {/* ... 内容 ... */}
    </div>
  );
};
```

## 3. 🛠️ 环境变量

Lupine 自动将你的服务端环境桥接到前端。

### 定义变量

在 `.env` 文件中，以 `WEB.` 开头的变量被标记为前端可用：

```ini
# .env
WEB.API_BASE_URL=https://api.example.com
WEB.SITE_NAME=My Awesome App
SECRET_KEY=xxxx  <-- 这个保留在服务端！
```

### 访问变量

在 SSR 期间（以及随后的浏览器中），可以通过 `getWebEnv()` 访问这些变量：

```typescript
// 任意组件
import { getWebEnv } from 'lupine.web';

const env = getWebEnv();
console.log(env.API_BASE_URL); // "https://api.example.com"
```

## 4. ⚙️ WebConfig: 动态运行时配置

有时你需要一些可以在运行时更改的配置（例如管理后台的“每页最大行数”或“维护模式”），而无需重新部署。Lupine 为此提供了 `WebConfig`。

**机制：**

1.  **SSR 注入**: 在首次加载页面时，服务端获取这些配置并将其注入到一个 `<script id="web-setting">` 标签中。
2.  **注水 (Hydration)**: `WebConfig.init()` (自动调用) 读取此脚本标签，有效地同步“注水”配置。
3.  **异步回退**: 如果应用作为纯 SPA 运行（仅客户端导航），且缓存缺失，`WebConfig.get()` 会从 API 获取配置。

### 用法

**绑定 API (入口点):**

```tsx
// src/index.tsx
bindWebConfigApi('/api/admin/web-config');
```

**使用配置 (组件):**

```tsx
// admin-poster-page.tsx
const PosterList = async () => {
  // 异步访问确保数据已就绪
  const maxRows = await WebConfig.get('poster_max_rows', 10);
  const category = await WebConfig.get('current_category', 'default');

  // ... 使用配置 ...
};
```

> [!IMPORTANT]
> 由于 `WebConfig` 可能需要获取数据（在客户端导航时），它被设计为 **异步 API**。请始终使用 `await WebConfig.get(...)`。

## 5. ⚡ 智能缓存与性能

Lupine 的 SSR 不仅仅是为了渲染，更是为了速度。

- **模板缓存**: 服务端缓存 `index.html` 的结构以减少文件系统读取。它识别标题、Meta、CSS 和内容的“插槽” (`packages/lupine.api/src/api/server-render.ts`)。
- **CSS 与主题注入**: 通过在服务端计算关键 CSS (`generateAllGlobalStyles`)，浏览器可以立即接收到一个样式完整的页面。即使用户禁用了 JavaScript 或加载缓慢，他们也能看到完美的 UI。
