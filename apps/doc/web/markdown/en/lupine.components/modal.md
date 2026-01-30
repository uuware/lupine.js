---
title: Modal
---

# Modal

A popup window with or without modal effect, used for blocking interactions. It is draggable.

## Implementation Example

```typescript
import { ModalWindow } from 'lupine.components';

ModalWindow.show({
  title: 'Notification',
  buttons: ['OK', 'Cancel'],
  closeWhenClickOutside: true,
  contentMinWidth: '300px',
  handleClicked: (index, close) => {
    console.log('Button index clicked:', index);
    close();
  },
  children: <div>This is the content of a modal dialog.</div>,
});
```
