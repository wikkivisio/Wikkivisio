export const navItems = [
  { href: '#toiminta', label: 'Miten se toimii' },
  { href: '#hyodyt', label: 'Hyödyt' },
  { href: '#esimerkki', label: 'Esimerkki' },
  { href: '#hinnat', label: 'Esimerkkihinnat' },
  { href: '#kysymykset', label: 'Kysymykset' },
  { href: '#yhteys', label: 'Yhteys' },
] as const

export const audiences = [
  {
    title: 'Pienyrityksille',
    body: 'Sivu on tehty vuosia sitten, eikä sitä enää ehdi tai osaa uudistaa itse.',
  },
  {
    title: 'Yhdistyksille',
    body: 'Talkoilla kasattu sivu, josta kävijän on vaikea löytää oleellinen.',
  },
  {
    title: 'Yksinyrittäjille',
    body: 'Työaika menee asiakkaisiin. Sivuston pitäisi silti näyttää hereillä olevalta.',
  },
] as const

export const steps = [
  {
    n: '01',
    title: 'Lähetä nykyinen sivusi',
    body: 'Osoite riittää. Katsomme rakenteen, tekstit ja sen, mikä kannattaa säilyttää.',
  },
  {
    n: '02',
    title: 'Kerro toiveesi',
    body: 'Mikä saa muuttua ja mikä pysyä: ilme, järjestys, tekstit tai kaikki. Kerro myös, mikä on tuntunut hankalalta.',
  },
  {
    n: '03',
    title: 'Tekoäly ja ihminen uudistavat',
    body: 'Tekoäly luonnostelee ilmeen ja rakenteen nopeasti. Ihminen tarkistaa työn ja pitää sen toiveidesi mukaisena.',
  },
  {
    n: '04',
    title: 'Hyväksy ja julkaise',
    body: 'Näet ehdotuksen ennen julkaisua. Kommentoit rauhassa. Sivu julkaistaan vasta, kun hyväksyt sen.',
  },
] as const

export const benefits = [
  {
    id: 'edullinen',
    title: 'Edullinen',
    body: 'Uudistus tehdään nykyisen sivusi päälle, joten et maksa koko sivuston rakentamisesta uudelleen. Työ on mitoitettu pienelle yritykselle, yhdistykselle ja yksinyrittäjälle.',
  },
  {
    id: 'nopea',
    title: 'Nopea',
    body: 'Tekoäly lyhentää luonnostelua. Tavoitteena on tiivis työ, ei kuukausien avoin projekti. Tarkan aikataulun saat, kun olemme nähneet sivusi.',
  },
  {
    id: 'toiveet',
    title: 'Asiakkaan toiveiden mukaan',
    body: 'Kerrot, mikä muuttuu ja mikä säilyy. Emme arvaa, miltä haluat näyttää, emmekä julkaise uutta ilmettä sinulta kysymättä.',
  },
  {
    id: 'mobiili',
    title: 'Mobiiliystävällinen',
    body: 'Sivu mukautuu puhelimeen, tablettiin ja tietokoneeseen. Teksti pysyy luettavana ja painikkeet sellaisina, että niihin osuu sormella.',
  },
  {
    id: 'haku',
    title: 'Hakukoneoptimoitu',
    body: 'Selkeät otsikot, kuvaavat sivujen nimet ja johdonmukainen rakenne auttavat kävijää ja hakukonetta. Kyse on perusasioista, ei erillisestä mainoskampanjasta.',
  },
] as const

export const packages = [
  {
    name: 'Kevyt ilme',
    price: '590 €',
    fit: 'Suppea sivu, jossa riittää ilmeen ja asettelun päivitys.',
    points: [
      'Yhden näkymän tai hyvin pienen sivun ilme',
      'Selkeämpi asettelu ja typografia',
      'Mobiiliystävällinen näkymä',
      'Yksi kommenttikierros',
    ],
  },
  {
    name: 'Sivustouudistus',
    price: '1\u00a0290 €',
    fit: 'Muutaman sivun kokonaisuus pienelle toimijalle.',
    points: [
      'Muutaman sivun kokonaisuus',
      'Navigaatio ja rakenne selkeäksi',
      'Tekstien jäsentely yhdessä',
      'Kaksi kommenttikierrosta',
    ],
  },
  {
    name: 'Laajempi kokonaisuus',
    price: '2\u00a0490 €',
    fit: 'Pidempi sivu, jossa on enemmän sisältöä ja yhteydenottopolku.',
    points: [
      'Useampi sivu ja pidempi sisältö',
      'Yhteydenottolomake ja selkeä polku',
      'Hakukoneoptimoinnin perusasiat',
      'Kaksi kommenttikierrosta',
    ],
  },
] as const

export const faqs = [
  {
    q: 'Kenelle Wikkivisio on tarkoitettu?',
    a: 'Suomalaisille pienille yrityksille, yhdistyksille ja yksinyrittäjille, joilla on jo verkkosivut. Tyypillinen lähtökohta on sivu, joka näyttää vanhentuneelta, toimii huonosti puhelimella tai jota kukaan ei enää päivitä.',
  },
  {
    q: 'Pitääkö minun osata koodata tai suunnitella?',
    a: 'Ei. Lähetät nykyisen sivusi osoitteen ja kerrot omin sanoin, mitä toivot. Me vastaamme suunnittelusta ja toteutuksesta.',
  },
  {
    q: 'Mitä tekoäly tekee ja mitä ihminen?',
    a: 'Tekoäly nopeuttaa ilmeen, rakenteen ja tekstiehdotusten luonnostelua. Ihminen tarkistaa työn, sovittaa sen toiveisiisi ja vastaa siitä, että sivu on julkaisukelpoinen. Mitään ei julkaista ilman hyväksyntääsi.',
  },
  {
    q: 'Voinko säilyttää osoitteeni ja nykyiset tekstit?',
    a: 'Kyllä. Uudistus lähtee sivusta, joka sinulla jo on. Kerro, mitkä tekstit, kuvat ja osiot haluat pitää ennallaan.',
  },
  {
    q: 'Kauanko työ kestää?',
    a: 'Tavoitteena on napakka työ, ei kuukausien projekti. Aikataulu riippuu sivun laajuudesta ja siitä, kuinka nopeasti toiveet ja kommentit ehditään käydä läpi. Saat arvion, kun olemme nähneet nykyisen sivusi.',
  },
  {
    q: 'Mitä ilmainen arvio tarkoittaa?',
    a: 'Katsomme nykyisen sivusi ja kuulemme toiveesi. Saat sen jälkeen ehdotuksen laajuudesta sekä suuntaa antavan hinnan ja aikataulun. Arvio ei maksa eikä sido sinua.',
  },
  {
    q: 'Entä jos ehdotus ei tunnu omalta?',
    a: 'Sitä varten on kommenttikierros. Kerrot, mikä ei toimi, ja muokkaamme ehdotusta. Sivu julkaistaan vasta, kun hyväksyt sen.',
  },
  {
    q: 'Ovatko sivulla näkyvät hinnat voimassa?',
    a: 'Eivät. Hinnat-osiossa näkyvät luvut ovat esimerkkihintoja. Ne havainnollistavat suuruusluokkaa, eivät ole hinnasto eivätkä tarjous. Oma hinta vahvistetaan arviossa.',
  },
] as const

/** Vaihda nämä oikeisiin tietoihin ennen julkaisua. Ne eivät ole toimivia yhteystietoja. */
export const placeholders = {
  email: 'hei@wikkivisio.fi',
  phone: '+358 40 000 0000',
  area: 'Suomi',
  note: 'Paikkamerkki. Vaihda oikea tieto ennen julkaisua.',
} as const
