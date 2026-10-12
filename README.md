# Sehras — Luxury Weddings & Hospitality

Marketing site for Sehras, built with **Next.js 16 (App Router)** as a **fully static export** — every page is pre-rendered HTML, so it is fast, SEO-friendly and can be hosted anywhere (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3, cPanel…).

## Quick start

```bash
npm install
cp .env.example .env.local      # set NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_GA_ID
npm run dev                     # http://localhost:3000
npm run build                   # writes the static site to ./out
npm start                       # preview ./out locally
```

## Configuration (`.env.production` / host env vars)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Live domain, e.g. `https://www.sehras.in`. Used for canonical URLs, sitemap, robots, Open Graph and JSON-LD. **Set this before deploying.** |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`). Leave empty to disable analytics. |

## Editing content

All copy, phone numbers, services, FAQs, gallery photos and testimonials live in **`lib/site.ts`**. Add a service there and its page (`/services/<slug>/`), sitemap entry, footer link and structured data are generated automatically.

Gallery/hero images currently point to Unsplash placeholders — replace them with real Sehras event photography (put files in `public/images/` and reference them as `/images/your-file.jpg`).

## SEO built in

- Per-page `<title>`, meta description, canonical URL, Open Graph + Twitter cards (`app/layout.tsx`, `generateMetadata` in service pages)
- Branded share image generated at build time → `/og-image.png`
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`
- JSON-LD structured data: `EventPlanner`/`LocalBusiness`, `WebSite`, `Service`, `BreadcrumbList`, `FAQPage` (`lib/schema.ts`)
- One static, crawlable page per service with unique copy and FAQs
- Self-hosted fonts via `next/font` (no layout shift, no render-blocking font requests), priority-loaded hero image, lazy-loaded below-the-fold images

After going live: add the site to **Google Search Console**, submit `https://<domain>/sitemap.xml`, and create/claim the **Google Business Profile** for Bengaluru.

## Google Analytics events

Page views are tracked automatically (GA4 enhanced measurement handles client-side navigation). Custom events:

| Event | When |
| --- | --- |
| `generate_lead` | Enquiry form submitted (opens WhatsApp) — mark as a **key event** in GA4 |
| `click_call` | Any `tel:` link clicked |
| `click_whatsapp` | Any WhatsApp link clicked |
| `gallery_filter` | Gallery category chosen |

## Project layout

```
app/                 routes, metadata, sitemap/robots/manifest, OG image, global CSS
app/services/[slug]  statically generated service pages
components/          UI (client components only where interactivity is needed)
lib/site.ts          all content & config
lib/schema.ts        JSON-LD builders
scripts/             post-build fix for static-export prefetch files
sehras-website  added design/   original static HTML prototype (reference only)
```
