'use client';

import { useEffect, useState } from 'react';

type Slide = { src: string; alt: string };

export default function HeroSlides({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(t);
  }, [slides.length]);

  return (
    <>
      <div className="hero-slides">
        {slides.map((s, i) => (
          <div key={s.src} className={`hero-slide${i === current ? ' is-active' : ''}`}>
            <img
              src={s.src}
              alt={i === 0 ? s.alt : ''}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'low'}
              decoding={i === 0 ? 'sync' : 'async'}
            />
          </div>
        ))}
      </div>
      <div className="hero-veil" />
    </>
  );
}
