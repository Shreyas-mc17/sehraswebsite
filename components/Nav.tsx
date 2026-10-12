'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navLinks, site } from '@/lib/site';

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('');

  // solid background once scrolled; slide away while scrolling down
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > lastY && y > 400);
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // highlight the link for the section in view (home page only)
  useEffect(() => {
    setActive('');
    if (pathname !== '/') return;
    const sections = navLinks
      .filter((l) => l.href.includes('#'))
      .map((l) => document.getElementById(l.href.split('#')[1]))
      .filter((s): s is HTMLElement => !!s);
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  // section links (/#faq) follow the scroll spy; page links (/about/) match the current route
  const trim = (p: string) => p.replace(/\/$/, '');
  const isActive = (href: string) => (href.includes('#') ? active === href.split('#')[1] : trim(pathname) === trim(href));

  const cls = ['nav', scrolled && 'scrolled', hidden && !open && 'hidden'].filter(Boolean).join(' ');

  return (
    <>
      <header className={cls}>
        <div className="nav-inner">
          <Link href="/" className="logo" aria-label="Sehras home">
            <img className="logo-mark" src="/images/mark.png" alt="" width={36} height={36} />
            <span className="logo-word">Sehras</span>
          </Link>
          <nav className="nav-links" aria-label="Primary">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className={isActive(l.href) ? 'active' : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="nav-cta">
            <a href={`tel:${site.phone}`} className="nav-phone">{site.phoneDisplay}</a>
            <Link href="/contact/" className="btn btn-gold btn-sm">Contact us</Link>
          </div>
          <button
            type="button"
            className={`nav-toggle${open ? ' open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobileMenu"
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu${open ? ' open' : ''}`} id="mobileMenu" aria-hidden={!open} inert={!open}>
        <img className="mobile-menu-mark" src="/images/mark.png" alt="" />
        <nav aria-label="Mobile">
          {[...navLinks, { href: '/contact/', label: 'Contact us' }].map((l, i) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              {l.label}
            </Link>
          ))}
        </nav>
        <a href={`tel:${site.phone}`} className="mobile-phone">{site.phoneDisplay}</a>
      </div>
    </>
  );
}
