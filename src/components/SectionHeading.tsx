import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  children?: ReactNode
  tone?: 'light' | 'dark'
  id?: string
}

export function SectionHeading({ eyebrow, title, children, id }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p
        className="text-sm font-semibold tracking-wide text-lime"
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
          className="mt-4 text-lg leading-relaxed text-paper/80"
        >
          {children}
        </p>
      ) : null}
    </div>
  )
}
