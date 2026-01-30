---
title: formatBytes
---

# formatBytes

Format file size in bytes into human-readable strings (KB, MB, GB, etc.).

**Usage Example (from `admin-resources.tsx`):**

```typescript
import { formatBytes } from 'lupine.components';

const sizeStr = formatBytes(1024 * 1024 * 5); // "5 MB"
const sizeStr2 = formatBytes(123456); // "120.56 KB"
```
