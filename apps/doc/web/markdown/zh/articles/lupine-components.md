# 告别四处找轮子！只需要 7kb 内核，这个神仙级前端开源组件库必须收藏

日常的前端开发中，我们常常陷入这样的尴尬境地：为了实现一个小小的侧边抽屉菜单（Side Menu），或者一个可拖拽的分割面板（Splitter），我们不得不引入庞大的 UI 组件库（如 Ant Design、Element UI 等），甚至四处寻找年久失修的第三方 npm 包拼凑。项目体积越来越臃肿，甚至不同库之间的样式还会打架。

只有 7kb 内核的 **Lupine.js**，能给您带来哪些开发的便利呢？

**Lupine.js** 是一个 **轻量级** 的 **全栈** Web 框架，它结合了 **类 React** 的前端体验和 **类 Express** 的后端架构，旨在实现极致的速度、简洁和高效。为了加速开发者的开发效率，Lupine.js 除了提供了页面路由、黑白主题等必备功能，还提供了极其丰富且开箱即用的组件库 —— **Lupine.components**。不仅全面覆盖了桌面端，还原生考虑了移动端的常见交互场景。

今天，就带大家盘点一下 Lupine.components 里那些让人相见恨晚的“宝藏”组件。

---

## 🎨 涵盖 90% 日常业务的基础与表单组件

不再需要引入别的基础 UI 库，Lupine.js 把最常用的物料都准备好了。

### 1. 灵活的输入与表单 (Form & Input)

![Lupine.Press](/lupine.js/assets/components-input.png)

- 除了常规的各种 `Input`，它还内置了开箱即用的**数字输入框 (Number Input)**、**标签输入框 (Tag Input)**、和**搜索框 (Search Input)**。
- 如果你的业务需要复杂的筛选，内置的 **级联选择器 (Cascader)**、**范围选择条 (Range Input)**、甚至带有仪表盘风格的 **Gauge / Dial Input** 绝对能让你眼前一亮。
- 还有贴心的两种 **时间选择器 (Time Picker)** 和 **日期选择器 (Date Picker)**。

### 2. 基础组件家族 (Basic Components)

丰富的按钮形态不说，像 **微调开关 (Toggle Switch/Button)**、**徽标 (Badge)**、**加载动画 (Spinner)**、**星级打分 (Stars Input)** 都在这一应俱全。想要实现点击复制功能？内置了现成的 **文本复制按钮 (Copy Button)**。

---

## 📱 原生照顾移动端：导航与菜单 (Navigation & Menu)

做过响应式或者移动 Web 的同学都知道，写一个丝滑弹出的底部菜单有多烦。

![Lupine.Press](/lupine.js/assets/components-button.png)
![Lupine.Press](/lupine.js/assets/components-badge.png)

- **移动端专属**：内置了 **App 风格侧滑菜单 (Mobile Side Menu)**、**底部动作面板 (Action Sheet)**、和基于底部抽屉式的 **带标题选择器 (Select With Title)**。
- **桌面端利器**：带有丰富动效的 **滑动标签页 (Slide Tabs)**、支持层级展示的 **面包屑 (Breadcrumbs)**、以及随处可弹的 **浮动菜单 (Floating Menu) 和 气泡菜单 (Popup Menu)**。

---

## 📊 数据不止于展示：原生的数据面板与图表 (Charts & Data)

很多时候我们只是想要画一个简单的饼图，却不得不引入 ECharts 或者 Chart.js 这样几百 KB 的巨无霸。

![Lupine.Press](/lupine.js/assets/components-chart.png)

- **纯原生 Charts 图表组件**：Lupine.js 直接内置了常用的图表！无论是 饼图(Pie)、环形图(Donut)、柱状图(Column/Bar)、折线图(Line)、面积图(Area)、雷达图(Radar)、甚至 散点图(Scatter) 和 仪表图(Gauge)，统统自带。不用再外挂沉重的第三方图表库！
- **丰富的数据呈现方式**：从基础的 **卡片 (Card)**、**头像 (Avatar)** 到复杂的 **轮播图 (Carousel)**、**时间轴 (Timeline)**，一应俱全。如果数据还没加载完？骨架屏 **(Skeleton)** 也帮你准备好了。
- **实用多媒体组件**：不仅有线性的**进度条 (Progress)**，还有环状进度条 **(Radial Progress)**。如果要在页面里内嵌视频或地图，直接使用现成的 **YouTube 播放器 (YouTube Player)** 和 **Google 地图包装器 (Google Map Wrapper)**。对了，它甚至自带二维码生成组件 **(QR Code Generator)**！

---

## 🛠 开发提效核弹：“重型”编辑器与浮层系统

普通的 UI 库通常只提供基础零散的积木组件，但 Lupine.components 里藏着好几个能直接当作独立应用交付的“大杀器”。

![Lupine.Press](/lupine.js/assets/components-heditor.png)
![Lupine.Press](/lupine.js/assets/components-ieditor.png)

- **编辑器三板斧 (Editors & Viewers)**：

  - **富文本 HTML 编辑器 (Rich Text Editor)**：轻量好用，该有的排版功能都有。
  - **强大的图片编辑器 (Image Editor)**：支持裁剪、旋转、画笔涂鸦、加贴纸和写字。
  - **PDF 体系**：不仅有用于浏览 PDF 的 **PDF Viewer**，甚至还内置了能够拆解组合 PDF 页面的 **PDF Editor**！

- **全场景浮层与反馈 (Overlays & Feedback)**：

  - **模态弹窗 (Modal Window)**、**系统级消息提示 (Message Box / Notice Message)** 是标配。
  - 连长列表常见的 **下拉刷新 (Pull to Refresh)**、以及引导用户熟悉应用功能的 **产品导览组件 (Tour)** 也无需再去 npm 大海捞针。

- **复杂布局框架 (Layout & Frames)**：
  - 写过中后台管理系统的都懂，怎么让侧边栏可拖动改变宽度？**可拖拽分割面板 (Resizable Splitter)** 完美解决。
  - 需要固定宽高比铺满屏幕？用 **纵横比组件 (Aspect Ratio)** 轻松搞定。还有各种基于 Tab 或 Slide 机制的响应式 Frame 模版任你挑选。
  - 觉得页面文字太平淡？尝试一下内置特效工具：文字波浪翻滚 **(Text Wave)**、流光效果 **(Text Glow)** 以及 缩放动效 **(Text Scale)**。

---

## 🌟 总结：为什么你应该试试 Lupine.js

以上提及的这海量组件，绝大多数库光是打包体积可能就已经上 MB 了。但由于 **Lupine.js** 本身内核（不含组件）不过 7kb 左右，即使是加载这些复杂的组件，也依然保持着极为强悍的渲染性能。而且打包时只包含你实际用到的组件，不会导致体积膨胀。

你可以在任何现有的项目中单独将部分组件抽出来使用，也可以干脆以它为基础，使用脚手架快速搭建你自己的高性能多模态全栈应用。

如果你经常为了找一个适合的小组件而发愁，或者你想在开发业务的时候摆脱繁杂冗余的代码，那么不妨给 Lupine.js 一个机会。

---

**快速体验，眼见为实：**

- 🎮 **Lupine.components 所有组件在线演示**：[https://uuware.github.io/lupine.js/demo](https://uuware.github.io/lupine.js/?redirect=/lupine.js/demo)
- 💻 **源码仓库与文档 (GitHub)**：[https://github.com/uuware/lupine.js](https://github.com/uuware/lupine.js)

> 💡 开源不易，如果你也觉得这个全栈框架有意思，欢迎来 GitHub 仓库点上一颗 ⭐ **Star**！这是对开源创作者最棒的鼓励！
