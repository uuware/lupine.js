---
title: MenuSidebar
---

# MenuSidebar

Vertical sidebar menu with multi-level support, desktop and mobile adaptive.

## Implementation Example

```typescript
import { MenuSidebar } from 'lupine.components';

const myMenu = [
  { text: 'Dashboard', icon: 'dashboard', onClick: () => navigate('/admin') },
  {
    text: 'Settings',
    icon: 'settings',
    children: [
      { text: 'Profile', onClick: () => navigate('/profile') },
      { text: 'Security', onClick: () => navigate('/security') },
    ],
  },
];

<MenuSidebar items={myMenu} desktopMenu={true} />;
```
