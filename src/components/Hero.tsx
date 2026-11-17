import { audiences } from '../content'
import { BrowserChrome, NewSite, OldSite } from './Mocks'

export function Hero() {
  return (
    <section id="alku" className="on-dark relative overflow-hidden bg-spruce text-paper">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-lime/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(244,240,230,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(244,240,230,0.05)_1px,transparent_1px)] bg-[size:76px_76px] [mask-image:radial-gradient(ellipse_at_80%_0%,black,transparent_68%)]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pt-12 pb-10 md:px-8 md:pt-16 lg:grid-cols-2 lg:gap-8 lg:pt-20 lg:pb-14">
        <div>
          <p className="text-sm font-semibold tracking-wide text-lime">
            Verkkosivujen uudistus pienille toimijoille
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.45rem,6.4vw,4.7rem)] leading-[0.98] font-medium tracking-[-0.035em] text-balance">
            Uudistetaan se sivu,{' '}
            <span className="text-lime italic">joka sinulla jo on.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/80">
            Wikkivisio uudistaa nykyisen verkkosivusi tekoälyn avulla. Edullisesti,
            nopeasti ja niin, että toiveesi ohjaavat lopputulosta. Et aloita alusta.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#yhteys"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-lime px-5 text-[15px] font-semibold text-ink hover:bg-lime-deep sm:w-auto"
            >
              Pyydä ilmainen arvio
              <ArrowIcon />
            </a>
            <a
              href="#toiminta"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-paper/25 px-5 text-[15px] font-semibold text-paper hover:bg-paper/10 sm:w-auto"
            >
              Katso, miten se etenee
            </a>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {['Edullisesti', 'Nopeasti', 'Toiveidesi mukaan'].map((item) => (
              <li
                key={item}
                className="rounded-full border border-paper/20 px-3 py-1 text-sm text-paper/90"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium tracking-wide text-paper/70 uppercase lg:text-right">
            Havainne, ei asiakastyö
          </p>
          <div className="mx-auto max-w-xl lg:mx-0 lg:grid lg:max-w-none">
            <div
              className="hidden lg:col-start-1 lg:row-start-1 lg:block lg:w-[74%] lg:self-start lg:pt-2"
              aria-hidden="true"
            >
              <BrowserChrome url="vanha.esimerkki.fi">
                <OldSite />
              </BrowserChrome>
            </div>
            <div className="lg:col-start-1 lg:row-start-1 lg:z-10 lg:mt-20 lg:ml-auto lg:w-[88%]">
              <BrowserChrome url="uusi.esimerkki.fi">
                <NewSite />
              </BrowserChrome>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 md:px-8 md:pb-20">
        <ul className="grid overflow-hidden rounded-2xl border border-paper/15 bg-paper/15 sm:grid-cols-3 sm:gap-px">
          {audiences.map((item) => (
            <li key={item.title} className="bg-spruce px-5 py-5">
              <p className="font-display text-xl tracking-tight text-paper">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-paper/75">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
