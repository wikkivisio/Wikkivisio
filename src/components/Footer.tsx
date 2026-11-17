import { contactEmail, contactPhone, navItems, placeholders } from '../content'
import { Logo } from './Logo'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 md:px-8 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-moss">
            Wikkivisio uudistaa olemassa olevia verkkosivuja tekoälyn avulla.
            Edullisesti, nopeasti ja asiakkaan toiveet huomioiden.
          </p>
        </div>
        <nav aria-label="Alatunniste">
          <p className="text-sm font-semibold">Sivulla</p>
          <ul className="mt-3 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-moss hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-sm font-semibold">Yhteystiedot</p>
          <ul className="mt-3 space-y-2 text-sm text-moss">
            <li>
              <a className="hover:text-ink" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
            </li>
            <li>
              <a className="hover:text-ink" href={`tel:${contactPhone.tel}`}>
                {contactPhone.display}
              </a>
            </li>
            <li>
              <a
                className="hover:text-ink"
                href={`https://wa.me/${contactPhone.whatsapp}`}
              >
                WhatsApp
              </a>
            </li>
            <li data-placeholder="true">
              {placeholders.area}{' '}
              <span className="text-clay">· paikkamerkki</span>
            </li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-moss">{placeholders.note}</p>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto w-full max-w-6xl px-5 py-5 text-sm text-moss md:px-8">
          © {year} Wikkivisio
        </p>
      </div>
    </footer>
  )
}
