# Wikkivisio

Suomenkielinen markkinointisivu startupille, joka uudistaa asiakkaiden nykyisiä verkkosivuja tekoälyn avulla. Kohderyhmä on suomalaiset pienyritykset, yhdistykset ja yksinyrittäjät.

Sivu on Vite + React -sovellus. Yhteydenottolomake lähettää viestit [Web3Formsin](https://web3forms.com) kautta osoitteeseen wikkivisio@gmail.com. Puhelinnumero ja alue sivulla ovat yhä paikkamerkkejä (`src/content.ts`).

Hinnat on merkitty esimerkkihinnoiksi. Ne eivät ole hinnasto eivätkä tarjous.

## Käynnistys

```bash
npm install
npm run dev
```

Kehityspalvelin: [http://127.0.0.1:43123](http://127.0.0.1:43123)

## Tuotantoversio

```bash
npm run build
npm run preview
```

## Web3Forms-avain

Lomake lukee avaimen build-aikaisesta muuttujasta `VITE_WEB3FORMS_KEY`. Ilman avainta lähetys ei lähde, ja lomake kertoo siitä suomeksi.

Avain haetaan näin:

1. Mene osoitteeseen [web3forms.com](https://web3forms.com).
2. Syötä sähköposti wikkivisio@gmail.com.
3. Kopioi avain sähköpostista.

Tallenna avain tiedostoon `.env` projektin juureen. Mallina on `.env.example`:

```bash
VITE_WEB3FORMS_KEY=avain-tähän
```

Käynnistä kehityspalvelin uudelleen avaimen lisäämisen jälkeen. Avain päätyy selainpakettiin, koska Web3Forms on tarkoitettu kutsuttavaksi suoraan selaimesta. Älä silti commitoi `.env`-tiedostoa.

Logo on tiedostossa `public/logo.svg` ja komponentissa `src/components/Logo.tsx`.
