'use client';

import { useState } from 'react';
import { Plus, X, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ContributionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContributionForm({ isOpen, onClose }: ContributionFormProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    term: '',
    englishFull: '',
    chinese: '',
    examples: '',
    categoryId: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      try {
        alert('感谢您的贡献！术语已提交审核（演示模式）。\n\n提示：要启用真实的认证和数据库功能，请按照 SUPABASE_SETUP.md 文件配置 Supabase 环境变量。');
        setIsSubmitting(false);
        onClose();
        setFormData({
          term: '',
          englishFull: '',
          chinese: '',
          examples: '',
          categoryId: '',
        });
      } catch (error) {
        console.error('提交失败:', error);
        alert('提交失败，请稍后重试。');
        setIsSubmitting(false);
      }
    }, 1000);
  };

  if (!isOpen) return null;

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              需要登录才能贡献
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              登录后即可提交新术语到我们的词典中
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            返回
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            ✏️ 提交新术语
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              术语（英文） *
            </label>
            <input
              type="text"
              required
              value={formData.term}
              onChange={(e) => setFormData({ ...formData, term: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="例如: HODL"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              英文全称
            </label>
            <input
              type="text"
              value={formData.englishFull}
              onChange={(e) =>
                setFormData({ ...formData, englishFull: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="例如: Hold On for Dear Life"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              中文通俗解释 *
            </label>
            <textarea
              required
              value={formData.chinese}
              onChange={(e) =>
                setFormData({ ...formData, chinese: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="例如: 最早拼写错误的 hold，现在特指'死拿不卖'"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              典型用法（每行一个）
            </label>
            <textarea
              value={formData.examples}
              onChange={(e) =>
                setFormData({ ...formData, examples: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="例如: HODL your BTC"
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              required
              id="agree"
              className="mt-1"
            />
            <label htmlFor="agree" className="text-sm text-gray-600 dark:text-gray-400">
              我同意将此内容以{' '}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 underline"
              >
                CC BY-NC-SA 4.0
              </a>{' '}
              协议授权
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  提交中...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  提交审核
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
