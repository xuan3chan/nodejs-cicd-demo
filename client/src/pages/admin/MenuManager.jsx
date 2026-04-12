import { useState, useEffect, useCallback } from 'react'
import { authFetch } from '../../utils/authFetch'
import { useToast } from '../../context/ToastContext'

const API_BASE = '/api/menu'

export default function MenuManager() {
  const { addToast } = useToast()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [stagedImages, setStagedImages] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    tag: '',
    image: '',
  })

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const res = await authFetch(API_BASE)
      if (res.ok) {
        setItems(await res.json())
      }
    } catch (err) {
      console.error('Failed to fetch menu items:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', category: '', tag: '', image: '' })
    setEditingItem(null)
    setShowForm(false)
  }

  const cleanupStagedImages = () => {
    if (stagedImages.length === 0) return
    stagedImages.forEach(url => {
      authFetch('/api/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      }).catch(err => console.error('Failed to rollback image:', err))
    })
    setStagedImages([])
  }

  const cancelForm = () => {
    cleanupStagedImages()
    resetForm()
  }

  const openCreateForm = () => {
    cleanupStagedImages()
    resetForm()
    setShowForm(true)
  }

  const openEditForm = (item) => {
    cleanupStagedImages()
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      tag: item.tag || '',
      image: item.image,
    })
    setEditingItem(item)
    setShowForm(true)
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    const formPayload = new FormData()
    formPayload.append('image', file)

    try {
      const res = await authFetch('/api/upload', {
        method: 'POST',
        body: formPayload,
      })
      
      if (res.ok) {
        const data = await res.json()
        setFormData(prev => ({ ...prev, image: data.url }))
        setStagedImages(prev => [...prev, data.url])
        addToast('Tải ảnh lên thành công', 'success')
      } else {
        const err = await res.json()
        addToast(`Lỗi: ${err.message || 'Không thể tải ảnh'}`, 'error')
      }
    } catch (error) {
      console.error('Upload failed:', error)
      addToast('Lỗi kết nối khi tải ảnh', 'error')
    } finally {
      setUploadingImage(false)
      // Reset input file
      e.target.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const url = editingItem ? `${API_BASE}/${editingItem.id}` : API_BASE
      const method = editingItem ? 'PUT' : 'POST'
      const body = { ...formData }
      if (!body.tag) delete body.tag

      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        setStagedImages([]) // Clear staged images so they aren't deleted later
        await fetchItems()
        resetForm()
        addToast(editingItem ? 'Cập nhật món thành công' : 'Thêm món mới thành công', 'success')
      } else {
        addToast('Có lỗi xảy ra, vui lòng thử lại', 'error')
      }
    } catch (err) {
      console.error('Failed to save menu item:', err)
      addToast('Lỗi kết nối máy chủ', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa món này?')) return
    try {
      const res = await authFetch(`${API_BASE}/${id}`, { method: 'DELETE' })
      if (res.ok) {
        await fetchItems()
        addToast('Đã xóa món ăn', 'success')
      } else {
        addToast('Lỗi khi xóa món ăn', 'error')
      }
    } catch (err) {
      console.error('Failed to delete menu item:', err)
      addToast('Lỗi kết nối máy chủ', 'error')
    }
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
        <p>Đang tải thực đơn...</p>
      </div>
    )
  }

  return (
    <div className="manager">
      {/* Toolbar */}
      <div className="manager-toolbar">
        <div className="manager-toolbar-info">
          <span className="manager-count">{items.length} món</span>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openCreateForm} id="menu-add-btn">
          + Thêm Món Mới
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="admin-modal-overlay" onClick={resetForm}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingItem ? 'Chỉnh Sửa Món' : 'Thêm Món Mới'}</h3>
              <button className="admin-modal-close" onClick={resetForm}>×</button>
            </div>
            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Tên món</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="VD: Phở Bò Tái Nạm"
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label>Giá</label>
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="VD: 95.000đ"
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label>Danh mục</label>
                  <select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Chọn danh mục</option>
                    <option value="Món chính">Món chính</option>
                    <option value="Món thêm">Món thêm</option>
                    <option value="Đồ uống">Đồ uống</option>
                    <option value="Ăn kèm">Ăn kèm</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Tag</label>
                  <select name="tag" value={formData.tag} onChange={handleChange}>
                    <option value="">Không có</option>
                    <option value="popular">⭐ Phổ biến</option>
                    <option value="new">🆕 Mới</option>
                    <option value="spicy">🌶️ Cay</option>
                  </select>
                </div>
              </div>
              <div className="admin-form-group">
                <label>Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Mô tả ngắn gọn về món ăn..."
                  rows={3}
                  required
                />
              </div>
              <div className="admin-form-group">
                <label>Hình ảnh</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    required
                    style={{ flex: 1 }}
                  />
                  <label className="admin-btn admin-btn-secondary" style={{ cursor: 'pointer', margin: 0, display: 'flex', alignItems: 'center' }}>
                    {uploadingImage ? 'Đang tải...' : 'Tải lên'}
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploadingImage} />
                  </label>
                </div>
                {formData.image && (
                  <div className="admin-image-preview">
                    <img src={formData.image} alt="Preview" />
                  </div>
                )}
              </div>
              <div className="admin-form-actions">
                <button type="button" className="admin-btn admin-btn-ghost" onClick={cancelForm}>
                  Hủy
                </button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? 'Đang lưu...' : editingItem ? 'Cập Nhật' : 'Thêm Mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Hình</th>
              <th>Tên món</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Tag</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="admin-table-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                </td>
                <td>
                  <div className="admin-table-name">{item.name}</div>
                  <div className="admin-table-desc">{item.description}</div>
                </td>
                <td>
                  <span className="admin-badge">{item.category}</span>
                </td>
                <td className="admin-table-price">{item.price}</td>
                <td>
                  {item.tag && (
                    <span className="admin-badge admin-badge-accent">
                      {item.tag === 'popular' ? '⭐' : item.tag === 'new' ? '🆕' : '🌶️'} {item.tag}
                    </span>
                  )}
                </td>
                <td>
                  <div className="admin-table-actions">
                    <button
                      className="admin-btn-icon edit"
                      onClick={() => openEditForm(item)}
                      title="Chỉnh sửa"
                    >
                      ✏️
                    </button>
                    <button
                      className="admin-btn-icon delete"
                      onClick={() => handleDelete(item.id)}
                      title="Xóa"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="admin-table-empty">
                  Chưa có món ăn nào. Hãy thêm món mới!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
