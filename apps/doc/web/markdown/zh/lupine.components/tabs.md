---
title: Tabs (选项卡)
---

# Tabs (选项卡)

标准的选项卡组件，用于在同一区域切换不同内容。

## 实装例子

```typescript
import { Tabs, TabsPageProps } from 'lupine.components';

const pages: TabsPageProps[] = [
  { title: '概览', children: <Overview /> },
  { title: '详情', children: <Details /> },
];

<Tabs pages={pages} pagePadding='16px' />;
```
