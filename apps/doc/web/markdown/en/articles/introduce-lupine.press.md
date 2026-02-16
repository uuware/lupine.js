---
title: 'Lupine.Press: Built for Doc Speed'
description: The ultra-light documentation generator powered by Lupine.js
---

# Lupine.Press: Built for Doc Speed

Writing documentation shouldn't be painful. But in the current ecosystem, we often have to choose between "complex configuration" and "ugly default styles".

**Lupine.Press** is here to break this deadlock.

It is a documentation framework built on **Lupine.js**, inheriting the latter's **"ultra-lightweight"** and **"high-performance"** DNA. It lets you build professional, responsive, and multi-language documentation sites with simple Markdown.

![Lupine.Press](/lupine.js/assets/lupine.press.png)

To give you a better idea of what you can build, we have prepared a complete demo project. You can visit the repository or fork it directly as your starting point:

- **Source Repository**: [https://github.com/uuware/lupine-template-cv-starter](https://github.com/uuware/lupine-template-cv-starter)

You can also view the live demo here:

- **Live Demo**: [https://uuware.github.io/lupine-template-cv-starter/](https://uuware.github.io/lupine-template-cv-starter/)

## Why Choose Lupine.Press?

### 1. ⚡ Incredible Speed

Need I say more? Based on the Lupine.js core (only 7kb), your documentation site will load incredibly fast. No bloated hydration process, content appears instantly.

### 2. 📝 Markdown-Driven Just Works

In Lupine.Press, file structure is routing.

- Just drop a `guide.md` in the directory, and it automatically becomes the `/guide` page.
- Sidebar configuration? Write it directly in the Frontmatter of `index.md`.
- Multiple languages? Just create `en` and `zh` folders, and the framework automatically handles switching.

### 3. 🎨 Professional Design Out-of-the-Box

You don't need to know CSS to have a beautiful documentation site. The `PressFrame` component comes built-in with:

- **Responsive Sidebar**: Automatically collapses on mobile.
- **Light/Dark Mode**: Follows system preference or switch manually.
- **Syntax Highlighting**: Built-in support.

### 4. 🛠️ Flexible Extensibility

Although it's lightweight, it's not "rigid". Because fundamentally it is a Lupine.js application. You can always:

- Embed React-style components within Markdown.
- Use `bindGlobalStyle` to customize global styles.
- Write custom layouts.

## Deployment Hack: SPA on GitHub Pages?

As we all know, static hosting services like GitHub Pages are not friendly to Single Page Applications (SPA). Because they don't know that `/guide/started` should actually point to `index.html`, they often return a **404** directly.

Lupine.Press provides a clever solution.

### The Smart `404.html`

We have built-in magical code in `docs/404.html`:

```html
<script type="text/javascript">
  // Single Page Apps for GitHub Pages
  if (window.location.pathname.includes('/lupine.js/')) {
    // Take the current path as a parameter and redirect back to the homepage
    window.location.href = '/lupine.js/?redirect=' + window.location.pathname;
  }
</script>
```

Combined with the frontend routing's automatic recovery logic, this means:

1. User visits deep link `/guide/started`.
2. GitHub Pages returns the 404 page.
3. Script immediately redirects the page to `/?redirect=/guide/started`.
4. Lupine.js app starts, reads the `redirect` parameter, and seamlessly restores the page the user wanted to see.

**The result: You can host a perfectly experienced SPA documentation site on GitHub Pages for free!**

## Quick Start

Get your documentation site with just one command:

```bash
npx create-lupine@latest my-docs
# Select 'doc-starter' template
```

Start the project:

```bash
cd my-docs
npm install
npm run dev
```

Now, focus on writing!

## Deploying to GitHub Pages

Under `apps/[your-project-name]/web`, you will find a folder named `github-pj-name`. Please rename this folder to your actual GitHub repository name. Next, perform a global search for `github-pj-name` and replace all occurrences with your GitHub repository name. This is necessary because GitHub Pages uses the URL structure `[github-account].github.io/[github-repository-name]/`.

After editing your documentation, run `npm run build`. Once you confirm there are no compilation errors, run `npm run cp-docs`. This command copies the static files from the `build` directory to the `/docs` directory. Commit and push all changes to your GitHub repository. Then, go to your repository's Settings > Pages. Under "Build and deployment", select the **main** branch and the **/docs** folder, then click Save. You will soon be able to access your documentation site at `https://[github-account].github.io/[github-repository-name]/`.

If you want to display this link in the "About" section of your repository, click the settings icon (gear) next to "About", and check "Use your GitHub Pages website".
