---
title: API Reference
---

# API Reference

## Lupine.api (Backend)

### 🏗️ Architecture & Workflow

Lupine.js runs a single server instance that can serve multiple domains and applications simultaneously.

**1. App Definition**
Apps are defined in the `.env` file via the `APPS` variable (e.g., `APPS=doc,demo.app`). Domain mapping is also configured here (e.g., `DOMAINS@demo.app=example.com`).

**2. Compilation**
During build/dev, `dev-watch.js` reads `lupine.json` in each app directory to find `webEntryPoints` and compiles them.

**3. Request Flow**
When a request arrives:

1.  **App Resolution**: `AppHelper` identifies the target App based on the request hostname.
2.  **Module Loading**: It loads the corresponding `ApiModule` (defined in `api/src/index.ts`).
3.  **Routing**: The `RootApi` tries to match API routes. If no match, it falls back to `StaticServer`.

**4. Static Server & SSR**
The `StaticServer`:

- Checks if a static file exists.
- If NOT found, it triggers **SSR** (`serverSideRenderPage`).

This ensures a single entry point seamlessly handles APIs, Static Assets, and SSR.

### 📡 ApiModule

Main module for the backend service. Each app with a backend must implement an `ApiModule`.

```typescript
import { ApiModule } from 'lupine.api';
import { RootApi } from './service/root-api';

export const apiModule = new ApiModule(new RootApi());
```

### 🌳 RootApi & StaticServer

The `RootApi` is the entry point for your application's logic. It typically mounts your specific APIs and the `StaticServer` to handle file requests and SSR fallback.

```typescript
// src/service/root-api.ts
import { IApiBase, ApiRouter, StaticServer } from 'lupine.api';

export class RootApi implements IApiBase {
  protected router = new ApiRouter();

  constructor() {
    this.mountRoutes();
  }

  protected mountRoutes() {
    // 1. Mount your App API
    this.router.use('/api', new Api().getRouter());

    // 2. Mount Static Server (Handles static files + SSR)
    // IMPORTANT: Must be last to catch non-API requests
    const staticServer = new StaticServer();
    this.router.use('*', staticServer.processRequest.bind(staticServer));
  }
}
```

### 🏥 Health Check Example

Here is a simple example of an API endpoint (e.g., for health checks).

```typescript
// src/service/api.ts
import { IApiBase, ApiRouter, ServerRequest } from 'lupine.api';
import { ServerResponse } from 'http';

export class Api implements IApiBase {
  protected router = new ApiRouter();

  constructor() {
    this.router.use('/health-check', this.healthCheck.bind(this));
  }

  async healthCheck(req: ServerRequest, res: ServerResponse) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ status: 'OK', uptime: process.uptime() }));
    res.end();
    return true; // Return true to indicate request was handled
  }

  public getRouter() {
    return this.router;
  }
}
```
