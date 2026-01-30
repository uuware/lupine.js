---
title: SimpleStorage
---

# SimpleStorage

A wrapper for `localStorage` (or similar key-value storage) offering typed getters.

**Usage:**

```typescript
import { SimpleStorage } from 'lupine.components';

// Assuming initialized with some storage object like localStorage
const storage = new SimpleStorage(localStorage as any);

storage.set('theme', 'dark');
const theme = storage.get('theme', 'light'); // returns 'dark'
const isDebug = storage.getBoolean('debug', false);
```
