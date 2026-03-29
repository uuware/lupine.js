# 探索 Lupine Notes & Tools：只属于你的纯前端个人效率中心

在如今 SaaS 产品满天飞的时代，把私人日记、财务数据和生活习惯交给第三方服务器总让人有一些隐私方面的担忧。而且，为了不同的需求（记账、待办、专注、打卡），我们往往要在好几个甚至十几个 App 之间来回切换，数据更是无从互通。

基于这一痛点，我们使用超轻量的 **Lupine.js** 框架开发了 **Lupine Notes & Tools**。这不仅仅是一个效率工具的合集，更是一个贯彻“数据完全由用户掌控”理念的纯前端（Serverless）生产力应用。

![Lupine.Press](/lupine.js/assets/notes-cover.png)

欢迎在此体验在线 Demo：

- 🎮 **在线 Live Demo**：[https://uuware.github.io/lupine-notes-and-tools/](https://uuware.github.io/lupine-notes-and-tools/)

下面是开源源码仓库：

- 💻 **源码仓库 (GitHub)**：[https://github.com/uuware/lupine-notes-and-tools](https://github.com/uuware/lupine-notes-and-tools)

---

## 🛠️ 主力模块：生活所需，一应俱全

Lupine Notes & Tools 以组件化的方式集成了生活和工作中最常用的生产力模块，界面清爽却功能硬核：

### 1. 记事与财务系统

![Lupine.Press](/lupine.js/assets/notes-diary.png)

![Lupine.Press](/lupine.js/assets/notes-finance.png)
- **日记本 (Diary)**：记录每日随笔与灵感。
- **财务记账 (Finance)**：轻量化追踪日常收支状态，理清你的财务流水。 

### 2. 百宝箱般的实用工具箱

![Lupine.Press](/lupine.js/assets/notes-tools.png)
除了基础的记笔记与记账，系统内置了一个高度集成化的工具箱（Tools），满足不同的自我管理需求：
- ✅ **待办事项 (To-Do)**：清晰的待办列表视图，支持标题、多行详细描述记录以及快速的状态切换（完成/待办），将任务管理做到极致精简。
- 📅 **习惯打卡 (Habit Tracker)**：内置仿 GitHub 贡献图样式的可视化日历，无论你是回顾过去的打卡记录，还是查看当下的连续打卡天数（Streak）都一目了然。支持一键清理数据，全盘掌握习惯养成。
- ⏳ **专注时钟 (Focus Timer)**：沉浸式的白噪音与专注时钟。支持沙漏、蜡烛、线香等多种精美的动画主题（Progress Animation）。底层调用了原生的 Wake Lock API 保持屏幕常亮，支持随时暂停和重置，让你随时随地进入深度工作状态。

![Lupine.Press](/lupine.js/assets/notes-study.png)

![Lupine.Press](/lupine.js/assets/notes-stydy2.png)
- 🗓️ **倒数日/纪念日 (Days Matter)**：精准帮你计算距离目标日期的天数，支持单次计算，以及“每月”、“每年”的周期性循环提醒，让你不再错过任何一个重要日子。

---

## ☁️ 真正意义上的数据主权：多云端直连

![Lupine.Press](/lupine.js/assets/notes-cloud.png)

Lupine Notes & Tools 最具颠覆性的特性在于其 **全端无后端的云同步能力 (Cloud Config)**。你的数据绝不会经过任何我们提供的中转服务器，而是由浏览器直接与各大云服务提供商对话：

- **Local Storage (Offline)**：开箱即用，数据完全存在本地浏览器，绝对的安全隐蔽。
- **GitHub Repository**：通过私有 Token，把加密数据作为文件存在你的私有代码仓库里，不仅安全，还能自带版本控制。
- **Dropbox / Google Drive**：内置了完整的各大公有云盘 OAuth 鉴权及 Refresh Token（刷新令牌）授权机制，只需输入对应的 API Key 即可全平台无缝同步你的配置和日记。

这也就意味着，**只要云盘还在，你的数据就永远属于你自己，不再有应用关停或被锁定的风险。**

---

## 🚀 性能基石：轻量化的 Lupine.js

得益于底层 **Lupine.js** （核心包仅 7kb）的支持：
- 项目以极致轻量的体积实现了极其丰富的交互视图体验（弹窗、侧滑页、精美的动画绘制等）。
- 所有组件采用原生标准的 TSX 编写，没有沉重的 Virtual DOM 开销，无论在移动端浏览器还是桌面端运行，都如同原生应用般顺滑。

如果你希望拥有一个集成了日记、记账、专注、打卡等多合一，且数据不受第三方约束的效率应用，或者你想看看如何用纯前端技术优雅地实现云盘直连，欢迎体验 **Lupine Notes & Tools**！

> 🌈 开源不易，如果这个项目有帮助到你，欢迎在 [GitHub - Lupine.js](https://github.com/uuware/lupine.js) 留下你的 ⭐ **Star**！这会是对作者最大的鼓励！
