---
title: Tabs
---

# Tabs

Standard tab component for switching between different content in the same area.

## Implementation Example

```typescript
import { Tabs, TabsPageProps } from 'lupine.components';

const pages: TabsPageProps[] = [
  { title: 'Overview', children: <Overview /> },
  { title: 'Details', children: <Details /> },
];

<Tabs pages={pages} pagePadding='16px' />;
```
