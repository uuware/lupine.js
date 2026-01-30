---
title: PopupMenu (弹出菜单)
---

# PopupMenu (弹出菜单)

弹出式菜单，点击或悬停触发。用于显示选项。

## 实装例子

```typescript
import { PopupMenuWithButton } from 'lupine.components';

const list = ['个人设置', '消息中心', '退出登录'];

<PopupMenuWithButton label='我的账户' list={list} handleSelected={(value) => console.log('选择了:', value)} />;
```
