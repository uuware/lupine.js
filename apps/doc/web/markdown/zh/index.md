---
layout: home
title: Lupine.js 文档
sidemenu-width: 260px
github-title: GitHub 仓库
github-link: https://github.com/uuware/lupine.js

lang:
  title: 简体中文
  id: zh

hero:
  name: Lupine.js
  text: 易用、快速、全栈
  tagline: 包含前后端服务的全功能 Web 应用程序框架。
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/started
    - theme: alt
      text: GitHub 仓库
      link: https://github.com/uuware/lupine.js

nav:
  - text: 指南
    link: /zh/guide/started
  - text: API
    link: /zh/essentials/api

sidebar:
  - text: 指南
    items:
      - /zh/guide/started
      - /zh/guide/install
  - text: 文章汇集
    items:
      - /zh/articles/introduce-lupine.js
      - /zh/articles/css-in-js-lupine.js
      - /zh/articles/introduce-lupine.press
  - submenu: /zh/essentials
  - submenu: /zh/lupine.web
  - submenu: /zh/lupine.components
  - submenu: /zh/lupine.components-libs
  - submenu: /zh/lupine.api
  - submenu: /zh/lupine.press

styles:
  ':root': { '--primary-accent-color': '#0ac92a' }
  # body: { font-family: var(--font-family-base); }

features:
  - title: 前端 (lupine.web)
    details: 极其轻量级（包含所有核心功能的 hello-world 项目 gzip 后仅 7kb）的框架，使用 React TSX 语法。无臃肿运行时。
  - title: 后端 (lupine.api)
    details: 高效且简化的框架，类似于 Express。为服务端渲染进行了优化。
  - title: 零依赖
    details: 极少的依赖树，确保快速构建和可靠部署。
---
