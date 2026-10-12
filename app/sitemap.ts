import type { MetadataRoute } from 'next';
import { services, site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/about/`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${site.url}/contact/`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
