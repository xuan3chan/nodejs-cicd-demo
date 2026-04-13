import React, { Suspense } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import { SiteConfigProvider } from '../context/SiteConfigContext'

const Menu = React.lazy(() => import('../components/Menu'))
const About = React.lazy(() => import('../components/About'))
const Gallery = React.lazy(() => import('../components/Gallery'))
const Reservation = React.lazy(() => import('../components/Reservation'))
const Footer = React.lazy(() => import('../components/Footer'))

export default function HomePage() {
  return (
    <SiteConfigProvider>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div style={{ padding: '50px', textAlign: 'center' }}>Đang tải...</div>}>
          <Menu />
          <About />
          <Gallery />
          <Reservation />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </SiteConfigProvider>
  )
}
