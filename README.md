# lupine.js

Lupine.js is a full-featured web application that includes both frontend and backend. The frontend, Lupine.web, is an extremely lightweight framework (7kb gzipped for a hello-world project with all core features) using React TSX syntax. The backend, Lupine.api, is a highly efficient and minimalistic framework similar to Express. It supports server-side rendering (SSR) from scratch, Page Router, CSS-in-JS, .env file, Theme, Mobile and Desktop, HTTPS and multiple domains in one instance.

# Hello World

```tsx
const HelloPage = () => {
  const css: CssProps = {
    padding: '20px',
    textAlign: 'center',
    h1: {
      color: 'blue',
      '&:hover': {
        color: 'red',
      },
    },
  };
  const dom = new HtmlVar('0');
  return (
    <div css={css}>
      <h1>Hello World</h1>
      <p>This is a simplified Lupine.js project.</p>
      <p>{dom.node}</p>
      <button onClick={() => (dom.value = (Number(dom.value) + 1).toString())}>Increment</button>
    </div>
  );
};
```

# Getting Started

Read the [docs](https://uuware.github.io/lupine.js/), [中文](https://uuware.github.io/lupine.js/zh/)

## Lupine.components Demo

- **Live Demo**: [https://uuware.github.io/lupine.js/demo](https://uuware.github.io/lupine.js/?redirect=/lupine.js/demo)

## Template: Doc Starter

**Doc Starter**, a documentation framework (Lupine.press) built on **Lupine.js**, inheriting the latter's **"ultra-lightweight"** and **"high-performance"** DNA. It lets you build professional, responsive, and multi-language documentation sites with simple Markdown, and can be **hosted for free on GitHub Pages**.

You can view the live demo here:

- **Live Demo**: [https://uuware.github.io/lupine-template-doc-starter/](https://uuware.github.io/lupine-template-doc-starter/)

The is the source repository:

- **Source Repository**: [https://github.com/uuware/lupine-template-doc-starter](https://github.com/uuware/lupine-template-doc-starter)

## Template: CV Starter

**CV Starter** template provided by the **Lupine.js** framework to generate a beautiful, responsive resume website just by writing simple Markdown files. It comes with black and white theme switching, multi-language support, and can be **hosted for free on GitHub Pages**.

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
