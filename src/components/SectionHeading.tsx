import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  children?: ReactNode
  tone?: 'light' | 'dark'
  id?: string
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  tone = 'light',
  id,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p
        className={`text-sm font-semibold tracking-wide ${tone === 'dark' ? 'text-lime' : 'text-canopy'}`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 font-display text-[clamp(2.05rem,4vw,3.35rem)] leading-[1.08] font-medium tracking-[-0.03em] text-balance"
      >
        {title}
      </h2>
      {children ? (
        <p
          className={`mt-4 text-lg leading-relaxed ${tone === 'dark' ? 'text-paper/80' : 'text-moss'}`}
        >
          {children}
        </p>
      ) : null}
    </div>
  )
}
