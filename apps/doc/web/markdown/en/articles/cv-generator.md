---
title: 10 Minutes! Build a Stunning Personal CV Website with Markdown
description: Stand out with the Lupine.js CV Starter Template
---

# 10 Minutes! Build a Stunning Personal CV Website with Markdown

Finding a good job starts with a great CV. If you can turn that CV into a professional personal website, it's even better and sure to catch a recruiter's eye.

This article introduces how to use the **CV Starter** template provided by the **Lupine.js** framework to generate a beautiful, responsive resume website just by writing simple Markdown files. It comes with black and white theme switching, multi-language support, and can be **hosted for free on GitHub Pages**.

![Lupine.js CV Starter](/lupine.js/assets/cv-generator.png)

## Why Choose Lupine CV Starter?

- **Minimalist Markdown**: Focus on content, writing your CV just like writing a document.
- **Beautiful Design**: A fresh and professional default theme that supports both **Light** and **Dark** modes.
- **Multi-language Support**: Easily build bilingual resumes to show your international perspective.
- **Mobile Responsive**: Perfectly adapted for mobile desktops, displaying elegantly anytime, anywhere.
- **Free Hosting**: Pure static pages that can be deployed directly to GitHub Pages with zero cost.

## 🚀 Quick Start

### 1. Create Project

Initialize your CV project with just one command:

```bash
npx create-lupine@latest my-cv
```

Select the **`cv-starter`** template when prompted.

To give you a better idea of what you can build, we have prepared a complete demo project. You can visit the repository or fork it directly as your starting point:

- **Source Repository**: [https://github.com/uuware/lupine-template-cv-starter](https://github.com/uuware/lupine-template-cv-starter)

You can also view the live demo here:

- **Live Demo**: [https://uuware.github.io/lupine-template-cv-starter/](https://uuware.github.io/lupine-template-cv-starter/)

### 2. Start Preview

Enter the project directory and start the local development server:

```bash
cd my-cv
npm install
npm run dev
```

Now, open your browser and you'll see a complete resume prototype containing **Profile, Experience, Projects, Skills, and Education** sections!

## 📝 Customize Your CV

The template has already pre-set a standard resume structure for you; you only need to add, delete, or modify it according to your situation.

### Modify Content

All content is located in the `web/markdown` directory.

- `zh/`: Chinese version content
- `en/`: English version content

You can modify the Markdown files directly. Even better, you can carefully write just one language version (like English) and **let AI help you translate it into another language**. Current AI is very good at handling Markdown formats and translation quality is usually high, saving you a lot of time.

### Manage Directory & Sidebar

When you add or delete a page (e.g., adding an "Open Source" section), you need to tell the website how to display the sidebar navigation.

Open the `index.md` file under the language root directory (e.g., `web/markdown/en/index.md`) and modify the `sidebar` configuration:

```yaml
sidebar:
  - text: Details
    items:
      - /en/01-experience/index
      - /en/02-projects/index
      - /en/03-skills/index
      - /en/04-education/index
      # - /en/05-open-source/index  <-- New page
```

After saving the file, the browser page will update automatically. What you see is what you get.

### Configure Top Navigation (Optional)

Since resumes usually don't contain many pages, the template does not enable the top navigation menu by default. If you want to show navigation at the top of the page, you can add the `nav` configuration in `index.md`:

```yaml
nav:
  - text: Experience
    link: /en/01-experience/index
  - text: Projects
    link: /en/02-projects/index
```

This way, your configured menu items will appear on the left side of the Header.

### Personalization Settings

In the Frontmatter of `index.md`, you can make more personalized settings.

#### GitHub Link

The right side of the Header shows the GitHub project link by default. If you want to modify or hide it:

```yaml
# Modify link
github-title: View on GitHub
github-link: https://github.com/yourusername/my-cv
# Or delete these two lines directly to hide
```

#### Custom Styles

Want to change the theme color? Want to adjust the sidebar width? No problem! You can directly override CSS variables via the `styles` attribute in `index.md`:

```yaml
styles:
  ':root': { '--primary-accent-color': '#0ac92a' } # Change primary color to green
  # body: { font-family: 'Inter', sans-serif; }    # Change global font
```

For more style configurations, please refer to [this introduction about Lupine.Press](https://uuware.github.io/lupine.js/en/articles/introduce-lupine.press).

## Conclusion

Using **Lupine.js** to build a resume website not only showcases your professional skills, but the act itself also demonstrates your passion and pursuit of technology.

Lupine is under active development. Welcome to GitHub to follow us and check our code frequency and contributions:

👉 **[https://github.com/uuware/lupine.js](https://github.com/uuware/lupine.js)**

Wish you get your dream Offer soon!
