---
title: API Module (API 模块)
---

# API Module (`src/api`)

API 模块提供了编写应用程序业务逻辑的框架。它的作用类似于 Express.js，但针对 lupine 生态系统进行了优化。

## 主要特性 (Key Features)

- **ApiRouter**: 一个灵活的路由器，支持 GET、POST 请求以及类似中间件的过滤器。
- **上下文隔离 (Context Isolation)**: 使用 `AsyncStorage` 在异步操作中安全地管理请求范围的数据（如会话或数据库事务）。
- **数据库集成 (Database Integration)**: 内置的数据库连接助手（例如，通过 `better-sqlite3` 连接 SQLite）。

## 使用示例 (Usage Example)

应用程序的 API 入口点（例如 `apps/demo.app/api/src/index.ts`）通常导出 `ApiModule` 的一个实例。

**1. 入口点 (`index.ts`):**

```typescript
import { ApiModule } from 'lupine.api';
import { RootApi } from './service/root-api';

// 导出 apiModule 以便服务器动态加载
export const apiModule = new ApiModule(new RootApi());
```

**2. 根 API 服务 (`service/root-api.ts`):**

```typescript
import { ApiRouter, IApiBase, IApiRouter } from 'lupine.api';

export class RootApi implements IApiBase {
  getRouter(): IApiRouter {
    const router = new ApiRouter();

    // 定义路由
    router.get('/hello', async (req, res) => {
      res.write(JSON.stringify({ message: 'Hello World' }));
      res.end();
      return true; // 返回 true 表示请求已被处理
    });

    // 可以挂载子路由器
    // router.use('/users', new UserApi().getRouter());

    return router;
  }
}
```
