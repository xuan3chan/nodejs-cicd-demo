import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import About from './components/About'
import Gallery from './components/Gallery'
import Reservation from './components/Reservation'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <About />
        <Gallery />
        <Reservation />
      </main>
      <Footer />
    </>
  )
}

export default App
