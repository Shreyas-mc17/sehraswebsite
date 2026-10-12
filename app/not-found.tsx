import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">404</p>
      <h1>This page has <em>wandered off.</em></h1>
      <p>The page you’re looking for doesn’t exist — but your celebration still can.</p>
      <Link href="/" className="btn btn-gold">Back to Sehras <span className="btn-arrow">→</span></Link>
    </section>
  );
}
