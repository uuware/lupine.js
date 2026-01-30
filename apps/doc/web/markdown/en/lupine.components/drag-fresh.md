---
title: DragFresh
---

# DragFresh

Drag-to-refresh component, commonly used at the top of mobile lists.

## Implementation Example

```typescript
import { DragFresh } from 'lupine.components';

<DragFresh
  onRefresh={async () => {
    // Perform refresh logic
    await fetchData();
  }}
>
  <ListContent />
</DragFresh>;
```
