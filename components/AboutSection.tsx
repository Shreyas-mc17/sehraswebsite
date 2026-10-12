import { Eyebrow } from '@/components/Icons';
import { promises, site } from '@/lib/site';

// Founder story and promises. Lives on /about.
export default function AboutSection() {
  return (
    <section className="about" id="about">
      <div className="about-media reveal">
        <div className="owner-frame">
          <div className="owner-photo parallax" data-speed="0.06">
            <img src="/images/shreyas.jpeg" alt={`${site.founder}, founder of Sehras`} width={752} height={1392} loading="lazy" />
          </div>
        </div>
      </div>
      <div className="about-content">
        <Eyebrow className="reveal">About us</Eyebrow>
        <h2 className="reveal">Led by <em>{site.founder}</em></h2>
        <p className="about-text reveal">
          Sehras was founded on a simple belief: a good celebration is not about excess, but about attention. Every event we take on is
          led personally by {site.founder}, who works closely with each family from the first conversation to the final goodbye.
        </p>
        <p className="about-text reveal">
          With a background in hospitality and an eye for considered design, {site.founder} and the Sehras team are known for events
          that feel effortless to guests and are carefully managed behind the scenes.
        </p>
        <ul className="promises">
          {promises.map((p) => (
            <li key={p.title} className="reveal">
              <span className="promise-mark" aria-hidden="true">✦</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="owner-contact reveal">
          <div>
            <span className="label">Founder &amp; lead planner</span>
            <span className="value signature">{site.founder}</span>
          </div>
          <div>
            <span className="label">Direct line</span>
            <a href={`tel:${site.phone}`} className="value link">{site.phoneDisplay}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
