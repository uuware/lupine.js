---
title: API 参考
---

# API 参考

LupineJS 为 Web 和服务器开发提供了一套极简的 API。

## Lupine.web (前端)

### `bindRouter`

将页面路由绑定到应用程序。

```typescript
import { bindRouter, PageRouter } from 'lupine.components';
const pageRouter = new PageRouter();
pageRouter.use('/', HomePage);
bindRouter(pageRouter);
```

### `bindTheme`

绑定主题配置。

```typescript
import { bindTheme } from 'lupine.components';
bindTheme('light', themes);
```

### `bindLang`

绑定多语言支持。

```typescript
import { bindLang } from 'lupine.components';
bindLang('en', { en, zh });
```

## Lupine.api (后端)

### `ApiModule`

后端服务的主模块。

```typescript
import { ApiModule } from 'lupine.api';
export const apiModule = new ApiModule(new RootApi());
```
