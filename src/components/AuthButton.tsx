'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, LogOut, Github, Mail, X } from 'lucide-react';

export default function AuthButton() {
  const { user, loading, signInWithOAuth, signOut } = useAuth();
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const handleSignIn = async (provider: 'github' | 'google') => {
    setIsLoginLoading(true);
    try {
      await signInWithOAuth(provider);
    } catch (error: unknown) {
      const err = error as Error;
      if (err.message && (err.message.includes('Supabase') || err.message.includes('配置'))) {
        alert('认证功能需要配置 Supabase 环境变量。\n\n当前使用演示模式，所有功能都可以正常使用。');
      } else {
        alert('登录失败，请稍后重试。');
        console.error('登录错误:', error);
      }
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('登出错误:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
        <span className="text-sm">加载中...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative">
        <button
          onClick={() => !isLoginLoading && setShowLoginOptions(!showLoginOptions)}
          disabled={isLoginLoading}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogIn className="w-4 h-4" />
          {isLoginLoading ? '处理中...' : '登录'}
        </button>

        {showLoginOptions && !isLoginLoading && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowLoginOptions(false)}
            />
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
              <div className="p-4 space-y-2">
                <button
                  onClick={() => handleSignIn('github')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    使用 GitHub 登录
                  </span>
                </button>
                <button
                  onClick={() => handleSignIn('google')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <X className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    使用 Google 登录
                  </span>
                </button>
                <div className="relative pt-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                  </div>
                  <span className="relative flex justify-center text-xs text-gray-500">
                    或
                  </span>
                </div>
                <button
                  onClick={() => alert('邮箱登录需要完整的认证流程配置，这里为演示。')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    使用邮箱登录
                  </span>
                </button>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 text-xs text-gray-600 dark:text-gray-400">
                登录即表示同意我们的
                <a href="#" className="text-purple-600 hover:underline">
                  服务条款
                </a>
                 和
                <a href="#" className="text-purple-600 hover:underline">
                  隐私政策
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="text-right">
        <div className="font-medium text-gray-900 dark:text-white">
          {user.user_metadata?.display_name || user.email}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          已登录
        </div>
      </div>
      <button
        onClick={handleSignOut}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        登出
      </button>
    </div>
  );
}
