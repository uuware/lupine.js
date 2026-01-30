---
title: Dashboard (管理面板)
---

# lupine.api dashboard

lupine.api 自带一个可以扩充的 dashboard，用于管理 api 服务。dashboard 左边是众多管理菜单，右边是多页面的 tab 内容页面。

## 功能特性 (Features)

Dashboard 提供了全面的后台管理功能，按功能模块分类如下：

### 1. 数据库管理 (DB)

提供直接操作数据库的工具，方便调试和维护。

- **Table List (表列表)**: 浏览数据库中的表，支持查看表数据。
- **Create Tables (创建表)**: 运行预设脚本初始化或修复数据库表结构。
- **Run SQL (运行 SQL)**: 提供一个 SQL 执行窗口，可以运行任意 SQL 语句并直接查看 JSON 格式的返回结果。

### 2. 运维与服务器管理 (Access & Server Info)

核心的运维工具集，支持远程管理和监控。

#### Release (发布管理)

强大的发布工具，支持多节点/多环境管理。

- **版本同步**: 支持将代码或资源从源环境 (From) 同步到目标环境 (To)。
- **全栈更新**: 可选择更新 Server (核心服务), Api (业务逻辑), Env (环境变量) 等。
- **Web 更新**: 支持按子目录 (Web Sub-folder) 独立更新前端资源。
- **操作控制**:
  - **Check**: 检查更新状态。
  - **Refresh Cache**: 刷新服务器缓存 (支持远程/本地)。
  - **Restart App**: 重启应用程序 (支持远程/本地)。
  - **Run Cmd**: 直接在服务器执行 Shell 命令。
- **日志**: 查看和下载发布操作的历史日志。

#### Utilities (工具)

- **Tokens (令牌管理)**: 管理 API 访问令牌。
- **Shell (在线终端)**: 基于 WebSocket 的在线终端，可实时与服务器交互，执行通过验证的命令。
- **Resources (资源管理)**: 浏览、上传、下载服务器文件系统中的资源文件。
- **Config (配置管理)**: 查看和热修改系统运行时配置。
- **Performance (性能监控)**: 监控服务器的内存、CPU 等性能指标。

### 3. 开发与测试 (Test)

用于开发阶段调试组件和 UI。

- **Test Themes**: 预览和测试不同的 UI 主题配置。
- **Test Component**: 测试通用 UI 组件的交互和渲染。
- **Test Animations**: 演示和调试 CSS/JS 动画效果。
- **Test Edit**: 测试富文本编辑器或表单编辑功能。

---

## 扩展开发

Dashboard 是高度可扩展的。核心逻辑位于 `packages/lupine.api/admin` 目录下。

### 菜单配置

菜单通过 `admin-frame-helper.tsx` 中的 `adminTopMenu` 数组进行配置。你可以轻松添加新的菜单项：

```typescript
const myMenu = {
  id: 'my-feature',
  text: 'My Feature',
  items: [
    {
      id: 'my-page',
      text: 'My Page',
      js: () => this.addPanel('My Page', <MyComponent />),
    },
  ],
};
```

### 页面开发

每个管理页面都是一个标准的 `lupine.components` 组件。使用 `AdminPanel` 和 `Tabs` 组件来管理多标签页体验。
