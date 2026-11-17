/** Web3Forms vastaanottaa lomakkeen selaimesta ja välittää sen sähköpostiin. */
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

/**
 * Julkinen oletusavain. Web3Forms on tarkoitettu kutsuttavaksi selaimesta,
 * joten avain saa olla paketissa. Sähköposti wikkivisio@gmail.com on sidottu tähän avaimeen.
 * VITE_WEB3FORMS_KEY korvaa oletuksen, jos se on asetettu.
 */
export const WEB3FORMS_ACCESS_KEY = '3945c8cd-ab8d-4740-806a-e00ff3ea12b0'

/** Jos ympäristömuuttujaan jää tämä teksti, käytetään oletusavainta. */
export const WEB3FORMS_KEY_PLACEHOLDER = 'PAIKKAMERKKI_VAIHDA_VITE_WEB3FORMS_KEY'

export const WEB3FORMS_SUBJECT = 'Uusi yhteydenotto Wikkivisio-sivulta'
export const WEB3FORMS_CALLBACK_SUBJECT = 'Soittopyyntö Wikkivisio-sivulta'
export const WEB3FORMS_FROM_NAME = 'Wikkivisio'

export function web3formsAccessKey() {
  const raw = import.meta.env.VITE_WEB3FORMS_KEY
  if (typeof raw === 'string') {
    const key = raw.trim()
    if (key && key !== WEB3FORMS_KEY_PLACEHOLDER) return key
  }
  return WEB3FORMS_ACCESS_KEY
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
  email?: string
  phone?: string
  sivusto?: string
  toiveet?: string
  'Toivottu yhteydenottotapa'?: string
  'Paras aika soittaa'?: string
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
