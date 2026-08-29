---
name: lupine-framework
description: >-
  Development guide and architectural conventions for the Lupine.js full-stack and frontend framework.
  Use this skill when writing, modifying, or refactoring Lupine.js pages/components, managing state with
  useState or HtmlVar, manipulating DOM via RefProps, using CssProps with the & scoped styling pattern,
  configuring routes (pageRouter/initializePage), integrating mobile layouts (SliderFrame/ResponsiveFrame/ActionSheet),
  or interacting with lupine.web / lupine.api / lupine.cms.
---

# Lupine.js Framework Skill Guide

This project is built on top of the custom TypeScript full-stack framework `Lupine.js`.

---

## 🛑 UI Updates & State Management Hierarchy

1. 🥇 **Most Recommended (Default Choice): Precise DOM Manipulation with `ref.$()` / `ref.$all()`**
   - In event callbacks (e.g. button clicks, data updates), use `ref.$('.&-xxx')` to query a single descendant element or `ref.$all('.&-xxx')` to query a list of descendants, and directly modify DOM properties/content (such as `el.innerHTML`, `el.classList`, `el.value`).
   - 🚨 **Strictly Forbidden: Native `element.querySelector('.&-xxx')`**: The browser's native DOM API cannot recognize the `&` symbol and will fail to locate elements! (`ref.$` automatically resolves `&` to the isolated CSS scoped class name of the current component).
   - **Advantage**: Zero unnecessary full component re-renders, maximum performance, and completely predictable state.
2. 🥈 **Secondary Choice: `HtmlVar` (For dynamic structures, lists, and async large content blocks)**
   - Used to wrap dynamic DOM regions (list rendering, conditional sections).
   - Pattern: `const dom = new HtmlVar(<div>...</div>)` -> embed in JSX via `{dom.node}` -> update content via `dom.value = <div>...</div>`.
   - Replaces only the localized DOM tree without triggering a parent component re-render.
3. 🥉 **Last Resort: `useState` (Only for small, isolated, simple components without scrollbars or cursor focus concerns)**
   - ⚠️ **Notice**: Invoking `setValue()` causes the **entire component to re-render from scratch**, which can cause uncontrolled child component state, scroll position, or cursor focus to be lost.
   - ⚠️ **`useState` must be called before any `await`**: In `async` component functions, all `useState()` calls must be placed before the first `await`, otherwise a runtime crash will occur.
   ⚠️ **Note that both `HtmlVar` (when replacing containers) and `useState` re-render elements which can reset scroll positions or blur inputs, so `ref.$()` is always the preferred default!**

---

## ⚠️ Critical Warnings

- 🚨 **Strictly Prohibit Native querySelector with `&` Selectors**: Any class name with `&` (e.g., `.&-btn`, `.&-card`) **must never** be queried using `document.querySelector` or `element.querySelector`. Always and only query via `ref.$('.&-btn')` / `ref.$all('.&-btn')`.
- **No Automatic Virtual DOM State Tracking**: Directly modifying JS variables does NOT trigger UI updates. You must manipulate the DOM via `ref.$()` or update `HtmlVar.value`.
- **Strictly Prohibit Controlled Input Patterns**: Do NOT write `value={state}`. Instead, read values directly from the DOM upon submission (e.g., `ref.$('input').value`).
- When a component needs to re-render after a state change across lifecycles, use `useState()`. `useState()` preserves state across renders and triggers a full component re-render on `setState()`.
- **🛑 SliderFrame Multi-Level Navigation Rule**: Every child component/page capable of pushing a deeper sub-page **must define its own independent `const sliderFrameHook: SliderFrameHookProps = {};` and mount `<SliderFrame hook={sliderFrameHook} />` in its JSX**. Never use the parent-provided `parentSliderFrameHook.load()` to load level 3+ pages, or the new page will replace the current page container, breaking the back navigation stack!

---

## Modular Reference Guides

When handling specific tasks, consult the corresponding topic guides:

| Topic | Description & Scope | Reference Link |
| :--- | :--- | :--- |
| **State & Reactivity** | `useState` rules, `HtmlVar` localized updates, `RefProps` lifecycle & DOM access | [reactivity-and-state.md](./references/reactivity-and-state.md) |
| **Styling & Themes** | `CssProps` usage, `&` namespace pattern, dark mode color semantics, scoped CSS sharing | [styling-and-themes.md](./references/styling-and-themes.md) |
| **Navigation & Routing** | SPA navigation with `initializePage`, path parameter syntax, environment variables | [navigation-and-routing.md](./references/navigation-and-routing.md) |
| **Mobile Interactions** | `SliderFrame` slide-over navigation, `ActionSheet` dialog promises, hardware back button | [mobile-interactions.md](./references/mobile-interactions.md) |
| **Icon Conventions** | Font icons vs embedded SVG masks, `ifc-icon` markup pattern across `lupine.api` packages & apps | [icon-handling.md](./references/icon-handling.md) |
| **Full Reference Manual** | Complete original `AI_CONTEXT.md` reference manual and detailed architecture | [full-guide.md](./references/full-guide.md) |
