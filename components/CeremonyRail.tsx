'use client';

import { useEffect, useRef, useState } from 'react';
import { ceremonies } from '@/lib/site';

// Horizontal, swipeable rail of wedding functions. Native scroll-snap does the work;
// the arrows are an enhancement on top.
export default function CeremonyRail() {
  const rail = useRef<HTMLOListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setAtStart(el.scrollLeft < 8);
      setAtEnd(el.scrollLeft > max - 8);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = rail.current;
    const card = el?.querySelector('li');
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 20), behavior: 'smooth' });
  };

  return (
    <div className="rail-wrap">
      <ol className="rail" ref={rail} aria-label="Wedding ceremonies we plan">
        {ceremonies.map((c, i) => (
          <li key={c.name} className="rail-card">
            <img src={c.image} alt={c.alt} loading="lazy" decoding="async" />
            <div className="rail-card-body">
              <span className="rail-index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{c.name}</h3>
              <p>{c.note}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="rail-controls">
        <div className="rail-arrows">
          <button type="button" className="t-arrow" aria-label="Previous ceremony" disabled={atStart} onClick={() => step(-1)}>←</button>
          <button type="button" className="t-arrow" aria-label="Next ceremony" disabled={atEnd} onClick={() => step(1)}>→</button>
        </div>
      </div>
    </div>
  );
}
