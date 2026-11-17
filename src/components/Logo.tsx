type LogoProps = {
  tone?: 'dark' | 'light'
  className?: string
}

export function Logo({ tone = 'dark', className }: LogoProps) {
  const mark = tone === 'light' ? '#def56b' : '#14241e'
  const stroke = tone === 'light' ? '#14241e' : '#def56b'
  const word = tone === 'light' ? '#f4f0e6' : '#14241e'

  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ''}`}>
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill={mark} />
        <path
          d="M7.4 11.2 12.2 22.8 16 15.2 19.8 22.8 24.6 11.2"
          fill="none"
          stroke={stroke}
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="font-display text-[1.35rem] leading-none font-medium tracking-[-0.04em]"
        style={{ color: word }}
      >
        Wikkivisio
      </span>
    </span>
  )
}
