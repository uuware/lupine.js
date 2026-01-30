---
title: MessageBox
---

# MessageBox

Predefined dialogs (like Yes/No, Ok/Cancel) for quick alerts.

## Implementation Example

```typescript
import { MessageBox, MessageBoxButtonProps } from 'lupine.components';

MessageBox.show({
  title: 'Delete Confirmation',
  buttonType: MessageBoxButtonProps.YesNo,
  contentMinWidth: '200px',
  handleClicked: (index, close) => {
    if (index === 0) {
      // Yes
      console.log('User confirmed');
    }
    close();
  },
  children: <div>Are you sure you want to delete this item?</div>,
});
```
