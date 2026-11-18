import { campaignNote } from './content'
import { BeforeAfter } from './components/BeforeAfter'
import { Benefits } from './components/Benefits'
import { Contact } from './components/Contact'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PoriBackdrop } from './components/PoriBackdrop'
import { Pricing } from './components/Pricing'
import { Steps } from './components/Steps'

export default function App() {
  return (
    <>
      <PoriBackdrop />
      <a className="skip-link" href="#sisalto">
        Siirry sisältöön
      </a>
      <Header />
      <main id="sisalto" tabIndex={-1} className="relative z-10 outline-none">
        <a
          href="#hinnat"
          className="block bg-lime px-5 py-3 text-center text-sm leading-snug font-semibold text-ink hover:bg-lime-deep md:text-[15px]"
        >
          {campaignNote}
        </a>
        <Hero />
        <Steps />
        <Benefits />
        <BeforeAfter />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
