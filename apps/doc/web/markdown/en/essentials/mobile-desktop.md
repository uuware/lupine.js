---
title: Mobile & Desktop Adaptation
---

# Mobile & Desktop Adaptation

One of the core design philosophies of Lupine.js is "One Codebase, Multiple Platforms." With built-in responsive design tools and components, you can easily build applications that adapt to Web, Mobile (iOS/Android), and Desktop (Electron).

## 1. Responsive Layout (Media Query)

`lupine.components` provides powerful media query tools to help you adjust layouts based on screen width.

### Breakpoints

The system predefines the following breakpoints (customizable in `MediaQueryMaxWidth`):

- **ExtraSmall**: < 480px
- **Mobile**: < 767px (Grid: col-1)
- **Tablet**: < 991px (Grid: col-1-md)
- **Desktop**: < 1399px (Grid: col-1-lg)

### Usage in CSS-in-JS

You can use `MediaQueryRange` to write responsive styles easily:

```tsx
import { MediaQueryRange, MediaQueryMaxWidth } from 'lupine.components';

const css: CssProps = {
  width: '100%',
  // Default desktop style
  maxWidth: MediaQueryMaxWidth.DesktopMax,

  // Adjustments for ExtraSmall screens (Mobile Portrait)
  [MediaQueryRange.ExtraSmallBelow]: {
    padding: '10px',
    fontSize: '14px',
  },

  // Adjustments for Tablet and below
  [MediaQueryRange.TabletBelow]: {
    flexDirection: 'column',
  },
};
```

## 2. Adaptive Frames

Lupine provides frame components specifically designed for building responsive applications.

### ResponsiveFrame

`ResponsiveFrame` is the ultimate solution for handling hybrid layouts. It automatically switches UI structure based on the device type:

- **Desktop**: Displays top menu (`DesktopHeader`), footer (`DesktopFooter`), and sidebar.
- **Mobile**: Automatically switches to a mobile layout, hiding desktop-specific elements and enabling mobile-specific navigation (`MobileBottomMenu`).

```tsx
<ResponsiveFrame
  desktopHeaderTitle="My App"
  desktopTopMenu={[...]}
  mobileBottomMenu={[...]}
  mainContent={<MyPageContent />}
/>
```

### SliderFrame

`SliderFrame` implements the common "slide-in" interaction experience found in mobile apps. It is typically used for sliding in detail pages from the right or menus from the bottom.

- Supports `Right-to-Left` and `Bottom-to-Top` animations.
- Configurable as a slide-out panel on Desktop.

## 3. Mobile Navigation & Interaction

### Global Back Button Handling (BackActionHelper)

Handling the physical back button is crucial in mobile apps (especially Android). `BackActionHelper` provides a global queue to manage back actions, ensuring a smooth user experience.

**Usage Example**:

```typescript
import { backActionHelper } from 'lupine.components';

// Listen for hardware back button (usually in index.ts or app-listeners.ts)
App.addListener('backButton', async () => {
  // If helper handled the back action (e.g., closed a modal), return
  if (await backActionHelper.processBackAction()) {
    return;
  }
  // Otherwise, exit app or perform other logic
});
```

### ActionSheet

`ActionSheet` is a very common bottom modal component in mobile apps, used for option selection, information prompts, or simple inputs.

- **ActionSheetSelect**: Bottom options menu.
- **ActionSheetInput**: Bottom input box.
- **ActionSheetMessage**: Bottom message prompt.

```tsx
import { ActionSheetSelectPromise } from 'lupine.components';

const handleSelect = async () => {
  const index = await ActionSheetSelectPromise({
    title: 'Choose Action',
    options: ['Edit', 'Delete', 'Share'],
    cancelButtonText: 'Cancel',
  });

  if (index === 0) {
    // Edit logic
  }
};
```

### MobileHeader

`MobileHeaderComponent` provides flexible header customization. You can dynamically update the Left, Center, and Right areas of the header using `MobileHeaderHelper` or helper components.

```tsx
// Dynamically update Header inside a page component
<MobileHeaderCenter>
  <MobileHeaderTitleIcon title='User Settings' left={<BackIcon />} right={<SaveIcon />} />
</MobileHeaderCenter>
```

### SlideTabComponent

A tab switching component that supports gesture-based left/right sliding, providing a smooth experience close to native applications.

````tsx
<SlideTabComponent
  pages={[
    { title: 'Hot', content: <HotList /> },
    { title: 'New', content: <NewList /> },
  ]}
/>

## 4. Mobile Deployment

Lupine.js recommends using **Capacitor** to wrap your web application as a native mobile app.

### Mobile Configuration

Since mobile apps typically run as standalone files (using the `file://` protocol), API requests cannot utilize relative paths like they do on the Web. You should configure `.env.mobile` to specify absolute API endpoints.

**Build Command**:
```bash
# Build using .env.mobile configuration
npm run build-mobile
````

This corresponds to the script in `package.json`:
`node ./dev/dev-watch --env=.env.mobile --dev=0 --mobile=1`

### Conditional Compilation

Lupine provides the `pluginIfelse` plugin, allowing you to write platform-specific logic. This is particularly useful for handling mobile-specific API endpoints or behaviors.

**Usage Example**:

```javascript
// #if MOBILE
const apiBase = 'https://api.myapp.com';
// #else
const apiBase = '/api';
// #endif

// #if DEV
console.log('Debug mode');
// #endif
```

> Only code blocks matching the condition will be included in the final bundle, reducing bundle size and preventing runtime errors.

### Adding iOS and Android

Please refer to the official Capacitor documentation for detailed steps on adding platforms:
[https://capacitorjs.com/docs/getting-started](https://capacitorjs.com/docs/getting-started)

## 5. Desktop Deployment

Lupine.js uses **Electron** to build cross-platform desktop applications.

### Desktop Structure

When you create a new Lupine project, it automatically includes an `electron` directory (e.g., `apps/your-app/electron`), which contains the necessary main process code and resources for the desktop app.

- Your Web code runs directly as the Electron renderer process.
- `lupine.components` automatically detects the runtime environment and adapts the UI for desktop (e.g., hiding unnecessary mobile tabs).

### Build Commands

`package.json` provides preset build scripts for compiling installers for different platforms:

```bash
# Windows
npm run app1:build-win

# Linux
npm run app1:build-linux

# macOS
npm run app1:build-mac
```

You can find and customize these commands in the `scripts` section of your `package.json`.
