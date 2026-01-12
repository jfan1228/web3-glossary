# Supabase 认证配置指南

本文档介绍如何为 Web3 黑话词典项目配置 Supabase 认证。

## 前置条件

1. 创建 Supabase 账户：https://supabase.com
2. 创建一个新项目

## 步骤 1：设置 Supabase 项目

### 1.1 创建数据库表

在 Supabase Dashboard 中，打开 SQL Editor 并执行以下 SQL：

```sql
-- 创建分类表
CREATE TABLE public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  parent_id UUID REFERENCES categories(id),
  sort_order INTEGER DEFAULT 0
);

-- 创建术语表
CREATE TABLE public.terms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  term VARCHAR(100) NOT NULL UNIQUE,
  english_full TEXT,
  chinese TEXT NOT NULL,
  examples TEXT[] DEFAULT '{}',
  category_ids UUID[] NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'pending', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  contributor_id UUID REFERENCES auth.users(id)
);

-- 创建贡献表
CREATE TABLE public.contributions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  term_id UUID REFERENCES terms(id) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id),
  notes TEXT
);

-- 创建用户资料表
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  display_name VARCHAR(100),
  avatar_url TEXT,
  contribution_count INTEGER DEFAULT 0,
  level VARCHAR(20) DEFAULT 'beginner' CHECK (level IN ('beginner', 'intermediate', 'expert')),
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建打赏表
CREATE TABLE public.tips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  amount DECIMAL(20, 8) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  network VARCHAR(20),
  message TEXT,
  tx_hash VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用行级安全策略 (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tips ENABLE ROW LEVEL SECURITY;

-- 允许所有用户读取数据
CREATE POLICY "允许所有用户读取分类"
ON public.categories FOR SELECT USING (true);

CREATE POLICY "允许所有用户读取术语"
ON public.terms FOR SELECT USING (true);

CREATE POLICY "允许所有用户读取贡献"
ON public.contributions FOR SELECT USING (true);

CREATE POLICY "允许所有用户读取打赏"
ON public.tips FOR SELECT USING (true);

-- 允许认证用户创建贡献
CREATE POLICY "允许认证用户创建贡献"
ON public.contributions FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 允许认证用户创建用户资料
CREATE POLICY "允许认证用户创建用户资料"
ON public.user_profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- 允许认证用户更新自己的用户资料
CREATE POLICY "允许认证用户更新自己的用户资料"
ON public.user_profiles FOR UPDATE
USING (auth.uid() = id);

-- 允许认证用户创建打赏记录
CREATE POLICY "允许认证用户创建打赏记录"
ON public.tips FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### 1.2 配置身份验证提供者

在 Supabase Dashboard 中：

1. 进入 **Authentication** → **Providers**
2. 启用以下提供者：
   - **GitHub**: 按照文档配置 OAuth App
   - **Google**: 按照文档配置 OAuth App

### 1.3 获取项目 URL 和密钥

在 Supabase Dashboard 中：

1. 进入 **Project Settings** → **API**
2. 复制以下信息：
   - **Project URL**: `https://xxx.supabase.co`
   - **anon public key**: 以 `eyJ...` 开头的长字符串

## 步骤 2：配置环境变量

### 2.1 创建环境变量文件

在项目根目录创建 `.env.local` 文件：

```bash
# 复制示例文件
cp .env.local.example .env.local
```

### 2.2 编辑 .env.local 文件

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Base URL for OG images
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 2.3 部署到生产环境

在部署平台（如 Vercel）中添加环境变量：

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_BASE_URL`

## 步骤 3：配置 OAuth 回调

### 3.1 GitHub OAuth

1. 访问 https://github.com/settings/developers
2. 点击 **New OAuth App**
3. 配置：
   - **Application name**: Web3 黑话词典
   - **Homepage URL**: `http://localhost:3000` (开发) 或你的生产域名
   - **Authorization callback URL**: `https://your-project.supabase.co/auth/v1/callback`

### 3.2 Google OAuth

1. 访问 https://console.cloud.google.com/apis/credentials
2. 创建 OAuth 2.0 客户端 ID
3. 配置：
   - **Authorized redirect URIs**: `https://your-project.supabase.co/auth/v1/callback`

## 步骤 4：测试认证

### 4.1 启动开发服务器

```bash
npm run dev
```

### 4.2 测试登录流程

1. 访问 http://localhost:3000
2. 点击右上角的"登录"按钮
3. 选择 OAuth 提供者（GitHub 或 Google）
4. 完成登录流程
5. 确认用户已登录

### 4.3 测试用户数据

登录后，你可以：
- 查看用户信息
- 提交新术语（需要认证）
- 查看自己的贡献历史

## 故障排除

### 问题：登录失败

**解决方案**：
1. 检查 `.env.local` 中的 URL 和密钥是否正确
2. 确认 Supabase 项目中的 OAuth 提供者已启用
3. 检查浏览器控制台的错误信息
4. 确认回调 URL 配置正确

### 问题：用户信息不显示

**解决方案**：
1. 检查 Row Level Security (RLS) 策略
2. 确认用户表有读取权限
3. 检查网络连接

### 问题：数据库查询失败

**解决方案**：
1. 确认数据库表已创建
2. 检查 RLS 策略
3. 在 Supabase Dashboard 中查看数据库日志

## 安全建议

1. **保护环境变量**
   - 不要将 `.env.local` 提交到 Git
   - 已在 `.gitignore` 中配置

2. **使用 RLS (Row Level Security)**
   - 确保用户只能访问自己的数据
   - 使用 Supabase 的身份验证集成

3. **OAuth 安全**
   - 使用 HTTPS
   - 验证回调 URL
   - 限制作用域

## 下一步

认证配置完成后，你可以：

1. **实现真正的贡献系统**
   - 用户提交术语到数据库
   - 管理员审核贡献
   - 查看贡献历史

2. **实现用户资料**
   - 更新显示名称
   - 上传头像
   - 查看贡献统计

3. **实现高级功能**
   - 收藏术语
   - 搜索历史
   - 用户等级系统

## 相关文档

- [Supabase 文档](https://supabase.com/docs)
- [Supabase Auth 文档](https://supabase.com/docs/guides/auth)
- [Next.js Auth 文档](https://supabase.com/docs/guides/with-nextjs)

## 支持

如有问题，请提交 GitHub Issue 或查阅：
- Supabase Dashboard 日志
- 浏览器控制台错误
- 网络请求日志
