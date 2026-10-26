/** Logo DorsalCare : l'arche de la civière posée au sol. */
export function LogoMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect width="64" height="64" rx="14" fill="var(--primary)" />
      <path
        d="M13 44 C 18 21, 46 21, 51 44"
        fill="none"
        stroke="#ffffff"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path d="M10 49 H54" fill="none" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center justify-center gap-2 ${className}`}>
      <LogoMark />
      <span className="font-display text-xl tracking-wide">
        Dorsal<span className="text-primary">Care</span>
      </span>
    </span>
  )
}
