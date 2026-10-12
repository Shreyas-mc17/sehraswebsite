'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

// One delegated listener reports every call / WhatsApp / email click to GA4 as a lead signal.
export default function ClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const location = a.closest('section, header, footer')?.id || a.closest('header, footer')?.tagName.toLowerCase() || 'page';
      if (href.startsWith('tel:')) track('click_call', { phone: href.slice(4), link_location: location });
      else if (href.includes('wa.me/')) track('click_whatsapp', { link_location: location });
      else if (href.startsWith('mailto:')) track('click_email', { link_location: location });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
