---
title: Dashboard
---

# lupine.api dashboard

lupine.api includes a built-in extensible dashboard for managing your API services. The dashboard features a management sidebar on the left and a multi-tab content area on the right.

## Features

The dashboard provides comprehensive backend management capabilities, categorized as follows:

### 1. Database Management (DB)

Tools for direct database manipulation, useful for debugging and maintenance.

- **Table List**: Browse database tables and view data.
- **Create Tables**: Run preset scripts to initialize or repair database table structures.
- **Run SQL**: execute arbitrary SQL statements and view results in JSON format.

### 2. Operations & Server Management (Access & Server Info)

Core operations toolkit for remote management and monitoring.

#### Release Management

Powerful tools for multi-node/multi-environment deployment.

- **Sync**: Support synchronizing code or resources from a source environment (From) to a target environment (To).
- **Full Stack Update**: Selectively update Server (core), Api (logic), Env (variables), etc.
- **Web Update**: Independently update frontend resources by sub-folder.
- **Controls**:
  - **Check**: Verify update status.
  - **Refresh Cache**: Refresh server cache (Remote/Local).
  - **Restart App**: Restart the application (Remote/Local).
  - **Run Cmd**: Execute Shell commands directly on the server.
- **Logs**: View and download history logs of release operations.

#### Utilities

- **Tokens**: Manage API access tokens.
- **Shell**: WebSocket-based online terminal for real-time server interaction.
- **Resources**: Browse, upload, and download files from the server filesystem.
- **Config**: View and hot-patch system runtime configurations.
- **Performance**: Monitor server metrics like CPU and Memory usage.

### 3. Development & Testing (Test)

Tools for debugging components and UI during development.

- **Test Themes**: Preview and test different UI theme configurations.
- **Test Component**: Test interaction and rendering of generic UI components.
- **Test Animations**: Demo and debug CSS/JS animations.
- **Test Edit**: Test rich text editor or form editing features.

---

## Extension Development

The Dashboard is highly extensible. Core logic resides in the `packages/lupine.api/admin` directory.

### Menu Configuration

Menus are configured via the `adminTopMenu` array in `admin-frame-helper.tsx`. You can easily add new menu items:

```typescript
const myMenu = {
  id: 'my-feature',
  text: 'My Feature',
  items: [
    {
      id: 'my-page',
      text: 'My Page',
      js: () => this.addPanel('My Page', <MyComponent />),
    },
  ],
};
```

### Page Development

Each management page is a standard `lupine.components` component. Use `AdminPanel` and `Tabs` components to manage the multi-tab experience.
