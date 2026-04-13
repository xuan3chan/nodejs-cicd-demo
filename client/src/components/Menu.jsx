import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Menu.css'

const categories = ['Tất cả', 'Món chính', 'Món thêm', 'Đồ uống', 'Ăn kèm']

const API_BASE = '/api/menu'

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [menuItems, setMenuItems] = useState([])
  const [ref, isVisible] = useScrollAnimation()

  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => setMenuItems(data))
      .catch(err => console.error('Failed to fetch menu:', err))
  }, [])

  const filteredItems = activeCategory === 'Tất cả'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory)

  return (
    <section className="menu-section section" id="menu" ref={ref}>
      <div className="container">
        <motion.div
          className="menu-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Thực Đơn Đặc Sắc</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Khám phá những món ăn được chế biến từ nguyên liệu tươi ngon nhất,
            mang đậm hương vị truyền thống.
          </p>
        </motion.div>

        <motion.div
          className="menu-categories"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`menu-category-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              id={`menu-cat-${cat}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="menu-grid">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="menu-item"
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  layout: { duration: 0.3 }
                }}
              >
                <div className="menu-item-image">
                  <img src={item.image} alt={item.name} loading="lazy" width="400" height="300" />
                  {item.tag && (
                    <span className={`menu-item-tag ${item.tag}`}>
                      {item.tag === 'popular' ? '⭐ Phổ biến' : item.tag}
                    </span>
                  )}
                </div>
                <div className="menu-item-header">
                  <h3 className="menu-item-name">{item.name}</h3>
                  <span className="menu-item-dots" />
                  <span className="menu-item-price">{item.price}</span>
                </div>
                <p className="menu-item-description">{item.description}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
