import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSiteConfig } from '../context/SiteConfigContext'
import './Hero.css'

export default function Hero() {
  const { config } = useSiteConfig()
  const hero = config?.hero || {}
  const [showHours, setShowHours] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const badgeRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Check initial scroll position securely
    handleScroll()

    const handleClickOutside = (event) => {
      if (badgeRef.current && !badgeRef.current.contains(event.target)) {
        setShowHours(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <section className="hero" id="hero">
      {/* Background Pattern */}
      <div className="hero-bg-pattern" />

      {/* Floating Decorative Elements */}
      <div className="hero-floating-elements">
        <div className="hero-floating-circle" />
        <div className="hero-floating-circle" />
        <div className="hero-floating-circle" />
        <div className="hero-floating-circle" />
      </div>

      {/* Floating Hours Badge */}
      <motion.div
        className={`hero-badge-container floating-badge ${scrolled ? 'scrolled' : ''}`}
        ref={badgeRef}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <button 
          className="hero-badge"
          onClick={() => setShowHours(!showHours)}
        >
          <span className="hero-badge-dot" />
          {hero.badge || 'Đang mở cửa'}
          <span className="hero-badge-arrow">{showHours ? '▼' : '▲'}</span>
        </button>

        {showHours && (
          <motion.div 
            className="hero-hours-popup"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="hero-hours-row" style={{ color: '#60a5fa', fontSize: '0.8rem', fontWeight: '600', justifyContent: 'center', marginBottom: '4px' }}>
              Cả Tuần (T2 - CN)
            </div>
            <div className="hero-hours-row">
              <span>Ca Sáng</span>
              <span>{config?.footer?.morningHours || '06:00 — 12:00'}</span>
            </div>
            <div className="hero-hours-row">
              <span>Ca Chiều</span>
              <span>{config?.footer?.eveningHours || '16:00 — 22:00'}</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {hero.title || 'Trải Nghiệm'}
          <span className="hero-title-accent">{hero.titleAccent || 'Ẩm Thực Tinh Tế'}</span>
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {hero.description || 'Bún Quậy 79 — Quán bún quậy vị biển nổi tiếng tại Đồng Tháp. Thưởng thức bún quậy tươi ngon, chả cá đặc biệt cùng không gian ấm cúng bên gia đình và bạn bè.'}
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <a href="#menu" className="btn btn-primary" id="hero-cta-menu">
            {hero.ctaMenu || 'Xem Thực Đơn'}
          </a>
          <a href="#reservation" className="btn btn-glass" id="hero-cta-reserve">
            {hero.ctaReserve || 'Đặt Bàn Ngay'}
          </a>
        </motion.div>
      </motion.div>


      {/* Wave Separator */}
      <div className="hero-wave">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0 120L48 108C96 96 192 72 288 66C384 60 480 72 576 78C672 84 768 84 864 78C960 72 1056 60 1152 60C1248 60 1344 72 1392 78L1440 84V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="#F8FAFC"
          />
        </svg>
      </div>
    </section>
  )
}
