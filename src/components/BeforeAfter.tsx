import { useState } from 'react'
import { BrowserChrome, NewSite, OldSite, PhoneFrame } from './Mocks'
import { SectionHeading } from './SectionHeading'

export function BeforeAfter() {
  const [position, setPosition] = useState(52)

  return (
    <section
      id="esimerkki"
      className="on-dark scroll-mt-24 bg-black/40 py-20 text-paper md:py-28"
      aria-labelledby="esimerkki-otsikko"
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <SectionHeading
            id="esimerkki-otsikko"
            eyebrow="Ennen ja jälkeen"
            title="Miltä ero voi näyttää."
            tone="dark"
          >
            Alla on havainne, ei asiakastyö eikä oikea yritys. Toisessa ruudussa on
            vanhaan malliin tehty sivu, toisessa sama asia jäsenneltynä uudelleen.
          </SectionHeading>
          <div className="hidden justify-end lg:flex">
            <figure>
              <PhoneFrame>
                <NewSite />
              </PhoneFrame>
              <figcaption className="mt-3 max-w-[230px] text-sm leading-relaxed text-paper/70">
                Sama havainne kapealla näytöllä. Sisältö mahtuu ruudulle ilman erillistä
                mobiilisivua.
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="mt-12 hidden items-center justify-between text-sm font-semibold md:flex">
          <span>Ennen</span>
          <span className="text-lime">Jälkeen</span>
        </div>
        <div className="compare relative mt-3 hidden h-[26rem] overflow-hidden rounded-3xl ring-1 ring-white/15 md:block">
          <div className="absolute inset-0" aria-hidden="true">
            <BrowserChrome url="uusi.esimerkki.fi" flat className="h-full">
              <NewSite />
            </BrowserChrome>
          </div>
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            aria-hidden="true"
          >
            <BrowserChrome url="vanha.esimerkki.fi" flat className="h-full">
              <OldSite />
            </BrowserChrome>
          </div>
          <div
            className="pointer-events-none absolute inset-y-0 z-20"
            style={{ left: `${position}%` }}
            aria-hidden="true"
          >
            <div className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(20,36,30,0.45)]" />
            <div className="absolute top-1/2 -ml-5 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg">
              <svg viewBox="0 0 20 20" className="h-5 w-5">
                <path
                  d="M7 5 3 10l4 5M13 5l4 5-4 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <label htmlFor="vertailu" className="sr-only">
            Vedä verrataksesi vanhaa ja uudistettua havainnetta. Nuolinäppäimet liikuttavat jakoa.
          </label>
          <input
            id="vertailu"
            className="compare-range"
            type="range"
            min={8}
            max={92}
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            aria-valuetext={`Jakokohta ${position} prosenttia. Vasemmalla vanha havainne, oikealla uudistettu.`}
          />
        </div>
        <p className="mt-3 hidden text-sm text-paper/65 md:block">
          Vedä tai käytä nuolinäppäimiä. Osoitteet ovat esimerkki.fi-verkkotunnuksia, eivät oikeita sivustoja.
        </p>

        <div className="mt-10 grid gap-8 md:hidden">
          <figure>
            <figcaption className="mb-2 text-sm font-semibold text-lime">Ennen</figcaption>
            <BrowserChrome url="vanha.esimerkki.fi">
              <OldSite />
            </BrowserChrome>
          </figure>
          <figure>
            <figcaption className="mb-2 text-sm font-semibold text-lime">Jälkeen</figcaption>
            <BrowserChrome url="uusi.esimerkki.fi">
              <NewSite />
            </BrowserChrome>
            <figcaption className="mt-2 text-sm leading-relaxed text-paper/70">
              Kapealla näytöllä sama sisältö asettuu allekkain.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
