---
title: 'Lupine.Press：为极速文档而生'
description: 基于 Lupine.js 的超轻量级文档网站生成器
---

# Lupine.Press：为极速文档而生

写文档不应该是一件痛苦的事。但在现有的生态中，我们往往需要在“复杂的配置”和“丑陋的默认样式”之间做选择。

**Lupine.Press** 的出现，就是为了打破这个僵局。

它是基于 **Lupine.js** 构建的文档框架，继承了后者 **“极致轻量”** 和 **“高性能”** 的基因。它能让你用最简单的 Markdown，构建出专业、响应式且支持多语言的文档网站。

## 为什么选择 Lupine.Press？

### 1. ⚡ 难以置信的快

这就不用多说了。基于 Lupine.js 核心（仅 7kb），你的文档网站加载速度会快得惊人。没有臃肿的 hydration 过程，内容即刻呈现。

### 2. 📝 Markdown 驱动的一切

在 Lupine.Press 中，文件结构即路由。

- 只要在目录下放一个 `guide.md`，它就会自动变成 `/guide` 页面。
- 侧边栏配置？直接写在 `index.md` 的 Frontmatter 里。
- 多语言？只需建立 `en` 和 `zh` 文件夹，框架自动处理切换。

### 3. 🎨 开箱即用的专业设计

你不需要懂 CSS 也能拥有漂亮的文档站。`PressFrame` 组件内置了：

- **响应式侧边栏**：在移动端自动折叠。
- **亮色/暗色模式**：自动跟随系统或手动切换。
- **代码高亮**：内置支持。

### 4. 🛠️ 灵活的扩展性

虽然它很轻，但它不“死板”。因为本质上它就是一个 Lupine.js 应用。你可以随时：

- 在 Markdown 里嵌入 React 风格的组件。
- 使用 `bindGlobalStyle` 自定义全局样式。
- 编写自定义的 Layout。

## 部署黑科技：GitHub Pages 也能跑 SPA？

众所周知，GitHub Pages 等静态托管服务对单页应用（SPA）的支持并不友好。因为它们不知道 `/guide/started` 其实应该指向 `index.html`，往往会直接返回 **404**。

Lupine.Press 提供了一个聪明的解决方案。

### 聪明人都知道的 `404.html`

我们在 `docs/404.html` 中内置了一段神奇的代码：

```html
<script type="text/javascript">
  // Single Page Apps for GitHub Pages
  if (window.location.pathname.includes('/lupine.js/')) {
    // 将当前路径作为参数，重定向回首页
    window.location.href = '/lupine.js/?redirect=' + window.location.pathname;
  }
</script>
```

配合前端路由的自动恢复逻辑，这意味着：

1. 用户访问深层链接 `/guide/started`。
2. GitHub Pages 返回 404 页面。
3. 脚本立刻将页面重定向为 `/?redirect=/guide/started`。
4. Lupine.js 应用启动，读取 `redirect` 参数，无缝恢复到用户想看的页面。

**结果就是：你可以免费使用 GitHub Pages 托管一个体验完美的 SPA 文档站！**

## 快速上手

只需一行命令，立刻拥有你的文档站：

```bash
npx create-lupine@latest my-docs
# 选择 'doc-starter' 模板
```

启动项目：

```bash
cd my-docs
npm install
npm run dev
```

现在，开始专注于写作吧！
