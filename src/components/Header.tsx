import { useEffect, useId, useRef, useState } from 'react'
import { navItems } from '../content'
import { Logo } from './Logo'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const solid = scrolled || open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const first = panelRef.current?.querySelector<HTMLElement>('a, button')
    first?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const items = panelRef.current.querySelectorAll<HTMLElement>('a, button')
      const firstItem = items[0]
      const lastItem = items[items.length - 1]
      if (!firstItem || !lastItem) return
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault()
        lastItem.focus()
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault()
        firstItem.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const close = () => setOpen(false)

  return (
    <header
      className={`sticky top-0 z-50 ${solid ? 'border-b border-line bg-paper/92 backdrop-blur-md' : 'on-dark border-b border-transparent bg-spruce'}`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-3 md:px-8">
        <a href="#alku" className="rounded-md" onClick={close}>
          <Logo tone={solid ? 'dark' : 'light'} />
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Sivun osiot">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium ${solid ? 'text-ink hover:text-canopy' : 'text-paper/90 hover:text-white'}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#yhteys"
            className="hidden min-h-11 items-center rounded-full bg-lime px-4 text-sm font-semibold text-ink hover:bg-lime-deep sm:inline-flex"
          >
            Pyydä arvio
          </a>
          <button
            ref={buttonRef}
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${solid ? 'text-ink' : 'text-paper'}`}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Sulje valikko' : 'Avaa valikko'}
            onClick={() => setOpen((value) => !value)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open ? (
        <div
          id={menuId}
          ref={panelRef}
          className="min-h-[calc(100dvh-4.25rem)] border-t border-line bg-paper lg:hidden"
        >
          <nav className="mx-auto flex w-full max-w-6xl flex-col px-5 py-3" aria-label="Mobiilivalikko">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-line py-3 text-base font-medium text-ink"
                onClick={close}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#yhteys"
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-lime px-4 text-sm font-semibold text-ink"
              onClick={close}
            >
              Pyydä ilmainen arvio
            </a>
            <button
              type="button"
              className="mt-2 min-h-11 text-sm font-medium text-moss"
              onClick={() => {
                setOpen(false)
                buttonRef.current?.focus()
              }}
            >
              Sulje
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}
