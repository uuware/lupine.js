---
title: API 参考
---

### 🏗️ 架构与工作流 (Architecture & Workflow)

Lupine.js 运行一个单例服务器实例，可以同时服务多个域名和应用程序。

**1. 应用定义 (App Definition)**
应用在 `.env` 文件中通过 `APPS` 变量定义（例如 `APPS=doc,demo.app`）。域名映射也在 `.env` 中配置（例如 `DOMAINS@demo.app=example.com`）。

**2. 编译 (Compilation)**
在构建/开发期间，`dev-watch.js` 读取每个应用目录下的 `lupine.json` 以找到 `webEntryPoints` 并进行编译。

**3. 请求流程 (Request Flow)**
当请求到达时：

1.  **应用解析**: `AppHelper` 根据请求的主机名识别目标应用。
2.  **模块加载**: 加载对应的 `ApiModule` (在 `api/src/index.ts` 中定义)。
3.  **路由**: `RootApi` 尝试匹配 API 路由。如果未匹配，则回退到 `StaticServer`。

**4. 静态服务与 SSR**
`StaticServer`:

- 检查请求的静态文件是否存在。
- 如果未找到，它将触发 **SSR** (`serverSideRenderPage`)。

这确保了一个单一入口点可以无缝处理 API、静态资源和 SSR 页面生成。

后端服务的主模块。每一个有后端的 App 都必须实装一个 `ApiModule`。

```typescript
import { ApiModule } from 'lupine.api';
import { RootApi } from './service/root-api';

export const apiModule = new ApiModule(new RootApi());
```

### 🌳 RootApi 与 StaticServer

`RootApi` 是应用程序逻辑的入口点。它通常挂载特定的 API 以及 `StaticServer` 来处理文件请求和 SSR 回退。

```typescript
// src/service/root-api.ts
import { IApiBase, ApiRouter, StaticServer } from 'lupine.api';

export class RootApi implements IApiBase {
  protected router = new ApiRouter();

  constructor() {
    this.mountRoutes();
  }

  protected mountRoutes() {
    // 1. 挂载你的 App API
    this.router.use('/api', new Api().getRouter());

    // 2. 挂载静态服务器 (Static Server) (处理静态文件 + SSR)
    // 重要：必须放在最后以捕获非 API 请求
    const staticServer = new StaticServer();
    this.router.use('*', staticServer.processRequest.bind(staticServer));
  }
}
```

### 🏥 健康检查示例 (Health Check)

这是一个简单的 API 端点示例（例如用于健康检查）。

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
    return true; // 返回 true 表示请求已被处理
  }

  public getRouter() {
    return this.router;
  }
}
```
