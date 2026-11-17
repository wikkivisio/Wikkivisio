import { packages } from '../content'
import { SectionHeading } from './SectionHeading'

export function Pricing() {
  return (
    <section id="hinnat" className="scroll-mt-24 bg-paper py-20 md:py-28" aria-labelledby="hinnat-otsikko">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading id="hinnat-otsikko" eyebrow="Esimerkkihinnat" title="Suuruusluokka, ei hinnasto.">
          Oikeaa hintaa ei ole vielä päätetty. Alla olevat luvut ovat esimerkkihintoja:
          suuntaa antavia lukuja, eivät hinnasto eivätkä tarjous.
        </SectionHeading>

        <div
          id="hinta-huom"
          role="note"
          className="mt-8 max-w-3xl rounded-2xl border border-clay/25 bg-[#f8efe6] px-5 py-4"
        >
          <p className="font-semibold text-ink">Nämä eivät ole voimassa olevia hintoja.</p>
          <p className="mt-1 text-sm leading-relaxed text-moss">
            Oma hinta vahvistetaan maksuttomassa arviossa, kun olemme nähneet nykyisen
            sivusi ja kuulleet toiveesi. Verokäsittelyä ei ole vahvistettu, koska kyse ei
            ole hinnastosta. Arvio ei sido sinua.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {packages.map((item) => (
            <article
              key={item.name}
              aria-describedby="hinta-huom"
              className="flex h-full flex-col rounded-3xl border border-line bg-card p-6"
            >
              <p className="w-fit rounded-full bg-sand px-2.5 py-1 text-[11px] font-semibold tracking-wide text-canopy uppercase">
                Esimerkkihinta
              </p>
              <h3 className="mt-4 font-display text-[1.7rem] leading-tight font-medium tracking-[-0.02em]">
                {item.name}
              </h3>
              <p className="mt-4 font-display text-[3rem] leading-none font-medium tracking-[-0.03em] whitespace-nowrap [font-variant-numeric:lining-nums]">
                {item.price}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-moss">{item.fit}</p>
              <ul className="mt-6 space-y-3">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-ink">
                    <CheckIcon />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#yhteys"
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-ink/15 px-4 text-sm font-semibold text-ink hover:border-ink hover:bg-ink hover:text-paper"
              >
                Pyydä arvio tästä laajuudesta
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-canopy" aria-hidden="true">
      <path
        d="M3 8.2 6.2 11.5 13 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
