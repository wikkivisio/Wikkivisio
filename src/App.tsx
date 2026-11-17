import { BeforeAfter } from './components/BeforeAfter'
import { Benefits } from './components/Benefits'
import { Contact } from './components/Contact'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Pricing } from './components/Pricing'
import { Steps } from './components/Steps'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#sisalto">
        Siirry sisältöön
      </a>
      <Header />
      <main id="sisalto" tabIndex={-1} className="outline-none">
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
