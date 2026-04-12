import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-brand-name">
              <span className="footer-brand-icon">A</span>
              Azure Kitchen
            </div>
            <p className="footer-brand-desc">
              Nơi hội tụ tinh hoa ẩm thực trong không gian thanh lịch.
              Chúng tôi mang đến trải nghiệm ẩm thực đáng nhớ cho mỗi thực khách.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-link" aria-label="Facebook" id="social-fb">📘</a>
              <a href="#" className="footer-social-link" aria-label="Instagram" id="social-ig">📸</a>
              <a href="#" className="footer-social-link" aria-label="TikTok" id="social-tt">🎵</a>
              <a href="#" className="footer-social-link" aria-label="YouTube" id="social-yt">▶️</a>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-column">
            <h4 className="footer-column-title">Điều hướng</h4>
            <div className="footer-links">
              <a href="#hero" className="footer-link">Trang chủ</a>
              <a href="#menu" className="footer-link">Thực đơn</a>
              <a href="#about" className="footer-link">Về chúng tôi</a>
              <a href="#gallery" className="footer-link">Bộ sưu tập</a>
              <a href="#reservation" className="footer-link">Đặt bàn</a>
            </div>
          </div>

          {/* Hours */}
          <div className="footer-column">
            <h4 className="footer-column-title">Giờ mở cửa</h4>
            <div className="footer-links">
              <span className="footer-link">Thứ 2 — Thứ 6</span>
              <span className="footer-link" style={{ color: 'rgba(255,255,255,0.7)' }}>10:00 — 22:00</span>
              <span className="footer-link" style={{ marginTop: '8px' }}>Thứ 7 — Chủ nhật</span>
              <span className="footer-link" style={{ color: 'rgba(255,255,255,0.7)' }}>09:00 — 23:00</span>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h4 className="footer-column-title">Liên hệ</h4>
            <div className="footer-links">
              <span className="footer-link">123 Nguyễn Huệ</span>
              <span className="footer-link">Quận 1, TP.HCM</span>
              <span className="footer-link">(028) 3823 4567</span>
              <a href="mailto:hello@azurekitchen.vn" className="footer-link">hello@azurekitchen.vn</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <span className="footer-copyright">
            © {currentYear} Azure Kitchen. Tất cả quyền được bảo lưu.
          </span>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">Chính sách bảo mật</a>
            <a href="#" className="footer-bottom-link">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
