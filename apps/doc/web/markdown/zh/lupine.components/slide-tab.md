---
title: SlideTab (滑动选项卡)
---

# SlideTab (滑动选项卡)

自动切换的 Tab 页面的组件，支持滑动效果。

## 实装例子

```typescript
import { SlideTab } from 'lupine.components';

const items = [
  { title: 'Slide 1', children: <div>内容 1</div> },
  { title: 'Slide 2', children: <div>内容 2</div> },
];

<SlideTab items={items} autoPlay={true} interval={3000} />;
```
