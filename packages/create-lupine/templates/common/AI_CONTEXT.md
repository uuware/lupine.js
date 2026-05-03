# AI Context for Lupine.js

**[CRITICAL SAFEGUARDS FOR CODE MODIFICATION]**
When performing multi-line code refactoring or replacement operations (`replace_file_content` / `multi_replace_file_content`), massive block-level overwrites and arbitrary code restructuring are **STRICTLY PROHIBITED**!

- Before making any modifications, you MUST invoke `view_file` or `grep_search` to verify the exact, up-to-date file structure and line numbers.
- The `StartLine` and `EndLine` range MUST be restricted strictly to the absolute minimum lines you intend to modify or delete.
- If you are merely inserting new code (e.g., adding a button or appending logic), target ONLY the immediately preceding line or bracket as your anchor. You are strictly forbidden from wrapping innocent, unmodified surrounding code into the `Replacement` payload. Violating this red line causes severe production accidents!

**SYSTEM ROLE**: You are an expert developer in `lupine.js`, a custom TypeScript full-stack framework.

**🛑 CRITICAL WARNINGS 🛑**

1.  **`useState` EXISTS but rerenders the whole component**: Use it for simple/small components. For complex or large components, prefer `HtmlVar` for surgical, partial updates. **WARNING**: Because `useState` causes the entire parent component to re-render, any uncontrolled inner components/DOM elements that haven't explicitly saved their transient state will be abruptly reset to their default props. If you encounter bugs where interactive components (like toggles, inputs, animations) unexpectedly revert to their original state and lose data upon clicking or typing elsewhere, always check if a `useState` trigger in the parent is causing an unintended full reload.
2.  **NO VIRTUAL DOM STATE by default**: Without `useState`, changing a variable DOES NOT re-render the component. You must manually update `HtmlVar.value`.
3.  **NO CONTROLLED INPUTS**: Do not bind `value={state}`. Read values from DOM on submit.

---

## 1. Core Philosophy & Reactivity

- **`useState` — React-style local state (small/simple components)**:

  - Import: `import { useState } from 'lupine.components';`
  - Syntax: `const [value, setValue] = useState(initial);` — calling `setValue(...)` rerenders the **entire** component.
  - ✅ **Use when**: The component is small, state drives most of the UI, and the React-style patterns feel natural.
  - ⚠️ **Avoid when**: The component is large/complex, or only a tiny portion of the UI needs to change (e.g. a progress counter, a list inside a page) — repeated full rerenders are wasteful.
  - **`ref.onLoad` + useState**: `onLoad` is called **only on initial mount** (not on rerenders). It's the right place for async data fetch that populates state.
  - **Async component functions**: Component functions **can be `async`** — the framework detects the returned Promise and `await`s it. This lets you `await fetch()` directly inside a component body. However, **all `useState()` calls MUST appear before the first `await`**. The internal `_currentStore` pointer is cleared immediately after the synchronous portion of the component executes (before any `await`), so calling `useState()` after an `await` will throw `"useState must be called inside a component function"`.

    ```tsx
    // ✅ Correct: useState before await
    const MyComp = async (props) => {
      const [data, setData] = useState(null); // hooks first
      const result = await fetchData();        // await after hooks
      return <div>{result.title}</div>;
    };

    // ❌ Wrong: useState after await — will crash
    const MyComp = async (props) => {
      const result = await fetchData();        // await first
      const [data, setData] = useState(null); // 💥 _currentStore is null
      return <div>{result.title}</div>;
    };
    ```

- **`HtmlVar` — Surgical partial updates (large/complex components)**:

  - Use `HtmlVar` to wrap dynamic sections (lists, conditional renderings, async content).
  - **Pattern**: `const dom = new HtmlVar(initialContent);` → JSX `{dom.node}` → `dom.value = updatedContent`.
  - ✅ **Use when**: Only a small part of a large component changes (e.g. list inside a page, progress text), or state is updated by external hooks (`props.hook.onProgress`), or high-frequency updates (file upload progress).
  - The rest of the component DOM is never touched — highly efficient.

- **Direct DOM Access**:
  - Use `RefProps` to get reference to the component root.
  - Use `ref.$(selector)` to find the first element, `ref.$all(selector)` to find all elements (inputs, containers).
  - **Value Retrieval**: `const val = ref.$('input.my-class').value`.

## 2. Key Interfaces

### `RefProps` (Lifecycle & DOM)

```typescript
const ref: RefProps = {
  // Mounted: Initialize data, timers, events
  onLoad: async (el: Element) => {
    await loadData();
    // ref.$('.sub-element').addEventListener(...)
  },
  // Unmounting: Cleanup
  onUnload: async (el: Element) => {
    // Cleanup (timers, sockets)
  },
};
// Usage
<div ref={ref}>...</div>;
```

### `CssProps` (Styling)

Supports nesting and media queries. **Prefer this over inline styles.** Define your styles in a `CssProps` object and bind them to the component's root JSX using the `css={css}` property. Use the `&` ampersand pattern (explained below) to guarantee unique class scoping.

## 3. Styles & Themes ("The Look")

### Global Variables (Theming) & Dark Mode Compatibility

**NEVER hardcode colors** (e.g., `#000`, `#fff`, `#f0f0f0`). Always use CSS variables to support Dark/Light modes. If you must use a fallback, wrap it: `var(--primary-bg-color, #fff)`.

**Defining Variables for Modes in CSS-in-JS**:
Since Lupine.js uses a CSS-in-JS styling approach, when you need to define or override CSS variables specifically for light and dark modes within a component, use the `[data-theme="light" i]` and `[data-theme="dark" i]` selectors. **CRITICAL**: Because `CssProps` scopes styles by default, you MUST separate these mode styles into their own object and bind them using `bindGlobalStyle` with `noTopClassName = true` (the 4th argument).

```typescript
// 1. Separate theme variables into their own CSS object
const cssTheme: CssProps = {
  '[data-theme="light" i]': {
    '--my-comp-bg-color': '#e6e6e6',
  },
  '[data-theme="dark" i]': {
    '--my-comp-bg-color': 'var(--primary-accent-color)',
  },
};
// 2. Bind globally. Param 4 (noTopClassName) MUST be true to prevent injecting a namespace prefix.
bindGlobalStyle('my-comp-theme', cssTheme, false, true);

// 3. Use the variable in your standard component styles
const css: CssProps = {
  '.&-element': {
    backgroundColor: 'var(--my-comp-bg-color)',
  },
};
// Bind your component styles normally
bindGlobalStyle('my-comp-main', css);
```

#### 🎨 Color Variable Semantics (CRITICAL FOR DARK MODE)

1.  **Backgrounds (`--primary-bg-color` vs `--secondary-bg-color`)**:
    - `--primary-bg-color`: The lowest-level background (White in light mode, **Deep Black** in dark mode).
    - `--secondary-bg-color`: An elevated background (Light gray in light mode, **Lighter Black/Gray** in dark mode).
    - _⚠️ Dark Mode Trap_: If you place a floating panel/card on the main body, **do NOT** use `--primary-bg-color` for the panel. It will blend into the body's deep black and become invisible. Use `--secondary-bg-color` for elevated panels to ensure visual separation.
2.  **Text Colors (`--primary-color` vs `--secondary-color`)**:
    - `--primary-color`: The primary **TEXT** color. (Dark grey/black in light mode, **White** in dark mode).
    - _⚠️ Dark Mode Trap_: **Never** use `--primary-color` as the background color for a blue "Primary Action Button". It will turn white in dark mode.
    - Always explicitly declare `color: 'var(--primary-color, inherit)'` on cards/containers so child text properly flips white in dark mode.
3.  **Action / Brand Colors (`--primary-accent-color`)**:
    - `--primary-accent-color`: The vibrant brand color (e.g., Lupine Blue). Use this for the **backgrounds of primary buttons**, active tabs, slider fills, and highlights.
    - When using this as a background, set the text color to `var(--primary-bg-color)` so it stays high-contrast (white) in both themes.
4.  **Borders (`--primary-border` / `--secondary-border-color`)**:
    - Replace all hardcoded `#eee`, `#ccc`, `#999` borders with these to ensure they darken appropriately in dark mode.
5.  **Status Colors**:
    - `--success-color`, `--warning-color`, `--error-color`, `--success-bg-color` (Use replacing hardcoded green/reds).
6.  **Spacing**: `var(--space-m)` (8px), `var(--space-l)` (16px).

### Standard Utility Classes

- **Flexbox**: `.row-box` (flex row, align-center), `.col` (flex: 1).
- **Margins/Padding**: `m-auto`, `p-m`, `mt-s`, `pb-l` (s=small, m=medium, l=large).
- **Text**: `.text-center`, `.ellipsis`.

### The Component CSS & Ampersand (`&`) Pattern (must go with RefProps)

Lupine.js handles component-scoped CSS safely to avoid class collisions. The modern and **preferred** way to style components is to attach a `css={css}` prop to the root element and use the **Ampersand (`&`) Pattern**.

When Lupine renders the component, it generates a unique ID (e.g., `l1234`) and replaces the `&` with this ID everywhere it's used.

```typescript
export const MyComponent = () => {
  const ref: RefProps = {
    onLoad: async () => {
      // 3. Querying namespaced elements
      const btn = ref.$('.&-btn');
      btn.innerHTML = 'Ready';
    },
  };

  const css: CssProps = {
    // Top-level rules apply to the root component container itself
    width: '100%',
    padding: '1rem',

    // 1. Defining namespaced sub-classes in CSS:
    '.&-title': { fontWeight: 'bold' },
    '.&-btn': {
      // Nesting pseudo-classes and combination modifiers (no space after &)
      '&:hover': { background: '#f0f0f0' },
      '&.active': { color: 'var(--primary-accent-color)' },
    },
  };

  return (
    // Setting css={css} safely bounds this style scope
    <aside css={css} ref={ref}>
      {/* 2. Applying namespaced classes in JSX */}
      <div class='&-title'>Hello</div>
      <button class='&-btn active'>Click Me</button>
    </aside>
  );
};
```

**Key Takeaways for `&` and `RefProps`**:

1.  **In `CssProps` Binding**: The top-level keys in `CssProps` (like `display: 'flex'`) apply **directly** to the root element (the one attached to `ref={ref}`). **Do not** wrap your root styles in an artificial `.&-container`.
    - `'&.active'` applies to the root element when it has the `.active` native class.
    - `'.&-item'` applies to _descendant_ elements that have `class="&-item"`.
2.  **In JSX `class` attributes**: Add `class="&-item"`. You can still mix native classes: `class="row-box &-item"`.
3.  **In DOM Queries**:
    - **🚨 NEVER use `document.querySelector('.&-item')` or `element.querySelector('.&-item')`**. Standard browser APIs DO NOT understand the `&` symbol and will fail to find the element.
    - Use **`ref.$('.&-item')`** (WITH leading dot) to get the first matching element. The underlying logic replaces `&` with the generated CSS ID, so this correctly translates to querying `.l1234 .l1234-item` which safely finds descendants within the current component's isolated namespace.
    - Use **`ref.$all('.&-item')`** to get a `NodeList` of all matching descendants within the component.

## 4. CSS Placement Strategies & Sharing Scopes

Lupine.js provides two main ways to inject component CSS (`css={}` vs `bindGlobalStyle`). Additionally, you must actively manage how dynamic separated DOM chunks share the same CSS Scope.

### Strategy A: The `css={}` Prop (Dynamic / Single-Use)

**Best for**: Pages, views, or high-level containers that are only rendered once per screen.

When you pass `css={css}` to a JSX element, Lupine automatically evaluates it and injects a new `<style>` tag directly wrapping that element.

- **Pros**: Perfect isolation.
- **Cons**: If you render 100 items using `css={}`, it will inject 100 identical `<style>` blocks into the DOM, severely bloating the page.

### Strategy B: `bindGlobalStyle` (Reusable Components)

**Best for**: Reusable UI components (Buttons, Toggles, List Items, Modals) that will be rendered multiple times.

`bindGlobalStyle`, combined with `getGlobalStylesId`, places the `<style>` block in the `<head>` of the document **exactly once**. All instances of the component share the same CSS class names, but those names are still guaranteed to be collision-free!

**How it works seamlessly with `&`**:

1. Generate an ID based on the `CssProps` content: `const globalCssId = getGlobalStylesId(css);`. (Call this _inside_ the component!)
2. Bind the style block globally once: `bindGlobalStyle(globalCssId, css);`
3. Assign this ID to the component's `ref` to link the scope: `const ref: RefProps = { globalCssId };` / `<div ref={ref}>`
4. Use `class="&-item"` normally. Lupine replaces `&` with the identical `globalCssId` across all instances.

> [!WARNING]
> Because `getGlobalStylesId` relies on `getRequestContext()` data to correctly attach and track styles (especially across SSR and interactive client renders), `getGlobalStylesId` and `bindGlobalStyle` **MUST** be called inside the component function scope. Calling them at the file/module level will result in runtime errors like: `Uncaught Error: Request context is not initialized`.

### ⚠️ IMPORTANT: The "Static `CssProps`" Rule

Because `bindGlobalStyle` injects your `<style>` tags into the `<head>` globally, your `CssProps` definition **MUST** be entirely static.

**ANTI-PATTERN:** Putting variables (like `isVertical`, `size`, `color`) directly inside the `CssProps` object structure. Every time the component re-renders with a different prop, it will generate conflicting CSS IDs and the latter will overwrite the former's styles, corrupting the layout. Define one immutable `const css: CssProps = {...}` and handle visual variations by appending standard class names to your root element (`class={isVertical ? '&-vertical' : '&-horizontal'}`) and map those variations inside your static `CssProps`.

### 🔗 Sharing the same CSS scope (`globalCssId`) among Separated DOMs

If your component divides its logic so that some internal floating DOM elements are rendered dynamically later (e.g. through a function passed to `HtmlVar`) _separated_ from the root return statement, the inner DOM will automatically generate a **new, mismatched** CSS ID if not linked. Its internal `class="&-item"` references will break and styles will fail to apply.

To force separated local DOM partitions to share the exact same `&` CSS Scope as their parent page, explicitly share a globally unique CSS ID using `globalStyleUniqueId()`:

```tsx
import { globalStyleUniqueId, HtmlVar, RefProps, CssProps } from 'lupine.components';

export const HomePage = () => {
  // 1. Generate a manual ID for the container scope beforehand
  const cssId = globalStyleUniqueId();

  const listDom = new HtmlVar('');

  const renderList = () => {
    // 2. Explicitly bind the inner detached DOM to the parent's globalCssId
    listDom.value = (
      <div ref={{ globalCssId: cssId }} class='&-bundle-container'>
        <div class='&-bundle-name'>Basic Bundle</div>
      </div>
    );
  };

  const ref: RefProps = {
    globalCssId: cssId, // 3. The parent registers the ID as well
    onLoad: async () => renderList(),
  };
  const css: CssProps = { '.&-bundle-name': { color: 'red' } };

  return (
    <div css={css} ref={ref}>
      {/* 4. The dynamically injected nodes will properly map their &- prefixes */}
      {listDom.node}
    </div>
  );
};
```

### Using `&` on Top-Level Tags

The following example illustrates how to correctly use `&` in the `class` of a top-level tag.

Generally, you should not need to use `&` classes on the top-level tag because you can reference the top-level tag directly via `ref.current`. For styling, the first-level styles defined directly under your `CssProps` object are automatically applied to the top-level tag (e.g., `color: 'red'` below).

However, when there is a special need to use an `&-` class prefix on the top-level tag, you must be careful: **`"&.&-box"`** is the correct syntax. This is because the standalone `&` selector is replaced by both the explicit `gCssId` and the CSS ID automatically generated for this top-level tag.

For instance, if `gCssId="g00"` and the auto-generated CSS ID applied by the `ref` is `"l01"`, then `"&.&-box"` compiles to `"g00.g00-box, l01.l01-box"`.

Similarly, a nested selector like `"&.&-box .&-item"` will be compiled into `"g00.g00-box .g00-item, l01.l01-box .l01-item"`.

_(Alternatively, if you define the class without the `&-` prefix like `class="box"`, you would target it using `"&.box"`)._

```typescript
export const Component1 = () => {
  const css: CssProps = {
    color: 'red',
    '&.&-box': { fontWeight: 'bold' },
    '&.&-box .&-item': { backgroundColor: 'blue' },
  };
  const gCssId = getGlobalStylesId(css);
  bindGlobalStyle(gCssId, css);

  const ref: RefProps = {
    globalCssId: gCssId,
  };
  return (
    <div ref={ref} class='&-box'>
      <div class='&-item'>item</div>
    </div>
  );
};
```

---

## 5. Common Patterns ("The Lupine Way")

### List / Search (No Re-render)

**Pattern**: Create a render function (`makeList`) and assign its result to `HtmlVar`.

```typescript
const MyPage = () => {
  // 1. Logic Variables (Not State)
  let pageIndex = 0;

  // 2. Dynamic Container
  const listDom = new HtmlVar(<div>Loading...</div>);

  // 3. Render Function
  const makeList = async () => {
    const data = await fetchData(pageIndex);
    return (
      <div>
        {data.map((item) => (
          <Item item={item} />
        ))}
      </div>
    );
  };

  // 4. Events
  const onSearch = async () => {
    // Read directly from DOM
    const query = ref.$('input.&-search').value;
    // Update logic var
    pageIndex = 0;
    // Update UI manually
    listDom.value = await makeList();
  };

  const ref: RefProps = {
    onLoad: async () => {
      listDom.value = await makeList();
    },
  };

  return (
    <div ref={ref}>
      <input class='&-search' />
      <button onClick={onSearch}>Go</button>
      {/* Embed Dynamic Content */}
      {listDom.node}
    </div>
  );
};
```

### Page Navigation (`initializePage` vs `<a>`)

In the Lupine.js system, all standard `<a>` HTML tags are automatically intercepted. If the link points to an internal route, Lupine safely binds it to `_lupineJs.initializePage(href)` behind the scenes to perform a seamless single-page application (SPA) transition without a full browser reload.

When performing imperative or programmatic routing via JavaScript (e.g. clicking a `<button>` or a `div`), **DO NOT** use `window.location.href = '/path'`, as this forces a harsh full-page reload.

Instead, import and use `initializePage`:

```typescript
import { initializePage } from 'lupine.web';

const navigate = () => {
  // CORRECT: Seamless SPA transition
  initializePage('/play/diff01/1');

  // ERROR / ANTI-PATTERN: Forces full browser reload unless explicitly desired
  // window.location.href = '/play/diff01/1';
};
```

### Mobile Navigation (`SliderFrame`)

Lupine uses a "Slide-over" model for navigation (Drill-down). To achieve infinite nesting (where a child page can open a grandchild page), each Component level simply needs to define its own `sliderHook` and its own `<SliderFrame>` tag to act as the placeholder for its children.

```typescript
import { SliderFrame, SliderFrameHookProps, HeaderWithBackFrame } from 'lupine.components';

// 1. Parent Component (or Level 1)
const Parent = () => {
  // Define hook for Level 2
  const sliderHook: SliderFrameHookProps = {};

  const openDetail = (id) => {
    // Push new view onto stack
    sliderHook.load!(<DetailComponent id={id} parentSliderFrameHook={sliderHook} />);
  };

  return (
    <div>
      {/* Placeholder for Level 2 */}
      <SliderFrame hook={sliderHook} />

      <div onClick={() => openDetail(1)}>Click Me</div>
    </div>
  );
};

// 2. Child Component (Level 2)
const DetailComponent = (props: { id: number; parentSliderFrameHook: SliderFrameHookProps }) => {
  // Define hook for Level 3
  const childSliderHook: SliderFrameHookProps = {};

  const openDeeper = () => {
    // Load Level 3 component into this component's placeholder
    childSliderHook.load!(<DetailComponent id={props.id + 1} parentSliderFrameHook={childSliderHook} />);
  };

  return (
    <HeaderWithBackFrame title='Detail Page' onBack={(e) => props.parentSliderFrameHook.close!(e)}>
      {/* Placeholder for Level 3 */}
      <SliderFrame hook={childSliderHook} />

      <div onClick={openDeeper}>Go Deeper</div>
    </HeaderWithBackFrame>
  );
};
```

### Component Hooks (Imperative Control)

Instead of React's `useImperativeHandle` or lifting state up, Lupine components often use a `hook` pattern for parent-to-child communication and exposing methods.

1. **Parent** creates an empty object: `const myHook: MyComponentHookProps = {};`
2. **Parent** passes it to the child: `<MyComponent hook={myHook} />`
3. **Child** populates it during render:
   ```typescript
   if (props.hook) {
     props.hook.getValue = () => value;
     props.hook.setValue = (val) => {
       updateDOM(val);
     };
   }
   ```
4. **Parent** calls it later on demand: `console.log(myHook.getValue());`

**⚠️ CRITICAL HOOK TIMING**: Do not call hook methods in the parent's top-level execution scope before returning the child component. The child component populates or resets the hook _during_ its own render phase. If you call `myHook.setValue()` and then return `<MyComponent hook={myHook} />`, your changes will be ignored or the hook object will be overwritten. You **MUST** wait until the component is mounted to use the hook, typically via a parent `RefProps.onLoad`:

```typescript
const Parent = () => {
  const myHook: MyComponentHookProps = {};

  const ref: RefProps = {
    onLoad: async () => {
      // Safe: Child has rendered and populated the hook
      myHook.setValue('Hello');
    },
  };

  return (
    <div ref={ref}>
      <MyComponent hook={myHook} />
    </div>
  );
};
```

## 5. Architecture Cheat Sheet

- **`lupine.api` (Backend)**:
  - `req.locals.json()` to get body.
  - `apiCache.getDb().selectObject('$__table', ...)`
  - `ApiHelper.sendJson(req, res, { status: 'ok' })`
- **`lupine.web` (Frontend)**:
  - `NotificationMessage.sendMessage('Msg', NotificationColor.Success)`
  - `getRenderPageProps().renderPageFunctions.fetchData('/api/...')`
  - Retrieve dynamic URL parameters explicitly via `props.urlParameters['paramName']`.
  - **Environment vs Database Config**:
    - `webEnv('API_BASE_URL', '')`: Use this mapping to synchronously read statically injected environment variables defined in `.env` (like `WEB.xxx`).
    - `await WebConfig.get('siteLogo')`: Use this for dynamic configurations. It works asynchronously by fetching data from the backend server first, then caches it for subsequent calls.
  - **Path Parameter Syntax**:
    - Mandatory parameters use `:` (e.g., `pageRouter.use('/page/:id', PlayPage)`).
    - Fixed parameters use `/fixed-parameter/` (e.g., `pageRouter.use('/page/:id/detail/', PlayPage)`), `detail` is a fixed parameter.
    - Optional parameters use `?` (e.g., `/page/:userId/?option1/?option2`). Once an optional parameter is declared, all subsequent route sections become optional (It's not a query string).

## 6. Coding Standards & Gotchas

- **`useState` vs `HtmlVar`**: `useState` exists (`import { useState } from 'lupine.components'`) and is elegant for small components. But it rerenders the **entire** component — for large/complex components or high-frequency updates, prefer `HtmlVar` for surgical partial updates. `useEffect`, `useReducer`, `useCallback`, `useContext` **do NOT exist**.
- **❌ `className`**: Use standard HTML `class`.
- **⚠️ `style={{}}`**: **Allowed** for simple or dynamic inline styles (e.g., `style={{ border: '1px solid red' }}`), but **prefer `css={CssProps}`** for structural/theme styling.
- **✅ Native Events**: `onClick`, `onChange`, `onInput`, `onMouseMove` etc. are standard HTML events and **ARE ALLOWED**. Use them for triggering logic or callbacks (e.g., `onInput={(e) => updateOtherThing(e.target.value)}`).
- **✅ Uncontrolled Inputs**: While you _can_ use `onInput` to track state, the default efficient pattern is often to read `ref.$('input').value` only when the user clicks "Save" or "Search".

## 7. System Icons & Customization

Lupine.components uses a set of built-in system icons (like `ma-close` and `mg-arrow_back_ios_new_outlined` found in components like `MobileHeaderWithBack`).

These icons rely on an icon font generated by [icons-font-customization](https://github.com/uuware/icons-font-customization). If you want to add or modify the standard icon font itself, refer to that repository.

### Overriding System Icons without Generating a Font

If you do not want to generate or modify the full icon font, you can easily override specific system icons directly via CSS using pure SVG strings or imported SVG files.

**1. Define your SVG Data URL:**
You can import an `.svg` file (if your bundler supports it) or define a raw Data URI string.

```typescript
// Option A: Using bundler import
import githubIcon from 'github.svg';

// Option B: Raw Data URI string
const closeSvgData = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M18 6L6 18M6 6l12 12'/%3E%3C/svg%3E`;

export const DemoIcons = {
  github: githubIcon,
  'ma-close': closeSvgData,
};
```

**2. Override the specific `.ifc-icon` via CSS Masking:**
Use the `-webkit-mask-image` and `maskImage` property wrapped in `url()` to apply the SVG data to the icon class. This ensures it inherits colors (`currentColor`) properly.

```typescript
const css: CssProps = {
  // Target the specific system icon class you wish to override
  '.ifc-icon.ma-close': {
    '-webkit-mask-image': `url("${DemoIcons['ma-close']}")`,
    maskImage: `url("${DemoIcons['ma-close']}")`,
    // If needed, specify mask sizing properties:
    // maskRepeat: 'no-repeat',
    // maskPosition: 'center',
    // maskSize: 'contain',
  },
};
```

## 8. Cross-Platform App Bootstrapping Guidance

When creating a new Cross-Platform App using `lupine.js`, follow this standard procedure for scaffolding the entry point, navigation, and icons:

1. **Custom Navigation Icons (`app-icons.ts`)**:
   Instead of using the default icon font, you should export SVG Data URIs for your app's specific icons from `app-icons.ts`. Use a `reduce` function to generate the appropriate `CssProps` with `-webkit-mask-image: url("' + svg + '")'` and `maskImage: 'url("' + svg + '")'` to override the `.ifc-icon.[icon-name]` classes. Avoid using backticks (\"\`\") when injecting SVG variables inside the maskImage URL to prevent escaping issues.

2. **Base Styles (`base-css.ts`)**:
   Create a `styles/base-css.ts` file that imports the dynamic icon styles (from `app-icons.ts`), and defines any placeholder wrappers (e.g., `.user-page-placeholder` having `width: '100%', height: '100%'`). Use `bindGlobalStyle('comm-css', baseCss, false, true)` in the index file to register these.

3. **Global UI Frame (`app-responsive-frame.tsx`)**:
   Use `ResponsiveFrame` along with `SliderFrame` (for drill-down navigation via `SliderFrameHookProps`) to define the app's skeleton.

   - Define your top/bottom navigation menus based on your icons.
   - Return `ResponsiveFrame` passing in the `mainContent`, menus, and ensure you provide all required properties like `mobileSideMenuContent: <></>` (even if empty) to satisfy TypeScript interfaces.

4. **Page Router Configuration (`index.tsx`)**:
   Create a `PageRouter`. Bind the `AppResponsiveFrame` using `pageRouter.setFramePage({ component: AppResponsiveFrame, placeholderClassname: 'user-page-placeholder' })`. Then associate the routes (`pageRouter.use('*', HomePage)`) and finalize with `bindRouter(pageRouter)`.

5. **Local Storage Patterns**:
   For pure frontend utility apps (compatible with browsers, Capacitor, and Electron), wrap `localStorage.getItem()` and `localStorage.setItem()` inside dedicated Service singletons (e.g., `LocalNotesService`). Always parse/serialize consistently and assign standard unique IDs (like `Date.now()`) for newly inserted records. Combine this with the `onLoad` pattern inside `RefProps` to fetch data immediately when components render, injecting it directly into an `HtmlVar` wrapping the list.

## 9. Standard Mobile App Layout & Interactions

When asked to "create a list page" or "initialize a standard mobile framework", rigorously apply this exact structural pattern based on the cross-platform starter app.

### A. The Global Root (`index.tsx` & `AppResponsiveFrame`)

- Use `bindTheme` to load global color tokens.
- Set the global frame with `pageRouter.setFramePage({ component: AppResponsiveFrame, placeholderClassname: 'user-page-placeholder' })`.
- **`AppResponsiveFrame`** handles the macro layout:
  - It renders `<ResponsiveFrame>` wrapping `<main class='user-page-placeholder'></main>`.
  - It contains the global left `mobileSideMenuContent` (typically abstracted into a `<SideMenuContent />` component).

### B. The Home / List Page (`HomePage`)

A standard mobile list page must employ:

1. **The Top Header (`MobileHeaderCenter`)**:

   - Wrap the top bar in `<MobileHeaderCenter>`.
   - Use `<MobileHeaderTitleIcon title='App Name' left={...} right={...} />`.
   - The _left_ slot usually contains an empty spacer `<MobileHeaderEmptyIcon />`.
   - The _right_ slot contains actions (e.g., Search icon, `<MobileTopSysIcon />` to open the Side Menu).

2. **The Scrollable Content Area**:

   - Beneath the header, create a flex-grow scrollable div: `<div class='flex-1 overflow-y-auto padding-m'>`.
   - Mount an `HtmlVar` instance here (`{dom.node}`) to dynamically bind the list data arrays fetched typically via `RefProps.onLoad`.

3. **Floating Action Button (FAB)**:
   - Overlay a primary action button at `bottom: 24px`, `right: 24px` using `.fab-button` styled with `var(--primary-accent-color)`.

### C. Advanced Touch Interactions (`createDragUtil` in Lists)

For interactive lists, `createDragUtil()` from `lupine.components` handles complex gesture physics.

- **Swipe-to-Reveal (Horizontal)**:

  - Render an absolute positioned `.actions-layer` (opacity: 0 initially) underneath the `.list-card`.
  - When the card's `onTouchStart`/`onMouseDown` is triggered, attach `dragUtil` handlers.
  - In `dragUtil.setOnMoveCallback`, translate the card `transform: translateX(...)` up to a negative boundary (e.g., -100px) and toggle the action layer's opacity to 1.
  - Implement a global `resetSwipeMenus` function attached to `onMouseDown={handleBgTouch}` at the page root to ensure an exclusive accordion-like menu state (only one open at a time).

- **Drag-to-Reorder (Vertical)**:
  - Define a distinct `.drag-handle` slot inside the card (e.g., `bs-list` icon).
  - In `dragUtil.setOnMoveCallback`, when dragging this handle, apply `scale(1.02)` and elevated `boxShadow` to the grabbed card. Compare its `relativeY` pointer position against sibling card `offsetTop`s to execute live `insertBefore / insertAfter` DOM swaps.
  - Conclude by saving the new DOM sibling ordering in `dragUtil.setOnMoveEndCallback`.

### D. Sub-Page Routing & Drill-Downs (`SliderFrame`)

- Slide-over interactions are mandatory for Search panels, Creation modals, and Details views.
- The `HomePage` must define a top-level `<SliderFrame hook={sliderFrameHook} />` inside its scroll area.
- Opening a child acts instantly via: `sliderFrameHook.load!(<MyChildPage sliderFrameHook={sliderFrameHook} />)`.
- **Inside the Child Component**:
  - Must be wrapped with `<HeaderWithBackFrame title='Subpage' onBack={(e) => props.sliderFrameHook.close!(e)}>` to provide the standard top-left back chevron.
- **Nested SliderFrames**:
  - When opening a sliding frame _from within_ another sliding frame (e.g., opening a Settings About page from the Settings root page), you **MUST** define a new local hook `const innerSliderHook: SliderFrameHookProps = {};` and mount a _new_ `<SliderFrame hook={innerSliderHook} />` inside the parent slider component.
  - Using the parent's hook will replace the parent's content instead of sliding a new frame over it.
  - Wrap multiple children in `<></>` or a `<div>` if they are direct children to satisfy single `VNode` rendering constraints.

### E. Dialogs & Action Sheets (Replacing Native Alerts)

**DO NOT USE browser native `alert()`, `confirm()`, or `prompt()`**. Instead, use the native `ActionSheet` promises from `lupine.components` for a modern, mobile-friendly overlay experience:

1. **Option Selection (`ActionSheetSelectPromise`)** (Replaces `confirm()` or complex choices):

   ```typescript
   import { ActionSheetSelectPromise } from 'lupine.components';

   const index = await ActionSheetSelectPromise({
     title: 'Delete this saved game?', // Optional
     options: ['Delete', 'Edit'],
     cancelButtonText: 'Cancel',
   });

   if (index === 0) {
     /* User clicked Delete (Index of options array) */
   }
   if (index === -1) {
     /* User clicked Cancel or tapped background */
   }
   ```

2. **Simple Messages (`ActionSheetMessagePromise`)** (Replaces `alert()`):

   ```typescript
   import { ActionSheetMessagePromise } from 'lupine.components';

   await ActionSheetMessagePromise({
     title: 'Success', // Optional
     message: 'Your profile has been saved.',
     closeButtonText: 'OK', // Optional, defaults to a close behavior
   });
   ```

3. **User Input (`ActionSheetInputPromise`)** (Replaces `prompt()`):

   ```typescript
   import { ActionSheetInputPromise } from 'lupine.components';

   const value = await ActionSheetInputPromise({
     title: 'Enter your name',
     // placeholder: 'Player 1', // Optional
     confirmButtonText: 'Submit', // Optional
     cancelButtonText: 'Cancel', // Optional
   });

   if (value !== null) {
     /* User submitted a string */
   }
   ```

4. **Other Available Prompts (Investigate their API via `lupine.components` when needed)**:
   - `ActionSheetMultiSelectPromise`: For multiple checkbox selections.
   - `ActionSheetTimePicker`: For selecting a time.
   - `ActionSheetDatePicker`: For selecting a date.

### F. Hardware Back Button Handling (`data-back-action`)

When building mobile interfaces, users expect the physical hardware "Back" button (or swipe-from-edge gesture) to gracefully dismiss overlays, dialogs, sliders, or menus—similar to pressing the `ESC` key on a desktop.

**The Rule**: Whenever you implement a cancel button, a close icon (`X`), or a back chevron (`<`) in a mobile overlay or frame, you **MUST** attach the `data-back-action` attribute using the `backActionHelper`.

```typescript
import { backActionHelper } from 'lupine.components';

export const MyCloseButton = ({ onClose }) => {
  return (
    <i
      class='ifc-icon ma-close'
      // Generate a unique ID for the back stack
      data-back-action={backActionHelper.genBackActionId()}
      onClick={onClose}
    ></i>
  );
};
```

**How it works**:

- When the hardware back button is pressed, the underlying system automatically queries the DOM for all elements with `[data-back-action^="bb-"]`.
- It finds the most recently created component (the top-most overlay) and automatically triggers a `.click()` event on it.
- **Dynamic Mounting vs Static**:
  - For components that are injected and removed dynamically (like `<ActionSheet />` or `<FloatWindow />`), simply attaching the property to the React/JSX node is sufficient.
  - For static components that always remain in the DOM but toggle visibility (like an off-canvas sidebar), you must dynamically add/remove the attribute in Javascript (`el.setAttribute` / `el.removeAttribute`) to prevent the back button from intercepting events when the menu is actually closed.
