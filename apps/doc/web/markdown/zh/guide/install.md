---
title: 安装说明
---

# 安装说明

Lupine.js 是一个功能齐全的 Web 应用程序框架，包含前端和后端。前端 Lupine.web 是一个极其轻量级的框架，使用 React TSX 语法。后端 Lupine.api 是一个类似 Express 的高效极简框架。

## 快速开始

### 1. 创建项目

最简单的方式就是使用 `create-lupine` 命令来创建一个新的应用程序。在创建的时候您可以选择模版。

```bash
npx create-lupine@latest my-app
```

如果您像更深入的了解 lupine.js，您可以从 github 上克隆仓库，这样更方便的本地查看核心代码。

```bash
git clone https://github.com/uuware/lupine.js.git
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境

如果使用 `create-lupine` 创建的项目， `.env` 文件已经生成。

如果使用 `git clone` 创建的项目，则需要配置环境。

将 `.env.sample` 文件复制为名为 `.env` 的新文件。

使用 `git clone` 创建的项目，还需要使用 `.env` 文件中的示例脚本为以下变量生成密钥：

```properties
ADMIN_PASS=
CRYPTO_KEY=
DEV_ADMIN_PASS=
DEV_CRYPTO_KEY=
```

### 4. 运行开发应用程序

```bash
npm run dev
```

现在，您可以通过 [http://localhost:11080](http://localhost:11080) 访问开发应用程序。

---

## 本地 HTTPS 设置

对于本地 HTTPS 支持，建议使用 [mkcert](https://github.com/FiloSottile/mkcert)。

1.  下载 `mkcert` (例如 `mkcert-v1.4.4-windows-amd64.exe`)。
2.  打开管理员控制台并运行：
    ```bash
    ./mkcert-v1.4.4-windows-amd64 -install
    ```
3.  生成证书（针对新设置）：
    ```bash
    mkcert example.com "*.example.com" localhost 127.0.0.1 ::1
    ```
4.  将生成的证书文件复制到 `/dev` 文件夹。
5.  更新您的 `.env` 文件，以允许使用自签名证书进行本地 API 调用：
    ```properties
    NODE_TLS_REJECT_UNAUTHORIZED=0
    ```

### 替代方案：通过 OpenSSL 生成自签名证书

如果您更喜欢 OpenSSL：

```bash
openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout cert.key -out cert.pem -sha256
```

在 Windows 上，您可能需要使用：
`"C:\Program Files\Git\usr\bin\openssl.exe"`

---

## 调试

### 仅调试后端

在 VS Code 中打开 **Javascript Debug Terminal** 并运行：

```bash
npm run dev
```

### 调试前端和后端

1.  转到 VS Code 中的 **Run and Debug** 侧边栏。
2.  从下拉列表中选择 **"Lupine.js: Frontend & Backend"**。
3.  在您的前端或后端代码中设置断点并开始调试。

---

## 添加新应用

Lupine 可以在同一端口下运行多个应用程序。要在本地添加新应用：

1.  **复制**：复制 `/apps` 下的任何应用文件夹并重命名。
2.  **更新配置**：使用新应用名称更新 `apps\<your-app>\lupine.json` 文件。
3.  **注册应用**：将新应用名称添加到 `.env` 文件中的 `APPS=`。
4.  **虚拟域名**：在 `.env` 文件中的 `DOMAINS@[APP-NAME]=` 添加该应用的虚拟域名。
5.  **构建**：新应用的源代码将构建到 `dist\server_root`。

### 本地虚拟域名设置

要在同一端口访问多个应用（例如 `app1.sample-domain.com`），请修改您的 hosts 文件：

```text
127.0.0.1 app1.sample-domain.com
```

**Hosts 文件位置：**

- **Windows**: `C:\Windows\System32\Drivers\etc\hosts`
- **Linux/macOS**: `/etc/hosts`

### 创建子文件夹应用

要在现有应用中创建子应用程序（例如 `admin_dev`）：

1.  创建文件夹：`apps\[your-app-name]\web\src\admin_dev`
2.  添加 `index.html` 和 `index.tsx`。
3.  更新 `apps\[your-app-name]\lupine.json` 条目：
    ```json
    {
      "index": "web/src/admin_dev/index.tsx",
      "html": "web/src/admin_dev/index.html",
      "outdir": "/admin_dev"
    }
    ```

---

## 重要提示：SSR 中的全局变量

由于 Lupine 使用服务器端渲染 (SSR)，前端代码中的全局变量由**所有用户共享**。请极其谨慎地使用它们。

**错误做法：**
以下代码很危险，因为 `cacheUser` 是共享的：

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

**正确做法：**
在组件生命周期事件（如 `onLoad`）中初始化特定于用户的数据，这些事件仅在客户端执行。

```tsx
const cacheUser: { user: null | Promise<UserInfoType | null> } = { user: null };
export const UserInfo = (props?: any) => {
  const ref: RefProps = {
    onLoad: async () => {
      // 在此处赋值对于客户端是安全的
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
