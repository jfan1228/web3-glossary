import { Metadata } from 'next';
import { getTermBySlug, getTermsByCategory } from '@/lib/utils';
import { categories } from '@/data/terms';
import TermCard from '@/components/TermCard';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = getTermBySlug(slug);

  if (!term) {
    return {
      title: '术语未找到 - Web3词典',
    };
  }

  const category = categories.find((cat) => cat.id === term.categoryIds[0]);
  const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${slug}`;

  return {
    title: `${term.term} | Web3词典`,
    description: `${term.chinese} - ${term.englishFull}`,
    keywords: [term.term, term.englishFull, ...term.categoryIds],
    openGraph: {
      title: term.term,
      description: term.chinese,
      url,
      siteName: 'Web3词典',
      images: [
        {
          url: `/api/og/${slug}`,
          width: 1200,
          height: 630,
          alt: term.term,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: term.term,
      description: term.chinese,
      images: [`/api/og/${slug}`],
    },
  };
}

export default async function TermPage({ params }: PageProps) {
  const { slug } = await params;
  const term = getTermBySlug(slug);

  if (!term) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            术语未找到
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            抱歉，您查找的术语不存在
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const category = categories.find((cat) => cat.id === term.categoryIds[0]);
  const relatedTerms = getTermsByCategory(term.categoryIds[0])
    .filter((t) => t.id !== term.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium mb-8 transition-colors"
        >
          ← 返回首页
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TermCard term={term} category={category} />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                相关术语
              </h3>
              <ul className="space-y-3">
                {relatedTerms.map((t) => {
                  const cat = categories.find((c) => c.id === t.categoryIds[0]);
                  return (
                    <li key={t.id}>
                      <Link
                        href={`/${t.slug}`}
                        className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="font-semibold text-gray-900 dark:text-white mb-1">
                          {t.term}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {cat?.icon} {cat?.name}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
