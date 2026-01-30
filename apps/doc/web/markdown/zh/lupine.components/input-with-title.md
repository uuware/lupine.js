---
title: InputWithTitle (带标题的输入框)
---

# InputWithTitle (带标题的输入框)

带标题的输入框组合。

## 实装例子

```typescript
import { InputWithTitle } from 'lupine.components';

const input = InputWithTitle('用户名', '请输入您的姓名', (value) => {
  console.log('输入内容:', value);
});
```
