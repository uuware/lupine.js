---
title: SwitchOption (切换选项)
---

# SwitchOption (切换选项)

切换选项组件。可以在两个文字选项之间切换。

## 实装例子

```typescript
import { SwitchOption } from 'lupine.components';

<SwitchOption options={['选项 1', '选项 2']} onChanged={(index) => console.log('当前索引:', index)} />;
```
