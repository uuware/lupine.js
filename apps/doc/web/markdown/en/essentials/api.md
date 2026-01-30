---
title: API Reference
---

# API Reference

LupineJS provides a minimalist set of APIs for both web and server development.

## Lupine.web (Frontend)

### `bindRouter`

Binds the page router to the application.

```typescript
import { bindRouter, PageRouter } from 'lupine.components';
const pageRouter = new PageRouter();
pageRouter.use('/', HomePage);
bindRouter(pageRouter);
```

### `bindTheme`

Binds theme configurations.

```typescript
import { bindTheme } from 'lupine.components';
bindTheme('light', themes);
```

### `bindLang`

Binds multi-language support.

```typescript
import { bindLang } from 'lupine.components';
bindLang('en', { en, zh });
```

## Lupine.api (Backend)

### `ApiModule`

Main module for the backend service.

```typescript
import { ApiModule } from 'lupine.api';
export const apiModule = new ApiModule(new RootApi());
```
