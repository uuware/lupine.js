---
title: Action Sheet
---

# Action Sheet

A sliding window from the bottom on mobile devices, used for displaying new pages or setting options.

## Implementation Example

```typescript
import { ActionSheetSelect, NotificationMessage, NotificationColor } from 'lupine.components';

ActionSheetSelect.show({
  title: 'Select Action',
  options: ['Option A', 'Option B', 'Option C'],
  handleClicked: (index, close) => {
    NotificationMessage.sendMessage('Selected index: ' + index, NotificationColor.Success);
    close();
  },
});
```
