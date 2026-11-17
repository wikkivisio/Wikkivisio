import { contactEmail, navItems, serviceArea } from '../content'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-white/10 text-paper">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/75">
            Wikkivisio uudistaa olemassa olevia verkkosivuja tekoälyn avulla.
            Edullisesti, nopeasti ja asiakkaan toiveet huomioiden.
          </p>
        </div>
        <nav aria-label="Alatunniste">
          <p className="text-sm font-semibold">Sivulla</p>
          <ul className="mt-3 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-paper/75 hover:text-lime">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-sm font-semibold">Yhteystiedot</p>
          <ul className="mt-3 space-y-2 text-sm text-paper/75">
            <li>
              <a className="hover:text-lime" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
            </li>
            <li>{serviceArea}</li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-paper/75">
            Työ hoituu etänä koko Suomessa.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-6xl px-5 py-5 text-sm text-paper/60 md:px-8">
          © 2026 Wikkivisio. Kaikki oikeudet pidätetään.
        </p>
      </div>
    </footer>
  )
}
