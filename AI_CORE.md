# Lupine.js Core Routing & Rendering Flow Architecture Guide

This document captures the rationale behind architectural refactors and design patterns for the Lupine.js Router and Component State Engine. Use it as a guide to avoid pitfalls when modifying Core systems.

## The Problem: Why Hooks Failed in Router Handlers

Historically, executing `useState` inside a top-level Router component function threw an error. This happened because `renderComponentAsync` was the only place where the `ComponentStateStore` (the engine driving Reactivity/Hooks) was injected. 
If the router evaluated `await MusicHomePage(props)` directly during the routing phase, it bypassed the VDOM lifecycle hook injection phase entirely.

### The Old Approach vs The Unified Approach
Previously, we tried to fix this by using "Strategy B": blocking the execution of the very last handler in a route array and wrapping it into a `VNode` manually (`{ type: handler, props }`). This treated the execution of the Final Page differently from Middlewares/Filters.

We have now refactored to **Strategy A (The Unified "Controller" Approach)**.
We removed the "last-item black-box" logic. **All** middleware and route handlers are executed identically and uniformly during the routing pathfinding phase!

## State Engine Abstraction: `evaluateComponentWithStore`
Because developers might still want to use `useState` directly inside top-level routing components (e.g., `<RouterRoute />`), we abstracted the VDOM lifecycle wrapper into a standalone, universal functional engine:

```typescript
export async function evaluateComponentWithStore(store: ComponentStateStore<any>): Promise<any>
```

**Where is this used?**
Instead of having duplicate structure and promise resolution logic scattered across the framework, this centralized engine executes safely in three critical locations:
1. `page-router.ts`: When evaluating any `router(props)` handlers or `pageRouter.filter`.
2. `render-component.ts`: During VDOM DFS parsing in `renderComponentAsync` traversal.
3. `use-state.ts`: When a localized `setState` triggers an isolated async `rerender()`.

### How it Works:
1. It initializes the `hookIndex = 0`.
2. It pushes the strongly typed `ComponentStateStore<P>` onto the runtime environment via `setCurrentStore(store)`.
3. It calls the synchronous `componentFn(props)` natively, seamlessly latching onto standard hooks.
4. It safely catches any returned object, handles generic `Promise` resolution iteratively using native Type Guards (`'then' in result`), natively supporting Async Components out-of-the-box.
5. If the component returned a physical VDOM element (like `<div>`), it establishes the reactive closure by injecting `buildStateRef(store)` directly into that component's root props.

## TypeScript Precision & Async Components

During the refactor, we elevated the static type checks extensively:
1. **Generic StateStore**: `ComponentStateStore<P = any>` strictly binds the generic `<P>` to whatever props (`PageProps` or `VNodeProps`) are fed into it. This guarantees that `componentFn: (props: P) => any` remains mathematically proven and statically verified on ingestion, natively adapting to Context parameters without requiring cyclic dependency includes.
2. **First-class Async Components**: Previously, `jsx.ts` typed `FunctionComponent` as strictly returning `VNode | null`. We extended it to natively permit `Promise<VNode | null>`. This explicitly authenticates `async const MyPage = () => { ... }` as an official JSX standard mechanism of the framework.
3. **Type Guards over Casting**: We discarded `as any` casting during promise evaluation. Strictly using `typeof result === 'object' && !Array.isArray(result) && 'then' in result` ensures execution safety (protecting against components deliberately returning functional primitives like `false`, arrays, or `0`).

## Rules for Future Maintenance
1. **Function Component Ref Forwarding**: Remember the React-compatible caveat: if `Router/executeStore` attaches the State lifecycle `ref` to a returned root tree, and that tree begins with another Functional Component wrapper (e.g. `<CustomSubPage/>`) rather than a DOM tag (`<div>`), the `ref` is discarded implicitly by standard JSX behavior. To persist hooks, the developer must actively map and forward the parent's `props.ref` to an underlying native DOM element.
2. **Fail-Closed Security**: Any `Filter` exceptions safely bubble off into a `null` cascade or trapped fallback routing, preventing authentication fail-opens.
