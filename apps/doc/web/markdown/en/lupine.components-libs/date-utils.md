---
title: DateUtils
---

# DateUtils

Comprehensive date manipulation utilities.

**Usage:**

```typescript
import { DateUtils } from 'lupine.components';

const now = DateUtils.now();
const date = DateUtils.toDate('2023-01-01T12:00:00Z');
const ymd = DateUtils.toYMD(date, '/'); // 2023/01/01
const formatted = DateUtils.format(date, 'YYYY-MM-DD hh:mm:ss');

// Difference between two dates
const diff = DateUtils.diffString(new Date(), date);
console.log(diff); // e.g., "2 day(s), 4 hour(s)"
```
