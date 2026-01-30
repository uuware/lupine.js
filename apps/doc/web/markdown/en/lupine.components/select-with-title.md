---
title: SelectWithTitle
---

# SelectWithTitle

Dropdown select list combined with a title.

## Implementation Example

```typescript
import { SelectWithTitle } from 'lupine.components';

const options = [
  { option: 'Option 1', value: '1' },
  { option: 'Option 2', value: '2', selected: true },
];

const select = SelectWithTitle('Select Level', options, (value) => {
  console.log('Selected value:', value);
});
```
