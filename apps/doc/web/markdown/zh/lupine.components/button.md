---
title: Button (按钮)
---

# Button (按钮)

基础按钮，支持多种尺寸和 `button-push` 动画。

## 实装例子

```typescript
import { Button, ButtonSize } from 'lupine.components';

// 不同尺寸的按钮
<Button text='提交' size={ButtonSize.Large} onClick={() => {}} />
<Button text='搜索' size={ButtonSize.Medium} onClick={() => {}} />
<Button text='取消' size={ButtonSize.Small} onClick={() => {}} />
```
