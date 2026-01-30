---
title: Menubar
---

# Menubar

Horizontal navigation bar with dropdown support.

## Implementation Example

```typescript
import { Menubar } from 'lupine.components';

const menuItems = [
  { text: 'Home', link: '/' },
  {
    text: 'Products',
    children: [
      { text: 'LupineJS', link: '/lupine' },
      { text: 'Components', link: '/components' },
    ],
  },
];

<Menubar items={menuItems} />;
```
