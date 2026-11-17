import { useEffect, useRef, useState, type FormEvent } from 'react'
import { contactEmail, serviceArea } from '../content'
import {
  WEB3FORMS_FROM_NAME,
  WEB3FORMS_SUBJECT,
  isWeb3formsKeyConfigured,
  submitToWeb3Forms,
  web3formsAccessKey,
} from '../web3forms'
import { SectionHeading } from './SectionHeading'

type SubmitState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const missingKeyMessage =
  'Lähetys ei ole vielä käytössä, koska Web3Forms-avain puuttuu. Kirjoita sillä välin osoitteeseen wikkivisio@gmail.com.'
const sendErrorMessage =
  'Viestiä ei voitu lähettää. Yritä uudelleen tai kirjoita osoitteeseen wikkivisio@gmail.com.'
const networkErrorMessage =
  'Yhteys palveluun epäonnistui. Yritä hetken päästä uudelleen tai lähetä viesti osoitteeseen wikkivisio@gmail.com.'

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const [state, setState] = useState<SubmitState>({ kind: 'idle' })
  const statusRef = useRef<HTMLParagraphElement>(null)
  const botcheckRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (state.kind === 'success' || state.kind === 'error') statusRef.current?.focus()
  }, [state])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (state.kind === 'loading') return
    const next: Record<string, string | undefined> = {}
    if (name.trim().length < 2) next.name = 'Kirjoita nimesi.'
    if (!emailPattern.test(email.trim())) next.email = 'Tarkista sähköpostiosoite.'
    if (message.trim().length < 8) next.message = 'Kirjoita viestisi.'
    setErrors(next)
    const first = ['name', 'email', 'message'].find((key) => next[key])
    if (first) {
      setState({ kind: 'idle' })
      document.getElementById(`contact-${first}`)?.focus()
      return
    }
    void send()
  }

  const send = async () => {
    const accessKey = web3formsAccessKey()
    if (!isWeb3formsKeyConfigured(accessKey)) {
      setState({ kind: 'error', message: missingKeyMessage })
      return
    }
    setState({ kind: 'loading' })
    try {
      const result = await submitToWeb3Forms({
        access_key: accessKey,
        subject: WEB3FORMS_SUBJECT,
        from_name: WEB3FORMS_FROM_NAME,
        botcheck: botcheckRef.current?.checked === true,
        name: name.trim(),
        email: email.trim(),
        yritys: company.trim() || undefined,
        viesti: message.trim(),
      })
      if (!result.ok) {
        setState({ kind: 'error', message: sendErrorMessage })
        return
      }
      setName('')
      setEmail('')
      setCompany('')
      setMessage('')
      if (botcheckRef.current) botcheckRef.current.checked = false
      setState({ kind: 'success' })
    } catch {
      setState({ kind: 'error', message: networkErrorMessage })
    }
  }

  const statusText =
    state.kind === 'loading'
      ? 'Lähetetään viestiä…'
      : state.kind === 'success'
        ? 'Kiitos. Viestisi lähti perille. Palaamme asiaan sähköpostitse.'
        : state.kind === 'error'
          ? state.message
          : ''

  return (
    <>
      <section id="yhteys" className="on-dark scroll-mt-24 py-20 text-paper md:py-28" aria-labelledby="yhteys-otsikko">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="yhteys-otsikko" eyebrow="Yhteys" title="Ota rohkeasti yhteyttä." tone="dark">
              Kerro nykyisestä sivustasi ja siitä, mitä haluat muuttaa. Arvio on maksuton eikä sido sinua.
            </SectionHeading>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-8 flex flex-col rounded-2xl border border-paper/15 p-5 hover:bg-paper/10"
            >
              <span className="text-sm font-semibold text-lime">Sähköposti</span>
              <span className="mt-1 text-lg">{contactEmail}</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-paper/75">
              {serviceArea}. Työ hoituu etänä koko Suomessa.
            </p>
          </div>

          <form
            id="lomake"
            className="scroll-mt-28 rounded-3xl bg-paper p-5 text-ink sm:p-8 lg:col-span-7"
            onSubmit={handleSubmit}
            noValidate
            aria-busy={state.kind === 'loading'}
          >
            <p className="text-sm leading-relaxed text-moss">Täytä tiedot, niin viesti lähtee sähköpostiimme.</p>
            <div hidden>
              <label>
                Älä täytä tätä kenttää
                <input ref={botcheckRef} type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field id="contact-name" name="name" label="Nimi" required autoComplete="name" value={name} error={errors.name} onChange={setName} />
              <Field id="contact-email" name="email" label="Sähköposti" type="email" required autoComplete="email" value={email} error={errors.email} onChange={setEmail} />
            </div>
            <div className="mt-4">
              <Field
                id="contact-company"
                name="yritys"
                label="Yritys tai nykyinen sivu"
                hint="Valinnainen"
                autoComplete="organization"
                value={company}
                onChange={setCompany}
                placeholder="esimerkki.fi"
              />
            </div>
            <div className="mt-4">
              <Field
                id="contact-message"
                name="viesti"
                label="Viesti"
                required
                multiline
                value={message}
                error={errors.message}
                onChange={setMessage}
                placeholder="Mitä haluaisit uudistaa?"
              />
            </div>
            {Object.values(errors).some(Boolean) ? (
              <p role="alert" className="mt-4 text-sm text-clay">
                Tarkista merkityt kentät. Viestiä ei lähetetty.
              </p>
            ) : null}
            {state.kind !== 'idle' ? (
              <p
                ref={statusRef}
                tabIndex={-1}
                role={state.kind === 'error' ? 'alert' : 'status'}
                className={
                  state.kind === 'error'
                    ? 'mt-4 rounded-xl bg-[#f8efe6] px-4 py-3 text-sm leading-relaxed text-clay outline-none'
                    : state.kind === 'success'
                      ? 'mt-4 rounded-xl bg-black/5 px-4 py-3 text-sm leading-relaxed text-ink outline-none'
                      : 'mt-4 text-sm text-moss outline-none'
                }
              >
                {statusText}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={state.kind === 'loading'}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-5 text-[15px] font-semibold text-paper hover:bg-canopy disabled:cursor-wait disabled:opacity-70 sm:w-auto"
            >
              {state.kind === 'loading' ? 'Lähetetään…' : 'Ota rohkeasti yhteyttä'}
            </button>
          </form>
        </div>
      </section>
      <FloatingContact />
    </>
  )
}

function FloatingContact() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const nodes = ['alku', 'hinnat', 'yhteys']
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null)
    if (nodes.length === 0) return
    const visible = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target)
          else visible.delete(entry.target)
        }
        setHidden(visible.size > 0)
      },
      { rootMargin: '-72px 0px -20% 0px', threshold: 0.15 },
    )
    for (const node of nodes) observer.observe(node)
    return () => observer.disconnect()
  }, [])

  if (hidden) return null

  return (
    <a
      href="#yhteys"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex min-h-12 max-w-[16rem] items-center justify-center rounded-full bg-lime px-4 text-center text-sm font-semibold text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.55)] hover:bg-lime-deep"
    >
      Ota rohkeasti yhteyttä
    </a>
  )
}

function Field({
  id,
  name,
  label,
  value,
  onChange,
  error,
  required,
  type = 'text',
  autoComplete,
  hint,
  placeholder,
  multiline = false,
}: {
  id: string
  name: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  type?: string
  autoComplete?: string
  hint?: string
  placeholder?: string
  multiline?: boolean
}) {
  const errorId = `${id}-virhe`
  const shared =
    'mt-1.5 w-full rounded-xl border bg-white px-3.5 py-3 text-base text-ink outline-none placeholder:text-moss/50 ' +
    (error ? 'border-clay' : 'border-ink/15')
  return (
    <label className="block text-sm font-medium" htmlFor={id}>
      <span>
        {label}
        {required ? (
          <>
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> pakollinen</span>
          </>
        ) : null}
        {hint ? <span className="ml-2 font-normal text-moss">{hint}</span> : null}
      </span>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          value={value}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={`resize-y ${shared}`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          value={value}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={shared}
        />
      )}
      {error ? (
        <span id={errorId} className="mt-1 block text-sm font-normal text-clay">
          {error}
        </span>
      ) : null}
    </label>
  )
}
