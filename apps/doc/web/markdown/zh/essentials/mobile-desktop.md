---
title: 移动端和桌面端适配
---

# 移动端和桌面端适配 (Mobile & Desktop)

Lupine.js 的核心设计理念之一是“一套代码，多端运行”。通过内置的响应式设计工具和组件，你可以轻松构建同时适应 Web、移动端（iOS/Android）和桌面端（Electron）的应用程序。

## 1. 响应式布局 (Media Query)

`lupine.components` 提供了强大的媒体查询工具，帮助你根据屏幕宽度调整布局。

### 断点定义 (Breakpoints)

系统预定义了以下断点（可在 `MediaQueryMaxWidth` 中自定义）：

- **ExtraSmall**: < 480px
- **Mobile**: < 767px (Grid: col-1)
- **Tablet**: < 991px (Grid: col-1-md)
- **Desktop**: < 1399px (Grid: col-1-lg)

### 在 CSS-in-JS 中使用

你可以使用 `MediaQueryRange` 轻松编写响应式样式：

```tsx
import { MediaQueryRange, MediaQueryMaxWidth } from 'lupine.components';

const css: CssProps = {
  width: '100%',
  // 默认桌面端样式
  maxWidth: MediaQueryMaxWidth.DesktopMax,

  // 针对超小屏幕（手机竖屏）的调整
  [MediaQueryRange.ExtraSmallBelow]: {
    padding: '10px',
    fontSize: '14px',
  },

  // 针对平板及以下
  [MediaQueryRange.TabletBelow]: {
    flexDirection: 'column',
  },
};
```

## 2. 自适应框架 (Adaptive Frames)

Lupine 提供了专门用于构建响应式应用的框架组件。

### ResponsiveFrame

`ResponsiveFrame` 是处理混合布局的终极解决方案。它能自动根据设备类型切换 UI 结构：

- **桌面端**: 显示顶部菜单 (`DesktopHeader`)、底部页脚 (`DesktopFooter`) 和侧边栏。
- **移动端**: 自动切换为移动端布局，隐藏桌面端特有元素，启用移动端特定的导航 (`MobileBottomMenu`)。

```tsx
<ResponsiveFrame
  desktopHeaderTitle="我的应用"
  desktopTopMenu={[...]}
  mobileBottomMenu={[...]}
  mainContent={<MyPageContent />}
/>
```

### SliderFrame

`SliderFrame` 实现了移动端常见的“侧滑”交互体验。它通常用于从右侧滑出详细页面，或从底部滑出菜单。

- 支持 `Right-to-Left` (右滑入) 和 `Bottom-to-Top` (上滑入) 动画。
- 在桌面端可配置为侧边栏弹出模式。

## 3. 移动端导航与交互

### 全局返回键处理 (BackActionHelper)

在移动应用（特别是 Android）中，处理物理返回键至关重要。`BackActionHelper` 提供了一个全局队列来管理返回行为，确保用户体验流畅。

**使用示例**:

```typescript
import { backActionHelper } from 'lupine.components';

// 监听硬件返回键（通常在 index.ts 或 app-listeners.ts 中）
App.addListener('backButton', async () => {
  // 如果 helper 处理了返回动作（例如关闭了一个弹窗），则停止
  if (await backActionHelper.processBackAction()) {
    return;
  }
  // 否则执行退出应用或其他逻辑
});
```

### ActionSheet (动作面板)

`ActionSheet` 是移动端非常常用的底部弹窗组件，用于选项选择、信息提示或简单的输入。

- **ActionSheetSelect**: 底部选项菜单。
- **ActionSheetInput**: 底部输入框。
- **ActionSheetMessage**: 底部消息提示。

```tsx
import { ActionSheetSelectPromise } from 'lupine.components';

const handleSelect = async () => {
  const index = await ActionSheetSelectPromise({
    title: '请选择操作',
    options: ['编辑', '删除', '分享'],
    cancelButtonText: '取消',
  });

  if (index === 0) {
    // 编辑逻辑
  }
};
```

### MobileHeader (移动端标题栏)

`MobileHeaderComponent` 提供了灵活的头部定制功能。你可以随时通过 `MobileHeaderHelper` 或辅助组件更新标题栏的左、中、右区域。

```tsx
// 在页面组件中动态更新 Header
<MobileHeaderCenter>
  <MobileHeaderTitleIcon title='用户设置' left={<BackIcon />} right={<SaveIcon />} />
</MobileHeaderCenter>
```

### SlideTabComponent (滑动标签页)

支持手势左右滑动的 Tab 切换组件，提供接近原生应用的流畅体验。

````tsx
<SlideTabComponent
  pages={[
    { title: '热门', content: <HotList /> },
    { title: '最新', content: <NewList /> },
  ]}
/>

## 4. 移动端发布 (Mobile Deployment)

Lupine.js 推荐使用 **Capacitor** 将 Web 应用打包为原生移动应用。

### 移动端配置

由于移动端应用通常是作为独立文件运行（`file://` 协议），API 请求不能像 Web 那样使用相对路径。你需要配置 `.env.mobile` 来指定绝对 API 地址。

**构建命令**:
```bash
# 使用 .env.mobile 配置进行构建
npm run build-mobile
````

此命令对应 `package.json` 中的脚本：
`node ./dev/dev-watch --env=.env.mobile --dev=0 --mobile=1`

### 条件编译 (Conditional Compilation)

Lupine 提供了 `pluginIfelse` 插件，允许你编写针对特定平台的逻辑代码。这对于处理移动端特有的 API 端点或逻辑非常有用。

**使用示例**:

```javascript
// #if MOBILE
const apiBase = 'https://api.myapp.com';
// #else
const apiBase = '/api';
// #endif

// #if DEV
console.log('Debug mode');
// #endif
```

> 只有满足条件的代码块会被编译到最终产物中，从而减小包体积并避免运行时错误。

### 添加 iOS 和 Android

请参考 Capacitor 官方文档了解详细的添加平台步骤：
[https://capacitorjs.com/docs/getting-started](https://capacitorjs.com/docs/getting-started)

## 5. 桌面端发布 (Desktop Deployment)

Lupine.js 使用 **Electron** 来构建跨平台桌面应用。

### 桌面端结构

当你创建一个新的 Lupine 项目时，它会自动包含一个 `electron` 目录（例如 `apps/your-app/electron`），其中包含了桌面端所需的主进程代码和资源。

- 您的 Web 代码直接作为 Electron 的渲染进程运行。
- `lupine.components` 能够自动检测运行环境，适配桌面端 UI（如隐藏不必要的移动端 Tab）。

### 构建命令

`package.json` 提供了预置的构建脚本，用于编译不同平台的安装包：

```bash
# Windows
npm run app1:build-win

# Linux
npm run app1:build-linux

# macOS
npm run app1:build-mac
```

您可以在 `package.json` 的 `scripts` 区域找到并自定义这些命令。
