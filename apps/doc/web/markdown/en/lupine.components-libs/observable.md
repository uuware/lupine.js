---
title: Observable
---

# Observable

Implementation of the Observable pattern, inspired by RxJS.

**Usage:**

```typescript
import { Subject } from 'lupine.components';

const subject = new Subject<string>();

const subscription = subject.subscribe((value) => {
  console.log('Observer A received:', value);
});

subject.next('Hello');
subject.next('World');

subscription.unsubscribe();
```
