import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(requestUrl.origin);
  }

  try {
    if (supabase) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) throw error;
    }
  } catch (error) {
    console.error('认证回调错误:', error);
  }

  return NextResponse.redirect(requestUrl.origin);
}