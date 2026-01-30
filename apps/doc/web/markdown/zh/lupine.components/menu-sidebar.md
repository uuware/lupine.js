---
title: MenuSidebar (侧边导航栏)
---

# MenuSidebar (侧边导航栏)

纵向导航菜单，支持多级目录，适配桌面与移动端。

## 实装例子

```typescript
import { MenuSidebar } from 'lupine.components';

const adminMenu = [
  { text: '仪表盘', icon: 'dashboard', onClick: () => navigate('/admin') },
  { text: '内容管理', icon: 'content', children: [
      { text: '文章列表', onClick: () => navigate('/articles') },
      { text: '分类管理', onClick: () => navigate('/categories') }
  ]}
];

// 移动端菜单
<MenuSidebar items={adminMenu} mobileMenu={true} />

// 桌面端左侧菜单
<MenuSidebar items={adminMenu} desktopMenu={true} />
```
