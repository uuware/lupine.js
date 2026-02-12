---
title: 'One Codebase, Everywhere: Building Web, Mobile, and Desktop Apps with Lupine.js'
published: true
description: A complete guide to building cross-platform applications using Lupine.js, Capacitor, and Electron.
tags: cross-platform, mobile, desktop, capacitor, electron
series: Practical Guides
---

The "Write Once, Run Everywhere" dream is often promised but rarely delivered without significant compromises. Heavy frameworks, conditional spaghetti code, and poor performance usually plague cross-platform attempts.

**Lupine.js** changes the game. It is designed from the ground up to be a **Universal Framework**. By leveraging **Capacitor** for Mobile and **Electron** for Desktop, you can deploy your application to the Web, iOS, Android, Windows, macOS, and Linux — all from a single TypeScript codebase.

![Lupine.js Architecture](/lupine.js/assets/architecture_cross_platform.png)

In this guide, we will walk through how to take a standard Lupine.js web application and expand it to Mobile and Desktop, using a will be online soon real-world production app **Lupine Sample App** (Sample App) as a reference.

## 1. The Core: A Responsive Web App

Before we touch any native code, we need a responsive web application. Lupine.js makes this easy with built-in responsive tools working alongside its CSS-in-JS engine.

### Responsive Styling

Instead of writing separate CSS files for mobile, use `MediaQueryRange` directly in your component styles:

```tsx
import { MediaQueryRange, CssProps } from 'lupine.web';

const css: CssProps = {
  // Default (Desktop) styles
  padding: '50px',
  fontSize: '18px',

  // Mobile overrides
  [MediaQueryRange.MobileBelow]: {
    padding: '10px',
    fontSize: '14px',
    flexDirection: 'column',
  },
};
```

### Adaptive Frames

For navigation, the `ResponsiveFrame` component automatically switches between a Desktop Top-Menu and a Mobile Bottom-Bar based on the device.

```tsx
<ResponsiveFrame
  desktopHeaderTitle='My App'
  // ... desktop menu items
  mobileBottomMenu={[
    { title: 'Home', icon: <HomeIcon />, link: '/home' },
    { title: 'Me', icon: <UserIcon />, link: '/me' },
  ]}
  mainContent={<PageComponent />}
/>
```

## 2. Going Mobile (iOS & Android)

Lupine.js uses **Capacitor** to wrap your web app into a native mobile binary. This allows you to access native features (Camera, Filesystem) while keeping your web workflow.

### Step 2.1: Setup Capacitor

In your project root, install the necessary dependencies:

```bash
# Core Capacitor libs
npm install @capacitor/cli@latest @capacitor/core@latest
npm install @capacitor/android @capacitor/ios

# Useful plugins (Camera, Filesystem, etc.)
npm install @capacitor/camera @capacitor/filesystem @capacitor/share
npm install @capacitor-community/keep-awake

# Initialize
npx cap init [MyAppName] [com.example.app]
```

### Step 2.2: Add Platforms

```bash
# Add Android
npx cap add android

# Add iOS (requires Xcode on Mac)
npx cap add ios
```

### Step 2.3: Configure Mobile Environment

Mobile apps run from the local file system (`file://`), so they cannot use relative paths for API calls. create a `.env.mobile` file:

```ini
# .env.mobile
WEB.API_BASE_URL=https://api.your-production-site.com
```

### Step 2.4: Build & Sync

Add a script to your `package.json` to build for mobile:

```json
"scripts": {
  "build-mobile": "node ./dev/dev-watch --env=.env.mobile --dev=0 --mobile=1"
}
```

Then build and sync to the native projects:

```bash
npm run build-mobile
npx cap sync
npx cap open android  # Opens Android Studio
```

### Step 2.5: Native Logic (Optional)

You can use the `#if MOBILE` compiler directive to write platform-specific code without bloating your web bundle:

```javascript
// #if MOBILE
import { Camera } from '@capacitor/camera';

const takePhoto = async () => {
  const image = await Camera.getPhoto({ ... });
  // processing...
};
// #else
const takePhoto = async () => {
  alert("Camera not supported on Web!");
};
// #endif
```

## 3. Going Desktop (Windows, Mac, Linux)

For desktop, Lupine.js integrates with **Electron**.

### Structure

Every Lupine project comes with an `electron` folder containing the main process logic.

- `electron/main.js`: The entry point for the Electron app.
- `electron/preload.js`: Bridge for secure communication between Renderer (Web) and Main process.

### Building for Desktop

Lupine allows you to package your app into an `.exe`, `.dmg`, or `.snap` file using `electron-builder`.

Run the build commands provided in `package.json`:

```bash
# Build for Windows
npm run app:build-win

# Build for Mac
npm run app:build-mac
```

The build process will:

1.  Compile your Lupine.js web app into static files.
2.  Bundle these files with the Electron runtime.
3.  Output a standalone installer.

## Conclusion

With **Lupine.js**, you don't need three separate teams for Web, Mobile, and Desktop. You can maintain **one** codebase, use **one** set of components, and deploy everywhere.

Whether you are building a SaaS platform, a consumer app, or an internal tool, Lupine.js gives you the reach of a native app with the speed of web development.
