export function ServiceIcon({ d, className = 'service-icon' }: { d: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" />
    </svg>
  );
}

export function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`.trim()}>{children}</p>;
}
