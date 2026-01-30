---
title: DragUtil
---

# DragUtil

Helper for implementing drag-and-drop or touch-move functionality.

**Usage:**

```typescript
import { createDragUtil } from 'lupine.components';

const dragUtil = createDragUtil();
dragUtil.setOnMoveCallback((clientX, clientY, movedX, movedY) => {
  console.log(`Moved by ${movedX}, ${movedY}`);
  // Update element position here
});

// Bind to events
<div onMouseDown={dragUtil.onMouseDown} onMouseMove={dragUtil.onMouseMove} onMouseUp={dragUtil.onMouseUp}>
  Drag Me
</div>;
```
