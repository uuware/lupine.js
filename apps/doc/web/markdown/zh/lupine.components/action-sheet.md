---
title: Action Sheet (动作列表)
---

# Action Sheet (动作列表)

手机端弹出的滑动窗口，用于显示一个新页或设定选项等。

## 实装例子

```typescript
import { ActionSheetSelect, NotificationMessage, NotificationColor } from 'lupine.components';

ActionSheetSelect.show({
  title: '选择操作',
  options: ['选项 A', '选项 B', '选项 C'],
  handleClicked: (index, close) => {
    NotificationMessage.sendMessage('您选择了: ' + index, NotificationColor.Success);
    close();
  },
});
```
