import type { Metadata } from 'next';
import AboutSection from '@/components/AboutSection';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import { heroSlides, site, stats } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';

const description = `Meet ${site.founder}, founder of Sehras — wedding and event planners in ${site.city} who lead every celebration personally, from the first conversation to the final goodbye.`;

export const metadata: Metadata = {
  title: 'About Us',
  description,
  alternates: { canonical: '/about/' },
  openGraph: { type: 'website', url: '/about/', title: `About Us | ${site.name}`, description },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about/' }])} />
      <PageHero
        title="About Us"
        eyebrow="The Sehras story"
        sub={`A Bengaluru studio for weddings and celebrations, led personally by ${site.founder}.`}
        image={heroSlides[2].src}
      />
      <AboutSection />
      <section className="stats stats-plain" aria-label="Sehras in numbers">
        <div className="stats-inner">
          {stats.map((s) => (
            <div key={s.label} className="stat reveal">
              <span className="stat-num" data-count={s.value} data-suffix={s.suffix}>{s.value}{s.suffix}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
