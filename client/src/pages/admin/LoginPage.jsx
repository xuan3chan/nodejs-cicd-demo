import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Đăng nhập thất bại')
        return
      }

      localStorage.setItem('admin_token', data.access_token)
      localStorage.setItem('admin_user', JSON.stringify(data.admin))
      navigate('/admin')
    } catch {
      setError('Không thể kết nối tới server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-bg-pattern" />

      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <span className="login-logo-icon">A</span>
          </div>
          <h1 className="login-title">Bún Quậy 79</h1>
          <p className="login-subtitle">Đăng nhập vào Admin Panel</p>
        </div>

        {error && (
          <div className="login-error">
            <span className="login-error-icon">⚠️</span>
            {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit} id="login-form">
          <div className="login-form-group">
            <label htmlFor="login-username">Tên đăng nhập</label>
            <div className="login-input-wrapper">
              <span className="login-input-icon">👤</span>
              <input
                type="text"
                id="login-username"
                name="username"
                placeholder="admin"
                value={formData.username}
                onChange={handleChange}
                required
                autoFocus
                autoComplete="username"
              />
            </div>
          </div>

          <div className="login-form-group">
            <label htmlFor="login-password">Mật khẩu</label>
            <div className="login-input-wrapper">
              <span className="login-input-icon">🔒</span>
              <input
                type="password"
                id="login-password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
            id="login-submit"
          >
            {loading ? (
              <span className="login-btn-loading">
                <span className="login-spinner" />
                Đang đăng nhập...
              </span>
            ) : (
              'Đăng Nhập'
            )}
          </button>
        </form>

        <div className="login-footer">
          <a href="/" className="login-back">← Về trang chủ</a>
        </div>
      </div>
    </div>
  )
}
