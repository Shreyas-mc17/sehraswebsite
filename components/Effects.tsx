'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Page-level motion, wired up by class name so content stays server-rendered (good for SEO).
 * Hooks used in markup: .reveal, [data-count], #processTrack, .parallax, .wa-fab.
 * Re-runs on every route change.
 */
export default function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: (() => void)[] = [];
    // only the homepage has the logo intro; everywhere else the hero can animate straight away
    if (!document.getElementById('introOverlay')) document.documentElement.classList.add('is-ready');
    const on = <K extends keyof WindowEventMap>(t: Window, type: K, fn: (e: WindowEventMap[K]) => void) => {
      t.addEventListener(type, fn as EventListener, { passive: true });
      cleanups.push(() => t.removeEventListener(type, fn as EventListener));
    };

    // --- scroll-linked: WhatsApp button, process steps, parallax
    const fab = document.querySelector('.wa-fab');
    const track = document.getElementById('processTrack');
    const parallax = reduceMotion ? [] : Array.from(document.querySelectorAll<HTMLElement>('.parallax'));

    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const vh = window.innerHeight;
      fab?.classList.toggle('show', y > vh * 0.6);

      if (track) {
        const r = track.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (r.height + vh * 0.25)));
        const steps = track.querySelectorAll('.process-step');
        steps.forEach((s, i) => s.classList.toggle('on', p >= i / steps.length + 0.02 || (i === 0 && p > 0)));
      }

      parallax.forEach((el) => {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const offset = (r.top + r.height / 2 - vh / 2) * -parseFloat(el.dataset.speed || '0.1');
        (el.querySelector('img') || el).style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    on(window, 'scroll', onScroll);
    on(window, 'resize', onScroll);
    update();

    // --- reveal on enter, staggered among siblings
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    reveals.forEach((el) => {
      const sibs = Array.from(el.parentElement!.children).filter((c) => c.classList.contains('reveal'));
      const i = sibs.indexOf(el);
      if (i > 0) el.style.setProperty('--d', `${Math.min(i * 0.09, 0.5)}s`);
    });
    const revealIO = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.classList.add('in');
        revealIO.unobserve(el);
        // hand the element back to its own hover transitions once the reveal finishes
        window.setTimeout(() => { el.classList.remove('reveal', 'in'); el.style.removeProperty('--d'); }, 1600);
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    reveals.forEach((el) => revealIO.observe(el));
    cleanups.push(() => revealIO.disconnect());

    // --- count-up numbers
    const countIO = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        countIO.unobserve(el);
        const target = parseInt(el.dataset.count || '0', 10);
        const suffix = el.dataset.suffix || '';
        if (reduceMotion) { el.textContent = target + suffix; return; }
        const run = () => {
          const t0 = performance.now();
          const step = (t: number) => {
            const k = Math.min(1, (t - t0) / 1800);
            el.textContent = Math.round(target * (1 - Math.pow(1 - k, 4))) + suffix;
            if (k < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        };
        run();
      }),
      { threshold: 0.6 },
    );
    document.querySelectorAll('[data-count]').forEach((el) => countIO.observe(el));
    cleanups.push(() => countIO.disconnect());

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
