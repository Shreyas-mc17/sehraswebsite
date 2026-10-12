import type { Metadata, Viewport } from 'next';
import { Cinzel, Cormorant_Garamond, Jost } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Effects from '@/components/Effects';
import ClickTracking from '@/components/ClickTracking';
import JsonLd from '@/components/JsonLd';
import { site, waLink } from '@/lib/site';
import { businessSchema, websiteSchema } from '@/lib/schema';
import './globals.css';

// Self-hosted at build time by next/font: no layout shift, no render-blocking Google Fonts request.
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});
const caps = Cinzel({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-caps', display: 'swap' });
const sans = Jost({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: '/',
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: site.title }],
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description, images: ['/og-image.png'] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#0e0a08',
  width: 'device-width',
  initialScale: 1,
};

// Runs before first paint: enables JS-only animation states and skips the logo intro for returning
// visitors and reduced-motion users. Pages without the intro are marked ready by Effects.
const bootScript = `(function(d){d.classList.add('js');try{if(sessionStorage.getItem('sehras-intro'))d.classList.add('intro-seen')}catch(e){}if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('intro-seen');if(d.classList.contains('intro-seen'))d.classList.add('is-ready')})(document.documentElement)`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${caps.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <JsonLd data={[businessSchema(), websiteSchema()]} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>

        <Nav />
        <main id="main">{children}</main>
        <Footer />

        <a
          className="wa-fab"
          href={waLink('Hello Sehras, I would like to enquire about an event.')}
          target="_blank"
          rel="noopener"
          aria-label="Chat with Sehras on WhatsApp"
        >
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path fill="currentColor" d="M16.04 3C9.4 3 4 8.36 4 14.96c0 2.1.56 4.16 1.62 5.97L4 29l8.3-1.6a12.1 12.1 0 0 0 3.74.6C22.68 28 28 22.64 28 16.04 28 9.4 22.68 3 16.04 3Zm0 22.86c-1.18 0-2.34-.2-3.44-.6l-.5-.18-4.92.95.96-4.78-.2-.5a9.78 9.78 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.6-9.8 5.4 0 9.8 4.4 9.8 9.8 0 5.6-4.4 10.3-9.8 10.3Zm5.38-7.3c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.9 8.9 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.57-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.48.71.31 1.27.5 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.75-.72 2-1.4.25-.7.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35Z" />
          </svg>
          <span>Chat with us</span>
        </a>

        <Effects />
        <ClickTracking />
        {site.gaId && <GoogleAnalytics gaId={site.gaId} />}
      </body>
    </html>
  );
}
