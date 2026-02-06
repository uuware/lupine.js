---
title: Getting Started
---

# Introduction to Lupine.js

Lupine.js is a full-featured web application framework that includes both Front-End and Back-End services.

- **Front-End**: `lupine.web` is an extremely lightweight framework using React TSX syntax, allowing React developers to get started with zero learning curve.
- **Back-End**: `lupine.api` is a highly efficient and simplified framework (similar to Express) that supports Server-Side Rendering (SSR) natively from scratch.
- **Cross-Platform**: With Capacitor and Electron, you can maintain a single codebase to deploy Web, iOS, Android, and Desktop applications simultaneously.

## Core Essentials

Lupine.js is designed for **Simplicity** and **High Performance**. Here are our core features:

### [⚡ Server-Side Rendering (SSR) First](../essentials/ssr)

Lupine is built for SSR from day one. It automatically handles style injection, SEO metadata, and state hydration, ensuring your app has blazing fast initial load times and is search engine friendly.

### [🎨 Built-in CSS-in-JS](../essentials/css-in-js)

Say goodbye to complex CSS configurations. Lupine comes with a powerful built-in styling system supporting scoped styles, nested selectors, media queries, and dynamic styling—all with zero runtime overhead.

### [🛣️ Powerful Page Router](../essentials/page-route)

A flexible functional routing system supporting nested routes, route guards, parameter parsing, and middleware, providing a solid foundation for complex Single Page Applications (SPA).

### [🌗 Theme System](../essentials/theme)

Out-of-the-box theme support (Light/Dark modes). Lupine ensures correct theme variables are injected during SSR, completely eliminating the "Flash of Unstyled Content" (FOUC) issue.

### [📝 High-Performance List Rendering](../essentials/list)

Our unique Spot-Update technology allows direct DOM updates when rendering and editing large lists, bypassing expensive React Virtual DOM re-calculations.

### [📡 Full-Stack Development](../essentials/api)

Integrated front-end and back-end design. `lupine.api` offers a minimalist way to define APIs that work seamlessly with the front-end, making full-stack development easier than ever.

### 🤖 AI Assisted Development

We provide a dedicated `AI_CONTEXT.md` file in the project root. When asking AI to write code for this project, please provide this file to the AI first. It contains critical rules (e.g., "No React Hooks") and design patterns unique to Lupine.js.

#### Example Prompt

> "Read `AI_CONTEXT.md` first. Create a 'User Profile' component that includes a standard settings list (Avatar, Name, Email) and a save button."
