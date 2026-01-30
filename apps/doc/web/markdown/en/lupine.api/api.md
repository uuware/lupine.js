---
title: API Module
---

# API Module (`src/api`)

The API Module provides the framework for writing the business logic of your application. It acts similarly to Express.js but is optimized for the lupine ecosystem.

## Key Features

- **ApiRouter**: A flexible router supporting GET, POST, and middleware-like filters.
- **Context Isolation**: Uses `AsyncStorage` to safely manage request-scoped data (like sessions or database transactions) across async operations.
- **Database Integration**: Built-in helpers for database connections (e.g., SQLite via `better-sqlite3`).

## Usage Example

An application's API entry point (e.g., `apps/demo.app/api/src/index.ts`) typically exports an instance of `ApiModule`.

**1. Entry Point (`index.ts`):**

```typescript
import { ApiModule } from 'lupine.api';
import { RootApi } from './service/root-api';

// Export apiModule so the server can load it dynamically
export const apiModule = new ApiModule(new RootApi());
```

**2. Root API Service (`service/root-api.ts`):**

```typescript
import { ApiRouter, IApiBase, IApiRouter } from 'lupine.api';

export class RootApi implements IApiBase {
  getRouter(): IApiRouter {
    const router = new ApiRouter();

    // Define routes
    router.get('/hello', async (req, res) => {
      res.write(JSON.stringify({ message: 'Hello World' }));
      res.end();
      return true; // Return true to indicate request was handled
    });

    // Sub-routers can be mounted
    // router.use('/users', new UserApi().getRouter());

    return router;
  }
}
```
