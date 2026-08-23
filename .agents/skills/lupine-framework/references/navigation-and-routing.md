# Navigation & Routing

## 1. Page Navigation: `initializePage` vs `<a>`

- **Automatic `<a>` Tag Interception**: Lupine.js automatically intercepts internal `<a>` links and transitions smoothly as a Single Page Application (SPA).
- **Programmatic Navigation via JavaScript**:
  ```typescript
  import { initializePage } from 'lupine.web';

  const onGoToGame = () => {
    // ✅ Correct: Seamless SPA route navigation
    initializePage('/play/diff01/1');

    // ❌ Error: Do not use location.href (causes a harsh full-page reload)
    // window.location.href = '/play/diff01/1';
  };
  ```

---

## 2. Route Path Parameter Syntax

- **Required Parameters (`:`)**:
  `pageRouter.use('/page/:id', PlayPage)`
  - Retrieve inside the component: `props.urlParameters['id']`
- **Fixed Path Segments (`/fixed/`)**:
  `pageRouter.use('/page/:id/detail/', DetailPage)`, where `detail` is a fixed segment.
- **Optional Parameters (`?`)**:
  `pageRouter.use('/page/:userId/?option1/?option2', UserPage)`
  - Once an optional parameter is declared, all subsequent route segments become optional.

---

## 3. Configuration Access: Environment Variables vs Dynamic Database Config

- **Statically Injected Environment Variables (`.env`)**:
  - Synchronously read via `webEnv('API_BASE_URL', '')` (injected at build time).
- **Dynamic Database Configuration (Backend fetch)**:
  - Asynchronously read via `await WebConfig.get('siteLogo')` (fetched from backend on initial load and cached thereafter).
