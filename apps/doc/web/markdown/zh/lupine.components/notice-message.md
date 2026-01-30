---
title: NoticeMessage (通知消息)
---

# NoticeMessage (通知消息)

一个很常用的核心组件，用于在页面顶部显示全局通知消息。支持多种颜色等级。

## 实装例子

```typescript
import { NotificationMessage, NotificationColor } from 'lupine.components';

// 成功通知
NotificationMessage.sendMessage('数据已保存', NotificationColor.Success);

// 错误通知 (永久显示)
NotificationMessage.sendMessage('网络异常，请检查', NotificationColor.Error, true);
```
