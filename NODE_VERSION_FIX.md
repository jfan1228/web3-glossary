# Node.js 版本问题说明

## 问题描述

当前 Node.js 版本：v18.17.0

Next.js 要求：
- **Next.js 16**: Node.js >= 20.9.0
- **Next.js 15.x**: Node.js >= 18.18.0 || ^19.8.0 || >= 20.0.0

**你的 Node.js 18.17.0 不满足 Next.js 15.x 的最低要求（需要 >= 18.18.0）**

---

## 解决方案

### 方案 1：升级 Node.js（推荐）

#### macOS 使用 Homebrew

```bash
# 检查当前 Node.js 版本
node -v

# 使用 Homebrew 安装最新 Node.js
brew install node

# 验证版本
node -v
# 应该显示：v20.x.x 或更高
```

#### 使用 NVM (Node Version Manager)

```bash
# 安装 NVM（如果已安装则跳过）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新加载 shell 配置
source ~/.bashrc  # 或 ~/.zshrc

# 安装最新 Node.js
nvm install node

# 使用最新 Node.js
nvm use node

# 验证版本
node -v
```

#### 使用 Volta

```bash
# 安装 Volta
curl https://get.volta.sh | bash

# 安装最新 Node.js
volta install node

# 验证版本
node -v
```

升级后，进入项目目录并运行：

```bash
cd /tmp/web3-glossary
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### 方案 2：降级到兼容版本（临时方案）

如果不想升级 Node.js，可以：

1. 使用 Node.js 18.18.0 或更高（通过 nvm 安装）
2. 或者暂时忽略警告继续运行（不推荐）

---

## 验证升级成功

升级 Node.js 后：

```bash
# 进入项目目录
cd /tmp/web3-glossary

# 清理旧的依赖
rm -rf node_modules package-lock.json

# 重新安装
npm install

# 启动开发服务器
npm run dev
```

应该看到：

```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

---

## 推荐的开发环境

### 最低要求
- Node.js >= 18.18.0
- npm >= 9.6.0

### 推荐版本（2025-2026）
- Node.js 20.x LTS 或 22.x Current
- npm 10.x 或更高

### 检查当前环境

```bash
# Node.js 版本
node -v

# npm 版本
npm -v

# 全局包
npm list -g --depth=0
```

---

## 部署注意事项

### Vercel 部署

Vercel 自动处理 Node.js 版本，无需额外配置。

### 其他平台部署

**Netlify**、**Cloudflare Pages**、**Render** 等平台：

确保在部署设置中指定 Node.js 版本：

1. **Netlify**: 创建 `netlify.toml` 文件
   ```toml
   [build.environment]
     NODE_VERSION = "18.18.0"
   ```

2. **Render**: 在项目设置中指定 Node.js 版本

3. **Railway**: 在部署设置中指定 Node.js 版本

---

## 故障排除

### 问题：npm install 失败

```bash
# 清理 npm 缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### 问题：Next.js 构建失败

```bash
# 清理构建缓存
rm -rf .next

# 重新构建
npm run build
```

### 问题：端口 3000 被占用

```bash
# 查找占用端口的进程
lsof -i :3000

# 杀死进程
kill -9 <PID>

# 或使用其他端口
PORT=3001 npm run dev
```

---

## 更多资源

- [Node.js 官方下载](https://nodejs.org/)
- [NVM GitHub](https://github.com/nvm-sh/nvm)
- [Volta 官网](https://volta.sh/)
- [Next.js 文档](https://nextjs.org/docs)
