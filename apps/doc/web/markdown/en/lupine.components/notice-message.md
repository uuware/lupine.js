---
title: NoticeMessage
---

# NoticeMessage

A core component used to display global notification messages at the top of the page. Supports multiple color levels.

## Implementation Example

```typescript
import { NotificationMessage, NotificationColor } from 'lupine.components';

// Success notification
NotificationMessage.sendMessage('Data saved successfully', NotificationColor.Success);

// Error notification (Permanent)
NotificationMessage.sendMessage('Network error, please check', NotificationColor.Error, true);
```
