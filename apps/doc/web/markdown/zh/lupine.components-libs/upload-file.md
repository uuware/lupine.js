---
title: uploadFile
---

# uploadFile

Handle file uploads with chunking support, progress tracking, and retries.

**Usage Example (from `admin-resources.tsx`):**

```typescript
import { uploadFile } from 'lupine.components';

const onUploadProgress = (percentage: number, chunkNumber: number, totalChunks: number) => {
  console.log(`Progress: ${percentage * 100}%`);
};

const onFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const result = await uploadFile(file, '/api/upload?name=' + file.name, onUploadProgress);

  if (result === true) {
    console.log('Upload success');
  }
};
```
