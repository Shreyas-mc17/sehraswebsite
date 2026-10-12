import Link from 'next/link';
import { services, site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/images/logo-full.png" alt="Sehras — Luxury Weddings & Hospitality" className="footer-logo" width={210} height={181} loading="lazy" />
          <p className="footer-tag">Weddings and celebrations, planned with care.</p>
        </div>
        <div className="footer-cols">
          <div>
            <p className="label">Services</p>
            <ul>
              {services.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}/`}>{s.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label">Explore</p>
            <ul>
              <li><Link href="/#experiences">Experiences</Link></li>
              <li><Link href="/about/">About us</Link></li>
              <li><Link href="/contact/">Contact us</Link></li>
              <li><Link href="/#gallery">Gallery</Link></li>
              <li><Link href="/#designer">Bridal designer</Link></li>
              <li><Link href="/#faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <p className="label">Studio</p>
            <address>
              {site.street},<br />
              {site.city}, {site.region} {site.postalCode}<br />
              <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
            </address>
            <Link href="/contact/" className="btn btn-gold btn-sm">Start an enquiry</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <a href="#main" className="footer-top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
