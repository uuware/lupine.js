---
title: PagingLink
---

# PagingLink

Pagination component for displaying and navigating to different page numbers.

## Implementation Example

```typescript
import { PagingLink } from 'lupine.components';

<PagingLink
  totalCount={100}
  pageSize={10}
  currentPage={1}
  onPageChange={(page) => console.log('Navigate to page:', page)}
/>;
```
