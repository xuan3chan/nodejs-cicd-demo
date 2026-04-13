import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Menu from '../components/Menu'
import About from '../components/About'
import Gallery from '../components/Gallery'
import Reservation from '../components/Reservation'
import Footer from '../components/Footer'
import { SiteConfigProvider } from '../context/SiteConfigContext'

export default function HomePage() {
  return (
    <SiteConfigProvider>
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <About />
        <Gallery />
        <Reservation />
      </main>
      <Footer />
    </SiteConfigProvider>
  )
}
