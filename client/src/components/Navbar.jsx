import { useState, useEffect } from 'react'
import './Navbar.css'

const navLinks = [
  { label: 'Thực đơn', href: '#menu' },
  { label: 'Về chúng tôi', href: '#about' },
  { label: 'Bộ sưu tập', href: '#gallery' },
  { label: 'Đặt bàn', href: '#reservation' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <a href="#" className="navbar-logo">
          <img src="/logo.png" alt="BQ79" className="navbar-logo-img" />
        </a>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar-link"
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#reservation"
            className="navbar-cta"
            onClick={(e) => handleLinkClick(e, '#reservation')}
          >
            Đặt bàn ngay
          </a>
        </div>

        <button
          className={`navbar-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          id="navbar-toggle"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}
