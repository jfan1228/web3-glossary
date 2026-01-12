'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { SearchResult } from '@/lib/types';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  suggestions: SearchResult[];
  onSelectTerm: (slug: string) => void;
}

export default function SearchBox({ onSearch, suggestions, onSelectTerm }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="搜索 Web3 黑话..."
          className="w-full px-5 py-4 pl-12 pr-12 text-lg rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
          <ul>
            {suggestions.map((result) => (
              <li
                key={result.term.id}
                onClick={() => {
                  onSelectTerm(result.term.slug);
                  setShowSuggestions(false);
                }}
                className="px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {result.term.term}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {result.category?.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
