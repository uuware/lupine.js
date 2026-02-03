---
title: Page Router
---

# Page Router

The `PageRouter` in **Lupine.web** is a powerful client-side routing system designed to be **isomorphic** in logic to the backend `ApiRouter` (in `lupine.api`). It supports nested routing, middleware filters, dynamic parameters, and layout frames.

## 1. ⚖️ Versus Other Frameworks

Compared to generic routers (like `react-router` or `vue-router`):

- **Logic Parity**: It shares the exact same routing philosophy as the backend `ApiRouter`. If you know how to write a backend API in Lupine, you know how to write a frontend route.
- **True Nesting**: You can mount a full `PageRouter` instance onto a specific path of another router (e.g., `router.use('/user', userRouter)`), enabling true modularity.
- **Built-in Layouts**: `setFramePage` treats layouts as first-class citizens, injecting content into a specific placeholder class.

## 2. 🐣 Basic Usage

The simplest way to start is to map paths to Page Components.

```tsx
import { PageRouter, bindRouter } from 'lupine.web';

// 1. Create Router
const pageRouter = new PageRouter();

// 2. Define Routes
pageRouter.use('/home', HomePage);
pageRouter.use('/about', AboutPage);
// Wildcard for 404
pageRouter.use('*', NotFoundPage);

// 3. Bind to the System
bindRouter(pageRouter);
```

## 3. 🔧 Dynamic Parameters

Lupine supports both mandatory and optional parameters directly in the URL string. All captured parameters are available in `props.urlParameters`.

### Syntax

- `/:id` : Mandatory parameter.
- `/?id` : Optional parameter. (All subsequent parameters must also be optional).
- `?key=value` : Standard query strings are also supported (parsed separately).

### Example

```tsx
// Define:
pageRouter.use('/share/:type/:id/', ShareContentPage);

// Usage inside ShareContentPage:
export const ShareContentPage = (props: PageProps) => {
  // Access parameters
  const type = props.urlParameters['type'];
  const id = props.urlParameters['id'];

  return (
    <div>
      Viewing {type} with ID: {id}
    </div>
  );
};
```

## 4. 🚀 Advanced Features

### 4.1 🎎 Nested Routers (Modularity)

You can break your application into sub-modules.

```tsx
// 1. Create a sub-router for User Profile area
const userPageRouter = new PageRouter();
userPageRouter.use('/profile', UserProfilePage);
userPageRouter.use('/settings', UserSettingsPage);

// 2. Mount it to the main router under '/user'
const mainRouter = new PageRouter();
mainRouter.use('/user', userPageRouter);

// Now URLs are: /user/profile, /user/settings
```

### 4.2 🛡️ Middleware Filters (Auth)

You can attach a "Filter" function that runs before _any_ route resolution. If the filter handles the request (e.g., redirects to login) or returns a node, routing stops. If it returns `null`, routing continues.

```tsx
// Global Filter
pageRouter.setFilter(checkAgreement);

// Route-Specific Filter (Middleware Pattern)
const checkAuth = async (props) => {
  if (!isLoggedIn()) {
    // Render Login Page or Redirect
    return <LoginPage />;
  }
  return null; // Continue to next handler
};

// Usage: checkAuth runs first, then UserMinePage
userPageRouter.use('/mine', checkAuth, UserMinePage);
```

### 4.3 🖼️ Frame Pages (Layouts)

Unlike React Router where you nest `<Outlet />`, Lupine uses a `setFramePage` method to define a "Wrapper" or "Layout" for all routes within that Router.

```tsx
// 1. Define the Frame
const TopFrame = (placeholderClass, childNode) => {
  return (
    <div class='app-container'>
      <Header />
      <Sidebar />
      {/* Content injection point */}
      <div class={placeholderClass}>{childNode}</div>
    </div>
  );
};

// 2. Apply to Router
const pageRouter = new PageRouter();
pageRouter.setFramePage({
  component: TopFrame,
  placeholderClassname: 'app-content-area', // matches class above
});

pageRouter.use('/dashboard', DashboardPage);
// Result: DashboardPage is rendered INSIDE TopFrame's 'app-content-area' div.
```

### 4.4 📂 Sub-Directory Deployment

If your app is deployed to `example.com/my-app/`, you need to tell the router to ignore the `/my-app` prefix.

```typescript
// If physical path exists, router needs to know to ignore it
pageRouter.setSubDir('/my-app');
```
