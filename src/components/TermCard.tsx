'use client';

import { Term, Category } from '@/lib/types';
import { Twitter, Copy, BookOpen } from 'lucide-react';

interface TermCardProps {
  term: Term;
  category?: Category;
}

export default function TermCard({ term, category }: TermCardProps) {
  const handleShare = () => {
    const url = window.location.origin + '/' + term.slug;
    const text = `刚学会这个词！🤓\n\n${term.term} = ${term.englishFull}\n${term.chinese}\n\n${url}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleCopy = async () => {
    const text = `${term.term} = ${term.englishFull}\n${term.chinese}`;
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all hover:shadow-xl">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {term.term}
          </h2>
          {category && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
              {category.icon} {category.name}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="分享到 X"
          >
            <Twitter className="w-5 h-5 text-blue-400" />
          </button>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="复制"
          >
            <Copy className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {term.englishFull && (
        <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-3">
          {term.englishFull}
        </p>
      )}

      <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
        {term.chinese}
      </p>

      {term.examples && term.examples.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              典型用法：
            </span>
          </div>
          <ul className="space-y-2">
            {term.examples.map((example, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 dark:text-gray-400 pl-6 relative"
              >
                <span className="absolute left-2 text-gray-400 dark:text-gray-500">•</span>
                {example}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
