import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContactSection from '@/components/ContactSection';
import JsonLd from '@/components/JsonLd';
import { Eyebrow, ServiceIcon } from '@/components/Icons';
import { celebrations, site } from '@/lib/site';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return celebrations.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = celebrations.find((x) => x.slug === slug);
  if (!c) return {};
  const path = `/celebrations/${c.slug}/`;
  return {
    title: c.seoTitle,
    description: c.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      title: `${c.seoTitle} | ${site.name}`,
      description: c.metaDescription,
      images: [{ url: c.image, width: 1600, height: 1067, alt: c.title }],
    },
    twitter: { card: 'summary_large_image', title: `${c.seoTitle} | ${site.name}`, description: c.metaDescription, images: [c.image] },
  };
}

export default async function CelebrationPage({ params }: Props) {
  const { slug } = await params;
  const c = celebrations.find((x) => x.slug === slug);
  if (!c) notFound();
  const path = `/celebrations/${c.slug}/`;
  const others = celebrations.filter((x) => x.slug !== c.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(c, path),
          faqSchema(c.faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Celebrations', path: '/#services' },
            { name: c.title, path },
          ]),
        ]}
      />

      <section className="page-hero">
        <div className="page-hero-media">
          <img src={c.image.replace('w=1600', 'w=2000')} alt="" fetchPriority="high" />
        </div>
        <div className="hero-veil" />
        <div className="page-hero-content">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/#services">Celebrations</Link></li>
              <li aria-current="page">{c.title}</li>
            </ol>
          </nav>
          <p className="eyebrow hero-eyebrow">Celebrations · {site.city}</p>
          <h1 className="hero-title page-title">
            <span className="sr-only">{c.seoTitle}: </span>
            <span className="line"><span>{c.title}</span></span>
          </h1>
          <p className="hero-sub">{c.short}</p>
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
            <h2 className="reveal">How we plan<br /><em>{c.title.toLowerCase()}.</em></h2>
            {c.intro.map((p) => (
              <p key={p.slice(0, 24)} className="about-text reveal">{p}</p>
            ))}
            <div className="ideal-for reveal">
              <span className="label">Ideal for</span>
              <p>{c.idealFor}</p>
            </div>
          </div>
          <aside className="includes-card reveal">
            <ServiceIcon d={c.icon} />
            <h3>What’s included</h3>
            <ul>
              {c.includes.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </aside>
        </div>
      </section>

      <section className="faq faq-compact" aria-labelledby="celebration-faq">
        <div className="faq-wrap">
          <div className="faq-head">
            <Eyebrow className="reveal">FAQ</Eyebrow>
            <h2 id="celebration-faq" className="reveal">{c.title}<br /><em>questions.</em></h2>
          </div>
          <div className="faq-list">
            {c.faqs.map((f, i) => (
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
          <Eyebrow className="reveal">More celebrations</Eyebrow>
          <h2 className="reveal">Other occasions we <em>host.</em></h2>
        </div>
        <div className="related-grid">
          {others.map((o) => (
            <article key={o.slug} className="service-card reveal">
              <div className="service-top">
                <ServiceIcon d={o.icon} />
              </div>
              <h3><Link href={`/celebrations/${o.slug}/`} className="card-link">{o.title}</Link></h3>
              <p>{o.short}</p>
              <span className="service-more" aria-hidden="true">Explore <span className="btn-arrow">→</span></span>
            </article>
          ))}
        </div>
      </section>

      <ContactSection defaultEvent={c.event} />
    </>
  );
}
