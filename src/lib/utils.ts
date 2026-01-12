import { Term, SearchResult } from './types';
import { terms, categories } from '../data/terms';

export function searchTerms(query: string): SearchResult[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  terms.forEach((term) => {
    let score = 0;

    const termLower = term.term.toLowerCase();
    const chineseLower = term.chinese.toLowerCase();
    const englishFullLower = (term.englishFull || '').toLowerCase();

    if (termLower === normalizedQuery) {
      score += 100;
    } else if (termLower.includes(normalizedQuery)) {
      score += 50;
    }

    if (chineseLower.includes(normalizedQuery)) {
      score += 30;
    }

    if (englishFullLower.includes(normalizedQuery)) {
      score += 20;
    }

    if (term.examples.some((ex: string) => ex.toLowerCase().includes(normalizedQuery))) {
      score += 15;
    }

    if (score > 0) {
      const category = categories.find((cat) => cat.id === term.categoryIds[0]);
      results.push({
        term,
        category: category!,
        score,
      });
    }
  });

  return results.sort((a, b) => b.score - a.score).slice(0, 10);
}

export function getTermsByCategory(categoryId: string): Term[] {
  return terms.filter((term) => term.categoryIds.includes(categoryId));
}

export function getTermBySlug(slug: string): Term | undefined {
  return terms.find((term) => term.slug === slug);
}

export function getRandomTerms(count: number = 5): Term[] {
  const shuffled = [...terms].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
