---
title: EditableLabel (可编辑标签)
---

# EditableLabel (可编辑标签)

双击可编辑的标签，光标移出（失焦）时触发保存事件。

## 实装例子

```typescript
import { EditableLabel } from 'lupine.components';

<EditableLabel
  value='点击我试试'
  onSave={(newValue) => {
    console.log('保存新内容:', newValue);
  }}
/>;
```
