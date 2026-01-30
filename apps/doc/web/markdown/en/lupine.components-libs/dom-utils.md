---
title: DomUtils
---

# DomUtils

Helper functions for common DOM operations, mostly shorthand for `querySelector`.

**Usage Example (from `admin-resources.tsx`):**

```typescript
import { DomUtils } from 'lupine.components';

// Get input value
const value = DomUtils.getValue('#my-input');

// Trigger click on a hidden file input
const fDom = DomUtils.bySelector('.up-file') as HTMLInputElement;
fDom.click();
```
