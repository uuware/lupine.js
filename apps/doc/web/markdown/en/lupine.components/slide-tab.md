---
title: SlideTab
---

# SlideTab

Auto-switching tab component with sliding support.

## Implementation Example

```typescript
import { SlideTab } from 'lupine.components';

const items = [
  { title: 'Slide 1', children: <div>Content 1</div> },
  { title: 'Slide 2', children: <div>Content 2</div> },
];

<SlideTab items={items} autoPlay={true} interval={3000} />;
```
