---
title: DynamicalLoad
---

# DynamicalLoad

Dynamically load external Scripts or CSS files. Used for lazy loading third-party SDKs.

**Usage Example (from `wx-share.ts`):**

```typescript
import { DynamicalLoad } from 'lupine.components';

// Load WeChat JS-SDK dynamically
if (typeof wx === 'undefined') {
  await DynamicalLoad.loadScript('//res.wx.qq.com/open/js/jweixin-1.6.0.js', 'jweixin');
}
```
