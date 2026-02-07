---
title: '零依赖，Lupine.js 如何实现原生 CSS-in-JS？'
description: '深入解析 Lupine.js 内置的高性能样式引擎'
---

# 零依赖，Lupine.js 如何实现原生 CSS-in-JS？

在现代前端开发中，我们常常面临一个两难的选择：是忍受 CSS 文件分离带来的维护痛苦，还是引入庞大的 CSS-in-JS 库（如 Styled-components 或 Emotion）导致包体积剧增？

**Lupine.js 选择了一条不同的路。**

它内置了一个超轻量级的 CSS-in-JS 引擎，**无需任何额外依赖**，即可让你在组件内部舒适地编写样式。它不仅支持嵌套、媒体查询、关键帧动画，还拥有极高的运行效率。

让我们来看看它是如何工作的，以及如何在你的项目中优雅地使用它。

## 1. 告别 className 的烦恼

传统的 CSS 开发往往需要你在 `.css` 文件和 `.tsx` 文件之间反复横跳，还要挖空心思给 class 起名。而在 Lupine.js 中，一切都在组件内部解决。

你只需要定义一个简单的对象，传递给 `css` 属性：

```tsx
const MyButton = () => {
  const btnStyle = {
    backgroundColor: '#0070f3',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',

    // 像 SCSS 一样嵌套！
    '&:hover': {
      backgroundColor: '#0051a2',
    },

    // 轻松搞定伪元素
    '&::before': {
      content: '"🚀 "',
    },
  };

  return <button css={btnStyle}>点击发射</button>;
};
```

Lupine 会自动为你生成一个唯一的 Class ID（类似于 `.L12345`），并将样式注入到页面中，你完全不用担心全局样式冲突。

## 2. 像 SCSS 一样强大的嵌套功能

Lupine 的样式引擎深受 SCSS/Less 的启发，支持强大的 `&` 符号引用父级。

### 嵌套子元素

不要再写又臭又长的 `div > span > a` 了：

```tsx
const cardStyle = {
  padding: '20px',
  boxShadow: '0 4px 14px rgba(0,0,0,0.1)',

  // 只有当 h3 在这个组件内时才生效
  h3: {
    marginTop: 0,
    color: '#333',
  },

  // 选中特定的 class
  '.description': {
    color: '#666',
    fontSize: '14px',
  },
};

<div css={cardStyle}>
  <h3>标题</h3>
  <p class='description'>这是描述内容...</p>
</div>;
```

### 组合选择器

这在处理复杂的组件状态时非常有用：

```tsx
const itemStyle = {
  color: '#888',

  // 当同时拥有 .active 类时
  '&.active': {
    color: '#0070f3',
    fontWeight: 'bold',
  },
};
```

## 3. 响应式设计：媒体查询从未如此简单

在 Lupine 中，媒体查询不再是游离于组件之外的代码块。你可以将它们直接把它们写在需要生效的属性旁边。

```tsx
const responsiveBox = {
  width: '100%',
  padding: '20px',
  backgroundColor: 'lightblue',

  // 针对桌面端的样式
  '@media (min-width: 768px)': {
    width: '50%', // 在大屏上变为一半宽度
    backgroundColor: 'lightgreen',

    // 甚至可以在媒体查询里继续嵌套！
    '&:hover': {
      backgroundColor: 'green',
    },
  },
};
```

这种写法让“组件在不同屏幕下的表现”这一逻辑高度内聚，维护起来非常舒服。

## 4. 动画大师：内置 Keyframes 支持

以前为了写个简单的动画，你可能得去全局 CSS 里定义 `@keyframes`。Lupine 让你直接在组件里定义关键帧：

```tsx
const spinnerStyle = {
  width: '40px',
  height: '40px',
  border: '4px solid #f3f3f3',
  borderTop: '4px solid #3498db',
  borderRadius: '50%',

  // 直接定义 Keyframes
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },

  // 直接引用上面定义的名字
  animation: 'spin 1s linear infinite',
};
```

引擎会自动处理作用域，你的 `spin` 动画绝不会污染其他组件的同名动画。

## 5. 动态样式更新

既然是 CSS-in-JS，不仅要静态编译，还要能动态变化。Lupine 提供了一个底层的 `updateStyles` API，允许你根据逻辑动态修改样式。

> **注意**：对于简单的动态变化（如开关、颜色切换），通常建议切换 `class` 或使用 `style={{ ... }}` 行内样式。但如果你需要动态修改**伪类**（如 hover 颜色）或**媒体查询**，`updateStyles` 就派上用场了。

```tsx
import { updateStyles, RefProps } from 'lupine.web';

const DynamicComponent = () => {
  // 定义初始样式对象
  const css: any = {
    color: 'blue',
    '&:hover': { color: 'darkblue' }, // ！！！动态修改 hover 颜色，行内样式做不到！！！
  };

  const ref: RefProps = {}; // 用来获取组件生成的唯一 ID

  const toggleTheme = () => {
    // 修改样式对象
    css.color = 'red';
    css['&:hover'].color = 'darkred';

    // 应用更新
    // ref.id 会拿到类似 L123 的 ID，updateStyles 会找到对应的 <style> 标签并更新它
    updateStyles(`${ref.id}`, css);
  };

  return (
    <div ref={ref} css={css} onClick={toggleTheme}>
      点我改变主题色（包括 Hover 颜色！）
    </div>
  );
};
```

## 6. 全局样式：bindGlobalStyle

虽然组件化很好，但有时我们确实需要全局样式（比如 Reset CSS、全局字体定义等）。`bindGlobalStyle` 可以确保你的全局样式只被注入一次，哪怕组件被渲染了多次。

```tsx
import { bindGlobalStyle } from 'lupine.web';

// 比如定义一个全局的工具类
const globalUtils = {
  '.text-center': { textAlign: 'center' },
  '.flex-center': { display: 'flex', justifyContent: 'center' },
};

// 注入到 <head> 中，ID 为 'global-utils'
bindGlobalStyle('global-utils', globalUtils);
```

## 7. 传统派：导入 .css 文件

当然，Lupine.js 并没有忘记这一最基础的需求。如果你有一个庞大的旧项目需要迁移，或者就是喜欢写 `.css` 文件，完全没有问题。

你可以在任何 `.tsx` 文件中直接导入 CSS 文件：

```tsx
// 在入口文件 index.tsx 中
import './styles/global.css';
import './styles/app.css';

// 顺序很重要：global.css 的样式会先被加载
```

构建系统会自动将所有导入的 CSS 提取并压缩成一个文件。对于生产环境构建，Lupine 会自动在 `index.html` 中注入类似 `<link rel="stylesheet" href="/index.css?t=..." />` 的标签，确保你的样式被正确加载和缓存。

## 总结

Lupine.js 的 CSS-in-JS 引擎并不是为了取代所有 CSS 写法，而是提供了一种**零负担、高性能且开发体验极佳**的选择。

- **零依赖**：不需要安装任何额外的包。
- **高性能**：样式在 SSR 阶段即可生成，无运行时闪烁。
- **全功能**：嵌套、媒体查询、动画一应俱全。
- **开发爽**：强类型的 TypeScript 支持，写 CSS 也有代码提示。

下次构建 UI 时，不妨试试直接在组件里 `const css = { ... }`，体验一下这种“原生”的流畅感吧！
