import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Menu.css'

const categories = ['Tất cả', 'Khai vị', 'Món chính', 'Tráng miệng', 'Đồ uống']

const menuItems = [
  {
    id: 1,
    name: 'Gỏi Cuốn Tôm Thịt',
    description: 'Bánh tráng cuộn tôm sú, thịt ba chỉ, bún tươi, rau sống, chấm mắm nêm đậm đà.',
    price: '85.000đ',
    category: 'Khai vị',
    tag: 'popular',
    image: 'https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Phở Bò Tái Nạm',
    description: 'Nước dùng hầm xương 12 tiếng, bánh phở tươi, bò tái mềm, nạm gầu thơm béo.',
    price: '95.000đ',
    category: 'Món chính',
    tag: 'popular',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Bún Chả Hà Nội',
    description: 'Chả viên và chả miếng nướng than hoa, bún tươi, nước chấm chua ngọt, rau sống.',
    price: '89.000đ',
    category: 'Món chính',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Cơm Tấm Sườn Bì Chả',
    description: 'Sườn nướng mật ong, bì heo, chả trứng, kèm nước mắm pha và đồ chua.',
    price: '79.000đ',
    category: 'Món chính',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Chè Bưởi Thập Cẩm',
    description: 'Tôm cua bưởi thơm mát, hạt sen, đậu xanh, nước cốt dừa béo ngậy.',
    price: '45.000đ',
    category: 'Tráng miệng',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Cà Phê Sữa Đá',
    description: 'Cà phê phin truyền thống pha sữa đặc, đá viên mát lạnh.',
    price: '35.000đ',
    category: 'Đồ uống',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop'
  },
  {
    id: 7,
    name: 'Bánh Xèo Miền Trung',
    description: 'Bánh xèo giòn vàng, nhân tôm thịt, giá đỗ, chấm nước mắm chua ngọt.',
    price: '75.000đ',
    category: 'Khai vị',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop'
  },
  {
    id: 8,
    name: 'Trà Sen Tây Hồ',
    description: 'Trà ướp hương sen Tây Hồ, vị thanh tao, hậu ngọt nhẹ.',
    price: '55.000đ',
    category: 'Đồ uống',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop'
  },
  {
    id: 9,
    name: 'Bánh Flan Caramel',
    description: 'Bánh flan mềm mịn với lớp caramel đắng nhẹ, thêm cà phê tùy chọn.',
    price: '40.000đ',
    category: 'Tráng miệng',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop'
  },
]

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [ref, isVisible] = useScrollAnimation()

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
                  <img src={item.image} alt={item.name} loading="lazy" />
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
