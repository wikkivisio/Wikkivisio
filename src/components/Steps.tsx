import { steps } from '../content'
import { SectionHeading } from './SectionHeading'

export function Steps() {
  return (
    <section id="toiminta" className="scroll-mt-24 bg-paper py-20 md:py-28" aria-labelledby="toiminta-otsikko">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading id="toiminta-otsikko" eyebrow="Miten se toimii" title="Neljä vaihetta uuteen sivuun.">
          Sinä toimitat nykyisen sivun ja kerrot, mitä haluat. Tekoäly nopeuttaa
          luonnostelua, ihminen pitää työn toiveidesi mukaisena.
        </SectionHeading>

        <ol className="mt-12 divide-y divide-line border-y border-line md:grid md:grid-cols-4 md:divide-x md:divide-y-0">
          {steps.map((step) => (
            <li key={step.n} className="py-6 md:px-6 md:py-8 md:first:pl-0 md:last:pr-0">
              <p className="font-display text-sm font-medium tracking-[0.14em] text-canopy [font-variant-numeric:lining-nums]">
                {step.n}
              </p>
              <h3 className="mt-3 font-display text-[1.55rem] leading-tight font-medium tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-moss">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
