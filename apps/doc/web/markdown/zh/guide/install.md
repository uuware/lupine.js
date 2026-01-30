---
title: 安装说明
---

# 安装说明

可以通过克隆主仓库来安装 LupineJS。

## 开发环境

1. **克隆仓库**:

   ```bash
   git clone https://github.com/uuware/lupine.js.git
   ```

2. **安装依赖**:

   ```bash
   npm install
   ```

3. **环境配置**:
   将 `.env.sample` 复制为 `.env` 并根据需要进行配置。

## 生产环境构建

构建生产版本：

```bash
npm run build
```

构建结果将生成在 `dist/server_root` 目录下。
