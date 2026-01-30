---
title: FloatWindow (浮窗)
---

# FloatWindow (浮窗)

一个可以拖动的弹出窗口。支持 Modal 和非 Modal 模式。

## 实装例子

```typescript
import { FloatWindow } from 'lupine.components';

// 显示一个非 Modal 窗口
FloatWindow.show({
  title: '工具箱',
  buttons: ['OK'],
  handleClicked: (index, close) => {
    close();
  },
  children: <div>这是一个非 Modal 的浮动窗口内容。</div>,
  noModal: true,
});
```
