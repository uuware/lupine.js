---
title: Installation
---

# Installation2

Lupine.js is a full-featured web application framework that includes both frontend and backend. The frontend, Lupine.web, is an extremely lightweight framework using React TSX syntax. The backend, Lupine.api, is a highly efficient and minimalistic framework similar to Express.

## Quick Start

### 1. Create a Project

The simplest way is to use the `create-lupine` command to create a new application. You can choose a template during creation.

```bash
npx create-lupine@latest my-app
```

If you want to understand lupine.js more deeply, you can clone the repository from github, which makes it easier to view the core code locally.

```bash
git clone https://github.com/uuware/lupine.js.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment

If you created the project using `create-lupine`, the `.env` file is already generated.

If you created the project using `git clone`, you need to configure the environment.

Copy the `.env.sample` file to a new file named `.env`.

For projects created using `git clone`, you also need to use the sample script in the `.env` file to generate keys for the following variables:

```properties
ADMIN_PASS=
CRYPTO_KEY=
DEV_ADMIN_PASS=
DEV_CRYPTO_KEY=
```

### 4. Run the development application

```bash
npm run dev
```

You can now verify the development application at [http://localhost:11080](http://localhost:11080).

---

## Local HTTPS Setup

For local HTTPS support, we recommend using [mkcert](https://github.com/FiloSottile/mkcert).

1.  Download `mkcert` (e.g., `mkcert-v1.4.4-windows-amd64.exe`).
2.  Open an admin console and run:
    ```bash
    ./mkcert-v1.4.4-windows-amd64 -install
    ```
3.  Generate the certificate (for new setups):
    ```bash
    mkcert example.com "*.example.com" localhost 127.0.0.1 ::1
    ```
4.  Copy the generated certificate files to the `/dev` folder.
5.  Update your `.env` file to allow local API calls with self-signed certificates:
    ```properties
    NODE_TLS_REJECT_UNAUTHORIZED=0
    ```

### Alternative: Self-Signed Certificate via OpenSSL

If you prefer OpenSSL:

```bash
openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout cert.key -out cert.pem -sha256
```

On Windows, you might use:
`"C:\Program Files\Git\usr\bin\openssl.exe"`

---

## Debugging

### Debug Backend Only

Open a **Javascript Debug Terminal** in VS Code and run:

```bash
npm run dev
```

### Debug Frontend & Backend

1.  Go to the **Run and Debug** sidebar in VS Code.
2.  Select **"Lupine.js: Frontend & Backend"** from the dropdown.
3.  Set breakpoints in your FE or BE code and start debugging.

---

## Adding a New App

Lupine can run multiple apps under the same port. To add a new app locally:

1.  **Copy**: Duplicate any app folder under `/apps` and rename it.
2.  **Update Config**: Update the `apps\<your-app>\lupine.json` file with the new app name.
3.  **Register App**: Add the new app name to `APPS=` in your `.env` file.
4.  **Virtual Domain**: Add a virtual domain for the app in `DOMAINS@[APP-NAME]=` in your `.env` file.
5.  **Build**: The new app's source will be built to `dist\server_root`.

### Local Virtual Domain Setup

To access multiple apps on the same port (e.g., `app1.sample-domain.com`), modify your hosts file:

```text
127.0.0.1 app1.sample-domain.com
```

**Hosts file location:**

- **Windows**: `C:\Windows\System32\Drivers\etc\hosts`
- **Linux/macOS**: `/etc/hosts`

### Creating a Sub-folder App

To create a sub-application within an existing app (e.g., `admin_dev`):

1.  Create a folder: `apps\[your-app-name]\web\src\admin_dev`
2.  Add `index.html` and `index.tsx`.
3.  Update `apps\[your-app-name]\lupine.json` entries:
    ```json
    {
      "index": "web/src/admin_dev/index.tsx",
      "html": "web/src/admin_dev/index.html",
      "outdir": "/admin_dev"
    }
    ```

---

## Important: Global Variables in SSR

Since Lupine uses Server Side Rendering (SSR), global variables in frontend code are **shared by all users**. Use them with extreme caution.

**Bad Practice:**
The following code is dangerous because `cacheUser` is shared:

```typescript
const cacheUser: { user: null | Promise<UserInfoType | null> } = { user: null };
export const getUserInfo = (refresh?: boolean): Promise<UserInfoType | null> => {
  if (!cacheUser.user || refresh) {
    cacheUser.user = new Promise(async (resolve, reject) => {
      // ...
    });
  }
  return cacheUser.user;
};
```

**Good Practice:**
Initialize user-specific data within component lifecycle events (like `onLoad`) which only execute on the client-side.

```tsx
const cacheUser: { user: null | Promise<UserInfoType | null> } = { user: null };
export const UserInfo = (props?: any) => {
  const ref: RefProps = {
    onLoad: async () => {
      // Safe to assign here for the client
      cacheUser.user = ...
    },
  };
  return (
    <div css={css} class='user-info-box' ref={ref}>
      ...
    </div>
  );
};
```
