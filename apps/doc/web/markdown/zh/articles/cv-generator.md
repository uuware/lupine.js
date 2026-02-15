---
title: 十分钟！用 Markdown 极速构建高颜值的个人简历网站
description: 基于 Lupine.js 的 CV Starter 模板，让你的简历脱颖而出
---

# 十分钟！用 Markdown 极速构建高颜值的个人简历网站

想找一份好工作，写一份好的工作简历（CV）至关重要。如果能把这份简历做成一个专业的个人网站，那更是锦上添花，能让招聘者眼前一亮。

这篇文章将介绍如何利用 **Lupine.js** 框架提供的 **CV Starter** 模板，只需要写简单的 Markdown 文件，就能生成一个漂亮的、响应式的简历网站。它自带黑白主题切换、多语言支持，并且可以**免费托管在 GitHub Pages 上**。

![Lupine.js CV Starter](/lupine.js/assets/cv-generator-zh.png)

## 为什么选择 Lupine CV Starter？

- **极简 Markdown**: 专注于内容，像写文档一样写简历。
- **高颜值设计**: 默认主题清新专业，支持**浅色主题**和**深色主题**。
- **多语言支持**: 轻松构建中英文双语简历，展现国际化视野。
- **移动端适配**: 完美适配手机桌面，随时随地优雅展示。
- **免费托管**: 纯静态页面，可直接部署到 GitHub Pages，零成本上线。

## 🚀 快速开始

### 1. 创建项目

只需一行命令，即可初始化你的简历项目：

```bash
npx create-lupine@latest my-cv
```

在提示中选择 **`cv-starter`** 模板。

为了让您更直观地了解效果，我们为您准备了一个完整的演示项目。您可以直接访问源码仓库，甚至直接 Fork 它作为您的起点：

- **源码仓库**: [https://github.com/uuware/lupine-template-cv-starter](https://github.com/uuware/lupine-template-cv-starter)

您也可以点击下方链接，在线查看该项目的实际运行效果：

- **在线演示**: [https://uuware.github.io/lupine-template-cv-starter/](https://uuware.github.io/lupine-template-cv-starter/)

### 2. 启动预览

进入项目目录并启动本地开发服务器：

```bash
cd my-cv
npm install
npm run dev
```

现在，打开浏览器，你就能看到一个包含**个人简介、工作经历、项目经验、专业技能、教育背景**等完整板块的简历雏形了！

## 📝 定制你的简历

模板已经为你预设了标准的简历结构，你只需要根据自己的情况进行增删改查。

### 修改内容

所有的内容都位于 `web/markdown` 目录下。

- `zh/`: 中文版简历内容
- `en/`: 英文版简历内容

你可以直接修改 Markdown 文件。更棒的是，你完全可以只精心撰写一个语言版本（比如中文），然后**让 AI 帮你翻译成另一个语言**。现在的 AI 非常擅长处理 Markdown 格式，翻译质量通常很高，这能为你节省大量时间。

### 管理目录与侧边栏

当你添加或删除了某个页面（例如添加了“开源贡献”章节），你需要告诉网站如何显示侧边栏导航。

打开语言根目录下的 `index.md` 文件（例如 `web/markdown/zh/index.md`），找到 `sidebar` 配置项进行修改：

```yaml
sidebar:
  - text: 详细介绍
    items:
      - /zh/01-experience/index
      - /zh/02-projects/index
      - /zh/03-skills/index
      - /zh/04-education/index
      # - /zh/05-open-source/index  <-- 新增的页面
```

保存文件后，浏览器页面会自动更新，所见即所得。

### 配置顶部导航 (可选)

由于简历通常包含的页面不多，模板默认没有开启顶部导航菜单。如果你希望在页面顶部也显示导航，可以在 `index.md` 中添加 `nav` 配置：

```yaml
nav:
  - text: 工作经历
    link: /zh/01-experience/index
  - text: 项目经验
    link: /zh/02-projects/index
```

这样，Header 左侧就会出现你配置的菜单项。

### 个性化设置

在 `index.md` 的 Frontmatter 中，你还可以进行更多个性化设置。

#### GitHub 链接

Header 右侧默认显示 GitHub 项目链接。如果你想修改或隐藏它：

```yaml
# 修改链接
github-title: View on GitHub
github-link: https://github.com/yourusername/my-cv
# 或者直接删除这两行以隐藏
```

#### 自定义样式

想换个主题色？想调整侧边栏宽度？没问题！你可以在 `index.md` 中通过 `styles` 属性直接覆盖 CSS 变量：

```yaml
styles:
  ':root': { '--primary-accent-color': '#0ac92a' } # 修改主色调为绿色
  # body: { font-family: 'Inter', sans-serif; }    # 修改全局字体
```

关于更多样式配置，可以参考 [这篇关于 Lupine.Press 的介绍](https://uuware.github.io/lupine.js/zh/articles/introduce-lupine.press)。

## 结语

使用 Lupine.js 构建简历网站，不仅是展示专业技能的最佳方式，更体现了您对技术的热情与追求。如果您喜欢这个模版，或者它对您有所帮助，欢迎在 GitHub 上为我们点亮一颗星 ⭐️

👉 **[https://github.com/uuware/lupine.js](https://github.com/uuware/lupine.js)**

祝你早日拿到心仪的 Offer！
