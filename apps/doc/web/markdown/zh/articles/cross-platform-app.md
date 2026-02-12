---
title: '一套代码，多端运行：使用 Lupine.js 构建 Web、移动和桌面应用'
published: true
description: 使用 Lupine.js、Capacitor 和 Electron 构建跨平台应用程序的完整指南。
tags: cross-platform, mobile, desktop, capacitor, electron
series: 实战指南
---

“一次编写，到处运行”的梦想往往伴随着巨大的妥协。沉重的框架、混乱的条件判断代码以及糟糕的性能，通常是跨平台开发的噩梦。

**Lupine.js** 改变了这一切。它从底层设计开始就是一个**通用框架**。通过利用 **Capacitor** (移动端) 和 **Electron** (桌面端)，你可以利用同一套 TypeScript 代码库，将应用发布到 Web、iOS、Android、Windows、macOS 和 Linux。

![Lupine.js 架构](/lupine.js/assets/architecture_cross_platform.png)

在本指南中，我们将以即将真实上线的 **Lupine 示例应用** 应用为例，演示如何将一个标的 Lupine.js Web 应用扩展到移动端和桌面端。

## 1. 核心：响应式 Web 应用

在接触任何原生代码之前，我们需要一个响应式的 Web 应用。Lupine.js 通过内置的响应式工具和 CSS-in-JS 引擎，让这一切变得简单。

### 响应式样式

你不需要为移动端编写单独的 CSS 文件，而是直接在组件样式中使用 `MediaQueryRange`：

```tsx
import { MediaQueryRange, CssProps } from 'lupine.web';

const css: CssProps = {
  // 默认 (桌面) 样式
  padding: '50px',
  fontSize: '18px',

  // 移动端覆盖样式
  [MediaQueryRange.MobileBelow]: {
    padding: '10px',
    fontSize: '14px',
    flexDirection: 'column',
  },
};
```

### 自适应框架 Layout

对于导航，`ResponsiveFrame` 组件会根据设备自动在“桌面顶部菜单”和“移动端底部导航栏”之间切换。

```tsx
<ResponsiveFrame
  desktopHeaderTitle='我的应用'
  // ... 桌面菜单项
  mobileBottomMenu={[
    { title: '首页', icon: <HomeIcon />, link: '/home' },
    { title: '我的', icon: <UserIcon />, link: '/me' },
  ]}
  mainContent={<PageComponent />}
/>
```

## 2. 进军移动端 (iOS & Android)

Lupine.js 使用 **Capacitor** 将你的 Web 应用包装成原生 App。这让你既能访问原生功能（相机、文件系统），又能保持 Web 开发的流畅工作流。

### 步骤 2.1: 安装 Capacitor

在项目根目录，安装必要的依赖：

```bash
# Capacitor 核心库
npm install @capacitor/cli@latest @capacitor/core@latest
npm install @capacitor/android @capacitor/ios

# 常用插件 (相机, 文件系统等)
npm install @capacitor/camera @capacitor/filesystem @capacitor/share
npm install @capacitor-community/keep-awake

# 初始化
npx cap init [MyAppName] [com.example.app]
```

### 步骤 2.2: 添加平台

```bash
# 添加 Android
npx cap add android

# 添加 iOS (需要 Mac 和 Xcode)
npx cap add ios
```

### 步骤 2.3: 配置移动端环境

移动端应用通常通过本地文件系统 (`file://`) 运行，因此无法像 Web 那样使用相对路径请求 API。你需要创建一个 `.env.mobile` 文件：

```ini
# .env.mobile
WEB.API_BASE_URL=https://api.your-production-site.com
```

### 步骤 2.4: 构建与同步

在 `package.json` 中添加构建脚本：

```json
"scripts": {
  "build-mobile": "node ./dev/dev-watch --env=.env.mobile --dev=0 --mobile=1"
}
```

然后执行构建并同步到原生项目：

```bash
npm run build-mobile
npx cap sync
npx cap open android  # 打开 Android Studio
```

### 步骤 2.5: 原生逻辑 (可选)

你可以使用 `#if MOBILE` 编译指令来编写平台特定代码，而且不会导致 Web 包体积膨胀：

```javascript
// #if MOBILE
import { Camera } from '@capacitor/camera';

const takePhoto = async () => {
  const image = await Camera.getPhoto({ ... });
  // 处理图片...
};
// #else
const takePhoto = async () => {
  alert("相机仅在移动端 App 中可用！");
};
// #endif
```

## 3. 进军桌面端 (Windows, Mac, Linux)

对于桌面端，Lupine.js 集成了 **Electron**。

### 结构

每个 Lupine 项目都自带一个 `electron` 目录，包含主进程逻辑：

- `electron/main.js`: Electron 应用的入口点。
- `electron/preload.js`: 渲染进程 (Web) 和 主进程 之间的安全通信桥梁。

### 构建桌面应用

Lupine 允许你使用 `electron-builder` 将应用打包为 `.exe`, `.dmg`, 或 `.snap` 安装包。

运行 `package.json` 中预设的构建命令：

```bash
# 构建 Windows 版
npm run app:build-win

# 构建 Mac 版
npm run app:build-mac
```

构建过程将会：

1.  将 Lupine.js Web 应用编译为静态文件。
2.  将这些文件与 Electron 运行时捆绑。
3.  输出独立的安装程序。

## 总结

使用 **Lupine.js**，你不需要为 Web、移动端和桌面端组建三个独立的团队。你可以维护**一套**代码库，使用**一套**组件，然后发布到所有平台。

无论你是构建 SaaS 平台、消费者 App 还是内部工具，Lupine.js 都能让你同时拥有原生应用的触达率和 Web 开发的高效率。
