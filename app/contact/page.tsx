import type { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import { heroSlides, site } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';

const description = `Contact Sehras in ${site.city} to plan a wedding, birthday, corporate event or family celebration. Call ${site.phoneDisplay} or send an enquiry — ${site.founder} replies within 24 hours.`;

export const metadata: Metadata = {
  title: { absolute: `Contact ${site.name} — Wedding & Event Planners in ${site.city}` },
  description,
  alternates: { canonical: '/contact/' },
  openGraph: { type: 'website', url: '/contact/', title: `Contact ${site.name} — Wedding & Event Planners in ${site.city}`, description },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact Us', path: '/contact/' }])} />
      <PageHero
        title="Contact Us"
        eyebrow="Sehras · Bengaluru"
        sub={`Tell us about your occasion and ${site.founder} will get back to you personally within 24 hours.`}
        image={heroSlides[1].src}
      />
      <ContactSection />
    </>
  );
}
