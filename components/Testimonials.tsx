'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { testimonials } from '@/lib/site';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  const n = testimonials.length;

  const restart = useCallback(() => {
    window.clearInterval(timer.current);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer.current = window.setInterval(() => setCurrent((c) => (c + 1) % n), 7000);
  }, [n]);

  useEffect(() => { restart(); return () => window.clearInterval(timer.current); }, [restart]);

  const go = (i: number) => { setCurrent((i + n) % n); restart(); };

  return (
    <div
      className="t-carousel"
      aria-roledescription="carousel"
      aria-label="Client stories"
      onMouseEnter={() => window.clearInterval(timer.current)}
      onMouseLeave={restart}
    >
      <div className="t-viewport" aria-live="polite">
        {testimonials.map((t, i) => (
          <figure key={t.author} className={`t-slide${i === current ? ' is-active' : ''}`} aria-roledescription="slide" aria-hidden={i !== current}>
            <blockquote className="quote">{t.quote}</blockquote>
            <figcaption className="author">{t.author} <span>· {t.place}</span></figcaption>
          </figure>
        ))}
      </div>
      <div className="t-controls">
        <button type="button" className="t-arrow" aria-label="Previous story" onClick={() => go(current - 1)}>←</button>
        <div className="t-dots">
          {testimonials.map((t, i) => (
            <button key={t.author} type="button" aria-label={`Show story ${i + 1}`} aria-current={i === current} onClick={() => go(i)} />
          ))}
        </div>
        <button type="button" className="t-arrow" aria-label="Next story" onClick={() => go(current + 1)}>→</button>
      </div>
    </div>
  );
}
