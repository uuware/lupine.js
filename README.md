# lupine.js

Lupine.js is a full-featured web application that includes both frontend and backend. The frontend, Lupine.web, is an extremely lightweight framework (7kb gzipped for a hello-world project with all core features) using React TSX syntax. The backend, Lupine.api, is a highly efficient and minimalistic framework similar to Express. It supports server-side rendering (SSR) from scratch, Page Router, CSS-in-JS, .env file, Theme, Mobile and Desktop, HTTPS and multiple domains in one instance.

# Hello World

```tsx
const Counter = () => {
  const [count, setCount] = useState(0);
  const css: CssProps = {
    padding: '20px',
    textAlign: 'center',
    h1: {
      color: 'blue',
      '&:hover': { color: 'red' },
    },
  };
  return (
    <div css={css}>
      <h1>Hello World</h1>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

## Quick Start

Ready to give it a try? You can scaffold a new project in seconds.

### Step 1: Create a Project

Use our CLI tool to create a new app, and select a template.

```bash
npx create-lupine@latest my-awesome-app
```

### Step 2: Run it

Enter the directory and start the dev server.

```bash
cd my-awesome-app
npm install
npm run dev
```

Visit `http://localhost:11080` and you'll see your first Lupine app running!
To enable HTTPS locally (e.g., https://localhost:11083), you'll need to generate a local certificate using mkcert. See [mkcert](https://github.com/FiloSottile/mkcert).
Here is a sample command:
```
mkcert example.com "*.example.com" localhost 127.0.0.1 ::1
```

## Learn more

Read the [docs](https://uuware.github.io/lupine.js/), [中文](https://uuware.github.io/lupine.js/zh/)

## Lupine.components Demo

Lupine.components offers a rich collection of out-of-the-box components, including:

- **Basic Components**: Various buttons, Toggle Button, Badge, Spinner, Stars Input, and Tooltip.
- **Form & Input**: Various inputs (e.g., Number, Search, Tag), Editable Label, Toggle Switch, Cascader, Range Input, Gauge or Dial, Time Picker, and Date Picker.
- **Navigation & Menu**: Popup Menu, Floating Menu, Mobile Side Menu, Breadcrumbs, Tabs, Slide Tabs, and Paging Link.
- **Data Display & Media**: Card, Avatar, Carousel, Timeline, Progress, Radial Progress, Skeleton, YouTube Player, Google Map Wrapper, and QR Code Generator.
- **Charts**: Pie, Donut, Column, Bar, Line, Area, Radar, Gauge, and Scatter charts.
- **Editors & Viewers**: Rich Text (HTML) Editor, Image Editor, PDF Editor, and PDF Viewer.
- **Overlays & Feedback**: Modal Window, Message Box, Action Sheet, Notice Message, Pull to Refresh, and Tour.
- **Layout & Frames**: Responsive Frame, Slider Frame, Resizable Splitter, and Aspect Ratio.
- **Special FX & Utilities**: Text Effects, Redirect, and more!

- **Live Demo**: [https://uuware.github.io/lupine.js/demo](https://uuware.github.io/lupine.js/?redirect=/lupine.js/demo)

## Lupine Image Editor

**Image Editor**, an image editing template built on **Lupine.js**. It provides a lightweight yet feature-rich image manipulation experience directly in the browser. You can draw freely with a pencil tool, use various built-in shapes, add text and stickers, or even crop, rotate, and scale images.

You can view the live demo here:

- **Live Demo**: [https://uuware.github.io/lupine-image-editor/](https://uuware.github.io/lupine-image-editor/)

The is the source repository:

- **Source Repository**: [https://github.com/uuware/lupine-image-editor](https://github.com/uuware/lupine-image-editor)

## Lupine PDF Editor

**PDF Editor**, a dedicated PDF editing template built on **Lupine.js**. It delivers a streamlined and high-performance PDF manipulation experience directly in the browser. You can draw freely with a pencil tool, use various built-in shapes, add text and stickers, and remove or add pages.

You can view the live demo here:

- **Live Demo**: [https://uuware.github.io/lupine-pdf-editor/](https://uuware.github.io/lupine-pdf-editor/)

The is the source repository:

- **Source Repository**: [https://github.com/uuware/lupine-pdf-editor](https://github.com/uuware/lupine-pdf-editor)

## Lupine Notes and Tools

**Notes and Tools**, a versatile workspace application template built on **Lupine.js**. It is designed to act as a robust foundation for building note-taking software and handy utility tools.

You can view the live demo here:

- **Live Demo**: [https://uuware.github.io/lupine-notes-and-tools/](https://uuware.github.io/lupine-notes-and-tools/)

The is the source repository:

- **Source Repository**: [https://github.com/uuware/lupine-notes-and-tools](https://github.com/uuware/lupine-notes-and-tools)

## Template: Responsive Starter

**Responsive Starter**, a clean and adaptable starter template provided by **Lupine.js**. It offers a solid foundation with modern responsive layouts (like tabs and side menus), ensuring your application looks great on both mobile and desktop screens. Using this template alongside AI, you can rapidly build and deploy cross-platform applications.

You can select this template when creating a new project with the `create-lupine` CLI.

You can view the live demo here:

- **Live Demo**: [https://uuware.github.io/lupine-template-responsive-starter/](https://uuware.github.io/lupine-template-responsive-starter/)

The is the source repository:

- **Source Repository**: [https://github.com/uuware/lupine-template-responsive-starter](https://github.com/uuware/lupine-template-responsive-starter)

## Template: Doc Starter

**Doc Starter**, a documentation framework (Lupine.press) built on **Lupine.js**, inheriting the latter's **"ultra-lightweight"** and **"high-performance"** DNA. It lets you build professional, responsive, and multi-language documentation sites with simple Markdown, and can be **hosted for free on GitHub Pages**.

You can select this template when creating a new project with the `create-lupine` CLI.

You can view the live demo here:

- **Live Demo**: [https://uuware.github.io/lupine-template-doc-starter/](https://uuware.github.io/lupine-template-doc-starter/)

The is the source repository:

- **Source Repository**: [https://github.com/uuware/lupine-template-doc-starter](https://github.com/uuware/lupine-template-doc-starter)

## Template: CV Starter

**CV Starter** template provided by the **Lupine.js** framework to generate a beautiful, responsive resume website just by writing simple Markdown files. It comes with black and white theme switching, multi-language support, and can be **hosted for free on GitHub Pages**.

You can select this template when creating a new project with the `create-lupine` CLI.

You can view the live demo here:

- **Live Demo**: [https://uuware.github.io/lupine-template-cv-starter/](https://uuware.github.io/lupine-template-cv-starter/)

The is the source repository:

- **Source Repository**: [https://github.com/uuware/lupine-template-cv-starter](https://github.com/uuware/lupine-template-cv-starter)

# AI Assisted Development

This project includes a specialized context file for AI coding assistants.

- **File**: `AI_CONTEXT.md` (Project Root)
- **Usage**: When asking an AI to write code for this project, always ask it to **"Read AI_CONTEXT.md first"** or copy-paste the relevant sections into your prompt.
- **Purpose**: It contains critical rules (e.g., "No React Hooks", "Use HtmlVar") and design patterns unique to Lupine.js that standard AI models may not know.

### Example Prompt

> "Read `AI_CONTEXT.md` first. Create a 'User Profile' component that includes a standard settings list (Avatar, Name, Email) and a save button. Use the `SliderFrame` navigation pattern."
