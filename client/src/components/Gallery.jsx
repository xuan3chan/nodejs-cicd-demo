import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Gallery.css'

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    label: 'Không gian nhà hàng',
  },
  {
    src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=300&fit=crop',
    label: 'Quầy bar',
  },
  {
    src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
    label: 'Món khai vị',
  },
  {
    src: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&h=300&fit=crop',
    label: 'Bàn tiệc',
  },
  {
    src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    label: 'Pizza đặc biệt',
  },
  {
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=300&fit=crop',
    label: 'Khu vực ngoài trời',
  },
]

const stats = [
  { number: '10K+', label: 'Khách hàng hài lòng' },
  { number: '50+', label: 'Món ăn đặc sắc' },
  { number: '15+', label: 'Đầu bếp tài năng' },
  { number: '4.9', label: 'Đánh giá trung bình' },
]

export default function Gallery() {
  const [ref, isVisible] = useScrollAnimation()
  const [statsRef, statsVisible] = useScrollAnimation({ threshold: 0.3 })

  return (
    <section className="gallery-section section" id="gallery" ref={ref}>
      <div className="container">
        <motion.div
          className="gallery-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Bộ Sưu Tập Hình Ảnh</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Khám phá không gian ấm cúng và những món ăn tuyệt vời tại Azure Kitchen
          </p>
        </motion.div>

        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <img src={image.src} alt={image.label} loading="lazy" />
              <div className="gallery-item-overlay">
                <span className="gallery-item-label">{image.label}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Banner */}
        <motion.div
          className="gallery-stats"
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={statsVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="gallery-stat"
              initial={{ opacity: 0, y: 20 }}
              animate={statsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
            >
              <div className="gallery-stat-number">{stat.number}</div>
              <div className="gallery-stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
