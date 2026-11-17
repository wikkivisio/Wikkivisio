# Wikkivisio

Suomenkielinen markkinointisivu startupille, joka uudistaa asiakkaiden nykyisiä verkkosivuja tekoälyn avulla. Kohderyhmä on suomalaiset pienyritykset, yhdistykset ja yksinyrittäjät.

Sivu on Vite + React -sovellus. Yhteydenottolomake lähettää viestit [Web3Formsin](https://web3forms.com) kautta osoitteeseen wikkivisio@gmail.com. Työ lähtee Porista ja hoituu etänä koko Suomessa.

Hinnat on merkitty esimerkkihinnoiksi. Ne eivät ole hinnasto eivätkä tarjous.

## Käynnistys

```bash
npm install
npm run dev
```

Kehityspalvelin: [http://127.0.0.1:43123/Wikkivisio/](http://127.0.0.1:43123/Wikkivisio/)

Julkinen sivusto: [https://wikkivisio.github.io/Wikkivisio/](https://wikkivisio.github.io/Wikkivisio/)

## Tuotantoversio

```bash
npm run build
npm run preview
```

## Web3Forms-avain

Lomake käyttää oletusavainta tiedostossa `src/web3forms.ts`. Julkaistu staattinen versio toimii ilman `.env`-tiedostoa. Avain on julkinen ja tarkoitettu selainkutsuun. Viestit menevät osoitteeseen wikkivisio@gmail.com.

Jos avain halutaan vaihtaa, aseta `VITE_WEB3FORMS_KEY` tiedostoon `.env` (mallina `.env.example`) ja käynnistä kehityspalvelin uudelleen. Älä commitoi `.env`-tiedostoa.

Logo ja profiilikuvat ovat kansiossa `brand/`. Sivusto käyttää samaa merkkiä (`public/favicon.svg`, `src/components/Logo.tsx`).

## Tekijänoikeus

© 2026 Wikkivisio. Kaikki oikeudet pidätetään. All rights reserved. Tämän ohjelmiston ja sivuston kopioiminen, muokkaaminen, jakelu tai käyttö ilman Wikkivision kirjallista lupaa on kielletty. Lisenssi on tiedostossa `LICENSE`. Tämä ei ole avoimen lähdekoodin lisenssi.
