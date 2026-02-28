# AI Context for Lupine.js

**SYSTEM ROLE**: You are an expert developer in `lupine.js`, a custom TypeScript full-stack framework.

**🛑 CRITICAL WARNINGS 🛑**

1.  **NO REACT HOOKS**: `useState`, `useEffect`, `useReducer`, `useCallback`, `useContext` **DO NOT EXIST**.
2.  **NO VIRTUAL DOM STATE**: Changing a variable DOES NOT re-render the component. You must manually update `HtmlVar.value`.
3.  **NO CONTROLLED INPUTS**: Do not bind `value={state}`. Read values from DOM on submit.

---

## 1. Core Philosophy & Reactivity

- **`HtmlVar` is the "State"**:
  - Use `HtmlVar` to wrap dynamic sections (lists, conditional renderings, async content).
  - **Pattern**: `const dom = new HtmlVar(initialContent);` -> JSX `{dom.node}` -> `dom.value = updatedContent`.
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

### Global Variables (Theming)

**NEVER hardcode colors** (e.g., `#000`). Always use CSS variables to support Dark/Light modes.

- **Colors**: `var(--primary-color)`, `var(--primary-bg-color)`, `var(--secondary-color)`, `var(--error-color)`.
- **Borders**: `var(--primary-border)`, `var(--border-radius-m)`.
- **Spacing**: `var(--space-m)` (8px), `var(--space-l)` (16px).

### Standard Utility Classes

- **Flexbox**: `.row-box` (flex row, align-center), `.col` (flex: 1).
- **Margins/Padding**: `m-auto`, `p-m`, `mt-s`, `pb-l` (s=small, m=medium, l=large).
- **Text**: `.text-center`, `.ellipsis`.

### The Component CSS & Ampersand (`&`) Pattern

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
    - Use **`ref.$('.&-item')`** (WITH leading dot) to get the first matching element. The underlying logic simply replaces `&` with the generated ID (e.g. `l1234`), so this correctly translates to querying `.l1234 .l1234-item` which safely finds descendants within the current component's isolated namespace.
    - Use **`ref.$all('.&-item')`** to get a `NodeList` of all matching descendants within the component.

## 4. CSS Placement Strategies: `css={}` vs `bindGlobalStyle`

Lupine.js provides two main ways to inject component CSS. Choosing the right one is critical for performance and DOM cleanliness.

### Strategy A: The `css={}` Prop (Dynamic / Single-Use)

**Best for**: Pages, views, or high-level containers that are only rendered once per screen.

When you pass `css={css}` to a JSX element, Lupine automatically evaluates it and injects a new `<style>` tag directly preceding or wrapping that specific DOM element. It uses the **Ampersand (`&`) Pattern** (replacing `&` with a unique ID `l1234` generated on every render) to ensure complete scoping.

**Pros**: Perfect isolation. You can safely style dynamic children easily.
**Cons**: If you render 100 items using `css={}`, you will inject 100 identical `<style>` blocks into the DOM, severely bloating the page.

```typescript
export const MyUniquePage = () => {
  // Styles apply directly to the root element
  const css = { padding: '10px' };
  return <div css={css}>...</div>;
};
```

### Strategy B: `bindGlobalStyle` (Reusable Components)

**Best for**: Reusable UI components (Buttons, Toggles, List Items, Modals) that will be rendered multiple times.

`bindGlobalStyle`, combined with `getGlobalStylesId`, places the `<style>` block in the `<head>` of the document **exactly once**. All instances of the component share the same CSS class names, but those names are still guaranteed to be collision-free!

**How it works seamlessly with `&`**:

1. You generate a unique ID based on the `CssProps` content (this ID remains identical for every instance of the component): `const globalCssId = getGlobalStylesId(css);`. **CRITICAL**: This MUST be called _inside_ the component function body, not at the module root level, because it depends on the rendering context (themes, SSR scope) being fully initialized.
2. You bind the style block globally once: `bindGlobalStyle(globalCssId, css);`
3. You assign this ID to the component's `ref` so Lupine knows what to replace `&` with: `const ref: RefProps = { globalCssId };`
4. Use `class="&-item"` normally. Lupine replaces `&` with the identical `globalCssId` across all instances!

**Pros**: Highly efficient. Rendering 100 buttons only generates 1 style block. Completely safe from class name collisions.
**Cons**: All instances of the component literally share the same CSS class names. If an instance needs a unique visual variation, you must use inline `style={{}}` overrides.

```typescript
import { bindGlobalStyle, getGlobalStylesId, CssProps, RefProps } from 'lupine.web';

export const ToggleButton = (props: { color?: string; disabled?: boolean }) => {
  const css: CssProps = {
    // 1. Top-level properties apply directly to the root element.
    // Do NOT wrap these in '.&-container'
    padding: '10px',
    color: 'var(--primary-color)',

    // 2. You can mix nested modifiers for the root element:
    '&.disabled': { opacity: '0.5' },

    // 3. Or target specific inner children:
    '.&-inner': { fontWeight: 'bold' },
  };

  // 4. Generate the ID and bind it globally (Call INSIDE the component!)
  const tabGlobalCssId = getGlobalStylesId(css);
  bindGlobalStyle(tabGlobalCssId, css);

  // 5. Assign the global ID to the reference
  const ref: RefProps = {
    globalCssId: tabGlobalCssId,
  };

  return (
    <div ref={ref} class={props.disabled ? 'disabled' : ''} style={{ backgroundColor: props.color }}>
      <span class='&-inner'>Click Me</span>
    </div>
  );
};
```

### ⚠️ IMPORTANT: The "Static `CssProps`" Rule

Because `bindGlobalStyle(getGlobalStylesId(css), css)` injects your `<style>` tags into the `<head>` of the document **globally**, your `CssProps` definition **MUST** be entirely static and shared across all instances of a component.

**ANTI-PATTERN:** Putting React variables (like `isVertical`, `size`, `color`) directly inside the `CssProps` object structure.

- **Why it's bad:** Every time the component re-renders with a different prop, `getGlobalStylesId` calculates a brand new hash. `bindGlobalStyle` then injects a duplicate `<style>` block into the head. If a user places two `Slider`s on the same page (one vertical, one horizontal), they will generate conflicting CSS IDs and the latter will aggressively overwrite the former's styles, corrupting the layout.

**CORRECT PATTERN:** Define one immutable `const css: CssProps = {...}` outside of any reactive dependencies.

- Handle visual variations by appending standard class names to your root element (`class={isVertical ? 'vertical' : 'horizontal'}`).
- In your static CSS definition, target these root modifier classes by prefixing the namespace `&` with the modifier: `&.vertical .&-track` or `&.horizontal .&-fill`.
- If you need precise, dynamic position coordinates (e.g. mouse tracking, progress percentages), calculate them in your JavaScript hook and inject them into standard DOM elements using `el.style.setProperty('--my-var', val)` or direct assignment, while your CSS relies purely on standard layout rules.
- Since css supports nested selectors (CSS-in-JS), the efficient approach is to define all CSS in one css prop on the top-level/root tag of a component, using class names on children. Avoid spreading inline css props across child elements.

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

## 6. Coding Standards & Gotchas

- **❌ React Hooks**: `useState`, `useEffect` **DO NOT EXIST**. Use `HtmlVar` and `RefProps`.
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
Use the `maskImage` property wrapped in `url()` to apply the SVG data to the icon class. This ensures it inherits colors (`currentColor`) properly.

```typescript
const css: CssProps = {
  // Target the specific system icon class you wish to override
  '.ifc-icon.ma-close': {
    maskImage: \`url("\${DemoIcons['ma-close']}")\`,
    // If needed, specify mask sizing properties:
    // maskRepeat: 'no-repeat',
    // maskPosition: 'center',
    // maskSize: 'contain',
  },
};
```
