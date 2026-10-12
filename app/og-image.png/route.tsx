import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

const size = { width: 1200, height: 630 };

// Rendered once at build time into /og-image.png — the preview card for WhatsApp, Facebook, LinkedIn, X.
export async function GET() {
  const logo = await readFile(join(process.cwd(), 'public/images/logo-full.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 64,
          background: 'radial-gradient(ellipse at 30% 20%, #3d1119 0%, #0e0a08 60%)', color: '#f6efe3',
        }}
      >
        <img src={logoSrc} width={330} height={284} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 600 }}>
          <div style={{ fontSize: 22, letterSpacing: 8, color: '#e2c385', textTransform: 'uppercase' }}>{site.tagline}</div>
          <div style={{ fontSize: 68, lineHeight: 1.05, marginTop: 20 }}>Every vow, held with care.</div>
          <div style={{ fontSize: 26, opacity: 0.75, marginTop: 24 }}>{`Wedding design · Planning · Destination · Hospitality — ${site.city}`}</div>
        </div>
      </div>
    ),
    size,
  );
}
