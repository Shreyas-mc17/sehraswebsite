import Link from 'next/link';

// Shorter photo header for inner pages (/about, /contact).
export default function PageHero({ title, eyebrow, sub, image }: { title: string; eyebrow: string; sub: string; image: string }) {
  return (
    <section className="page-hero page-hero-compact">
      <div className="page-hero-media">
        <img src={image} alt="" fetchPriority="high" />
      </div>
      <div className="hero-veil" />
      <div className="page-hero-content">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">{title}</li>
          </ol>
        </nav>
        <p className="eyebrow hero-eyebrow">{eyebrow}</p>
        <h1 className="hero-title page-title">
          <span className="line"><span>{title}</span></span>
        </h1>
        <p className="hero-sub">{sub}</p>
      </div>
    </section>
  );
}
