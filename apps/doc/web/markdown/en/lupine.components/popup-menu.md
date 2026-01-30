---
title: PopupMenu
---

# PopupMenu

Popup menu triggered by click or hover. Used for displaying options.

## Implementation Example

```typescript
import { PopupMenuWithButton } from 'lupine.components';

const options = ['Settings', 'Messages', 'Logout'];

<PopupMenuWithButton label='My Account' list={options} handleSelected={(value) => console.log('Selected:', value)} />;
```
