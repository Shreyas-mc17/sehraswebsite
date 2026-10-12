'use client';

import { useEffect, useState } from 'react';

const KEY = 'sehras-intro';

// Brand opening on the first homepage visit of a session. Returning visitors (and reduced-motion
// users) get `intro-seen` from the boot script in layout.tsx, which hides this before first paint.
export default function Intro() {
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('intro-seen')) {
      setGone(true);
      return;
    }
    document.body.classList.add('intro-lock');
    const t = window.setTimeout(() => setHide(true), 2400);
    return () => {
      window.clearTimeout(t);
      document.body.classList.remove('intro-lock');
    };
  }, []);

  // once it starts lifting: remember it, release scrolling and start the hero animation
  useEffect(() => {
    if (!hide) return;
    try { sessionStorage.setItem(KEY, '1'); } catch {}
    document.body.classList.remove('intro-lock');
    document.documentElement.classList.add('is-ready');
    const t = window.setTimeout(() => setGone(true), 1300);
    return () => window.clearTimeout(t);
  }, [hide]);

  if (gone) return null;
  return (
    <div className={`intro-overlay${hide ? ' intro-hide' : ''}`} id="introOverlay" aria-hidden="true" onClick={() => setHide(true)}>
      <div className="intro-content">
        <img className="intro-logo-img" src="/images/logo-full.png" alt="" width={280} height={241} />
        <p className="intro-tag">Weddings &amp; Celebrations</p>
      </div>
      <button type="button" className="intro-skip" onClick={() => setHide(true)}>Skip</button>
    </div>
  );
}
