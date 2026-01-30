---
title: Menubar (横向菜单栏)
---

# Menubar (横向菜单栏)

横向菜单栏，支持二级下拉。

## 实装例子

```typescript
import { Menubar } from 'lupine.components';

const menuItems = [
  { text: '首页', link: '/' },
  {
    text: '产品',
    children: [
      { text: 'LupineJS', link: '/lupine' },
      { text: 'Components', link: '/components' },
    ],
  },
];

<Menubar items={menuItems} />;
```
