---
title: SelectWithTitle (带标题的下拉列表)
---

# SelectWithTitle (带标题的下拉列表)

带标题的下拉选择列表。

## 实装例子

```typescript
import { SelectWithTitle } from 'lupine.components';

const options = [
  { option: '选项 1', value: '1' },
  { option: '选项 2', value: '2', selected: true },
];

const select = SelectWithTitle('请选择等级', options, (value) => {
  console.log('选择了:', value);
});
```
