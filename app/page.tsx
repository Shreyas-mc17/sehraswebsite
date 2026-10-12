import Link from 'next/link';
import HeroSlides from '@/components/HeroSlides';
import Intro from '@/components/Intro';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import CtaBand from '@/components/CtaBand';
import CeremonyRail from '@/components/CeremonyRail';
import JsonLd from '@/components/JsonLd';
import { Eyebrow, ServiceIcon } from '@/components/Icons';
import { designerItems, experiences, faqs, heroSlides, occasions, otherOccasions, processSteps, services, site, stats, waLink } from '@/lib/site';
import { faqSchema } from '@/lib/schema';

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <Intro />

      {/* ============ HERO ============ */}
      <section className="hero" id="top">
        <HeroSlides slides={heroSlides} />
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow"><span>Wedding &amp; event planners<span className="hide-sm"> · Bengaluru</span></span></p>
          <h1 className="hero-title">
            <span className="line"><span>Celebrations,</span></span>
            <span className="line"><span>planned with <em>care.</em></span></span>
          </h1>
          <p className="hero-sub">
            Sehras plans, designs and hosts weddings, family occasions and corporate events — with one dedicated team from the first conversation to the final goodbye.
          </p>
          <div className="hero-actions">
            <Link href="/contact/" className="btn btn-gold">Request a consultation <span className="btn-arrow">→</span></Link>
            <Link href="/#gallery" className="btn btn-outline-light">View our work</Link>
          </div>
        </div>
        <div className="hero-foot">
          <div className="hero-concierge">
            <span className="hero-concierge-photo"><img src="/images/shreyas.jpeg" alt="" width={752} height={1392} /></span>
            <div className="hero-concierge-text">
              <span className="label">Speak with {site.founder}</span>
              <span>We reply within 24 hours</span>
            </div>
            <div className="hero-concierge-actions">
              <a href={`tel:${site.phone}`} aria-label={`Call ${site.founder}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" fill="currentColor" /></svg>
              </a>
              <a href={waLink('Hello Sehras, I would like to enquire about an event.')} target="_blank" rel="noopener" aria-label={`WhatsApp ${site.founder}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.25-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.3-2.9c-.25-.43.25-.4.71-1.32a.45.45 0 0 0-.02-.43c-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.7 2.7 0 0 0-.85 2.02 4.7 4.7 0 0 0 1 2.5 10.8 10.8 0 0 0 4.1 3.64c1.53.66 2.13.72 2.9.6.46-.07 1.45-.6 1.65-1.17.2-.57.2-1.06.14-1.17-.06-.1-.22-.16-.47-.28z" fill="currentColor" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATEMENT ============ */}
      <section className="statement" id="story" aria-label="Our philosophy">
        <div className="statement-inner">
          <Eyebrow className="statement-eyebrow reveal">Our philosophy</Eyebrow>
          <figure className="statement-quote reveal">
            <span className="statement-mark" aria-hidden="true">“</span>
            <blockquote>
              <p className="statement-text">
                A celebration is not an event to manage, but a <em>world</em> to build — where every guest is hosted as family,
                and every detail carries the weight of intention.
              </p>
            </blockquote>
            <figcaption className="statement-by">
              <span className="avatar"><img src="/images/shreyas.jpeg" alt="" width={752} height={1392} loading="lazy" /></span>
              <span>
                <span className="statement-name">{site.founder}</span>
                <span className="label">Founder, Sehras</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ============ WHAT WE DO ============ */}
      <section className="services" id="services" aria-labelledby="services-title">
        <div className="section-head split">
          <div>
            <Eyebrow className="reveal">What we do</Eyebrow>
            <h2 id="services-title" className="reveal">Every celebration,<br /><em>one trusted team.</em></h2>
          </div>
          <p className="section-lede reveal">
            From a grand wedding to an intimate naming ceremony, we plan, design and host occasions of every size with the same care.
          </p>
        </div>

        <div className="occasions">
          <ul className="occasion-grid">
            {occasions.map((o, i) => (
              <li key={o.title} className="occasion-card reveal">
                <div className="occasion-top">
                  <span className="occasion-icon"><ServiceIcon d={o.icon} className="occasion-icon-svg" /></span>
                  <span className="occasion-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
                <ul className="occasion-tags" aria-label={`${o.title} includes`}>
                  {o.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <Link href={`/contact/?event=${encodeURIComponent(o.event)}`} className="occasion-link">
                  Plan your {o.cta} <span className="btn-arrow">→</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="occasion-more reveal">
            <div>
              <span className="label">And every occasion in between</span>
              <p>{otherOccasions.join(' · ')}</p>
            </div>
            <Link href="/contact/?event=Other%20celebration" className="btn btn-gold">
              Tell us what you’re celebrating <span className="btn-arrow">→</span>
            </Link>
          </div>

          <nav className="capabilities reveal" aria-label="Wedding services">
            <span className="label">Wedding services</span>
            <ul>
              {services.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}/`}>{s.title}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ============ CEREMONIES ============ */}
      <section className="ceremonies" id="ceremonies" aria-labelledby="ceremonies-title">
        <div className="section-head split">
          <div>
            <Eyebrow className="reveal">Wedding functions</Eyebrow>
            <h2 id="ceremonies-title" className="reveal">Every function,<br /><em>thoughtfully planned.</em></h2>
          </div>
          <p className="section-lede reveal">
            From the engagement to the reception, each function is given its own design, menu and timing, while the whole wedding feels connected.
          </p>
        </div>
        <div className="reveal">
          <CeremonyRail />
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="process" id="process">
        <div className="section-head light split">
          <div>
            <Eyebrow className="reveal">How we work</Eyebrow>
            <h2 className="reveal">A clear process,<br /><em>from start to finish.</em></h2>
          </div>
          <p className="section-lede reveal">Four simple steps, with {site.founder} as your single point of contact throughout.</p>
        </div>
        <ol className="process-track" id="processTrack">
          {processSteps.map((p, i) => (
            <li key={p.title} className="process-step reveal">
              <span className="process-node">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ============ EXPERIENCES ============ */}
      <section className="experiences" id="experiences">
        <div className="section-head light split">
          <div>
            <Eyebrow className="reveal">Guest experiences</Eyebrow>
            <h2 className="reveal">Thoughtful extras<br /><em>for your guests.</em></h2>
          </div>
          <p className="section-lede reveal">Optional additions that make any occasion more memorable for the people attending.</p>
        </div>
        <div className="experience-grid">
          {experiences.map((x) => (
            <article key={x.tag} className="experience-card reveal">
              <div className="experience-media">
                <img src={x.image} alt={x.alt} loading="lazy" decoding="async" />
              </div>
              <div className="experience-body">
                <span className="experience-tag">{x.tag}</span>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="stats" aria-label="Sehras in numbers">
        <div className="stats-inner">
          {stats.map((s) => (
            <div key={s.label} className="stat reveal">
              <span className="stat-num" data-count={s.value} data-suffix={s.suffix}>{s.value}{s.suffix}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="gallery" id="gallery">
        <div className="section-head">
          <Eyebrow className="reveal">Gallery</Eyebrow>
          <h2 className="reveal">A glimpse of<br /><em>our work.</em></h2>
        </div>
        <div className="gallery-body">
          <Gallery />
        </div>
      </section>

      {/* ============ DESIGNER ============ */}
      <section className="designer" id="designer">
        <div className="designer-media parallax" data-speed="0.12">
          <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1800&auto=format&fit=crop" alt="" loading="lazy" />
        </div>
        <div className="designer-overlay" />
        <div className="designer-inner">
          <div className="section-head light split">
            <div>
              <Eyebrow className="reveal">In partnership</Eyebrow>
              <h2 className="reveal">Bridal fashion,<br /><em>jewellery &amp; artistry.</em></h2>
            </div>
            <p className="section-lede designer-intro reveal">
              In partnership with designer <strong>{site.designer.name}</strong>: handcrafted sarees, blouse and saree art, bangles and
              bridal jewellery in gold, silver and antique finishes.
            </p>
          </div>
          <div className="designer-grid">
            {designerItems.map((d) => (
              <article key={d.title} className="designer-card reveal">
                <div className="designer-card-media">
                  <img src={d.image} alt={d.alt} loading="lazy" decoding="async" />
                </div>
                <div className="designer-card-body">
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="designer-contact reveal">
            <div className="designer-contact-info">
              <span className="label">Designer</span>
              <span className="value">{site.designer.name}</span>
            </div>
            <div className="designer-contact-actions">
              <a href={`tel:${site.designer.phone}`} className="btn btn-gold">Call {site.designer.phoneDisplay}</a>
              <a
                href={waLink(`Hello ${site.designer.name}, I found you through Sehras and would like to know more about your sarees and jewellery.`, site.designer.whatsapp)}
                target="_blank"
                rel="noopener"
                className="btn btn-outline-light"
              >
                WhatsApp {site.designer.name}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="testimonials" id="testimonials">
        <div className="section-head light center">
          <Eyebrow className="reveal">Testimonials</Eyebrow>
          <h2 className="reveal">What our clients<br /><em>say about us.</em></h2>
        </div>
        <div className="reveal">
          <Testimonials />
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="faq" id="faq">
        <div className="faq-wrap">
          <div className="faq-head">
            <Eyebrow className="reveal">Frequently asked</Eyebrow>
            <h2 className="reveal">Questions,<br /><em>answered.</em></h2>
            <p className="section-lede reveal">If your question is not covered here, please call {site.founder} on <a href={`tel:${site.phone}`} className="text-link">{site.phoneDisplay}</a>.</p>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <details key={f.q} className="faq-item reveal" open={i === 0}>
                <summary><span>{f.q}</span><i aria-hidden="true" /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CLOSING CTA ============ */}
      <CtaBand />
    </>
  );
}
