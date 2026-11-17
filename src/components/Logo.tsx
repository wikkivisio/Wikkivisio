import { markPath, markTransform } from '../brandMark'

type LogoProps = {
  tone?: 'dark' | 'light'
  className?: string
}

export function Logo({ tone = 'dark', className }: LogoProps) {
  const mark = tone === 'light' ? '#def56b' : '#0e261f'
  const glyph = tone === 'light' ? '#0e261f' : '#def56b'
  const word = tone === 'light' ? '#f4f0e6' : '#14241e'

  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ''}`}>
      <svg viewBox="0 0 64 64" className="h-8 w-8 shrink-0" aria-hidden="true">
        <circle cx="32" cy="32" r="32" fill={mark} />
        <g transform={markTransform} fill={glyph}>
          <path d={markPath} />
        </g>
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
