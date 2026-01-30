---
title: downloadStream
---

# downloadStream

Download a `Blob` as a file by creating a temporary anchor tag.

**Usage Example (from `admin-resources.tsx`):**

```typescript
import { downloadStream } from 'lupine.components';

const onDownload = async (name: string) => {
  const response = await fetch('/api/download?file=' + name);
  const blob = await response.blob();
  downloadStream(blob, name);
};
```
