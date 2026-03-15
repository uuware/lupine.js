# Say Goodbye to Reinventing the Wheel! The 7kb Core Frontend Open-Source Component Library You Must Star

In our daily frontend development, we often run into this awkward situation: Just to implement a tiny side drawer menu, or a draggable splitter, we are forced to import massive UI component libraries (like Ant Design, Element UI, Material UI, etc.), or scavenge for outdated, unmaintained third-party npm packages. As a result, the project bundle swells enormously, and styles between different libraries frequently clash.

What development convenience can the **Lupine.js**, with its mere 7kb core, bring to you?

**Lupine.js** is a **lightweight**, **full-stack** Web framework that combines a **React-like** frontend experience with an **Express-like** backend architecture, designed for maximum speed, simplicity, and efficiency. To accelerate developer productivity, Lupine.js doesn't just offer essential features like routing and light/dark themes, but also ships with incredibly rich, out-of-the-box components —— **Lupine.components**. It thoroughly covers desktop scenarios and natively addresses common mobile interactive patterns as well.

Today, let's dive into the "treasure" components inside Lupine.components that will make you wish you had found them sooner.

---

## 🎨 Cover 90% of Daily Needs: Basic & Form Components

Say goodbye to external basic UI libraries. Lupine.js has packed the most frequently used materials for you.

### 1. Flexible Form & Inputs

![Lupine.Press](/lupine.js/assets/components-input.png)

- Beside standard `Input`s, it provides highly usable out-of-the-box **Number Input**, **Tag Input**, and **Search Input**.
- If your business requires complex filtering, the built-in **Cascader**, **Range Input**, and dashboard-style **Gauge / Dial Input** will definitely catch your eye.
- It also comes with two thoughtful types of **Time Picker** and **Date Picker**.

### 2. The Basic Components Family

Apart from a wealthy collection of button styles, things like **Toggle Switch/Button**, **Badge**, **Spinner** (loading animation), and **Stars Input** are readily available. Want a click-to-copy feature? Just use the ready-made **Copy Button**.

---

## 📱 Native Mobile Support: Navigation & Menu

Anyone who has worked on responsive or mobile webs knows how annoying creating a smooth bottom pop-up menu can be.

![Lupine.Press](/lupine.js/assets/components-button.png)
![Lupine.Press](/lupine.js/assets/components-badge.png)

- **Mobile Exclusives**: Built in with an App-style **Mobile Side Menu**, a bottom **Action Sheet**, and a bottom-drawer-based **Select With Title**.
- **Desktop Lifesavers**: Highly animated **Slide Tabs**, hierarchical **Breadcrumbs**, and ubiquitous **Floating Menu** alongside **Popup Menu**.

---

## 📊 Beyond Display: Native Data Panels and Charts

Often we just want to draw a simple pie chart, only to end up importing behemoths like ECharts or Chart.js which can add hundreds of KBs to our bundle.

![Lupine.Press](/lupine.js/assets/components-chart.png)

- **Pure Native Charts**: Lupine.js directly builds the most common charts in! Whether it's a Pie, Donut, Column/Bar, Line, Area, Radar, Scatter, or even a Gauge chart—they're all included. No need to hook up heavy third-party charting libraries ever again!
- **Rich Data Presentations**: Everything from a basic **Card** and **Avatar**, to complex **Carousels** and **Timelines** are provided. Data taking too long to load? The **Skeleton** screen is already prepped for you.
- **Handy Media Components**: Not only does it include linear **Progress** bars, but also **Radial Progress**. Need to embed videos or maps? Use the ready-to-go **YouTube Player** and **Google Map Wrapper**. Oh, and by the way, it even comes with a native **QR Code Generator**!

---

## 🛠 The Productivity Nuke: "Heavy" Editors & Overlay System

Regular UI libraries typically just offer scattered, basic building blocks. However, Lupine.components hides several "killer" weapons that are capable of being shipped as independent applications entirely.

![Lupine.Press](/lupine.js/assets/components-heditor.png)
![Lupine.Press](/lupine.js/assets/components-ieditor.png)

- **The Editor Triad (Editors & Viewers)**:

  - **Rich Text HTML Editor**: Lightweight and handy, packing all the typography features you'd expect.
  - **Powerful Image Editor**: Supports cropping, rotating, pencil scribbling, sticker placements, and text insertion.
  - **The PDF Ecosystem**: Not only is there a **PDF Viewer** for browsing, but an entire **PDF Editor** is built-in capable of dismantling and reassembling PDF pages!

- **All-Scenario Overlays & Feedback**:

  - **Modal Windows** and system-level **Message Box / Notice Messages** come standard.
  - Even the common list interactions like **Pull to Refresh**, and application onboarding tools like the **Tour** component are included. No more fishing around npm packages.

- **Complex Layout Frameworks (Layout & Frames)**:
  - If you've written B2B dashboards, you know the pain of making sidebars resizable. The **Resizable Splitter** solves it perfectly.
  - Need a fixed width/height ratio that fills the screen? Grab the **Aspect Ratio** component. There are also a variety of responsive Frame templates based on Tab or Slide mechanisms.
  - Think your page text looks too boring? Pick up the built-in text special FX: **Text Wave**, **Text Glow**, and **Text Scale**.

---

## 🌟 Conclusion: Why You Should Try Lupine.js

The massive sea of components mentioned above would easily bloat most libraries' bundled size up to megabytes. But since the **Lupine.js** core (excluding components) is only about 7kb, even when loading these complex widgets, it still maintains incredibly robust rendering performance. Moreover, the bundler will intelligently only include the components you actually use, preventing any bundle inflation.

You can pull out single widgets to use in your existing projects, or take it all as a foundation to scaffold your own high-performance, multi-modal full-stack application.

If you are constantly stressing over finding the right small component, or if you want to ditch bloated code while building your business cases, then give Lupine.js a shot.

---

**Try it yourself, seeing is believing:**

- 🎮 **Live Demo for all Lupine.components**: [https://uuware.github.io/lupine.js/demo](https://uuware.github.io/lupine.js/?redirect=/lupine.js/demo)
- 💻 **Source Code & Docs (GitHub)**: [https://github.com/uuware/lupine.js](https://github.com/uuware/lupine.js)

> 💡 Open source isn't easy. If you think this full-stack framework is interesting, please drop a ⭐ **Star** on the GitHub repository! It's the best form of encouragement for open-source creators!
