import { useSiteConfig } from '../context/SiteConfigContext'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { config } = useSiteConfig()
  const footer = config?.footer || {}
  const contact = config?.contact || {}

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-brand-name">
              <img alt="BQ79" className="footer-logo-img" src="/logo.png" />
            </div>
            <p className="footer-brand-desc">
              {footer.brandDesc || 'Nơi hội tụ tinh hoa ẩm thực trong không gian thanh lịch. Chúng tôi mang đến trải nghiệm ẩm thực đáng nhớ cho mỗi thực khách.'}
            </p>
            <div className="footer-socials">
              <a href={footer.socials?.facebook || '#'} className="footer-social-link" aria-label="Facebook" id="social-fb">📘</a>
              <a href={footer.socials?.instagram || '#'} className="footer-social-link" aria-label="Instagram" id="social-ig">📸</a>
              <a href={footer.socials?.tiktok || '#'} className="footer-social-link" aria-label="TikTok" id="social-tt">🎵</a>
              <a href={footer.socials?.youtube || '#'} className="footer-social-link" aria-label="YouTube" id="social-yt">▶️</a>
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
            <h4 className="footer-column-title">Giờ mở cửa (Cả Tuần)</h4>
            <div className="footer-links">
              <span className="footer-link">Ca Sáng</span>
              <span className="footer-link" style={{ color: 'rgba(255,255,255,0.7)' }}>{footer.morningHours || '06:00 — 12:00'}</span>
              <span className="footer-link" style={{ marginTop: '8px' }}>Ca Chiều</span>
              <span className="footer-link" style={{ color: 'rgba(255,255,255,0.7)' }}>{footer.eveningHours || '16:00 — 22:00'}</span>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h4 className="footer-column-title">Liên hệ</h4>
            <div className="footer-links">
              <span className="footer-link">{contact.address || '123 Nguyễn Huệ'}</span>
              <span className="footer-link">{contact.phone || '(028) 3823 4567'}</span>
              <a href={`mailto:${contact.email || 'hello@azurekitchen.vn'}`} className="footer-link">{contact.email || 'hello@azurekitchen.vn'}</a>
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
            <a href="#" className="footer-bottom-link">Thực hiện bởi @TiệmCode</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
