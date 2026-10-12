import { faqs, services, site, type Service } from './site';

const abs = (path: string) => (path.startsWith('http') ? path : `${site.url}${path}`);
const businessId = `${site.url}/#business`;

export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['EventPlanner', 'LocalBusiness'],
    '@id': businessId,
    name: site.name,
    description: site.description,
    url: `${site.url}/`,
    logo: abs('/images/logo-full.png'),
    image: abs('/og-image.png'),
    telephone: site.phone,
    priceRange: '₹₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.street,
      addressLocality: site.city,
      postalCode: site.postalCode,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    areaServed: [{ '@type': 'Country', name: 'India' }, { '@type': 'City', name: site.city }],
    founder: { '@type': 'Person', name: site.founder, jobTitle: 'Founder & Lead Planner' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Wedding & event services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, url: abs(`/services/${s.slug}/`) },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: `${site.url}/`,
    name: site.name,
    publisher: { '@id': businessId },
    inLanguage: 'en-IN',
  };
}

export function faqSchema(items: { q: string; a: string }[] = faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceSchema(s: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    serviceType: s.title,
    description: s.metaDescription,
    url: abs(`/services/${s.slug}/`),
    image: s.image,
    provider: { '@id': businessId },
    areaServed: { '@type': 'Country', name: 'India' },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}
