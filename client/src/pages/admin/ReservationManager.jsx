import { useState, useEffect, useCallback } from 'react'
import { authFetch } from '../../utils/authFetch'
import { useToast } from '../../context/ToastContext'

const API_BASE = '/api/reservation'

const statusMap = {
  pending: { label: 'Chờ xác nhận', color: '#f59e0b' },
  confirmed: { label: 'Đã xác nhận', color: '#22c55e' },
  cancelled: { label: 'Đã hủy', color: '#ef4444' },
  completed: { label: 'Hoàn thành', color: '#3b82f6' },
}

export default function ReservationManager() {
  const { addToast } = useToast()
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')

  const fetchReservations = useCallback(async () => {
    setLoading(true)
    try {
      const res = await authFetch(API_BASE)
      if (res.ok) {
        setReservations(await res.json())
      }
    } catch (err) {
      console.error('Failed to fetch reservations:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReservations()
  }, [fetchReservations])

  const updateStatus = async (id, status) => {
    try {
      const res = await authFetch(`${API_BASE}/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        await fetchReservations()
        addToast(`Đã chuyển trạng thái thành: ${statusMap[status].label}`, 'success')
      } else {
        addToast('Lỗi khi cập nhật trạng thái', 'error')
      }
    } catch (err) {
      console.error('Failed to update status:', err)
      addToast('Lỗi kết nối máy chủ', 'error')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa đặt bàn này?')) return
    try {
      const res = await authFetch(`${API_BASE}/${id}`, { method: 'DELETE' })
      if (res.ok) {
        await fetchReservations()
        addToast('Đã xóa đơn đặt bàn', 'success')
      } else {
        addToast('Lỗi khi xóa đơn đặt bàn', 'error')
      }
    } catch (err) {
      console.error('Failed to delete reservation:', err)
      addToast('Lỗi kết nối máy chủ', 'error')
    }
  }

  const filtered =
    filterStatus === 'all'
      ? reservations
      : reservations.filter((r) => r.status === filterStatus)

  const countByStatus = (status) =>
    reservations.filter((r) => r.status === status).length

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
        <p>Đang tải danh sách đặt bàn...</p>
      </div>
    )
  }

  return (
    <div className="manager">
      {/* Stats Cards */}
      <div className="reservation-stats">
        <div className="res-stat-card">
          <div className="res-stat-number">{reservations.length}</div>
          <div className="res-stat-label">Tổng cộng</div>
        </div>
        <div className="res-stat-card pending">
          <div className="res-stat-number">{countByStatus('pending')}</div>
          <div className="res-stat-label">Chờ xác nhận</div>
        </div>
        <div className="res-stat-card confirmed">
          <div className="res-stat-number">{countByStatus('confirmed')}</div>
          <div className="res-stat-label">Đã xác nhận</div>
        </div>
        <div className="res-stat-card completed">
          <div className="res-stat-number">{countByStatus('completed')}</div>
          <div className="res-stat-label">Hoàn thành</div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="manager-toolbar">
        <div className="manager-filter-group">
          <button
            className={`admin-btn admin-btn-sm ${filterStatus === 'all' ? 'admin-btn-primary' : 'admin-btn-ghost'}`}
            onClick={() => setFilterStatus('all')}
          >
            Tất cả
          </button>
          {Object.entries(statusMap).map(([key, val]) => (
            <button
              key={key}
              className={`admin-btn admin-btn-sm ${filterStatus === key ? 'admin-btn-primary' : 'admin-btn-ghost'}`}
              onClick={() => setFilterStatus(key)}
            >
              {val.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reservation Cards */}
      <div className="reservation-cards">
        {filtered.map((r) => {
          const status = statusMap[r.status] || statusMap.pending
          return (
            <div className="reservation-card" key={r.id}>
              <div className="reservation-card-header">
                <div className="reservation-card-info">
                  <h4 className="reservation-card-name">{r.name}</h4>
                  <span className="reservation-card-phone">{r.phone}</span>
                </div>
                <span
                  className="reservation-status-badge"
                  style={{ background: status.color + '18', color: status.color, borderColor: status.color + '40' }}
                >
                  {status.label}
                </span>
              </div>
              <div className="reservation-card-details">
                <div className="reservation-card-detail">
                  <span className="reservation-detail-icon">📅</span>
                  <span>{r.date}</span>
                </div>
                <div className="reservation-card-detail">
                  <span className="reservation-detail-icon">🕐</span>
                  <span>{r.time}</span>
                </div>
                <div className="reservation-card-detail">
                  <span className="reservation-detail-icon">👥</span>
                  <span>{r.guests} khách</span>
                </div>
              </div>
              {r.message && (
                <div className="reservation-card-message">
                  <span className="reservation-detail-icon">💬</span>
                  <span>{r.message}</span>
                </div>
              )}
              <div className="reservation-card-footer">
                <div className="reservation-card-time">
                  {new Date(r.createdAt).toLocaleString('vi-VN')}
                </div>
                <div className="reservation-card-actions">
                  {r.status === 'pending' && (
                    <>
                      <button
                        className="admin-btn admin-btn-xs admin-btn-success"
                        onClick={() => updateStatus(r.id, 'confirmed')}
                      >
                        ✓ Xác nhận
                      </button>
                      <button
                        className="admin-btn admin-btn-xs admin-btn-danger"
                        onClick={() => updateStatus(r.id, 'cancelled')}
                      >
                        ✕ Hủy
                      </button>
                    </>
                  )}
                  {r.status === 'confirmed' && (
                    <button
                      className="admin-btn admin-btn-xs admin-btn-primary"
                      onClick={() => updateStatus(r.id, 'completed')}
                    >
                      ✓ Hoàn thành
                    </button>
                  )}
                  <button
                    className="admin-btn-icon delete"
                    onClick={() => handleDelete(r.id)}
                    title="Xóa"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">📋</div>
            <p>Chưa có đặt bàn nào.</p>
          </div>
        )}
      </div>
    </div>
  )
}
