import { useState, type FormEvent } from 'react'
import { placeholders } from '../content'
import { SectionHeading } from './SectionHeading'

/**
 * YHTEYDENOTTOLOMAKE — EI KYTKETTY.
 *
 * Tämä on pelkkä käyttöliittymä. handleSubmit estää lähetyksen eikä kutsu
 * rajapintaa. Ennen julkaisua:
 * 1. Korvaa handleSubmit kutsulla omaan backend-reittiin tai lomakepalveluun.
 * 2. Älä näytä viestiä, joka väittää viestin lähteneen perille, ennen kuin lähetys onnistuu.
 * 3. Vaihda paikkamerkkiyhteystiedot tiedostossa src/content.ts (placeholders).
 * 4. Kerro tietosuojasta, kun vastaanottaja on tiedossa.
 */

type Fields = {
  name: string
  email: string
  phone: string
  site: string
  wishes: string
}

type Errors = Partial<Record<keyof Fields, string>>

const empty: Fields = {
  name: '',
  email: '',
  phone: '',
  site: '',
  wishes: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Contact() {
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [previewNote, setPreviewNote] = useState(false)

  const set = (key: keyof Fields) => (value: string) => {
    setFields((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next = validate(fields)
    setErrors(next)
    setPreviewNote(false)
    const firstInvalid = (Object.keys(next) as Array<keyof Fields>).find((key) => next[key])
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus()
      return
    }
    // Ei verkkoon lähetystä. Tiedot jäävät tähän komponentin tilaan.
    setPreviewNote(true)
  }

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
              <PlaceholderRow label="Sähköposti" value={placeholders.email} />
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
        >
          <p className="text-sm leading-relaxed text-moss">
            Esikatselu: lomaketta ei ole vielä kytketty, eikä tietoja lähetetä eteenpäin.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field
              id="contact-name"
              label="Nimi"
              required
              autoComplete="name"
              value={fields.name}
              error={errors.name}
              onChange={set('name')}
            />
            <Field
              id="contact-email"
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

          {previewNote ? (
            <p role="status" className="mt-4 rounded-xl bg-sand px-4 py-3 text-sm leading-relaxed text-ink">
              Viestiä ei lähetetty. Tiedot jäivät selaimeen, koska lomaketta ei ole kytketty
              vastaanottajaan. Tämä on käyttöliittymän esikatselu.
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-5 text-[15px] font-semibold text-paper hover:bg-canopy sm:w-auto"
          >
            Lähetä arviointipyyntö
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
          name={id}
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
          name={id}
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
