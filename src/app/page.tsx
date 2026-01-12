'use client';

import { useState, useEffect } from 'react';
import { categories } from '@/data/terms';
import { searchTerms, getTermsByCategory, getRandomTerms } from '@/lib/utils';
import { SearchResult, Term } from '@/lib/types';
import SearchBox from '@/components/SearchBox';
import CategoryNav from '@/components/CategoryNav';
import TermCard from '@/components/TermCard';
import ContributionForm from '@/components/ContributionForm';
import TippingModal from '@/components/TippingModal';
import AuthButton from '@/components/AuthButton';
import { Coffee, Plus } from 'lucide-react';

export default function Home() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [displayedTerms, setDisplayedTerms] = useState<Term[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showContribution, setShowContribution] = useState(false);
  const [showTipping, setShowTipping] = useState(false);

  useEffect(() => {
    const randomTerms = getRandomTerms(8);
    setDisplayedTerms(randomTerms);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const categoryTerms = getTermsByCategory(selectedCategory);
      setDisplayedTerms(categoryTerms);
    } else if (searchResults.length === 0) {
      const randomTerms = getRandomTerms(8);
      setDisplayedTerms(randomTerms);
    }
  }, [selectedCategory, searchResults]);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSelectedCategory(null);
      return;
    }

    const results = searchTerms(query);
    setSearchResults(results);
    setSelectedCategory(null);

    if (results.length > 0) {
      setDisplayedTerms(results.map((r) => r.term));
    } else {
      setDisplayedTerms([]);
    }
  };

  const handleSelectTerm = (slug: string) => {
    const term = displayedTerms.find((t) => t.slug === slug);
    if (term) {
      setDisplayedTerms([term]);
    }
  };

  const getCategoryForTerm = (term: Term) => {
    const categoryId = term.categoryIds[0];
    return categories.find((cat) => cat.id === categoryId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <ContributionForm isOpen={showContribution} onClose={() => setShowContribution(false)} />
      <TippingModal isOpen={showTipping} onClose={() => setShowTipping(false)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="flex items-center justify-between mb-12">
          <div className="text-center flex-1">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              📖 Web3词典
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              快速查询、理解并分享 Web3 术语
            </p>
          </div>
          <AuthButton />
        </header>

        <div className="mb-8">
          <SearchBox
            onSearch={handleSearch}
            suggestions={searchResults}
            onSelectTerm={handleSelectTerm}
          />
        </div>

        <div className="mb-8">
          <CategoryNav
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">加载中...</p>
            </div>
          </div>
        ) : displayedTerms.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              未找到相关术语
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedTerms.map((term) => (
              <TermCard
                key={term.id}
                term={term}
                category={getCategoryForTerm(term)}
              />
            ))}
          </div>
        )}

        <div className="fixed bottom-8 right-8 flex flex-col gap-3">
          <button
            onClick={() => setShowTipping(true)}
            className="p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all hover:scale-110"
            title="打赏"
          >
            <Coffee className="w-6 h-6" />
          </button>
          <button
            onClick={() => setShowContribution(true)}
            className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110"
            title="贡献术语"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
