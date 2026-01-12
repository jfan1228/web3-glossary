# Vercel 部署指南

本文档介绍如何将 Web3词典 部署到 Vercel。

## 前置要求

- GitHub 账号
- Vercel 账号（免费注册）

## 部署步骤

### 1. 推送代码到 GitHub

```bash
# 初始化 git 仓库（如果还没有）
cd /tmp/web3-glossary
git init
git add .
git commit -m "Initial commit: Web3词典"

# 在 GitHub 创建新仓库后，执行以下命令
git remote add origin https://github.com/YOUR_USERNAME/web3-glossary.git
git branch -M main
git push -u origin main
```

### 2. 在 Vercel 导入项目

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "Add New..." → "Project"
3. 在 "Import Git Repository" 部分选择你的 GitHub 仓库
4. 点击 "Import"

### 3. 配置项目设置

Vercel 会自动检测到这是一个 Next.js 项目。你只需要：

- **Project Name**: 输入你的项目名称（如 `web3-glossary`）
- **Framework Preset**: 选择 "Next.js"
- **Root Directory**: 保持默认 `/`
- **Build Command**: 保持默认 `npm run build`
- **Output Directory**: 保持默认 `.next`
- **Install Command**: 保持默认 `npm install`

点击 **"Deploy"** 按钮开始部署。

### 4. 等待部署完成

Vercel 会自动：
1. 安装依赖
2. 构建项目
3. 部署到 Vercel 的全球 CDN

大约需要 2-3 分钟。部署完成后，你会看到一个成功的界面，并提供你的新网站 URL，例如：
```
https://web3-glossary.vercel.app
```

### 5. 配置自定义域名（可选）

如果你有自己的域名，可以：

1. 在 Vercel 项目页面点击 "Settings" → "Domains"
2. 输入你的域名（如 `web3.com`）
3. 按照提示配置 DNS 记录
4. Vercel 会自动提供 SSL 证书

## 环境变量（可选）

如果你想启用 Supabase 认证功能，可以配置环境变量：

1. 在 Vercel 项目页面点击 "Settings" → "Environment Variables"
2. 添加以下变量：

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. 点击 "Save" 后，重新部署项目（Vercel 会提示你）

**注意**: 如果不配置 Supabase，项目仍然可以正常运行，只是认证功能不可用。

## 自动部署

配置完成后，每次你向 GitHub 推送新代码时，Vercel 会自动重新部署。

```bash
# 修改代码后
git add .
git commit -m "Update: 添加新功能"
git push
# Vercel 会自动检测并部署
```

## 性能优化

Vercel 自动提供以下优化：

- **全球 CDN**: 自动缓存静态资源
- **图片优化**: 自动优化 Next.js Image 组件
- **边缘计算**: Next.js API Routes 在边缘运行
- **自动 HTTPS**: 所有域名自动配置 SSL

## 故障排查

### 部署失败

1. 查看部署日志，找到错误信息
2. 常见问题：
   - Node.js 版本冲突 → Vercel 默认使用最新 Node.js，无问题
   - TypeScript 错误 → 运行 `npm run build` 检查
   - 依赖安装失败 → 删除 `node_modules` 重新安装

### 访问网站慢

1. 检查是否使用了 Vercel 的默认域名（免费版）
2. 考虑升级到 Pro 版本，获得更快的边缘节点

## 成本

- **Hobby 计划（免费）**:
  - 无限项目
  - 100GB 带宽/月
  - 1000次边缘函数调用/天
  - 足够个人项目使用

- **Pro 计划（$20/月）**:
  - 无限带宽
  - 无限边缘函数调用
  - 更快的性能
  - 优先支持

## 总结

✅ 你已经成功将 Web3词典 部署到 Vercel！

现在你可以：
- 访问你的网站 URL
- 分享术语到 X (Twitter)
- 邀请其他人使用

祝你使用愉快！🚀
