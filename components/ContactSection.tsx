import EnquiryForm from '@/components/EnquiryForm';
import { Eyebrow } from '@/components/Icons';
import { site } from '@/lib/site';

const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.street}, ${site.city}, ${site.region} ${site.postalCode}`)}`;

export default function ContactSection({ defaultEvent }: { defaultEvent?: string }) {
  return (
    <section className="contact" id="contact">
      <div className="contact-wrap">
        <aside className="contact-aside reveal">
          <div className="contact-aside-media">
            <img src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=1200&auto=format&fit=crop" alt="" loading="lazy" />
          </div>
          <div className="contact-aside-body">
            <img src="/images/mark.png" alt="" className="contact-mark" width={54} height={51} />
            <p className="eyebrow light-eyebrow">Speak with {site.founder}</p>
            <p className="contact-aside-quote">“We would be glad to hear about your plans and help in any way we can.”</p>
            <div className="direct-contact">
              <div>
                <span className="label">Call or WhatsApp</span>
                <a href={`tel:${site.phone}`} className="value link">{site.phoneDisplay}</a>
              </div>
              <div>
                <span className="label">Studio</span>
                <a href={mapsLink} target="_blank" rel="noopener" className="value address-link">
                  {site.street}, {site.city} {site.postalCode}
                </a>
              </div>
            </div>
          </div>
        </aside>
        <div className="contact-main">
          <Eyebrow className="reveal">Get in touch</Eyebrow>
          <h2 className="reveal">Tell us about<br /><em>your celebration.</em></h2>
          <p className="contact-sub reveal">Please share a few details and {site.founder} will get back to you personally within 24 hours.</p>
          <div className="reveal">
            <EnquiryForm defaultEvent={defaultEvent} />
          </div>
        </div>
      </div>
    </section>
  );
}
