# 如何在 X (Twitter) 上分享 Web3词典

本文档介绍如何使用 Web3词典 的分享功能，在 X (Twitter) 上分享术语。

## 两种分享方式

### 方式 1: 使用内置分享按钮（推荐）

每个术语卡片上都有一个 "分享到 X" 按钮。

#### 步骤：

1. **访问术语页面**

   在 Web3词典 上搜索或浏览到你想分享的术语，例如：
   ```
   https://your-website.com/hodl
   ```

2. **点击分享按钮**

   在术语卡片上找到并点击 "🐦 分享到 X" 按钮

3. **确认发布推文**

   X 会自动打开发布界面，内容已预填充：
   ```
   刚学会这个词！🤓

   HODL = Hold On for Dear Life
   最早拼写错误的 hold，现在特指"死拿不卖"

   https://your-website.com/hodl
   ```

   点击 "Post" 发布即可。

4. **自动显示精美卡片**

   推文会自动显示一个精美的预览卡片，包含：
   - 术语名称（如 HODL）
   - 英文全称（如 Hold On for Dear Life）
   - 中文解释（如 最早拼写错误的 hold，现在特指"死拿不卖"）
   - 你的网站 Logo

### 方式 2: 直接复制链接分享

如果你想自定义分享内容：

1. **复制术语链接**

   在浏览器地址栏复制术语页面的 URL，例如：
   ```
   https://your-website.com/hodl
   ```

2. **在 X 上创建推文**

   - 打开 X (Twitter)
   - 点击 "What is happening?!" 输入框
   - 粘贴链接

3. **X 自动识别链接并显示卡片**

   X 会自动识别链接，几秒钟后显示预览卡片。

4. **添加自定义文字（可选）**

   你可以在链接前后添加任何你想说的话：
   ```
   推荐这个 Web3 词典！查询所有术语超方便！
   https://your-website.com/hodl
   #Web3 #Crypto #HODL
   ```

## Twitter Card 效果

当你分享任何术语链接时，X 会显示一个**大卡片（Summary Card with Large Image）**，效果如下：

```
┌─────────────────────────────────────────┐
│                                         │
│         📖 Web3词典                     │
│                                         │
│   HODL                                  │
│   Hold On for Dear Life                 │
│   最早拼写错误的 hold，现在特指"死拿不卖"  │
│                                         │
│   https://your-website.com/hodl        │
│                                         │
└─────────────────────────────────────────┘
```

卡片上的图片是动态生成的，每个术语都有独特的视觉设计。

## 分享示例

### 示例 1: 分享 DeFi 术语

```
🏦 刚学到这个 DeFi 术语！

Yield Farming = 收益耕作
通过提供流动性获得代币奖励，相当于 DeFi 版的"理财产品"

https://your-website.com/yield-farming

#DeFi #Web3 #Crypto
```

### 示例 2: 分享 NFT 术语

```
🎨 NFT 爱好者必备！

Floor Price = 地板价
某个 NFT 项目中目前最低的售价，用于判断项目热度

https://your-website.com/floor-price

#NFT #DigitalArt #Web3
```

### 示例 3: 推荐整个网站

```
📚 推荐一个超好用的 Web3 词典！

涵盖 DeFi、NFT、交易、技术等所有 Web3 术语，支持中英文搜索，一键分享！

https://your-website.com

#Web3 #Crypto #学习资源
```

## 批量分享技巧

如果你想分享多个术语：

### 方法 1: 创建术语列表推文串

```
推文 1:
🧵 Web3 新手必学术语清单（1/5）

HODL = Hold On for Dear Life
最早拼写错误的 hold，现在特指"死拿不卖"

https://your-website.com/hodl

推文 2:
WAGMI = We're All Gonna Make It
我们都会成功的！乐观主义者专用口号

https://your-website.com/wagmi

推文 3:
GM = Good Morning
Web3 社区通用问候语

https://your-website.com/gm

...（继续）
```

### 方法 2: 创建分类推荐

```
🏦 DeFi 术语推荐（点击查看）

• Yield Farming - 收益耕作
• TVL - 总锁定价值
• APY - 年化收益率
• Slippage - 滑点

更多术语：https://your-website.com

#DeFi #学习
```

## 最佳实践

### 1. 使用相关标签

添加热门标签可以增加曝光率：
```
#Web3 #Crypto #DeFi #NFT #Blockchain #Airdrop
```

### 2. 添加相关表情符号

让推文更生动：
```
🚀 💎 🐦 🎨 🏦 💰 🔥 📚
```

### 3. 定时发布

选择你的受众活跃时间：
- 工作日：上午 9-11 点，晚上 7-9 点
- 周末：下午 2-4 点

### 4. 互动

回复评论中的问题，引导他们访问网站了解更多。

## 网站分享配置

如果你希望优化 Twitter Card 的显示效果，可以配置以下内容：

### 1. 网站基本信息

在 `src/app/layout.tsx` 中，这些元数据已配置：

```typescript
export const metadata: Metadata = {
  title: "Web3词典 - 快速查询 Web3 术语",
  description: "快速查询、理解并分享 Web3 术语",
  openGraph: {
    title: "Web3词典",
    description: "快速查询、理解并分享 Web3 术语",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web3词典",
    description: "快速查询、理解并分享 Web3 术语",
  },
};
```

### 2. 自定义 OG 图片

每个术语页面都会生成动态 OG 图片（1200x630px）。

如需修改样式，编辑 `src/app/api/og/[slug]/route.tsx`。

## 验证 Twitter Card

你可以使用以下工具验证 Twitter Card 是否正确配置：

1. [Twitter Card Validator](https://cards-dev.twitter.com/validator)
2. 输入你的术语 URL
3. 查看 Preview 部分的显示效果

## 常见问题

### Q: 为什么我的链接没有显示卡片？

**A**:
1. 等待几秒钟，X 需要时间抓取页面信息
2. 检查 URL 是否正确
3. 确保网站已部署（不是 localhost）
4. 尝试刷新页面或重新分享

### Q: 可以分享到其他平台吗？

**A**: 可以，卡片效果也适用于：
- Facebook
- LinkedIn
- Telegram
- WhatsApp
- 其他支持 Open Graph 的平台

### Q: 如何追踪分享效果？

**A**:
1. 使用 Vercel Analytics（免费）
2. 集成 Google Analytics
3. 查看 X 的推文分析数据

### Q: 分享会显示我的个人信息吗？

**A**: 不会。Twitter Card 只显示：
- 术语信息
- 你的网站信息
- 不会显示任何用户数据

## 总结

✅ 使用 Web3词典 的分享功能，你可以：

1. **一键分享**任何术语到 X
2. **自动显示精美卡片**
3. **提高网站流量**
4. **帮助更多人学习 Web3**

快去试试吧！🚀

---

有问题？查看文档：
- [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - 如何部署网站
- [README.md](./README.md) - 项目概述
- [QUICK_START.md](./QUICK_START.md) - 快速开始
