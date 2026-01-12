'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithOAuth: (provider: 'github' | 'google') => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const createNoSupabaseError = () => {
  return new Error('认证功能需要配置 Supabase。请查看 SUPABASE_SETUP.md 文件了解如何配置。');
};

const defaultAuthState: AuthContextType = {
  user: null,
  session: null,
  loading: false,
  signInWithOAuth: async () => { throw createNoSupabaseError(); },
  signInWithEmail: async () => { throw createNoSupabaseError(); },
  signUpWithEmail: async () => { throw createNoSupabaseError(); },
  signOut: async () => { throw createNoSupabaseError(); },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const getSession = async () => {
      try {
        const { data: { session: initialSession } } = await supabase!.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        const { data: { subscription } } = supabase!.auth.onAuthStateChange((_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
        });

        return () => {
          subscription?.unsubscribe();
        };
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  const signInWithOAuth = async (provider: 'github' | 'google') => {
    if (!supabase) {
      throw createNoSupabaseError();
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (!supabase) {
      throw createNoSupabaseError();
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    if (!supabase) {
      throw createNoSupabaseError();
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      throw error;
    }
  };

  const signOut = async () => {
    if (!supabase) {
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  const value = supabase ? {
    user,
    session,
    loading,
    signInWithOAuth,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  } : defaultAuthState;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}