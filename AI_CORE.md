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
export async function evaluateComponentWithStore(store: ComponentStateStore<any>): Promise<any>;
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

---

# Lupine.cms Low-Code Designer Architecture Guide

This section documents the CMS low-code page designer patterns. Future agents must treat these as the canonical workflow when adding designer blocks, properties, property editor types, responsive behavior, grid/flex layout logic, registered code components, undo/redo behavior, and validation.

## Core Designer Model

The designer is a JSON tree of `DesignNode` objects defined in `packages/lupine.api/admin/design/design-store.ts`:

```typescript
export interface DesignNode {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: DesignNode[];
}
```

Important responsibilities:

- `design-store.ts` owns the mutable page tree, selection, history, undo/redo, insert/remove/update operations, layout mode switching, and grid mesh enforcement.
- `component-registry.ts` declares every block type, default props, whether it is a container, and which property editors appear in the property panel.
- `admin-design-control.tsx` renders the left toolbox, saved components, registered components, property panel, media overrides, save/export actions, and control UI state.
- `admin-design.tsx` owns the design iframe/drop canvas and converts drag/drop payloads into `DesignNode` insertions.
- `render-blocks.tsx` maps `node.type` to the real render component.
- Individual `block-*.tsx` files render a node and must apply `data-design-id={node.id}` on the selectable root DOM element when used in the designer.
- `design-utils.tsx` compiles style props and responsive media props into CSS objects. Keep layout constraints centralized there instead of scattering CSS decisions across block renderers.

## 1. How to Add a New Designer Component

When adding a new low-code component, update all layers together. Do not only add a JSX block.

### Step A: Create the block renderer

Create a file such as `packages/lupine.api/admin/design/block-my-widget.tsx`.

Recommended shape:

```tsx
import { DesignNode } from './design-store';
import { DesignUtils } from './design-utils';

export const BlockMyWidget = (props: { node: DesignNode }) => {
  const p = props.node.props || {};
  const css = DesignUtils.compileResponsiveCssForNode(props.node, 'block');

  return (
    <div css={css} data-design-id={props.node.id}>
      {p.text || 'My Widget'}
    </div>
  );
};
```

Rules:

- Always read from `props.node.props || {}`.
- Use `DesignUtils.compileResponsiveCssForNode()` for standard spacing, sizing, display, custom CSS, CSS variables, and media overrides.
- Add `data-design-id={props.node.id}` to the selectable root element.
- If the block renders children, call `RenderBlocks` for child nodes and ensure the parent is marked `isContainer: true` in the registry.
- If the block has async data, async block components are supported, but validate with targeted `esbuild`.

### Step B: Register the renderer in `render-blocks.tsx`

Import the renderer and add it to `ComponentsMap`:

```tsx
import { BlockMyWidget } from './block-my-widget';

export const ComponentsMap: Record<string, any> = {
  'block-my-widget': BlockMyWidget,
};
```

If this mapping is missing, the runtime displays `Unknown component: block-my-widget`.

### Step C: Add a registry entry in `component-registry.ts`

Add a `ComponentRegistry` entry:

```typescript
'block-my-widget': {
  type: 'block-my-widget',
  label: 'My Widget',
  group: ComponentGroupNames.Content,
  isContainer: false,
  defaultProps: {
    text: 'Hello',
  },
  propEditors: [
    { key: 'text', label: 'Text', type: 'text' },
    ...SpatialPropEditors,
    { key: 'customCss', label: 'Custom Inline Styles (CSS)', type: 'css' },
  ],
},
```

Rules:

- `type` must exactly match the key and the `ComponentsMap` key.
- `defaultProps` must be complete enough for a newly dragged node to render without errors.
- `isContainer` controls drag/drop nesting and whether `children` are created by `admin-design.tsx` when dragging from the toolbox.
- Use existing shared prop editor arrays such as `SpatialPropEditors` where possible.
- If a registry entry is internal only, explicitly filter it out of the normal toolbox in `admin-design-control.tsx`.

### Step D: Toolbox drag/drop path

Normal components are shown in `admin-design-control.tsx` by reading `ComponentRegistry` groups. The drag payload action is `add-component`.

`admin-design.tsx` handles `add-component` by creating:

```typescript
{
  id: store.generateId(),
  type: data.type,
  props: { ...data.defaultProps },
  children: data.isContainer ? [] : undefined,
}
```

If the component needs a special drag action, add both:

- a new drag payload in `admin-design-control.tsx`
- matching drop handling in `admin-design.tsx`

### Step E: Validation

Run targeted validation after component changes, for example:

```bash
npx esbuild packages/lupine.api/admin/design/block-my-widget.tsx packages/lupine.api/admin/design/render-blocks.tsx packages/lupine.api/admin/design/component-registry.ts --outdir=dist-test-my-widget --platform=node --bundle --packages=external --format=cjs --jsx=automatic --jsx-import-source=lupine.web
```

## Registered Code Components

The CMS can expose code-defined components to the designer without storing their implementation in page JSON.

Use `packages/lupine.api/admin/design/register-page.ts`:

```tsx
cmsRegisterComponent('contentx', SampleContent, 'Sample Content');
```

Design behavior:

- `cmsRegisterComponent()` stores the real function in a process-local registry map.
- `admin-design-control.tsx` displays the `Registered Components` sidebar group from `cmsGetRegisteredComponents()`.
- Dragging one inserts a `block-registered-component` node with `props.componentKey` and `props.label`.
- `render-blocks.tsx` resolves the real component with `cmsGetRegisteredComponent(componentKey)` at render time.
- The saved page JSON stores only the key/label, not the component code.

Important constraints:

- Registered component keys are runtime contracts. Renaming a key breaks existing saved page JSON unless migration is provided.
- `block-registered-component` is an internal bridge block. It should not appear as a generic Content toolbox item; it should appear only through the registered component list.
- Registered components receive `PageProps` via `getRenderPageProps()` in the renderer. Keep this consistent with registered page rendering.

## 2. How to Add a Property

Adding a property normally requires four decisions:

1. Where is it declared in `component-registry.ts`?
2. What editor type will `admin-design-control.tsx` use?
3. How does the renderer or `DesignUtils` consume it?
4. Should it be responsive / media-query aware?

### Step A: Add default value

Add the property to `defaultProps` for every block type that supports it:

```typescript
defaultProps: {
  titleColor: '#333333',
}
```

### Step B: Add a prop editor

Add a `PropEditorDef` item:

```typescript
{ key: 'titleColor', label: 'Title Color', type: 'color', responsive: true }
```

Rules:

- `key` is the base prop name.
- `label` is shown in the property panel.
- `type` must be supported by the editor switch in `admin-design-control.tsx`.
- `responsive: true` means the property can have media-specific values using the property suffix strategy, such as `titleColor_sm` or another active media suffix.
- If `showIf` is used, ensure both base and responsive modes evaluate correctly.

### Step C: Consume the property

Renderer consumption example:

```tsx
const css = {
  color: p.titleColor,
};
```

Centralized style consumption example in `DesignUtils.getStandardCss()`:

```typescript
if (p.titleColor) {
  css.color = p.titleColor;
}
```

Prefer centralizing generic layout/style props in `DesignUtils` so media overrides work consistently.

### Step D: Decide whether the property is responsive

Make a property responsive when users may reasonably need different values by breakpoint/device, for example:

- `display`
- `width`, `height`, `minWidth`, `maxWidth`
- spacing
- grid/flex layout controls
- CSS variables
- colors when visual design can differ by media

Do not make it responsive if it is content identity or data binding, for example:

- database IDs
- page IDs
- component keys
- menu IDs unless the user explicitly needs per-device menus
- internal markers such as `_componentRef`

### Media override storage convention

Responsive editors use media suffix props. If a base prop is `gap`, a media value may be stored as `gap_md` depending on the active media suffix. `DesignUtils.compileResponsiveCssForNode()` reads these suffixes and emits media-scoped CSS.

When adding a new responsive property:

- Add `responsive: true` to the editor definition.
- Ensure `admin-design-control.tsx` can render it inside `Add Media Override`.
- Ensure `DesignUtils` or the block renderer reads the suffixed media value.
- Test base value, media value, and inherited/fallback behavior.

## Adding a New Property Editor Type: Pickup Color Example

`PropEditorDef.type` is interpreted in `admin-design-control.tsx` inside the property panel renderer. To add a new type, update the editor switch and then use it from `component-registry.ts`.

Example target editor:

```typescript
{ key: 'accentColor', label: 'Accent Color', type: 'pickup-color', responsive: true }
```

Implementation checklist:

1. Extend the TypeScript union/type documentation for `PropEditorDef.type` in `component-registry.ts` if present.
2. Add an editor branch in `admin-design-control.tsx` where existing types such as `text`, `textarea`, `select`, `css`, `color`, `theme`, `menu-select`, `asset-select`, and `css-vars` are rendered.
3. Use the existing `handlePropChange(key, value, requiresRender)` helper to update values. This keeps history, iframe refresh, selection overlay, and property panel state consistent.
4. If the new editor opens a picker/popup, use the existing FloatWindow/ActionSheet/Menu patterns used by other editor types.
5. If the value changes visible rendering, call `handlePropChange(..., true)` when necessary.
6. If the editor should work in media overrides, honor the `mediaValue` key passed by the editor rendering loop, not only the base key.

Pseudo-pattern:

```tsx
if (editor.type === 'pickup-color') {
  const commitColor = (value: string) => {
    handlePropChange(mediaValue, value, true);
  };

  inputEl = (
    <button class='prop-input' onClick={() => openPickupColor(commitColor)}>
      {currentVal || 'Pick color'}
    </button>
  );
}
```

Important property editor rules:

- Never mutate `selectedNode.props` directly from an input event. Use `handlePropChange()` or a `DesignStore` method.
- Use blur/debounce behavior for noisy text inputs when appropriate so history is not polluted on every keystroke.
- Use `requiresRender = true` for changes that need the iframe render tree to refresh.
- If the editor updates nested array/object values, clone first, then commit the complete new value.
- If a property has custom semantics when changed, prefer a dedicated `DesignStore` method over ad-hoc UI mutation.

## 3. Overflow X/Y and Grid Row/Column Template Handling

The page/grid/flex layout system has to support conflicting user intentions:

- Some columns should share available viewport/container width proportionally, usually via `1fr`.
- Some rows should naturally expand based on their content height.
- Some containers should clip or scroll content via `overflow-x` / `overflow-y`.
- Some designer placeholder children need `minmax(0, 1fr)` to prevent overflow and allow flex/grid areas to shrink.

Do not blindly convert every `1fr` track to `minmax(0, 1fr)`. The axis matters.

### Current rule

In `design-utils.tsx`, `compileResponsiveCssForNode()` calculates whether rows/columns should be constrained:

```typescript
const shouldConstrainRows = !isScrollableY(sysCss.overflowY || p.overflowY) && hasScrollablePlaceholderChildY();
const shouldConstrainColumns = !isScrollableX(sysCss.overflowX || p.overflowX) && hasScrollablePlaceholderChildX();

sysCss.gridTemplateRows = normalizeGridTemplate(isVertical ? (p.gridTemplate || defaultLayout) : '1fr', shouldConstrainRows);
sysCss.gridTemplateColumns = normalizeGridTemplate(!isVertical ? (p.gridTemplate || defaultLayout) : '1fr', shouldConstrainColumns);
```

Meaning:

- When `overflowY` is `auto` or `scroll`, rows must be allowed to grow naturally by content. Do not rewrite row `1fr` to `minmax(0, 1fr)` on the Y axis.
- When `overflowX` is `auto` or `scroll`, columns must be allowed to size/scroll horizontally according to content. Do not rewrite column `1fr` to `minmax(0, 1fr)` on the X axis.
- Only constrain an axis when it is not scrollable and placeholder/grid children require shrink-safe behavior.

### Agent rules for future layout changes

- Always reason per axis. `overflowY` affects row behavior. `overflowX` affects column behavior.
- Do not use one global `shouldConstrain` flag for both rows and columns.
- Preserve author intent. If a user set a scrollable axis, avoid forcing tracks to shrink in that axis.
- Preserve viewport-sharing behavior for non-scrollable `fr` layouts.
- Test both `Layout Direction = Vertical` and `Layout Direction = Horizontal`.
- Test both base props and media override props, because responsive overrides can change overflow and grid template behavior independently.
- Check placeholder children because their scroll direction can trigger track normalization.
- Avoid CSS fixes inside individual block renderers if the logic belongs in `DesignUtils.compileResponsiveCssForNode()`.

### Media-query layout rules

Responsive grid/flex behavior must cascade from base props correctly:

- Base `overflowX` / `overflowY` can be overridden by media-specific values.
- Base `gridTemplate` can be overridden by media-specific values.
- Base layout direction can be overridden by media-specific values.
- Constraint decisions must use the effective value for that media range, such as media value falling back to cascade/base value.

When adding a new layout property, update both the base CSS path and the media CSS path in `DesignUtils`.

## 4. Undo/Redo Handling Notes

Undo/redo is not just tree mutation. It must refresh all UI surfaces that depend on the selected node and current tree.

Core rules:

- Use `DesignStore.commitHistory()` for meaningful state boundaries.
- Use `store.updateNodeProps()` or dedicated store methods so history and events are consistent.
- Undo and redo should emit the same kind of change events that normal mutations emit.
- After undo/redo, refresh the property panel because the selected node object and its props may have been replaced by a historical clone.
- Also refresh the render iframe/selection overlay when tree changes affect visual output.
- If a selected node no longer exists after undo/redo, clear selection or select a valid fallback.
- Avoid direct mutation from UI components because direct mutation bypasses history and event emission.

Important implementation pattern:

- `admin-design-control.tsx` should listen to `DesignStore` events and re-render sidebar/property state after `tree-change`, `selection-change`, and history navigation.
- If adding a new store method, ensure it commits history at the correct time and emits enough events for both iframe rendering and property panel refresh.
- For noisy input fields, avoid creating history entries per keystroke. Use silent/intermediate updates and commit on blur, or debounce.

## Component Mode: Grid, Flex, and HTML

`block-page`, `block-grid`, and `block-flex` support `componentMode`:

- `grid`: render and behave as a grid container.
- `flex`: render and behave as a flex container.
- `html`: render raw/content HTML and stop behaving as a container.

Important rules:

- Switching to `html` mode must clear children because HTML mode is no longer a low-code container.
- HTML mode should show a `Content` editor that opens the existing HTML editor dialog.
- HTML mode should render only the HTML content and not child blocks.
- Switching from generated grid children back to flex should remove empty generated flex cells to avoid unnecessary nested flex containers.
- If generated grid/flex child cells contain user content, do not delete them automatically.

## Saved Components and Component References

Saved components are different from registered code components.

Saved components:

- Stored in CMS data.
- Shown under `My Components`.
- Drag payload action is `add-saved-component`.
- Backend can expand component references before render.

Registered code components:

- Stored in runtime memory via `cmsRegisterComponent()`.
- Shown under `Registered Components`.
- Drag payload action is `add-registered-component`.
- Saved JSON stores only `componentKey`/`label`.
- Render path resolves the real function from the registry map.

Do not merge these concepts unless there is an explicit migration plan.

## Icon Handling in Lupine.api and Target Apps

`lupine.api` UI code commonly uses icon classes such as:

```tsx
<i class='ifc-icon ma-pencil-outline mr-m' onClick={onEditLocal} title='Edit'></i>
```

The package expects the final app to provide the actual icon implementation. There are two supported patterns.

### Pattern A: Generated icon font

The demo app uses `apps/demo.app/web/icons-font.config.js` to generate a font icon bundle. This config defines icon names and source SVG files, then the generated CSS/font makes classes such as `ifc-icon ma-pencil-outline` render correctly.

When using this pattern:

- Prefer existing icon names already provided by the target app.
- If a new icon is required, add it to the app-level icon font config, not to `lupine.api` package code.
- Keep using the existing markup contract: `<i class='ifc-icon icon-name'></i>`.
- Remember that `lupine.api` is a package; it should not assume a specific app's generated font file exists unless the target app includes it.

### Pattern B: Embedded SVG mask icons

Some target apps do not generate an icon font. For convenience, they can provide CSS mask-based embedded SVG icons instead. The CMS app uses `apps/cms/web/src/styles/app-icons.ts` for this.

The pattern is:

```typescript
export const appIconsCss: CssProps = {
  '.ifc-icon': {
    display: 'inline-block',
    width: '24px',
    height: '24px',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    maskSize: 'contain',
    '-webkit-mask-repeat': 'no-repeat',
    '-webkit-mask-position': 'center',
    '-webkit-mask-size': 'contain',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    WebkitMaskSize: 'contain',
    backgroundColor: 'currentColor',
  },
  ...Object.entries(appIcons).reduce((acc: any, [key, svg]) => {
    acc['.ifc-icon.' + key] = {
      '-webkit-mask-image': 'url("' + svg + '")',
      maskImage: 'url("' + svg + '")',
    };
    return acc;
  }, {} as any),
};
```

With this approach, the same `ifc-icon` markup works even without a font file because each icon class points to an embedded SVG data URL.

### Agent rules for adding icons

- First try to reuse an existing icon class. Search app icon config files before inventing a new name.
- If adding package UI in `lupine.api`, keep the markup generic: `<i class='ifc-icon existing-icon-name'></i>`.
- If the target app uses generated fonts, add the source SVG to its `icons-font.config.js` and regenerate icons according to that app's process.
- If the target app uses embedded SVG masks, find its `app-icons.ts` file and add the new SVG entry to the `appIcons` map.
- Do not hardcode raw inline SVG in every package component unless there is a strong reason. Prefer the app-level icon provider so theming via `currentColor`, sizing, and consistency keep working.
- Do not assume all apps use the same icon backend. The contract is the CSS class interface (`ifc-icon` plus icon name), while the app decides whether that class is backed by a font or SVG masks.
- When reviewing missing icons, check whether the icon CSS was loaded by the target app before changing package code.

## Validation Checklist for Designer Changes

After modifying the designer, run targeted bundling for affected files. Examples:

```bash
npx esbuild packages/lupine.api/admin/design/admin-design-control.tsx packages/lupine.api/admin/design/admin-design.tsx packages/lupine.api/admin/design/render-blocks.tsx packages/lupine.api/admin/design/component-registry.ts --outdir=dist-test-designer --platform=node --bundle --packages=external --format=cjs --jsx=automatic --jsx-import-source=lupine.web
```

Manual checks to perform when possible:

- Drag a normal component from the toolbox.
- Drag a saved component from `My Components`.
- Drag a registered component from `Registered Components`.
- Select a node and edit base props.
- Add media overrides and verify responsive CSS changes.
- Use undo/redo and confirm the property panel refreshes.
- Switch `block-page`, `block-grid`, and `block-flex` between grid/flex/html modes.
- Test `overflowY=auto` for row sizing and `overflowX=auto` for column sizing.
- Save and reload page JSON to ensure no runtime-only function objects were serialized.

## High-Risk Pitfalls

- Missing `ComponentsMap` entry: component appears in toolbox but renders as unknown.
- Missing registry entry: component can render but cannot be added/edited from the designer.
- Missing `data-design-id`: selection overlay cannot target the rendered block reliably.
- Direct prop mutation: undo/redo and property panel refresh become inconsistent.
- Over-eager `minmax(0, 1fr)`: scrollable content can overflow and overlap later content.
- Forgetting media path: base styling works but media overrides silently fail.
- Registering runtime component functions inside page JSON: functions are not serializable and should be stored in runtime maps only.
- Treating internal bridge blocks as toolbox components: users may add incomplete nodes without required keys.
