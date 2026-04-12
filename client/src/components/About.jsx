import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useSiteConfig } from '../context/SiteConfigContext'
import './About.css'

const defaultFeatures = [
  { icon: '🥬', title: 'Nguyên Liệu Tươi', desc: 'Nhập hàng ngày từ nông trại' },
  { icon: '👨‍🍳', title: 'Đầu Bếp Tài Năng', desc: '15+ năm kinh nghiệm' },
  { icon: '🌿', title: 'Công Thức Gia Truyền', desc: 'Hương vị truyền thống' },
  { icon: '❤️', title: 'Phục Vụ Tận Tâm', desc: 'Sự hài lòng là ưu tiên' },
]

export default function About() {
  const [ref, isVisible] = useScrollAnimation()
  const { config } = useSiteConfig()
  const about = config?.about || {}
  const features = about.features || defaultFeatures

  return (
    <section className="about-section section" id="about" ref={ref}>
      <div className="container">
        <div className="about-grid">
          {/* Image Side */}
          <motion.div
            className="about-image-wrapper"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="about-image">
              <img
                src={about.image || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=500&fit=crop'}
                alt="Không gian nhà hàng Bún Quậy 79"
                loading="lazy"
              />
              <div className="about-image-overlay" />
            </div>
            <motion.div
              className="about-floating-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="about-floating-card-number">{about.floatingNumber || '10+'}</div>
              <div className="about-floating-card-label">{about.floatingLabel || 'Năm kinh nghiệm'}</div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="about-eyebrow">{about.eyebrow || 'Về Chúng Tôi'}</div>
            <h2 className="section-title">
              {about.title || 'Câu Chuyện Của'}<br />{about.titleLine2 || 'Bún Quậy 79'}
            </h2>
            <p className="about-text">
              {about.paragraph1 || 'Được thành lập từ niềm đam mê với ẩm thực Việt Nam, Bún Quậy 79 là nơi giao thoa giữa truyền thống và hiện đại. Mỗi món ăn là một câu chuyện, được chế biến từ những nguyên liệu tươi ngon nhất, theo công thức gia truyền đã được gìn giữ qua nhiều thế hệ.'}
            </p>
            <p className="about-text">
              {about.paragraph2 || 'Không gian nhà hàng được thiết kế tinh tế với tông xanh dương nhẹ nhàng, mang đến cảm giác thư thái và thanh lịch cho mỗi bữa ăn của bạn.'}
            </p>

            <div className="about-features">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="about-feature"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                >
                  <div className="about-feature-icon">{feature.icon}</div>
                  <div className="about-feature-text">
                    <h4>{feature.title}</h4>
                    <p>{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <a href="#reservation" className="btn btn-primary" id="about-cta">
              {about.cta || 'Ghé Thăm Nhà Hàng'}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
