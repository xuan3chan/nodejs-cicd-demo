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
              <img alt="Logo Bún Quậy 79 — Ẩm thực vị biển" className="footer-logo-img" src="/logo.png" />
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
            <div className="footer-links" style={{ marginBottom: '16px' }}>
              <a 
                href={contact.mapUrl || `https://www.google.com/maps/place/B%C3%BAn+Qu%E1%BA%ADy+79/@10.3704491,106.3630276,16.5z/data=!4m6!3m5!1s0x310aaf0039b3586f:0xb93a1f3525c5ff5f!8m2!3d10.3719504!4d106.364641!16s%2Fg%2F11w4mmgt0b?hl=vi&entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-link footer-address-link"
              >
                <span className="footer-address-icon" aria-hidden="true">📍</span>
                <span>{contact.address || '86 Đường Nguyễn Minh Đường, Đạo Thạnh, Đồng Tháp 84000, Việt Nam'}</span>
              </a>
              <span className="footer-link">☎️ {contact.phone || '(028) 3823 4567'}</span>
              <a href={`mailto:${contact.email || 'hello@bunquay79.io.vn'}`} className="footer-link">✉️ {contact.email || 'hello@bunquay79.io.vn'}</a>
            </div>

            {/* Embedded Map */}
            <div className="footer-map">
              <iframe
                src={contact.mapEmbed || 'https://maps.google.com/maps?q=B%C3%BAn+Qu%E1%BA%ADy+79,+86+%C4%90%C6%B0%E1%BB%9Dng+Nguy%E1%BB%85n+Minh+%C4%90%C6%B0%E1%BB%9Dng&t=&z=15&ie=UTF8&iwloc=&output=embed'}
                title="Vị trí Bún Quậy 79"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <span className="footer-copyright">
            © {currentYear} Bún Quậy 79. Tất cả quyền được bảo lưu.
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
