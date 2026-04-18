# Lupine.js Low-Code Visual Builder Architecture (AI Context)
*This file acts as the primary architectural memory for the Lupine.js AST-based Low-Code design builder. When modifying the visual builder, ALWAYS abide by these conventions to preserve system integrity.*

## 1. Core Architecture (The AST Engine)
The visual builder strictly relies on a unidirectional Data Flow driven by a single Source of Truth: the AST (Abstract Syntax Tree), managed by `DesignStore` (`design-store.ts`).
- **AST Node Structure (`DesignNode`)**: `{ id, type, props, children? }`.
- **Render Engine (`design-renderer.tsx`)**: Recursively paints the UI by mapping AST `type` to Component Functions (e.g. `block-grid.tsx`).
- **Property Panel (`admin-design-control.tsx`)**: Edits `node.props` via AST mutations and requests Canvas redraws. Reads fallback values directly from `ComponentRegistry[type].defaultProps` when `node.props` lacks specific keys.

## 2. The "Grid Mesh" Auto-Scaffolding Protocol
To mimic professional tools like Elementor/Webflow, Grids do not accept content directly; instead, they automatically spawn structural layout **Cells** (`block-flex`) based on their `gridTemplate` constraints.
- **The Engine (`enforceGridMesh`)**: Whenever a `block-grid` or `block-page` initializes, or its `gridTemplate` changes, the `parseGridCount` resolves the number of tracks (e.g., `1fr 1fr` = 2 cells).
- **Auto-Spawning**: It dynamically pushes `block-flex` dummy nodes into the `children` array to fulfill the track count.
- **Content Wrapping Safety**: If generic elements (Images, Text) are detected directly inside the Grid, the engine safely wraps them all inside the first generated `block-flex` cell rather than letting them function as raw tracks.
- **Breakage / Shrinking Safety**: If a grid downgrades from 3 cells to 1, the `salvage architecture` traps all nested child components residing in the discarded cells and pushes them into the remaining surviving cell. *NEVER DELETE ORPHANED CONTENT ON GRID SHRINKAGE.*

## 3. Structural Protections & UI Lockouts
Because grid cells are algorithmically managed by the parent grid, users cannot be allowed to accidentally drag or delete them.
- **`isStructural={...}` Flag**: `block-page` and `block-grid` pass `isStructural={child.type === 'block-flex' || child.type === 'block-grid'}` to the `DesignRenderer`.
- **UI Suppression**: If `isStructural` is true, the `DesignRenderer` natively strips the Drag (≡) and Delete (✕) action buttons from the component's floating Action Bar, ensuring the mesh never logically breaks. Space clicks still legally target/select the cell to allow property adjustments (padding, backgrounds).
- **Breadcrumb Selection**: Structural elements often span 100% space, obscuring their Parent bounding boxes. To fix this, `.action-bar` calculates `store.getNodePath()` and renders an interactive path trailing back to the Root (e.g., `Grid Layout ➚`). Clicking these breadcrumbs allows selecting obstructed parents.

## 4. The Morphology Engine (Node Type Morphing)
DOM bloat ("div soup") is avoided by granting `block-flex` containers the ability to mutate in-place rather than embedding sub-grids inside them.
- **Mechanism**: The Property Panel features a `Component Type` dropdown allowing `block-flex` <-> `block-grid` conversion.
- **`store.morphNodeType(id, newType)`**: Updates `node.type`, carries over ALL previous children and `props`, but invokes `enforceGridMesh` specifically if morphing into a Grid.
- **Visual Continuity Lock**: When morphing a Flex into a Grid, the system explicitly forces `gridTemplate = '1fr'` to ensure the newly instantiated Grid only spawns **one cell**, visually masquerading as its previous primitive Flex form until the user intentionally divides it via "Grid Distribution". 

## 5. High-Frequency Interaction Handling (Anti-Shake Mechanism)
Re-rendering the entire canvas DOM during rapid typing traversing heavy sub-components causes critical lag and focus loss.
- **Silent AST Mutation**: `updateNodeProps(id, props, silent = true)` edits the AST data tree securely without triggering the `TREE_UPDATE` event broadcast.
- **Commit Trigger**: The Property Panel inputs map keyup characters natively, but exclusively trigger `TREE_UPDATE` on `<input onBlur>` and `<input onKeyDown={Enter}>`. 
- **Rule**: ONLY use instant updates (`silent = false`) for finite control paths like boolean toggles, radio buttons, or morphological dropdowns. String inputs MUST utilize `onBlur` delegation.

## 6. CSS Grid Dimensions in Empty Axes
If `gridTemplateRows` evaluates to directional tracks but `gridTemplateColumns` is left undefined in standard `block-page`/`block-grid` styles, the cross-axis element defaults to `auto` and shrinks to content, causing responsive container widths to collapse.
- **Cross-Axis 1fr Enforcement**: Under all directional checks (`isVertical`), the omitted complementary axis is forcefully bound to `'1fr'` in the CSS-in-JS prop mapping to compel strict 100% cross-axis spanning behavior.
