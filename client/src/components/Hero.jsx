import { motion } from 'framer-motion'
import './Hero.css'

export default function Hero() {
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

      {/* Main Content */}
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="hero-badge-dot" />
          Đang mở cửa · 10:00 — 22:00
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Trải Nghiệm
          <span className="hero-title-accent">Ẩm Thực Tinh Tế</span>
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          Nơi hội tụ tinh hoa ẩm thực Việt Nam và quốc tế trong không gian
          thanh lịch, mang đến cho bạn những khoảnh khắc đáng nhớ bên gia đình
          và bạn bè.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <a href="#menu" className="btn btn-primary" id="hero-cta-menu">
            Xem Thực Đơn
          </a>
          <a href="#reservation" className="btn btn-glass" id="hero-cta-reserve">
            Đặt Bàn Ngay
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator">
        <span>Cuộn xuống</span>
        <div className="hero-scroll-line" />
      </div>

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
