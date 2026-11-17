import { useEffect, useRef, useState, type FormEvent, type ReactNode, type RefObject } from 'react'
import { contactEmail, contactPhone, serviceArea } from '../content'
import {
  WEB3FORMS_CALLBACK_SUBJECT,
  WEB3FORMS_FROM_NAME,
  WEB3FORMS_SUBJECT,
  isWeb3formsKeyConfigured,
  submitToWeb3Forms,
  web3formsAccessKey,
  type Web3FormsPayload,
} from '../web3forms'
import { SectionHeading } from './SectionHeading'

type Mode = 'arvio' | 'soitto'
type Method = 'sahkoposti' | 'puhelu' | 'whatsapp'

type SubmitState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string }

const methodLabels: Record<Method, string> = {
  sahkoposti: 'Sähköposti',
  puhelu: 'Puhelu',
  whatsapp: 'WhatsApp',
}

const missingKeyMessage =
  'Lähetys ei ole vielä käytössä, koska Web3Forms-avain puuttuu. Kirjoita sillä välin osoitteeseen wikkivisio@gmail.com.'

const sendErrorMessage =
  'Viestiä ei voitu lähettää. Yritä uudelleen tai kirjoita osoitteeseen wikkivisio@gmail.com.'

const networkErrorMessage =
  'Yhteys palveluun epäonnistui. Yritä hetken päästä uudelleen tai lähetä viesti osoitteeseen wikkivisio@gmail.com.'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Contact() {
  const [mode, setMode] = useState<Mode>('arvio')
  const pendingFocus = useRef<string | null>(null)

  const chooseMode = (next: Mode) => {
    pendingFocus.current = next === 'soitto' ? 'callback-name' : 'contact-name'
    setMode(next)
  }

  useEffect(() => {
    const id = pendingFocus.current
    if (!id) return
    pendingFocus.current = null
    document.getElementById('lomake')?.scrollIntoView({ block: 'start' })
    document.getElementById(id)?.focus()
  }, [mode])

  return (
    <>
      <section id="yhteys" className="on-dark scroll-mt-24 bg-spruce py-20 text-paper md:py-28" aria-labelledby="yhteys-otsikko">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
          <SectionHeading id="yhteys-otsikko" eyebrow="Yhteys" title="Pyydä ilmainen arvio." tone="dark">
            Kerro, missä nykyinen sivu on ja mitä haluaisit muuttaa. Voit myös soittaa,
            laittaa WhatsApp-viestin tai pyytää soittopyynnön. Arvio on maksuton eikä sido sinua.
          </SectionHeading>

          <ul id="yhteystavat" aria-label="Yhteydenottotavat" className="mt-8 grid scroll-mt-28 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <li>
              <MethodLink href={`mailto:${contactEmail}`} title="Sähköposti" detail={contactEmail} icon={<MailIcon />} />
            </li>
            <li>
              <MethodLink href={`tel:${contactPhone.tel}`} title="Soita" detail={contactPhone.display} icon={<PhoneIcon />} />
            </li>
            <li>
              <MethodLink
                href={`https://wa.me/${contactPhone.whatsapp}`}
                title="WhatsApp"
                detail={contactPhone.display}
                icon={<ChatIcon />}
              />
            </li>
            <li>
              <button
                type="button"
                aria-pressed={mode === 'soitto'}
                onClick={() => chooseMode('soitto')}
                className={`flex h-full w-full flex-col rounded-2xl border p-4 text-left ${mode === 'soitto' ? 'border-lime bg-paper/10' : 'border-paper/15 hover:bg-paper/10'}`}
              >
                <span className="text-lime">
                  <CallbackIcon />
                </span>
                <span className="mt-3 text-sm font-semibold">Pyydä soittopyyntö</span>
                <span className="mt-1 text-sm leading-snug text-paper/75">Jätä numerosi, soitamme takaisin.</span>
              </button>
            </li>
          </ul>

          <p className="mt-4 text-sm text-paper/75">
            Toiminta-alue: {serviceArea}. Uudistus hoituu etänä, joten sijaintisi Suomessa ei rajoita työtä.
          </p>

          <div id="lomake" className="mt-8 scroll-mt-28 rounded-3xl bg-paper p-5 text-ink sm:p-8">
            <div className="flex flex-wrap gap-2" aria-label="Lomakkeen tyyppi">
              <ModeButton pressed={mode === 'arvio'} onClick={() => chooseMode('arvio')}>
                Arviointipyyntö
              </ModeButton>
              <ModeButton pressed={mode === 'soitto'} onClick={() => chooseMode('soitto')}>
                Soittopyyntö
              </ModeButton>
            </div>
            {mode === 'arvio' ? <AssessmentForm /> : <CallbackForm />}
          </div>
        </div>
      </section>
      <FloatingContact />
    </>
  )
}

function AssessmentForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [site, setSite] = useState('')
  const [wishes, setWishes] = useState('')
  const [time, setTime] = useState('')
  const [method, setMethod] = useState<Method>('sahkoposti')
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const form = useSubmitState()
  const phoneRequired = method === 'puhelu' || method === 'whatsapp'

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (form.state.kind === 'loading') return
    const next: Record<string, string | undefined> = {}
    if (name.trim().length < 2) next.name = 'Kirjoita nimesi.'
    if (!emailPattern.test(email.trim())) next.email = 'Tarkista sähköpostiosoite.'
    const phoneProblem = phoneError(phone, phoneRequired)
    if (phoneProblem) next.phone = phoneProblem
    if (site.trim().length < 3) next.site = 'Lisää nykyisen sivustosi osoite.'
    if (wishes.trim().length < 8) next.wishes = 'Kerro lyhyesti, mitä toivot uudistukselta.'
    setErrors(next)
    const first = ['method', 'name', 'email', 'phone', 'site', 'time', 'wishes'].find((key) => next[key])
    if (first) {
      form.setState({ kind: 'idle' })
      document.getElementById(first === 'method' ? 'contact-method-sahkoposti' : `contact-${first}`)?.focus()
      return
    }
    void form.send(
      {
        subject: WEB3FORMS_SUBJECT,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        sivusto: site.trim(),
        toiveet: wishes.trim(),
        'Toivottu yhteydenottotapa': methodLabels[method],
        'Paras aika soittaa': phoneRequired ? time.trim() || undefined : undefined,
      },
      () => {
        setName('')
        setEmail('')
        setPhone('')
        setSite('')
        setWishes('')
        setTime('')
        setMethod('sahkoposti')
      },
      'Kiitos. Viestisi lähti perille. Palaamme asiaan valitsemallasi tavalla.',
    )
  }

  return (
    <form className="mt-6" onSubmit={handleSubmit} noValidate aria-busy={form.state.kind === 'loading'}>
      <p className="text-sm leading-relaxed text-moss">Täytä tiedot, niin viesti lähtee sähköpostiimme.</p>
      <Honeypot inputRef={form.botcheckRef} />
      <fieldset className="mt-5 border-0 p-0">
        <legend className="text-sm font-medium">
          Toivottu yhteydenottotapa
          <span aria-hidden="true"> *</span>
          <span className="sr-only"> pakollinen</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {(Object.keys(methodLabels) as Method[]).map((value) => (
            <label
              key={value}
              className={`inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-semibold has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${method === value ? 'border-ink bg-ink text-paper' : 'border-ink/15 text-ink'}`}
            >
              <input
                id={`contact-method-${value}`}
                className="sr-only"
                type="radio"
                name="yhteydenottotapa"
                value={value}
                checked={method === value}
                onChange={() => {
                  setMethod(value)
                  setErrors((current) => ({ ...current, phone: undefined }))
                }}
              />
              {methodLabels[value]}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field id="contact-name" name="name" label="Nimi" required autoComplete="name" value={name} error={errors.name} onChange={setName} />
        <Field id="contact-email" name="email" label="Sähköposti" type="email" required autoComplete="email" value={email} error={errors.email} onChange={setEmail} />
        <Field
          id="contact-phone"
          name="phone"
          label="Puhelin"
          type="tel"
          autoComplete="tel"
          required={phoneRequired}
          hint={phoneRequired ? undefined : 'Valinnainen'}
          value={phone}
          error={errors.phone}
          onChange={setPhone}
        />
        <Field id="contact-site" name="sivusto" label="Nykyisen sivuston osoite" required autoComplete="url" value={site} error={errors.site} onChange={setSite} placeholder="esimerkki.fi" />
      </div>
      {phoneRequired ? (
        <div className="mt-4">
          <Field
            id="contact-time"
            name="Paras aika soittaa"
            label="Paras aika soittaa"
            hint="Valinnainen"
            value={time}
            error={errors.time}
            onChange={setTime}
            placeholder="Esimerkiksi arkisin iltapäivällä"
          />
        </div>
      ) : null}
      <div className="mt-4">
        <Field id="contact-wishes" name="toiveet" label="Mitä toivot uudistukselta" required multiline value={wishes} error={errors.wishes} onChange={setWishes} placeholder="Mikä saa muuttua, mikä säilyä?" />
      </div>
      <FormFeedback errors={errors} state={form.state} statusRef={form.statusRef} />
      <SubmitButton loading={form.state.kind === 'loading'}>Lähetä arviointipyyntö</SubmitButton>
    </form>
  )
}

function CallbackForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [time, setTime] = useState('')
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const form = useSubmitState()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (form.state.kind === 'loading') return
    const next: Record<string, string | undefined> = {}
    if (name.trim().length < 2) next.name = 'Kirjoita nimesi.'
    const phoneProblem = phoneError(phone, true)
    if (phoneProblem) next.phone = phoneProblem
    setErrors(next)
    const first = ['name', 'phone', 'time'].find((key) => next[key])
    if (first) {
      form.setState({ kind: 'idle' })
      document.getElementById(`callback-${first}`)?.focus()
      return
    }
    void form.send(
      {
        subject: WEB3FORMS_CALLBACK_SUBJECT,
        name: name.trim(),
        phone: phone.trim(),
        'Toivottu yhteydenottotapa': 'Puhelu',
        'Paras aika soittaa': time.trim() || undefined,
      },
      () => {
        setName('')
        setPhone('')
        setTime('')
      },
      'Kiitos. Soittopyyntö lähti perille. Otamme yhteyttä puhelimitse.',
    )
  }

  return (
    <form id="soittopyynto" className="mt-6" onSubmit={handleSubmit} noValidate aria-busy={form.state.kind === 'loading'}>
      <p className="text-sm leading-relaxed text-moss">
        Jätä nimesi, numerosi ja sopiva aika. Soitamme takaisin. Pyyntö ei sido sinua.
      </p>
      <Honeypot inputRef={form.botcheckRef} />
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field id="callback-name" name="name" label="Nimi" required autoComplete="name" value={name} error={errors.name} onChange={setName} />
        <Field id="callback-phone" name="phone" label="Puhelin" type="tel" required autoComplete="tel" value={phone} error={errors.phone} onChange={setPhone} />
      </div>
      <div className="mt-4">
        <Field
          id="callback-time"
          name="Paras aika soittaa"
          label="Paras aika soittaa"
          hint="Valinnainen"
          value={time}
          error={errors.time}
          onChange={setTime}
          placeholder="Esimerkiksi huomenna kello 14"
        />
      </div>
      <FormFeedback errors={errors} state={form.state} statusRef={form.statusRef} />
      <SubmitButton loading={form.state.kind === 'loading'}>Lähetä soittopyyntö</SubmitButton>
    </form>
  )
}

function useSubmitState() {
  const [state, setState] = useState<SubmitState>({ kind: 'idle' })
  const statusRef = useRef<HTMLParagraphElement>(null)
  const botcheckRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (state.kind === 'success' || state.kind === 'error') statusRef.current?.focus()
  }, [state])

  const send = async (
    fields: Omit<Web3FormsPayload, 'access_key' | 'from_name' | 'botcheck'>,
    reset: () => void,
    successMessage: string,
  ) => {
    const accessKey = web3formsAccessKey()
    if (!isWeb3formsKeyConfigured(accessKey)) {
      setState({ kind: 'error', message: missingKeyMessage })
      return
    }
    setState({ kind: 'loading' })
    try {
      const result = await submitToWeb3Forms({
        access_key: accessKey,
        from_name: WEB3FORMS_FROM_NAME,
        botcheck: botcheckRef.current?.checked === true,
        ...fields,
      })
      if (!result.ok) {
        setState({ kind: 'error', message: sendErrorMessage })
        return
      }
      reset()
      if (botcheckRef.current) botcheckRef.current.checked = false
      setState({ kind: 'success', message: successMessage })
    } catch {
      setState({ kind: 'error', message: networkErrorMessage })
    }
  }

  return { state, setState, statusRef, botcheckRef, send }
}

function FloatingContact() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const target = document.getElementById('yhteys')
    if (!target) return
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry?.isIntersecting === true),
      { rootMargin: '-72px 0px -35% 0px', threshold: 0 },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  if (hidden) return null

  return (
    <a
      href="#yhteystavat"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-lime px-4 text-sm font-semibold text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.55)] hover:bg-lime-deep"
    >
      <PhoneIcon />
      Ota yhteyttä
    </a>
  )
}

function MethodLink({ href, title, detail, icon }: { href: string; title: string; detail: string; icon: ReactNode }) {
  return (
    <a href={href} className="flex h-full flex-col rounded-2xl border border-paper/15 p-4 hover:bg-paper/10">
      <span className="text-lime">{icon}</span>
      <span className="mt-3 text-sm font-semibold">{title}</span>
      <span className="mt-1 text-sm leading-snug text-paper/80">{detail}</span>
    </a>
  )
}

function ModeButton({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold ${pressed ? 'bg-ink text-paper' : 'border border-ink/15 text-ink hover:border-ink'}`}
    >
      {children}
    </button>
  )
}

function Honeypot({ inputRef }: { inputRef: RefObject<HTMLInputElement | null> }) {
  return (
    <div hidden>
      <label>
        Älä täytä tätä kenttää
        <input ref={inputRef} type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}

function FormFeedback({
  errors,
  state,
  statusRef,
}: {
  errors: Record<string, string | undefined>
  state: SubmitState
  statusRef: RefObject<HTMLParagraphElement | null>
}) {
  const text =
    state.kind === 'loading'
      ? 'Lähetetään viestiä…'
      : state.kind === 'success' || state.kind === 'error'
        ? state.message
        : ''

  return (
    <>
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
          {text}
        </p>
      ) : null}
    </>
  )
}

function SubmitButton({ loading, children }: { loading: boolean; children: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-5 text-[15px] font-semibold text-paper hover:bg-canopy disabled:cursor-wait disabled:opacity-70 sm:w-auto"
    >
      {loading ? 'Lähetetään…' : children}
    </button>
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
          required={required}
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
          required={required}
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

function phoneError(value: string, required: boolean) {
  const digits = value.replace(/\D/g, '')
  if (!value.trim()) return required ? 'Lisää puhelinnumero.' : undefined
  if (digits.length < 6) return 'Tarkista puhelinnumero.'
  return undefined
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M8 4h3l1 4-2 1a12 12 0 0 0 5 5l1-2 4 1v3a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 2-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M5 6h14v9H8l-3 3V6Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  )
}

function CallbackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M12 7v5l3 2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}
