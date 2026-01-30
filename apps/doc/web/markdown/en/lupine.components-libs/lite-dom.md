---
title: LiteDom
---

# LiteDom

A lightweight, chainable DOM wrapper similar to jQuery.

**Usage:**

```typescript
import { LiteDom } from 'lupine.components';

const el = new LiteDom('#my-element');
el.css('color', 'red')
  .html('Hello World')
  .on('click', () => {
    console.log('Clicked!');
  });
```
