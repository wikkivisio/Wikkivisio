import type { ReactNode } from 'react'

type ChromeProps = {
  url: string
  children: ReactNode
  className?: string
  flat?: boolean
}

export function BrowserChrome({ url, children, className, flat = false }: ChromeProps) {
  return (
    <div
      className={`flex h-full min-h-0 flex-col overflow-hidden bg-white ${flat ? '' : 'rounded-2xl shadow-[0_24px_70px_-28px_rgba(0,0,0,0.55)] ring-1 ring-black/10'} ${className ?? ''}`}
    >
      <div className="flex shrink-0 items-center gap-2 border-b border-black/8 bg-[#f3f0e8] px-3 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e3b5a8]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ead79a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#b7c9ae]" />
        </span>
        <div className="min-w-0 flex-1 truncate rounded-md bg-white px-2.5 py-1 text-center text-[11px] text-[#5c6a63] ring-1 ring-black/5">
          {url}
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  )
}

export function OldSite() {
  return (
    <div className="old-site">
      <div className="old-banner">Tervetuloa sivuillemme</div>
      <p className="old-nav">Etusivu | Palvelut | Kuvia | Vieraskirja</p>
      <div className="old-body">
        <div className="old-news">Uutta! Aukioloajat päivitetty. Katso alareuna.</div>
        <p className="old-copy">
          Olemme paikallinen toimija. Näiltä sivuilta löydät tietoja palveluistamme.
          Ole hyvä ja selaa valikkoa. Lisätietoja voi kysyä yhteystietosivulta.
          Tervetuloa asioimaan!
        </p>
        <table className="old-table">
          <tbody>
            <tr>
              <td>
                <b>Palvelu 1</b>
                <br />
                Kysy lisätietoja puhelimitse.
              </td>
              <td>
                <b>Palvelu 2</b>
                <br />
                Katso kuvagalleria.
              </td>
              <td>
                <b>Yhteys</b>
                <br />
                Sähköpostia voi laittaa.
              </td>
            </tr>
          </tbody>
        </table>
        <p className="old-foot">Päivitetty 12.4.2014 · Parhaat terveiset</p>
        <div className="old-counter" aria-hidden="true">
          <span>0</span>
          <span>0</span>
          <span>4</span>
          <span>1</span>
          <span>2</span>
        </div>
      </div>
    </div>
  )
}

const newPoints = [
  ['Palvelu', 'Lyhyt kuvaus ilman turhaa kiertelyä.'],
  ['Aukiolo', 'Olennainen tieto löytyy heti.'],
  ['Yhteys', 'Selkeä polku lomakkeelle.'],
] as const

export function NewSite() {
  return (
    <div className="@container flex h-full min-h-full flex-col bg-white text-[#1c2420]">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-black/6 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-[#14382c] text-[11px] font-semibold text-[#def56b]">
            E
          </span>
          <span className="text-sm font-semibold tracking-tight">Esimerkkisivu</span>
        </div>
        <div className="hidden items-center gap-3 text-[11px] text-[#4d5c55] @md:flex">
          <span>Palvelut</span>
          <span>Tietoa</span>
          <span className="rounded-full bg-[#14382c] px-2.5 py-1 font-medium text-white">Yhteys</span>
        </div>
      </div>
      <div className="grid min-h-0 flex-1 @3xl:grid-cols-[1.08fr_0.92fr]">
        <div className="px-4 py-4">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-[#1b6349] uppercase">
            Havainne
          </p>
          <p className="mt-1 max-w-[16ch] font-sans text-[1.4rem] leading-[1.12] font-semibold tracking-[-0.03em] text-[#14241e] @3xl:max-w-none">
            Selkeä sivu, joka toimii puhelimessa.
          </p>
          <p className="mt-2 max-w-sm text-[12.5px] leading-relaxed text-[#4d5c55]">
            Kävijä näkee heti, mitä teet ja miten sinuun saa yhteyden.
          </p>
        </div>
        <div className="grid content-start gap-2 px-4 pb-4 @sm:grid-cols-3 @3xl:grid-cols-1 @3xl:bg-[#f3efe6] @3xl:p-4">
          {newPoints.map(([title, body]) => (
            <div key={title} className="rounded-lg bg-[#f4f1ea] px-2.5 py-2 @3xl:bg-white">
              <p className="text-[12px] font-semibold">{title}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-[#4d5c55]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-[230px] rounded-[2rem] bg-ink p-2 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
      <div className="overflow-hidden rounded-[1.55rem] bg-white">
        <div className="flex justify-center bg-white pt-2" aria-hidden="true">
          <span className="h-1.5 w-14 rounded-full bg-ink/80" />
        </div>
        {children}
      </div>
    </div>
  )
}
