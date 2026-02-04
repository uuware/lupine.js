---
title: Press 文档系统概览
---

# lupine.press

`lupine.press` 是一个基于 `lupine.web` 构建的轻量级、高性能的文档网站框架。它提供了一套完整的解决方案，用于渲染基于 Markdown 的文档网站，支持响应式布局、侧边栏导航和主题切换。

它旨在与 `lupine` 生态系统无缝协作，为如 LupineJS 官方文档等站点提供支持。

## 主要特性 (Features)

- **响应式布局 (Responsive Layout)**: 内置的 `PressFrame` 提供了标准的文档布局，包含头部、响应式侧边栏和内容区域。
- **Markdown 渲染 (Markdown Rendering)**: 针对 Markdown 生成的内容进行了优化，支持语法高亮和标准排版。
- **侧边栏导航 (Sidebar Navigation)**: 根据您的配置自动生成多级侧边栏。
- **主题支持 (Theming)**: 通过 `lupine.components` 主题系统内置支持多种主题（如亮色/暗色模式）。
- **路由集成 (Routing)**: 与 `PageRouter` 显式集成，用于处理客户端导航。
- **多语言支持 (Multilingual Support)**: 自动扫描多语言目录的 markdown 文件，多语言显示切换。
- **式样设置支持 (Styles Support)**: 可以在 markdown 文件中设置式样。

## 使用指南 (Usage Guide)

要使用 `lupine.press`，您通常需要设置一个 `lupine.web` 应用程序，并将其配置为使用 `PressPage` 作为主路由处理程序。

### 1. 前提条件 (Prerequisites)

确保您的项目中已安装 `lupine.press`。

### 2. 基本设置 (Basic Setup)

在您的应用程序入口点（例如 `src/index.tsx`）中，您需要绑定必要的配置并设置路由器。

```typescript
import { bindRouter, PageRouter, bindTheme, bindLang, setDefaultPageTitle } from 'lupine.components';
import { bindPressData, PressPage, pressThemes } from 'lupine.press';
import { markdownConfig } from './markdown-config'; // 您生成的 markdown 数据

// 1. 初始化核心设置
bindLang('en', {}); // 设置默认语言
bindTheme('light', pressThemes); // 绑定主题（包含 press 特定的样式）
setDefaultPageTitle('My Documentation');

// 2. 绑定文档数据
// markdownConfig 是一个包含从 markdown 文件生成的 HTML 内容和元数据的对象。
bindPressData(markdownConfig);

// 3. 配置路由器
const pageRouter = new PageRouter();
//将所有请求路由到 PressPage，PressPage 会处理在 markdownConfig 中查找内容
pageRouter.use('*', PressPage);

// 4. 启动应用程序
bindRouter(pageRouter);
```

### 3. 数据结构 (`markdownConfig`)

`bindPressData` 函数期望一个配置对象，其中键是路由路径（例如 `/guide/started`），值包含内容和元数据。

通常，此数据是在构建时从您的 Markdown 文件生成的。

```typescript
export const markdownConfig = {
  '/en/guide/started': {
    html: '<h1>Getting Started</h1><p>...</p>', // 预渲染的 HTML 内容
    data: {
      title: 'Getting Started',
      sidebar: [
        // 当前页面上下文的侧边栏配置
        { type: 'group', text: 'Guide', level: 0 },
        { type: 'link', text: 'Installation', link: '/en/guide/install', level: 1 },
      ],
    },
    headings: [{ level: 2, text: 'Prerequisites', id: 'prerequisites' }],
  },
  // ... 其他页面
};
```

## Markdown 文件结构与关联 (Markdown File Structure & Association)

### 顶层配置 (Top-level Configuration)

在 Markdown 文件的顶层目录（根目录），必须存在一个 `index.md` 文件。该文件使用 `lang` 字段来指定站点支持的所有语言。

```yaml
---
lang:
  - title: English
    id: en
  - title: 简体中文
    id: zh
---
```

### 多语言配置 (Multilingual Configuration)

每个语言 ID（如 `en`, `zh`）对应一个子目录，且该目录下必须有一个 `index.md` 文件。此文件用于配置该语言版本的布局、标题、侧边栏宽度等全局设置。该语言的所有 Markdown 内容文件都应存放于此目录或其子目录中。

`index.md` 支持定义以下内容：

- **Hero & Features**: 首页大图和特性介绍。
- **Nav**: 顶部的导航链接。
- **GitHub**: GitHub 仓库链接。
- **Sidebar**: 侧边栏菜单配置（核心参数）。

### 侧边栏配置 (Sidebar Configuration)

`sidebar` 参数是一个数组，支持三种配置模式：

1.  **子菜单模式 (`submenu`)**:
    指向一个子目录。系统会自动展开该子目录下的 `index.md` 中定义的 `sidebar` 配置，并将其内容合并到当前级别。
2.  **分组模式 (`text` + `items`)**:
    定义一个菜单组。`text` 为组标题，`items` 为该组下的所有链接列表。
3.  **扁平模式 (`items` only)**:
    仅定义 `items` 而不提供 `text`。此时 `items` 中的所有链接将直接显示在当前级别，不进行分组。

## 架构 (Architecture)

- **`PressFrame`**: 主要布局组件。它处理文档站点的特定 CSS 和结构，确保侧边栏和内容区域独立滚动。
- **`PressPage`**: “控制器”组件。它在绑定的 `markdownConfig` 中查找当前 URL，检索相应的 HTML 和元数据，并使用正确的侧边栏和内容渲染 `PressFrame`。
- **`pressLoad`**: 一个导航实用程序，用于处理文档内的链接点击，确保平滑的客户端转换。

## 式样 (Styles)

styles 可以定义一些字体，颜色等式样。这些式样将被应用于所有页面。

```css
styles:
  ':root': { '--primary-accent-color': '#0ac92a' }
  body: { font-family: var(--font-family-base); }
```
