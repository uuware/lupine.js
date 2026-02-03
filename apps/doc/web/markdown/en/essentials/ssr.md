---
title: Server Side Rendering (SSR)
---

# Server Side Rendering (SSR)

Lupine.js was designed from scratch with **Server-Side Rendering (SSR)** as a first-class citizen. Unlike many SPA frameworks where SSR is an afterthought or requires complex meta-frameworks (like Next.js for React), Lupine integrates SSR directly into its core architecture (`lupine.api` and `lupine.web`).

## 1. ⚙️ How it Works

When a user requests a URL that doesn't map to a static file (like an image or JS file), the `serverSideRenderPage` function takes over.

### The Flow:

1.  **Request Interception**: The server intercepts the HTTP request.
2.  **Environment Injection**: It injects server-side environment variables (starting with `WEB.`) into the runtime.
3.  **Page Generation**: It calls `_lupineJs.generatePage` to execute your frontend logic **on the server**.
4.  **HTML Construction**: It stitches together the final HTML, including:
    - **Theme & Styles**: Critical CSS and current theme are injected directly, preventing "Flash of Unstyled Content" (FOUC).
    - **Meta Data**: SEO titles and descriptions are calculated and inserted.
    - **State Hydration**: After the page loads, the frontend automatically binds events.

## 2. 🔍 Zero-Configuration SEO

One of the biggest benefits of Lupine's SSR is automatic SEO support. By using components like `MetaData`, your page tells search engines exactly what they need to know **before** any JavaScript runs on the client.

### Example: Social Sharing (OpenGraph)

In `share-content.tsx`, you can dynamically set meta tags based on the content being viewed:

```tsx
export const ShareContentPage = async (props: PageProps) => {
  // 1. Fetch data (works on server too!)
  const record = await fetchRecord(props.urlParameters['id']);

  // 2. Define SEO/Social Metadata
  return (
    <div>
      <MetaData property='og:title' content={record.title} />
      <MetaData property='og:description' content={record.description} />
      <MetaData property='og:image' content={record.imageUrl} />
      <MetaData property='og:url' content={props.url} />

      <h1>{record.title}</h1>
      {/* ... content ... */}
    </div>
  );
};
```

## 3. 🛠️ Environment Variables

Lupine automatically bridges your server environment to your frontend.

### Defining Variables

In your `.env` file, variables starting with `WEB.` are marked for the frontend:

```ini
# .env
WEB.API_BASE_URL=https://api.example.com
WEB.SITE_NAME=My Awesome App
SECRET_KEY=xxxx  <-- This stays on the server!
```

### Accessing Variables

During SSR (and subsequently in the browser), these are available via `getWebEnv()`:

```typescript
// Any component
import { getWebEnv } from 'lupine.web';

const env = getWebEnv();
console.log(env.API_BASE_URL); // "https://api.example.com"
```

## 4. ⚙️ WebConfig: Dynamic Runtime Configuration

Sometimes you need configurations that can change at runtime (like Admin settings for "Max Rows per Page" or "Maintenance Mode") without redeploying. Lupine provides `WebConfig` for this.

**Mechanism:**

1.  **SSR Injection**: On the first page load, the server fetches these configs and injects them into a `<script id="web-setting">` tag.
2.  **Hydration**: `WebConfig.init()` (called automatically) reads this script tag effectively "hydrating" the config synchronously.
3.  **Async Fallback**: If the app runs as a pure SPA (client-side only navigation), `WebConfig.get()` fetches from the API if cache is missing.

### Usage

**Binding the API (Entry Point):**

```tsx
// src/index.tsx
bindWebConfigApi('/api/admin/web-config');
```

**Using Configs (Component):**

```tsx
// admin-poster-page.tsx
const PosterList = async () => {
  // Async access ensures data is ready
  const maxRows = await WebConfig.get('poster_max_rows', 10);
  const category = await WebConfig.get('current_category', 'default');

  // ... use config ...
};
```

> [!IMPORTANT]
> Since `WebConfig` might need to fetch data (on client-side navigation), it is designed as an **Async API**. Always use `await WebConfig.get(...)`.

## 5. ⚡ Intelligent Caching & Performance

Lupine's SSR isn't just about rendering; it's about speed.

- **Template Caching**: The server caches the structure of your `index.html` to minimize file system reads. It identifies "slots" for Title, Meta, CSS, and Content (`packages/lupine.api/src/api/server-render.ts`).
- **CSS & Theme Injection**: By calculating the critical CSS server-side (`generateAllGlobalStyles`), the browser receives a fully styled page instantly. Even if JavaScript is disabled or slow to load, the user sees a perfect UI.
