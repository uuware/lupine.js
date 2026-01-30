---
title: MessageBox (消息框)
---

# MessageBox (消息框)

预定义的对话框（如 Yes/No, Ok/Cancel），用于快速提示。

## 实装例子

```typescript
import { MessageBox, MessageBoxButtonProps } from 'lupine.components';

MessageBox.show({
  title: '删除确认',
  buttonType: MessageBoxButtonProps.YesNo,
  contentMinWidth: '200px',
  handleClicked: (index, close) => {
    if (index === 0) {
      // Yes
      console.log('用户选择了确认');
    }
    close();
  },
  children: <div>您确定要删除此项吗？</div>,
});
```
