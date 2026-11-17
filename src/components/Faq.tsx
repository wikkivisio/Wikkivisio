import { faqs } from '../content'
import { SectionHeading } from './SectionHeading'

export function Faq() {
  return (
    <section id="kysymykset" className="scroll-mt-24 border-t border-line bg-paper py-20 md:py-28" aria-labelledby="kysymykset-otsikko">
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
        <SectionHeading id="kysymykset-otsikko" eyebrow="Kysymykset" title="Ennen kuin pyydät arviota.">
          Lyhyet vastaukset siihen, mitä uudistus on ja mitä se ei ole.
        </SectionHeading>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((item) => (
            <details key={item.q} className="group py-1">
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-4">
                <h3 className="text-lg leading-snug font-medium">{item.q}</h3>
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-xl leading-none text-canopy transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 pr-12 text-[15.5px] leading-relaxed text-moss">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
