import Link from 'next/link';
import { Eyebrow } from '@/components/Icons';
import { site } from '@/lib/site';

// Closing invitation at the end of a page, pointing to /contact.
export default function CtaBand() {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="cta-inner reveal">
        <div className="cta-copy">
          <Eyebrow className="light-eyebrow">Get in touch</Eyebrow>
          <h2 id="cta-title">Planning a celebration?<br /><em>We would be glad to help.</em></h2>
          <p>Share a few details and {site.founder} will get back to you personally within 24 hours.</p>
        </div>
        <div className="cta-actions">
          <Link href="/contact/" className="btn btn-gold">Request a consultation <span className="btn-arrow">→</span></Link>
          <a href={`tel:${site.phone}`} className="btn btn-outline-light">Call {site.phoneDisplay}</a>
        </div>
      </div>
    </section>
  );
}
