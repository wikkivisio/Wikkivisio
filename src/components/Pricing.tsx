import { campaignNote, extraHourly, packages } from '../content'
import { SectionHeading } from './SectionHeading'

export function Pricing() {
  return (
    <section id="hinnat" className="scroll-mt-24 py-20 text-paper md:py-28" aria-labelledby="hinnat-otsikko">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading id="hinnat-otsikko" eyebrow="Hinnat" title="Kolme pakettia, selkeä hinta.">
          Hinnat sis. ALV:n. Laaja-paketti mitoitetaan sivun mukaan.
        </SectionHeading>

        <p className="mt-8 rounded-2xl border border-lime/70 bg-lime/10 px-5 py-4 text-base leading-relaxed font-semibold text-paper">
          {campaignNote}
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {packages.map((item) => (
            <article
              key={item.name}
              className={`flex h-full flex-col rounded-3xl border bg-black/45 p-6 ${item.badge ? 'border-lime' : 'border-white/15'}`}
            >
              {item.badge ? (
                <p className="w-fit rounded-full bg-canopy px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white">
                  {item.badge}
                </p>
              ) : (
                <p className="w-fit rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-lime">
                  sis. ALV
                </p>
              )}
              <h3 className="mt-4 font-display text-[1.7rem] leading-tight font-medium tracking-[-0.02em]">
                {item.name}
              </h3>
              {item.compareAt ? (
                <p className="mt-4 text-sm text-paper/50 line-through">{item.compareAt}</p>
              ) : null}
              <p className="mt-1 font-display text-[3rem] leading-none font-medium tracking-[-0.03em] text-lime [font-variant-numeric:lining-nums]">
                {item.prefix ? <span className="mr-2 text-lg text-paper/70">{item.prefix}</span> : null}
                {item.price}
              </p>
              <p className="mt-2 text-xs font-semibold tracking-wide text-paper/60">sis. ALV</p>
              <p className="mt-3 text-sm leading-relaxed text-paper/75">{item.fit}</p>
              <ul className="mt-6 space-y-3">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm leading-relaxed">
                    <CheckIcon />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#yhteys"
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-lime px-4 text-sm font-semibold text-ink hover:bg-lime-deep"
              >
                Ota rohkeasti yhteyttä
              </a>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-paper/75">
          Lisätyö {extraHourly}, sis. ALV.
        </p>
      </div>
    </section>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden="true">
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
