'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { gallery, galleryFilters } from '@/lib/site';
import { track } from '@/lib/analytics';

const INITIAL = 14;
type FilterId = (typeof galleryFilters)[number]['id'];

export default function Gallery() {
  const [filter, setFilter] = useState<FilterId>('all');
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const matching = useMemo(() => gallery.filter((it) => filter === 'all' || it.set === filter), [filter]);
  const limit = filter === 'all' && !expanded ? INITIAL : matching.length;
  const visible = matching.slice(0, limit);

  const show = useCallback((i: number) => {
    setLoaded(false);
    setOpen((i + visible.length) % visible.length);
  }, [visible.length]);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(open - 1);
      if (e.key === 'ArrowRight') show(open + 1);
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
  }, [open, show, close]);

  const current = open !== null ? visible[open] : null;

  return (
    <>
      <div className="gallery-filters" role="tablist" aria-label="Filter gallery">
        {galleryFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            className={`chip${filter === f.id ? ' is-active' : ''}`}
            onClick={() => { setFilter(f.id); track('gallery_filter', { filter: f.id }); }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {visible.map((it, i) => (
          <figure
            key={`${filter}-${it.src}`}
            className={`gallery-item ${it.shape}`}
            role="button"
            tabIndex={0}
            aria-label={`Open photo: ${it.alt}`}
            onClick={() => { setLoaded(false); setOpen(i); }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLoaded(false); setOpen(i); } }}
          >
            <img src={it.src} alt={it.alt} loading="lazy" decoding="async" />
          </figure>
        ))}
      </div>

      {limit < matching.length && (
        <div className="gallery-more">
          <button type="button" className="btn btn-outline" onClick={() => setExpanded(true)}>View more moments</button>
        </div>
      )}

      <div
        className={`lightbox${current ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
        aria-hidden={!current}
        onClick={(e) => { if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('lightbox-figure')) close(); }}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current === null || open === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) show(open + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        {current && open !== null && (
          <>
            <button ref={closeBtn} type="button" className="lightbox-close" aria-label="Close" onClick={close}>&times;</button>
            <button type="button" className="lightbox-nav lightbox-prev" aria-label="Previous photo" onClick={() => show(open - 1)}>&#8249;</button>
            <figure className="lightbox-figure">
              <img
                key={current.src}
                className={`lightbox-img${loaded ? ' loaded' : ''}`}
                src={current.src.replace(/w=\d+/, 'w=2000')}
                alt={current.alt}
                onLoad={() => setLoaded(true)}
              />
              <figcaption className="lightbox-caption">{current.alt}</figcaption>
            </figure>
            <button type="button" className="lightbox-nav lightbox-next" aria-label="Next photo" onClick={() => show(open + 1)}>&#8250;</button>
            <p className="lightbox-counter">{open + 1} / {visible.length}</p>
          </>
        )}
      </div>
    </>
  );
}
