/** Web3Forms vastaanottaa lomakkeen selaimesta ja välittää sen sähköpostiin. */
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

/**
 * PAIKKAMERKKI. Ei ole toimiva avain.
 * Korvaa se ympäristömuuttujalla VITE_WEB3FORMS_KEY (katso .env.example).
 * Avain luodaan osoitteessa https://web3forms.com sähköpostille wikkivisio@gmail.com.
 */
export const WEB3FORMS_KEY_PLACEHOLDER = 'PAIKKAMERKKI_VAIHDA_VITE_WEB3FORMS_KEY'

export const WEB3FORMS_SUBJECT = 'Uusi yhteydenotto Wikkivisio-sivulta'
export const WEB3FORMS_FROM_NAME = 'Wikkivisio'

export function web3formsAccessKey() {
  const raw = import.meta.env.VITE_WEB3FORMS_KEY
  if (typeof raw !== 'string') return WEB3FORMS_KEY_PLACEHOLDER
  const key = raw.trim()
  if (!key || key === WEB3FORMS_KEY_PLACEHOLDER) return WEB3FORMS_KEY_PLACEHOLDER
  return key
}

export function isWeb3formsKeyConfigured(key = web3formsAccessKey()) {
  return key !== WEB3FORMS_KEY_PLACEHOLDER
}

export type Web3FormsPayload = {
  access_key: string
  subject: string
  from_name: string
  botcheck: boolean
  name: string
  email: string
  phone: string
  sivusto: string
  toiveet: string
}

type Web3FormsResponse = {
  success?: boolean
}

export async function submitToWeb3Forms(payload: Web3FormsPayload) {
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = (await response.json().catch(() => null)) as Web3FormsResponse | null
  return { ok: response.ok && data?.success === true }
}
