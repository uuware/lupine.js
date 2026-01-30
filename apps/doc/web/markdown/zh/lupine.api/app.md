---
title: Server (服务器)
---

# Server (`src/app`)

服务器组件负责处理传入的网络请求，管理 SSL 证书，并根据域名配置将请求分发到相应的应用程序。它支持集群逻辑，以高效利用多核 CPU。

## 主要特性 (Key Features)

- **多应用和多域名**: 在单个服务器实例上托管多个独立的应用程序，根据域名路由流量。
- **集群支持**: 自动 fork 工作进程以匹配 CPU 核心数，实现高性能。
- **SSL/TLS**: 内置支持带有自定义证书路径的 HTTPS。
- **环境管理**: 从 `.env` 文件加载配置。

## 使用示例 (Usage Example)

完整示例请参见 `apps/server/src/index.ts`。

```typescript
import { appStart, loadEnv, ServerEnvKeys } from 'lupine.api';
import * as path from 'path';

const initAndStartServer = async () => {
  // 1. 加载环境变量
  await loadEnv('.env');

  // 2. 配置应用程序
  const serverRootPath = path.resolve(process.env[ServerEnvKeys.SERVER_ROOT_PATH]!);
  const webRootMap = [
    {
      appName: 'demo.app',
      hosts: ['localhost', 'example.com'],
      // lupine.api 期望的标准目录结构
      webPath: path.join(serverRootPath, 'demo.app_web'),
      dataPath: path.join(serverRootPath, 'demo.app_data'),
      apiPath: path.join(serverRootPath, 'demo.app_api'),
      dbType: 'sqlite',
      dbConfig: { filename: 'sqlite3.db' },
    },
  ];

  // 3. 启动服务器
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
