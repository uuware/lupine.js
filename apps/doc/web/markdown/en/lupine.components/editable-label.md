---
title: EditableLabel
---

# EditableLabel

Label that becomes editable on double-click and triggers a save event on blur.

## Implementation Example

```typescript
import { EditableLabel } from 'lupine.components';

<EditableLabel
  value='Click to edit me'
  onSave={(newValue) => {
    console.log('Saved new value:', newValue);
  }}
/>;
```
