# lupine.api

lupine.api is a fast, lightweight, and flexible node.js based server framework. It is designed to work seamlessly with [lupine.web](https://github.com/uuware/lupine.web) to provide Server-Side Rendering (SSR) and modern API capabilities.

The project consists of two main parts:

1.  **Server (`src/app`)**: A robust HTTP/HTTPS server that manages multiple applications, domains, and processes.
2.  **API Module (`src/api`)**: A framework for building the backend logic for individual applications.

---

## Server (`src/app`)

The server component is responsible for handling incoming network requests, managing SSL certificates, and dispatching requests to the appropriate application based on domain configuration. It supports clustering logic to utilize multi-core CPUs efficiently.

### Key Features

- **Multi-App & Multi-Domain**: Host multiple independent applications on a single server instance, routing traffic based on domain names.
- **Cluster Support**: Automatically forks worker processes to match CPU cores for high performance.
- **SSL/TLS**: Built-in support for HTTPS with custom certificate paths.
- **Environment Management**: Loads configuration from `.env` files.

### Usage Example

See `apps/server/src/index.ts` for a complete example.

```typescript
import { appStart, loadEnv, ServerEnvKeys } from 'lupine.api';
import * as path from 'path';

const initAndStartServer = async () => {
  // 1. Load Environment Variables
  await loadEnv('.env');

  // 2. Configure Applications
  const serverRootPath = path.resolve(process.env[ServerEnvKeys.SERVER_ROOT_PATH]!);
  const webRootMap = [
    {
      appName: 'demo.app',
      hosts: ['localhost', 'example.com'],
      // Standard directory structure expected by lupine.api
      webPath: path.join(serverRootPath, 'demo.app_web'),
      dataPath: path.join(serverRootPath, 'demo.app_data'),
      apiPath: path.join(serverRootPath, 'demo.app_api'),
      dbType: 'sqlite',
      dbConfig: { filename: 'sqlite3.db' },
    },
  ];

  // 3. Start Server
  await appStart.start({
    debug: process.env.NODE_ENV === 'development',
    apiConfig: {
      serverRoot: serverRootPath,
      webHostMap: webRootMap,
    },
    serverConfig: {
      httpPort: 8080,
      httpsPort: 8443,
      // sslKeyPath: '...',
      // sslCrtPath: '...',
    },
  });
};

initAndStartServer();
```

---

## API Module (`src/api`)

The API Module provides the framework for writing the business logic of your application. It acts similarly to Express.js but is optimized for the lupine ecosystem.

### Key Features

- **ApiRouter**: A flexible router supporting GET, POST, and middleware-like filters.
- **Context Isolation**: Uses `AsyncStorage` to safely manage request-scoped data (like sessions or database transactions) across async operations.
- **Database Integration**: Built-in helpers for database connections (e.g., SQLite via `better-sqlite3`).

### Usage Example

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

### Dashboard

lupine.api includes a built-in extensible dashboard for managing your services.
Detailed documentation can be found in [README-dashboard.md](README-dashboard.md).
