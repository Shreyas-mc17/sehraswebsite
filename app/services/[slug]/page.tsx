import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContactSection from '@/components/ContactSection';
import JsonLd from '@/components/JsonLd';
import { Eyebrow, ServiceIcon } from '@/components/Icons';
import { services, site } from '@/lib/site';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  const path = `/services/${s.slug}/`;
  const title = `${s.title} in ${site.city} & Destination Weddings`;
  return {
    title,
    description: s.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      title: `${s.title} | ${site.name}`,
      description: s.metaDescription,
      images: [{ url: s.image, width: 1600, height: 1067, alt: s.title }],
    },
    twitter: { card: 'summary_large_image', title: `${s.title} | ${site.name}`, description: s.metaDescription, images: [s.image] },
  };
}

const eventFor: Record<string, string> = {
  'destination-weddings': 'Destination wedding',
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(s),
          faqSchema(s.faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/#services' },
            { name: s.title, path: `/services/${s.slug}/` },
          ]),
        ]}
      />

      <section className="page-hero">
        <div className="page-hero-media">
          <img src={s.image.replace('w=1600', 'w=2000')} alt="" fetchPriority="high" />
        </div>
        <div className="hero-veil" />
        <div className="page-hero-content">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/#services">Services</Link></li>
              <li aria-current="page">{s.title}</li>
            </ol>
          </nav>
          <p className="eyebrow hero-eyebrow">Service {s.num} · Sehras</p>
          <h1 className="hero-title page-title">
            <span className="line"><span>{s.title}</span></span>
          </h1>
          <p className="hero-sub">{s.short}</p>
          <div className="hero-actions">
            <Link href="#contact" className="btn btn-gold">Plan with {site.founder} <span className="btn-arrow">→</span></Link>
            <a href={`tel:${site.phone}`} className="btn btn-outline-light">Call {site.phoneDisplay}</a>
          </div>
        </div>
      </section>

      <section className="service-detail">
        <div className="service-detail-grid">
          <div className="service-detail-copy">
            <Eyebrow className="reveal">The approach</Eyebrow>
            <h2 className="reveal">How we approach<br /><em>{s.title.toLowerCase()}.</em></h2>
            {s.intro.map((p) => (
              <p key={p.slice(0, 24)} className="about-text reveal">{p}</p>
            ))}
            <div className="ideal-for reveal">
              <span className="label">Ideal for</span>
              <p>{s.idealFor}</p>
            </div>
          </div>
          <aside className="includes-card reveal">
            <ServiceIcon d={s.icon} />
            <h3>What’s included</h3>
            <ul>
              {s.includes.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </aside>
        </div>
      </section>

      <section className="faq faq-compact" aria-labelledby="service-faq">
        <div className="faq-wrap">
          <div className="faq-head">
            <Eyebrow className="reveal">FAQ</Eyebrow>
            <h2 id="service-faq" className="reveal">{s.title}<br /><em>questions.</em></h2>
          </div>
          <div className="faq-list">
            {s.faqs.map((f, i) => (
              <details key={f.q} className="faq-item reveal" open={i === 0}>
                <summary><span>{f.q}</span><i aria-hidden="true" /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="related">
        <div className="section-head">
          <Eyebrow className="reveal">Pairs well with</Eyebrow>
          <h2 className="reveal">More from <em>Sehras.</em></h2>
        </div>
        <div className="related-grid">
          {others.map((o) => (
            <article key={o.slug} className="service-card reveal">
              <div className="service-top">
                <span className="service-num">{o.num}</span>
                <ServiceIcon d={o.icon} />
              </div>
              <h3><Link href={`/services/${o.slug}/`} className="card-link">{o.title}</Link></h3>
              <p>{o.short}</p>
              <span className="service-more" aria-hidden="true">Explore <span className="btn-arrow">→</span></span>
            </article>
          ))}
        </div>
      </section>

      <ContactSection defaultEvent={eventFor[s.slug]} />
    </>
  );
}
