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

# Check Code frequency (steps)

https://api.github.com/repos/uuware/lupine.js/languages
Or
GitHub -> Code -> Insights -> Code frequency
