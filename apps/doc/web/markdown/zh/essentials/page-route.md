---
title: Page Router (页面路由)
---

# Page Router (页面路由)

**Lupine.web** 中的 `PageRouter` 是一个强大的客户端路由系统，其逻辑设计与后端的 `ApiRouter` (位于 `lupine.api` 中) 保持 **同构**。它支持嵌套路由、中间件过滤器、动态参数和布局框架 (Layout Frames)。

## 1. ⚖️ 与其他框架的对比

与通用的路由器（如 `react-router` 或 `vue-router`）相比：

- **逻辑一致性**：它与后端的 `ApiRouter` 共享完全相同的路由哲学。如果你知道如何编写 Lupine 后端 API，你就知道如何编写前端路由。
- **真正的嵌套**：你可以将一个完整的 `PageRouter` 实例挂载到另一个路由器的特定路径上（例如：`router.use('/user', userRouter)`），从而实现真正的模块化。
- **内置布局**：`setFramePage` 将布局视为一等公民，能够将内容注入到特定的占位符类中。

## 2. 🐣 基本用法

最简单的开始方法是将路径映射到页面组件。

```tsx
import { PageRouter, bindRouter } from 'lupine.web';

// 1. 创建 Router
const pageRouter = new PageRouter();

// 2. 定义路由
pageRouter.use('/home', HomePage);
pageRouter.use('/about', AboutPage);
// 404 通配符
pageRouter.use('*', NotFoundPage);

// 3. 绑定到系统
bindRouter(pageRouter);
```

## 3. 🔧 动态参数

Lupine 直接在 URL 字符串中支持必选和可选参数。所有捕获的参数都可以在 `props.urlParameters` 中获取。

### 语法

- `/:id` : 必选参数。
- `/?id` : 可选参数。（所有后续参数也必须是可选的）。
- `?key=value` : 也支持标准的查询字符串（单独解析）。

### 示例

```tsx
// 定义:
pageRouter.use('/share/:type/:id/', ShareContentPage);

// 在 ShareContentPage 中使用:
export const ShareContentPage = (props: PageProps) => {
  // 获取参数
  const type = props.urlParameters['type'];
  const id = props.urlParameters['id'];

  return (
    <div>
      正在查看 {type}，ID为: {id}
    </div>
  );
};
```

## 4. 🚀 高级特性

### 4.1 🎎 嵌套路由 (模块化)

你可以将应用程序拆分为子模块。

```tsx
// 1. 为用户个人资料区域创建一个子路由器
const userPageRouter = new PageRouter();
userPageRouter.use('/profile', UserProfilePage);
userPageRouter.use('/settings', UserSettingsPage);

// 2. 将其挂载到主路由器下的 '/user' 路径
const mainRouter = new PageRouter();
mainRouter.use('/user', userPageRouter);

// 现在的 URL 是: /user/profile, /user/settings
```

### 4.2 🛡️ 中间件过滤器 (鉴权)

你可以附加一个“过滤器 (Filter)”函数，该函数会在 _任何_ 路由解析之前运行。如果过滤器处理了请求（例如，重定向到登录）或返回了一个节点，路由将停止。如果它返回 `null`，路由将继续。

```tsx
// 全局过滤器
pageRouter.setFilter(checkAgreement);

// 特定路由过滤器 (中间件模式)
const checkAuth = async (props) => {
  if (!isLoggedIn()) {
    // 渲染登录页面或重定向
    return <LoginPage />;
  }
  return null; // 继续执行下一个处理程序
};

// 用法: checkAuth 先运行，然后才是 UserMinePage
userPageRouter.use('/mine', checkAuth, UserMinePage);
```

### 4.3 🖼️ 框架页面 (布局)

与 React Router 嵌套 `<Outlet />` 不同，Lupine 使用 `setFramePage` 方法为该 Router 内的所有路由定义一个“包装器”或“布局”。

```tsx
// 1. 定义框架
const TopFrame = (placeholderClass, childNode) => {
  return (
    <div class='app-container'>
      <Header />
      <Sidebar />
      {/* 内容注入点 */}
      <div class={placeholderClass}>{childNode}</div>
    </div>
  );
};

// 2. 应用到 Router
const pageRouter = new PageRouter();
pageRouter.setFramePage({
  component: TopFrame,
  placeholderClassname: 'app-content-area', // 匹配上面的 class
});

pageRouter.use('/dashboard', DashboardPage);
// 结果: DashboardPage 被渲染在 TopFrame 的 'app-content-area' div 内部。
```

### 4.4 📂 子目录部署

如果你的应用部署在 `example.com/my-app/`，你需要告诉路由器忽略 `/my-app` 前缀。

```typescript
// 如果物理路径存在，路由器需要知道要忽略它
pageRouter.setSubDir('/my-app');
```
