---
title: Modal (模态框)
---

# Modal (模态框)

一个具有 Modal 或无 Modal 效果的弹出窗口，常用于阻塞式交互。可以拖动。

## 实装例子

```typescript
import { ModalWindow } from 'lupine.components';

ModalWindow.show({
  title: '提示',
  buttons: ['好的', '取消'],
  closeWhenClickOutside: true,
  contentMinWidth: '300px',
  handleClicked: (index, close) => {
    console.log('点击了索引:', index);
    close();
  },
  children: <div>这是一个模态对话框的内容。</div>,
});
```
