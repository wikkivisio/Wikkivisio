# Wikkivisio

Suomenkielinen markkinointisivu startupille, joka uudistaa asiakkaiden nykyisiä verkkosivuja tekoälyn avulla. Kohderyhmä on suomalaiset pienyritykset, yhdistykset ja yksinyrittäjät.

Sivu on staattinen Vite + React -sovellus. Yhteydenottolomake on pelkkä käyttöliittymä: se ei lähetä tietoja. Kytkentäohje on tiedostossa `src/components/Contact.tsx`. Sivun sähköposti, puhelin ja alue ovat paikkamerkkejä (`src/content.ts`).

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

Logo on tiedostossa `public/logo.svg` ja komponentissa `src/components/Logo.tsx`.
