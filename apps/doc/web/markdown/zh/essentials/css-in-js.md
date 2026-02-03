---
title: CSS-in-JS
---

# CSS-in-JS

Lupine.js 内置或者说自带了一个轻量级的 **CSS-in-JS** 引擎。它支持嵌套、伪选择器、媒体查询和作用域动画等强大功能，且无需依赖 styled-components 或 emotion 等外部库。

## 1. 🐣 基本用法

你可以将 CSS 对象直接传给任何元素的 `css` 属性。Lupine 会自动生成一个唯一的 Class ID，防止样式冲突。

```tsx
const MyComponent = () => {
  const css: CssProps = {
    // 基本属性使用驼峰命名
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '8px',

    // 嵌套选择器
    h1: {
      color: 'blue',
    },

    // 伪类
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
  };

  return (
    <div css={css}>
      <h1>Hello</h1>
    </div>
  );
};
```

## 2. 🚀 高级特性

### 2.1 🎎 嵌套与父选择器 (`&`)

类似于 SCSS/Less，使用 `&` 来引用父选择器。

```tsx
const css: CssProps = {
  color: 'black',

  // 目标子元素
  '.child': { fontWeight: 'bold' },

  // 自身状态
  '&:hover': { color: 'red' },

  // 多个选择器
  '&:hover, &.active': {
    border: '1px solid blue',
  },
};
```

### 2.2 🛡️ 使用 `&` 进行作用域管理 (动态组件 ID)

Lupine 使用一种巧妙的替换系统来处理 `&` (或 `$`)。

1.  **前缀化**：如果选择器以 `&` 开头（例如 `&-item`），它会将组件的唯一 ID 视为前缀。

    - `&-item` -> `.LUPINE_ID-item`
    - 这对于编写类似 BEM 命名规范的样式非常有用，而无需手动编写长名称。

2.  **替换**：如果 `&` 在其他地方使用（例如 `.parent &`），它会在该位置插入唯一 ID。

```tsx
// 使用 "$-item" 或 "&-item" 模式定义作用域 Class
const css = {
  // 定义一个作用域 Class，如 .L123-item
  '&-item': {
    color: 'gray',
  },

  // 你也可以引用为 .&-item，意味着 .L123 .L123-item (嵌套)
  '.&-item': {
    color: 'black', // 如果需要更强的特异性
  },
};

return (
  <div css={css}>
    {/* 应用作用域 Class */}
    <a class='&-item'>Link</a>
  </div>
);
```

### 2.3 ⚡ 单行多定义

你可以在一行中定义多个属性（逗号分隔的选择器），以简化语法。

```tsx
const css = {
  // 多个选择器共享样式
  '.header, .footer': {
    background: '#333',
    color: 'white',
  },
};
```

### 2.4 📱 媒体查询 (`@media`)

媒体查询可以嵌套在选择器 _内部_ 或在顶层使用。

```tsx
const css = {
  fontSize: '16px',

  // 嵌套在组件逻辑内部
  '@media (max-width: 600px)': {
    fontSize: '14px',
    padding: '10px',
  },
};
// 或者使用辅助常量，如 [MediaQueryRange.DesktopAbove]
```

### 2.5 🎬 关键帧动画 (`@keyframes`)

在组件内局部定义动画。

```tsx
const css = {
  '@keyframes slide-in': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(0)' },
  },
  animation: 'slide-in 0.5s ease-out',
};
```

## 3. 🌏 全局样式 (`bindGlobalStyle`)

有时你需要一些 **可重用** 或 **全局** 的样式，但你仍然希望在 TypeScript/JS 中定义它们。`bindGlobalStyle` 确保样式只生成一次并注入到 `<head>` 中，即使该组件被使用了多次。

> **适用场景：** 动画定义、工具类、CSS 重置。

```tsx
import { bindGlobalStyle } from 'lupine.web';

const TextWave = () => {
  // 1. 定义样式
  const css = {
    '@keyframes wave': {
      /* ... */
    },
    '.wave-text': { animation: 'wave 1s infinite' },
  };

  // 2. 将其全局绑定，使用唯一键 'text-wave-style'
  // 这确保了它在页面中只被注入一次
  bindGlobalStyle('text-wave-style', css);

  return (
    // 3. 使用上面定义的 Class
    <div class='text-wave-style'>
      <span class='wave-text'>Hello</span>
    </div>
  );
};
```
