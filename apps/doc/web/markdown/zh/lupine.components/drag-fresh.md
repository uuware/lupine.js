---
title: DragFresh (拖动刷新)
---

# DragFresh (拖动刷新)

拖动刷新组件，常用于移动端列表顶部。

## 实装例子

```typescript
import { DragFresh } from 'lupine.components';

<DragFresh
  onRefresh={async () => {
    // 执行刷新逻辑
    await fetchData();
  }}
>
  <ListContent />
</DragFresh>;
```
