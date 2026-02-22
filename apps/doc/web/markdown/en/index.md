---
layout: home
title: Lupine.js Doc
sidemenu-width: 260px
github-title: View on GitHub
github-link: https://github.com/uuware/lupine.js

lang:
  title: English
  id: en

hero:
  name: Lupine.js
  text: Approachable, Fast, Full-stack
  tagline: A full-featured web application framework includes both Front-End and Back-End services.
  actions:
    - theme: brand
      text: Get Started
      link: /en/guide/started
    - theme: alt
      text: View on GitHub
      link: https://github.com/uuware/lupine.js

nav:
  - text: Guide
    link: /en/guide/started
  - text: Demo
    link: /demo
    target: _blank

sidebar:
  - text: Guide
    items:
      - /en/guide/started
      - /en/guide/install
  - text: Articles
    items:
      - /en/articles/introduce-lupine.js
      - /en/articles/css-in-js-lupine.js
      - /en/articles/introduce-lupine.press
      - /en/articles/ssr-comparison
      - /en/articles/how-to-build-fast-ssr-app
      - /en/articles/cross-platform-app
      - /en/articles/cv-generator
  - submenu: /en/essentials
  - submenu: /en/lupine.web
  - submenu: /en/lupine.components
  - submenu: /en/lupine.components-libs
  - submenu: /en/lupine.api
  - submenu: /en/lupine.press

styles:
  ':root': { '--primary-accent-color': '#0ac92a' }
  # body: { font-family: var(--font-family-base); }

features:
  - title: Front-End (lupine.web)
    details: Extremely lightweight framework (7kb gzipped for a hello-world project with all core features) using React TSX syntax. No heavy runtime.
  - title: Back-End (lupine.api)
    details: Efficient and simplified framework similar to Express. Optimized for SSR.
  - title: Zero-dependency
    details: Minimal dependency tree ensuring fast build times and reliable deployments.
---
