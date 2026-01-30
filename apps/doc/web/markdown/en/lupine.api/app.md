---
title: Server
---

# Server (`src/app`)

The server component is responsible for handling incoming network requests, managing SSL certificates, and dispatching requests to the appropriate application based on domain configuration. It supports clustering logic to utilize multi-core CPUs efficiently.

## Key Features

- **Multi-App & Multi-Domain**: Host multiple independent applications on a single server instance, routing traffic based on domain names.
- **Cluster Support**: Automatically forks worker processes to match CPU cores for high performance.
- **SSL/TLS**: Built-in support for HTTPS with custom certificate paths.
- **Environment Management**: Loads configuration from `.env` files.

## Usage Example

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
