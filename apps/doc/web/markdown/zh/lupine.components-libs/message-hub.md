---
title: MessageHub
---

# MessageHub

A publish-subscribe event bus for communication between components.

**Usage Example (from `admin-test-animations.tsx`):**

```typescript
import { MessageHub, MessageHubData } from 'lupine.components';

const hub = new MessageHub();

// Subscribe to messages
hub.subscribe('test-event', (data: any) => {
  console.log('Received:', data);
});

// Send message
hub.send('test-event', { text: 'Hello' });
```
