---
title: FloatWindow
---

# FloatWindow

A draggable popup window. Supports modal and non-modal modes.

## Implementation Example

```typescript
import { FloatWindow } from 'lupine.components';

// Show a non-modal window
FloatWindow.show({
  title: 'Toolbox',
  buttons: ['OK'],
  handleClicked: (index, close) => {
    close();
  },
  children: <div>This is the content of a non-modal float window.</div>,
  noModal: true,
});
```
