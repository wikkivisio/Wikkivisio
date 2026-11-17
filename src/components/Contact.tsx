import { useEffect, useRef, useState, type FormEvent } from 'react'
import { contactEmail, placeholders } from '../content'
import {
  WEB3FORMS_FROM_NAME,
  WEB3FORMS_SUBJECT,
  isWeb3formsKeyConfigured,
  submitToWeb3Forms,
  web3formsAccessKey,
} from '../web3forms'
import { SectionHeading } from './SectionHeading'

type Fields = {
  name: string
  email: string
  phone: string
  site: string
  wishes: string
}

type Errors = Partial<Record<keyof Fields, string>>

type SubmitState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }

const empty: Fields = {
  name: '',
  email: '',
  phone: '',
  site: '',
  wishes: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const missingKeyMessage =
  'Lähetys ei ole vielä käytössä, koska Web3Forms-avain puuttuu. Kirjoita sillä välin osoitteeseen wikkivisio@gmail.com.'

const sendErrorMessage =
  'Viestiä ei voitu lähettää. Yritä uudelleen tai kirjoita osoitteeseen wikkivisio@gmail.com.'

const networkErrorMessage =
  'Yhteys palveluun epäonnistui. Yritä hetken päästä uudelleen tai lähetä viesti osoitteeseen wikkivisio@gmail.com.'

export function Contact() {
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<SubmitState>({ kind: 'idle' })
  const botcheckRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLParagraphElement>(null)

  const set = (key: keyof Fields) => (value: string) => {
    setFields((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  useEffect(() => {
    if (state.kind === 'success' || state.kind === 'error') {
      statusRef.current?.focus()
    }
  }, [state])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (state.kind === 'loading') return

    const next = validate(fields)
    setErrors(next)
    const firstInvalid = (Object.keys(next) as Array<keyof Fields>).find((key) => next[key])
    if (firstInvalid) {
      setState({ kind: 'idle' })
      document.getElementById(fieldId(firstInvalid))?.focus()
      return
    }

    const accessKey = web3formsAccessKey()
    if (!isWeb3formsKeyConfigured(accessKey)) {
      setState({ kind: 'error', message: missingKeyMessage })
      return
    }

    void send(accessKey)
  }

  const send = async (accessKey: string) => {
    setState({ kind: 'loading' })
    try {
      const result = await submitToWeb3Forms({
        access_key: accessKey,
        subject: WEB3FORMS_SUBJECT,
        from_name: WEB3FORMS_FROM_NAME,
        botcheck: botcheckRef.current?.checked === true,
        name: fields.name.trim(),
        email: fields.email.trim(),
        phone: fields.phone.trim(),
        sivusto: fields.site.trim(),
        toiveet: fields.wishes.trim(),
      })
      if (!result.ok) {
        setState({ kind: 'error', message: sendErrorMessage })
        return
      }
      setFields(empty)
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
    <section id="yhteys" className="on-dark scroll-mt-24 bg-spruce py-20 text-paper md:py-28" aria-labelledby="yhteys-otsikko">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading id="yhteys-otsikko" eyebrow="Yhteys" title="Pyydä ilmainen arvio." tone="dark">
            Kerro, missä nykyinen sivu on ja mitä haluaisit muuttaa. Arvio on maksuton
            eikä sido sinua.
          </SectionHeading>

          <div className="mt-8 rounded-2xl border border-paper/15 p-5">
            <p className="text-sm font-semibold text-lime">Yhteystiedot</p>
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="text-xs font-medium tracking-wide text-paper/60 uppercase">Sähköposti</dt>
                <dd className="mt-1">
                  <a className="text-base underline decoration-paper/30 underline-offset-4 hover:decoration-lime" href={`mailto:${contactEmail}`}>
                    {contactEmail}
                  </a>
                </dd>
              </div>
              <PlaceholderRow label="Puhelin" value={placeholders.phone} />
              <PlaceholderRow label="Alue" value={placeholders.area} />
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-paper/70">{placeholders.note}</p>
          </div>
        </div>

        <form
          className="rounded-3xl bg-paper p-5 text-ink sm:p-8 lg:col-span-7"
          onSubmit={handleSubmit}
          noValidate
          aria-busy={state.kind === 'loading'}
        >
          <p className="text-sm leading-relaxed text-moss">
            Täytä tiedot, niin viesti lähtee sähköpostiimme.
          </p>
          <div hidden>
            <label>
              Älä täytä tätä kenttää
              <input
                ref={botcheckRef}
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field
              id="contact-name"
              name="name"
              label="Nimi"
              required
              autoComplete="name"
              value={fields.name}
              error={errors.name}
              onChange={set('name')}
            />
            <Field
              id="contact-email"
              name="email"
              label="Sähköposti"
              type="email"
              required
              autoComplete="email"
              value={fields.email}
              error={errors.email}
              onChange={set('email')}
            />
            <Field
              id="contact-phone"
              name="phone"
              label="Puhelin"
              type="tel"
              autoComplete="tel"
              hint="Valinnainen"
              value={fields.phone}
              error={errors.phone}
              onChange={set('phone')}
            />
            <Field
              id="contact-site"
              name="sivusto"
              label="Nykyisen sivuston osoite"
              required
              autoComplete="url"
              value={fields.site}
              error={errors.site}
              onChange={set('site')}
              placeholder="esimerkki.fi"
            />
          </div>
          <div className="mt-4">
            <Field
              id="contact-wishes"
              name="toiveet"
              label="Mitä toivot uudistukselta"
              required
              multiline
              value={fields.wishes}
              error={errors.wishes}
              onChange={set('wishes')}
              placeholder="Mikä saa muuttua, mikä säilyä?"
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
                    ? 'mt-4 rounded-xl bg-canopy/10 px-4 py-3 text-sm leading-relaxed text-ink outline-none'
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
            {state.kind === 'loading' ? 'Lähetetään…' : 'Lähetä arviointipyyntö'}
          </button>
        </form>
      </div>
    </section>
  )
}

function PlaceholderRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium tracking-wide text-paper/60 uppercase">{label}</dt>
      <dd className="mt-1 flex flex-wrap items-center gap-2">
        <span className="text-base" data-placeholder="true">
          {value}
        </span>
        <span className="rounded-full bg-lime/15 px-2 py-0.5 text-[11px] font-semibold text-lime">
          Paikkamerkki
        </span>
      </dd>
    </div>
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
    'w-full rounded-xl border bg-white px-3.5 py-3 text-base text-ink outline-none placeholder:text-moss/50 ' +
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
          required={required}
          value={value}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={`mt-1.5 resize-y ${shared}`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          value={value}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={`mt-1.5 ${shared}`}
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

function fieldId(key: keyof Fields) {
  if (key === 'name') return 'contact-name'
  if (key === 'email') return 'contact-email'
  if (key === 'phone') return 'contact-phone'
  if (key === 'site') return 'contact-site'
  return 'contact-wishes'
}

function validate(fields: Fields): Errors {
  const errors: Errors = {}
  if (fields.name.trim().length < 2) errors.name = 'Kirjoita nimesi.'
  if (!emailPattern.test(fields.email.trim())) errors.email = 'Tarkista sähköpostiosoite.'
  const digits = fields.phone.replace(/\D/g, '')
  if (fields.phone.trim() && digits.length < 6) errors.phone = 'Tarkista puhelinnumero tai jätä kenttä tyhjäksi.'
  if (fields.site.trim().length < 3) errors.site = 'Lisää nykyisen sivustosi osoite.'
  if (fields.wishes.trim().length < 8) errors.wishes = 'Kerro lyhyesti, mitä toivot uudistukselta.'
  return errors
}
