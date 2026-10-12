// Thin wrapper over gtag so components can fire GA4 events without caring whether GA is loaded.
type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: GtagParams = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', event, params);
}
