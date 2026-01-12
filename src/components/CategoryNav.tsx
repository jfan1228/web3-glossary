'use client';

import { Category } from '@/lib/types';

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export default function CategoryNav({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryNavProps) {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-3 min-w-max">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-5 py-2.5 rounded-full font-medium transition-all whitespace-nowrap ${
            selectedCategory === null
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          📖 全部
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-5 py-2.5 rounded-full font-medium transition-all whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
