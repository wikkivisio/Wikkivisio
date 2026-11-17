import type { ReactNode } from 'react'
import { benefits } from '../content'
import { SectionHeading } from './SectionHeading'

const icons: Record<(typeof benefits)[number]['id'], ReactNode> = {
  edullinen: (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
      <rect x="4" y="8" width="24" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 13h24M10 19h6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  nopea: (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
      <path d="M7 18c4-1 6-6 7-12 2 5 5 8 11 9-4 1-7 4-8 10-1-4-5-6-10-7Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  toiveet: (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
      <path d="M8 9h16v10H13l-5 4v-4H8V9Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  mobiili: (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
      <rect x="10" y="4" width="12" height="24" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M14 23h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  haku: (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
      <circle cx="14" cy="14" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M19 19l6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
}

export function Benefits() {
  return (
    <section id="hyodyt" className="scroll-mt-24 border-t border-white/10 py-20 text-paper md:py-28" aria-labelledby="hyodyt-otsikko">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <SectionHeading id="hyodyt-otsikko" eyebrow="Hyödyt" title="Pieni hinta, napakka työ, sinun ehtosi.">
            Sivua ei rakenneta tyhjästä eikä julkaista sinulta kysymättä.
          </SectionHeading>
        </div>
        <ul className="divide-y divide-white/15 border-y border-white/15 lg:col-span-8">
          {benefits.map((benefit) => (
            <li key={benefit.id} className="grid gap-3 py-7 sm:grid-cols-[auto_1fr] sm:gap-5">
              <span className="text-lime">{icons[benefit.id]}</span>
              <div>
                <h3 className="font-display text-[1.7rem] leading-tight font-medium tracking-[-0.02em]">
                  {benefit.title}
                </h3>
                <p className="mt-2 max-w-xl text-[15.5px] leading-relaxed text-paper/75">{benefit.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
