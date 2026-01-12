import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseClient: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
}

export type Database = {
  public: {
    Tables: {
      terms: {
        Row: {
          id: string;
          term: string;
          english_full: string;
          chinese: string;
          examples: string[];
          category_ids: string[];
          slug: string;
          status: 'active' | 'pending' | 'rejected';
          created_at: string;
          view_count: number;
          share_count: number;
          contributor_id: string;
        };
        Insert: {
          id: string;
          term: string;
          english_full: string;
          chinese: string;
          examples: string[];
          category_ids: string[];
          slug: string;
          status: 'active' | 'pending' | 'rejected';
          created_at: string;
          view_count: number;
          share_count: number;
          contributor_id: string;
        };
        Update: {
          id: string;
          term: string;
          english_full: string;
          chinese: string;
          examples: string[];
          category_ids: string[];
          slug: string;
          status: 'active' | 'pending' | 'rejected';
          created_at: string;
          view_count: number;
          share_count: number;
          contributor_id: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          icon: string;
          parent_id: string;
          sort_order: number;
        };
        Insert: {
          id: string;
          name: string;
          icon: string;
          parent_id: string;
          sort_order: number;
        };
        Update: {
          id: string;
          name: string;
          icon: string;
          parent_id: string;
          sort_order: number;
        };
      };
      contributions: {
        Row: {
          id: string;
          user_id: string;
          term_id: string;
          status: 'pending' | 'approved' | 'rejected';
          submitted_at: string;
          reviewed_at: string;
          reviewed_by: string;
          notes: string;
        };
        Insert: {
          id: string;
          user_id: string;
          term_id: string;
          status: 'pending' | 'approved' | 'rejected';
          submitted_at: string;
          reviewed_at: string;
          reviewed_by: string;
          notes: string;
        };
        Update: {
          id: string;
          user_id: string;
          term_id: string;
          status: 'pending' | 'approved' | 'rejected';
          submitted_at: string;
          reviewed_at: string;
          reviewed_by: string;
          notes: string;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          display_name: string;
          avatar_url: string;
          contribution_count: number;
          level: 'beginner' | 'intermediate' | 'expert';
          bio: string;
          created_at: string;
        };
        Insert: {
          id: string;
          display_name: string;
          avatar_url: string;
          contribution_count: number;
          level: 'beginner' | 'intermediate' | 'expert';
          bio: string;
          created_at: string;
        };
        Update: {
          id: string;
          display_name: string;
          avatar_url: string;
          contribution_count: number;
          level: 'beginner' | 'intermediate' | 'expert';
          bio: string;
          created_at: string;
        };
      };
      tips: {
        Row: {
          id: string;
          user_id: string;
          amount: string;
          currency: string;
          network: string;
          message: string;
          tx_hash: string;
          created_at: string;
        };
        Insert: {
          id: string;
          user_id: string;
          amount: string;
          currency: string;
          network: string;
          message: string;
          tx_hash: string;
          created_at: string;
        };
        Update: {
          id: string;
          user_id: string;
          amount: string;
          currency: string;
          network: string;
          message: string;
          tx_hash: string;
          created_at: string;
        };
      };
    };
  };
};

export const supabase = supabaseClient;
