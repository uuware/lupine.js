---
title: PagingLink (分页链接)
---

# PagingLink (分页链接)

分页组件，用于展示和跳转到不同页码。

## 实装例子

```typescript
import { PagingLink } from 'lupine.components';

<PagingLink totalCount={100} pageSize={10} currentPage={1} onPageChange={(page) => console.log('跳转到页码:', page)} />;
```
