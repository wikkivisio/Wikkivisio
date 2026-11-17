import { markPath, markTransform } from '../brandMark'

type LogoProps = {
  tone?: 'dark' | 'light'
  className?: string
}

export function Logo({ tone = 'dark', className }: LogoProps) {
  const mark = tone === 'light' ? '#f2b705' : '#111111'
  const glyph = tone === 'light' ? '#111111' : '#f2b705'
  const word = tone === 'light' ? '#f6f3ec' : '#141414'

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
