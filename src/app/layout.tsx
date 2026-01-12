import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web3词典 - 快速查询 Web3 术语",
  description: "专为 Web3 新手和爱好者打造的词典，快速查询、理解并分享 Web3 行业术语。包含 DeFi、NFT、交易、技术等各领域术语。",
  keywords: ["Web3", "词典", "加密货币", "DeFi", "NFT", "区块链"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
