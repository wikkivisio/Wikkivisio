import { useEffect, useId, useRef, useState } from 'react'
import { navItems } from '../content'
import { Logo } from './Logo'

export function Header() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

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
      className="on-dark sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-3 md:px-8">
        <a href="#alku" className="rounded-md" onClick={close}>
          <Logo tone="light" />
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Sivun osiot">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-paper/90 hover:text-lime"
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
            Ota rohkeasti yhteyttä
          </a>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-paper lg:hidden"
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
          className="min-h-[calc(100dvh-4.25rem)] border-t border-white/10 bg-[#0c0c0c] text-paper lg:hidden"
        >
          <nav className="mx-auto flex w-full max-w-6xl flex-col px-5 py-3" aria-label="Mobiilivalikko">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-white/10 py-3 text-base font-medium text-paper"
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
              Ota rohkeasti yhteyttä
            </a>
            <button
              type="button"
              className="mt-2 min-h-11 text-sm font-medium text-paper/70"
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
