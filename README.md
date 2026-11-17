# Wikkivisio

Suomenkielinen markkinointisivu startupille, joka uudistaa asiakkaiden nykyisiä verkkosivuja tekoälyn avulla. Kohderyhmä on suomalaiset pienyritykset, yhdistykset ja yksinyrittäjät.

Sivu on Vite + React -sovellus. Yhteydenottolomake ja soittopyyntö lähettävät viestit [Web3Formsin](https://web3forms.com) kautta osoitteeseen wikkivisio@gmail.com. Puhelinnumero on `contactPhone` tiedostossa `src/content.ts`. Toiminta-alue on koko Suomi, ja työ hoituu etänä.

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

Lomake käyttää oletusavainta tiedostossa `src/web3forms.ts`. Julkaistu staattinen versio toimii ilman `.env`-tiedostoa. Avain on julkinen ja tarkoitettu selainkutsuun. Viestit menevät osoitteeseen wikkivisio@gmail.com.

Jos avain halutaan vaihtaa, aseta `VITE_WEB3FORMS_KEY` tiedostoon `.env` (mallina `.env.example`) ja käynnistä kehityspalvelin uudelleen. Älä commitoi `.env`-tiedostoa.

Logo ja profiilikuvat ovat kansiossa `brand/`. Sivusto käyttää samaa merkkiä (`public/favicon.svg`, `src/components/Logo.tsx`).
