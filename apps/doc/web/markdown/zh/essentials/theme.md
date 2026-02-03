---
title: Theme (主题)
---

# 🌗 Theme (主题)

Lupine.js 内置了对多主题（如亮色/暗色模式）的支持，并完美集成了 SSR。

## 1. 🏁 设置 (Setup)

你需要在应用程序入口点（通常是 `index.tsx`）绑定你的主题。

### `bindTheme`

将你的主题定义连接到 Lupine 运行时。

```tsx
// src/index.tsx
import { bindTheme } from 'lupine.web';
import { lightThemes, darkThemes } from './themes';

// 绑定默认主题和可用主题
bindTheme('light', {
  light: lightThemes,
  dark: darkThemes,
});
```

- **目的**: 让系统知道有哪些可用主题以及默认主题是什么。
- **位置**: 在渲染应用之前调用。

## 2. 🎮 用法 (Usage)

### 访问与更新

你可以使用提供的辅助函数获取当前主题或切换主题。

```tsx
import { getCurrentTheme, updateTheme } from 'lupine.web';

// 获取当前主题信息
const { themeName, themes } = getCurrentTheme();

// 切换到暗色模式
const onSwitch = () => {
  updateTheme('dark');
};
```

### `ThemeSelector` 组件

Lupine 提供了一个内置的 `ThemeSelector` 组件，用于方便地切换主题。

```tsx
import { ThemeSelector } from 'lupine.components';

const Header = () => (
  <header>
    <h1>我的应用</h1>
    <ThemeSelector />
  </header>
);
```

## 3. ⚡ 服务端渲染 (SSR)

Lupine 最强大的功能之一是在 SSR 期间支持 **无闪烁 (FOUC-free)** 主题。

- **Cookie 注入**: 当前主题存储在 Cookie 中。
- **服务端处理**: 在 SSR 期间，服务端读取此 Cookie。
- **样式注入**: 服务端生成当前活动主题的 CSS 变量，并将其直接注入到 HTML 的 `<style>` 标签中。

这确保了当用户加载页面时，在客户端运行任何 JavaScript 之前，页面就已经具有正确的样式（例如暗色背景）。

## 4. 🛠️ 管理工具 (Admin Tools)

为了可视化你的主题和调试颜色，你可以使用后台管理辅助组件。

```tsx
// 用于列出所有主题颜色以进行对比的辅助工具
import { TestThemes } from 'lupine.api/admin';
```

此组件渲染一个网格，显示你定义的颜色在不同主题下的外观，帮助你找到正确的键值和对比度。
