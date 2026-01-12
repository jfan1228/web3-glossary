export interface Category {
  id: string;
  name: string;
  icon: string;
  parentId?: string;
  sortOrder: number;
}

export interface Term {
  id: string;
  term: string;
  englishFull: string;
  chinese: string;
  examples: string[];
  categoryIds: string[];
  slug: string;
  status?: 'active' | 'pending' | 'rejected';
  createdAt: string;
  viewCount?: number;
  shareCount?: number;
  contributor?: {
    displayName: string;
  };
}

export interface SearchResult {
  term: Term;
  category: Category;
  score: number;
}
