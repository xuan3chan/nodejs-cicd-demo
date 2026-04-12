import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MenuManager from './MenuManager'
import ReservationManager from './ReservationManager'
import CmsManager from './CmsManager'
import { ToastProvider } from '../../context/ToastContext'
import './AdminPage.css'

const tabs = [
  { id: 'menu', label: 'Thực Đơn', icon: '🍽️' },
  { id: 'reservations', label: 'Đặt Bàn', icon: '📋' },
  { id: 'cms', label: 'Nội Dung Trang', icon: '✏️' },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('menu')
  const navigate = useNavigate()
  const adminUser = JSON.parse(localStorage.getItem('admin_user') || '{}')

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    navigate('/admin/login')
  }

  return (
    <ToastProvider>
      <div className="admin-layout">
        {/* Sidebar */}
      <aside className="admin-sidebar">
        <Link to="/" className="admin-sidebar-brand">
          <span className="admin-brand-icon">A</span>
          <div>
            <div className="admin-brand-name">Bún Quậy 79</div>
            <div className="admin-brand-label">Admin Panel</div>
          </div>
        </Link>

        <nav className="admin-sidebar-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`admin-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              id={`admin-tab-${tab.id}`}
            >
              <span className="admin-nav-icon">{tab.icon}</span>
              <span className="admin-nav-label">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <div className="admin-user-avatar">👤</div>
            <div className="admin-user-details">
              <div className="admin-user-name">{adminUser.username || 'Admin'}</div>
              <div className="admin-user-role">{adminUser.role || 'admin'}</div>
            </div>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout} id="admin-logout">
            🚪 Đăng xuất
          </button>
          <Link to="/" className="admin-back-link" id="admin-back-home">
            ← Về trang chủ
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1 className="admin-header-title">
            {tabs.find((t) => t.id === activeTab)?.icon}{' '}
            {tabs.find((t) => t.id === activeTab)?.label}
          </h1>
        </header>

        <div className="admin-content">
          {activeTab === 'menu' && <MenuManager />}
          {activeTab === 'reservations' && <ReservationManager />}
          {activeTab === 'cms' && <CmsManager />}
        </div>
      </main>
    </div>
    </ToastProvider>
  )
}
