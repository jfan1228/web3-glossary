import { ImageResponse } from 'next/og';
import { getTermBySlug } from '@/lib/utils';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const term = getTermBySlug(slug);

  if (!term) {
    return new Response('Not found', { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: '96px',
            fontWeight: 'bold',
            marginBottom: '30px',
            textShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          }}
        >
          {term.term}
        </div>
        {term.englishFull && (
          <div
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '32px',
              marginBottom: '40px',
              fontStyle: 'italic',
            }}
          >
            {term.englishFull}
          </div>
        )}
        <div
          style={{
            color: 'white',
            fontSize: '36px',
            fontWeight: '500',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: '1.5',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          {term.chinese}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '60px',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '20px',
            fontWeight: '500',
          }}
        >
          📖 Web3黑话词典
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
