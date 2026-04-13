import { useState, useEffect, useCallback } from 'react'
import { authFetch } from '../../utils/authFetch'
import { useToast } from '../../context/ToastContext'

const API_BASE = '/api/site-config'

const sectionLabels = {
  hero: { label: '🏠 Hero Banner', desc: 'Tiêu đề, mô tả, nút CTA trên banner chính' },
  about: { label: '📖 Về Chúng Tôi', desc: 'Nội dung, hình ảnh, features của phần giới thiệu' },
  gallery: { label: '🖼️ Bộ Sưu Tập', desc: 'Hình ảnh gallery và số liệu thống kê' },
  contact: { label: '📞 Liên Hệ', desc: 'Địa chỉ, số điện thoại, email, giờ mở cửa' },
  footer: { label: '📋 Footer', desc: 'Mô tả, giờ mở cửa, liên kết mạng xã hội' },
}

export default function CmsManager() {
  const { addToast } = useToast()
  const [config, setConfig] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState({})
  const [openSection, setOpenSection] = useState('hero')
  const [editData, setEditData] = useState({})
  const [stagedImages, setStagedImages] = useState([])

  const fetchConfig = useCallback(async () => {
    setLoading(true)
    try {
      const res = await authFetch(API_BASE)
      if (res.ok) {
        const data = await res.json()
        setConfig(data)
        setEditData(JSON.parse(JSON.stringify(data)))
      }
    } catch (err) {
      console.error('Failed to fetch config:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchConfig()
  }, [fetchConfig])

  const handleSave = async (key) => {
    setSaving((prev) => ({ ...prev, [key]: true }))
    try {
      const res = await authFetch(`${API_BASE}/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: editData[key] }),
      })
      if (res.ok) {
        setConfig((prev) => ({ ...prev, [key]: editData[key] }))
        addToast(`Đã lưu thay đổi cho mục ${sectionLabels[key].label}`, 'success')
        setStagedImages([])
      } else {
        addToast('Có lỗi xảy ra khi lưu thay đổi', 'error')
      }
    } catch (err) {
      console.error('Failed to save config:', err)
      addToast('Lỗi kết nối máy chủ', 'error')
    } finally {
      setSaving((prev) => ({ ...prev, [key]: false }))
    }
  }

  const updateField = (section, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }))
  }

  const updateNestedField = (section, parent, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parent]: { ...prev[section]?.[parent], [field]: value },
      },
    }))
  }

  const updateArrayItem = (section, arrayKey, index, field, value) => {
    setEditData((prev) => {
      const arr = [...(prev[section]?.[arrayKey] || [])]
      arr[index] = { ...arr[index], [field]: value }
      return { ...prev, [section]: { ...prev[section], [arrayKey]: arr } }
    })
  }

  const addArrayItem = (section, arrayKey, template) => {
    setEditData((prev) => {
      const arr = [...(prev[section]?.[arrayKey] || []), template]
      return { ...prev, [section]: { ...prev[section], [arrayKey]: arr } }
    })
  }

  const removeArrayItem = (section, arrayKey, index) => {
    setEditData((prev) => {
      const arr = [...(prev[section]?.[arrayKey] || [])]
      arr.splice(index, 1)
      return { ...prev, [section]: { ...prev[section], [arrayKey]: arr } }
    })
  }

  const moveArrayItem = (section, arrayKey, index, direction) => {
    setEditData((prev) => {
      const arr = [...(prev[section]?.[arrayKey] || [])]
      if (direction === 'up' && index > 0) {
        [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]]
      } else if (direction === 'down' && index < arr.length - 1) {
        [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
      }
      return { ...prev, [section]: { ...prev[section], [arrayKey]: arr } }
    })
  }

  const hasChanges = (key) => {
    return JSON.stringify(config[key]) !== JSON.stringify(editData[key])
  }

  const trackUpload = (url) => {
    setStagedImages(prev => [...prev, url])
  }

  const cleanupStagedImages = () => {
    if (stagedImages.length === 0) return
    stagedImages.forEach(url => {
      authFetch('/api/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      }).catch(err => console.error(err))
    })
    setStagedImages([])
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
        <p>Đang tải cấu hình...</p>
      </div>
    )
  }

  return (
    <div className="manager">
      <div className="cms-sections">
        {Object.entries(sectionLabels).map(([key, info]) => (
          <div key={key} className={`cms-section ${openSection === key ? 'open' : ''}`}>
            <button
              className="cms-section-header"
              onClick={() => setOpenSection(openSection === key ? '' : key)}
            >
              <div className="cms-section-info">
                <div className="cms-section-label">{info.label}</div>
                <div className="cms-section-desc">{info.desc}</div>
              </div>
              <div className="cms-section-toggle">
                {hasChanges(key) && <span className="cms-unsaved-dot" />}
                <span className="cms-chevron">{openSection === key ? '▼' : '▶'}</span>
              </div>
            </button>

            {openSection === key && (
              <div className="cms-section-body">
                {key === 'hero' && renderHeroForm(editData.hero || {}, updateField)}
                {key === 'about' && renderAboutForm(editData.about || {}, updateField, updateArrayItem, addArrayItem, removeArrayItem, trackUpload)}
                {key === 'gallery' && renderGalleryForm(editData.gallery || {}, updateField, updateArrayItem, addArrayItem, removeArrayItem, moveArrayItem, trackUpload)}
                {key === 'contact' && renderContactForm(editData.contact || {}, updateField)}
                {key === 'footer' && renderFooterForm(editData.footer || {}, updateField, updateNestedField)}

                <div className="cms-section-actions">
                  <button
                    className="admin-btn admin-btn-ghost"
                    onClick={() => {
                      cleanupStagedImages()
                      setEditData((prev) => ({
                        ...prev,
                        [key]: JSON.parse(JSON.stringify(config[key])),
                      }))
                      addToast('Đã hoàn tác các thay đổi chưa lưu', 'success')
                    }}
                    disabled={!hasChanges(key)}
                  >
                    Hoàn tác
                  </button>
                  <button
                    className="admin-btn admin-btn-primary"
                    onClick={() => handleSave(key)}
                    disabled={!hasChanges(key) || saving[key]}
                  >
                    {saving[key] ? 'Đang lưu...' : '💾 Lưu thay đổi'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---- Section Renderers ---- */

function Field({ label, value, onChange, type = 'text', rows, onUploadSuccess }) {
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('image', file)

    try {
      const { authFetch } = await import('../../utils/authFetch.js')
      const res = await authFetch('/api/upload', { method: 'POST', body: formData })
      if (res.ok) {
        const data = await res.json()
        onChange(data.url)
        if (onUploadSuccess) onUploadSuccess(data.url)
      } else {
        alert('Lỗi tải ảnh')
      }
    } catch (e) {
      alert('Lỗi kết nối khi tải ảnh')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Kiểm tra thời lượng video (tối đa 5 phút)
    const duration = await new Promise((resolve) => {
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src)
        resolve(video.duration)
      }
      video.onerror = () => resolve(0)
      video.src = URL.createObjectURL(file)
    })

    if (duration > 300) {
      alert(`Video dài ${Math.round(duration / 60)} phút. Tối đa cho phép là 5 phút.`)
      e.target.value = ''
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('video', file)

    try {
      const { authFetch } = await import('../../utils/authFetch.js')
      const res = await authFetch('/api/upload/video', { method: 'POST', body: formData })
      if (res.ok) {
        const data = await res.json()
        onChange(data.url)
        if (onUploadSuccess) onUploadSuccess(data.url)
      } else {
        alert('Lỗi tải video')
      }
    } catch (e) {
      alert('Lỗi kết nối khi tải video')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="admin-form-group">
      <label>{label}</label>
      {type === 'textarea' ? (
        <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} rows={rows || 3} />
      ) : type === 'image' ? (
        <div style={{ display: 'flex', gap: '8px' }}>
          <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} style={{ flex: 1 }} />
          <label className="admin-btn admin-btn-secondary" style={{ cursor: 'pointer', margin: 0, display: 'flex', alignItems: 'center' }}>
            {uploading ? '...' : '📷 Tải ảnh'}
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploading} />
          </label>
        </div>
      ) : type === 'video' ? (
        <div style={{ display: 'flex', gap: '8px' }}>
          <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} style={{ flex: 1 }} />
          <label className="admin-btn admin-btn-secondary" style={{ cursor: 'pointer', margin: 0, display: 'flex', alignItems: 'center' }}>
            {uploading ? '⏳ Đang tải...' : '🎬 Tải video'}
            <input type="file" accept="video/*" onChange={handleVideoUpload} style={{ display: 'none' }} disabled={uploading} />
          </label>
        </div>
      ) : (
        <input type={type} value={value || ''} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  )
}

function renderHeroForm(data, updateField) {
  return (
    <div className="cms-form">
      <Field label="Badge (trạng thái)" value={data.badge} onChange={(v) => updateField('hero', 'badge', v)} />
      <div className="admin-form-grid">
        <Field label="Tiêu đề dòng 1" value={data.title} onChange={(v) => updateField('hero', 'title', v)} />
        <Field label="Tiêu đề nổi bật" value={data.titleAccent} onChange={(v) => updateField('hero', 'titleAccent', v)} />
      </div>
      <Field label="Mô tả" value={data.description} onChange={(v) => updateField('hero', 'description', v)} type="textarea" rows={3} />
      <div className="admin-form-grid">
        <Field label="Nút CTA 1 (Thực đơn)" value={data.ctaMenu} onChange={(v) => updateField('hero', 'ctaMenu', v)} />
        <Field label="Nút CTA 2 (Đặt bàn)" value={data.ctaReserve} onChange={(v) => updateField('hero', 'ctaReserve', v)} />
      </div>
    </div>
  )
}

function renderAboutForm(data, updateField, updateArrayItem, addArrayItem, removeArrayItem, trackUpload) {
  const features = data.features || []
  return (
    <div className="cms-form">
      <Field label="Eyebrow text" value={data.eyebrow} onChange={(v) => updateField('about', 'eyebrow', v)} />
      <div className="admin-form-grid">
        <Field label="Tiêu đề dòng 1" value={data.title} onChange={(v) => updateField('about', 'title', v)} />
        <Field label="Tiêu đề dòng 2" value={data.titleLine2} onChange={(v) => updateField('about', 'titleLine2', v)} />
      </div>
      <Field label="Đoạn văn 1" value={data.paragraph1} onChange={(v) => updateField('about', 'paragraph1', v)} type="textarea" rows={3} />
      <Field label="Đoạn văn 2" value={data.paragraph2} onChange={(v) => updateField('about', 'paragraph2', v)} type="textarea" rows={3} />
      <Field label="URL Hình ảnh" value={data.image} onChange={(v) => updateField('about', 'image', v)} type="image" onUploadSuccess={trackUpload} />
      {data.image && <div className="admin-image-preview"><img src={data.image} alt="Preview" /></div>}
      <div className="admin-form-grid">
        <Field label="Số nổi bật" value={data.floatingNumber} onChange={(v) => updateField('about', 'floatingNumber', v)} />
        <Field label="Nhãn số nổi bật" value={data.floatingLabel} onChange={(v) => updateField('about', 'floatingLabel', v)} />
      </div>
      <Field label="Nút CTA" value={data.cta} onChange={(v) => updateField('about', 'cta', v)} />

      <div className="cms-array-section">
        <div className="cms-array-header">
          <h4>Đặc điểm nổi bật ({features.length})</h4>
          <button className="admin-btn admin-btn-xs admin-btn-primary" onClick={() => addArrayItem('about', 'features', { icon: '⭐', title: '', desc: '' })}>
            + Thêm
          </button>
        </div>
        {features.map((f, i) => (
          <div key={i} className="cms-array-item">
            <div className="cms-array-item-grid">
              <Field label="Icon" value={f.icon} onChange={(v) => updateArrayItem('about', 'features', i, 'icon', v)} />
              <Field label="Tiêu đề" value={f.title} onChange={(v) => updateArrayItem('about', 'features', i, 'title', v)} />
              <Field label="Mô tả" value={f.desc} onChange={(v) => updateArrayItem('about', 'features', i, 'desc', v)} />
            </div>
            <button className="admin-btn-icon delete" onClick={() => removeArrayItem('about', 'features', i)}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function renderGalleryForm(data, updateField, updateArrayItem, addArrayItem, removeArrayItem, moveArrayItem, trackUpload) {
  const items = data.images || []
  const stats = data.stats || []

  const isVideo = (url) => {
    if (!url) return false
    const lower = url.toLowerCase()
    return lower.includes('/video/upload/') || ['.mp4', '.webm', '.ogg', '.mov'].some(ext => lower.includes(ext))
  }

  return (
    <div className="cms-form">
      <Field label="Tiêu đề" value={data.title} onChange={(v) => updateField('gallery', 'title', v)} />
      <Field label="Phụ đề" value={data.subtitle} onChange={(v) => updateField('gallery', 'subtitle', v)} type="textarea" rows={2} />

      <div className="cms-array-section">
        <div className="cms-array-header">
          <h4>Hình ảnh & Video ({items.length})</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="admin-btn admin-btn-xs admin-btn-primary" onClick={() => addArrayItem('gallery', 'images', { src: '', label: '' })}>
              + Thêm ảnh
            </button>
            <button className="admin-btn admin-btn-xs admin-btn-secondary" onClick={() => addArrayItem('gallery', 'images', { src: '', label: '', type: 'video' })}>
              + Thêm video
            </button>
          </div>
        </div>
        {items.map((item, i) => (
          <div key={i} className="cms-array-item">
            <div className="cms-array-item-grid">
              {item.type === 'video' || isVideo(item.src) ? (
                <Field label="URL / Tải video" value={item.src} onChange={(v) => updateArrayItem('gallery', 'images', i, 'src', v)} type="video" onUploadSuccess={trackUpload} />
              ) : (
                <Field label="URL / Tải ảnh" value={item.src} onChange={(v) => updateArrayItem('gallery', 'images', i, 'src', v)} type="image" onUploadSuccess={trackUpload} />
              )}
              <Field label="Nhãn hiển thị (Label)" value={item.label} onChange={(v) => updateArrayItem('gallery', 'images', i, 'label', v)} />
              <Field label="Văn bản Alt SEO" value={item.altText} onChange={(v) => updateArrayItem('gallery', 'images', i, 'altText', v)} />
            </div>
            {item.src && (
              <div className="admin-image-preview small">
                {isVideo(item.src) ? (
                  <video src={item.src} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px' }} muted />
                ) : (
                  <img src={item.src} alt={item.label} />
                )}
              </div>
            )}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button type="button" className="admin-btn-icon" disabled={i === 0} onClick={() => moveArrayItem('gallery', 'images', i, 'up')} title="Lên trên">
                ⬆️
              </button>
              <button type="button" className="admin-btn-icon" disabled={i === items.length - 1} onClick={() => moveArrayItem('gallery', 'images', i, 'down')} title="Xuống dưới">
                ⬇️
              </button>
              <button type="button" className="admin-btn-icon delete" onClick={() => removeArrayItem('gallery', 'images', i)} title="Xóa ảnh">
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cms-array-section">
        <div className="cms-array-header">
          <h4>Số liệu thống kê ({stats.length})</h4>
          <button className="admin-btn admin-btn-xs admin-btn-primary" onClick={() => addArrayItem('gallery', 'stats', { number: '', label: '' })}>
            + Thêm
          </button>
        </div>
        {stats.map((s, i) => (
          <div key={i} className="cms-array-item">
            <div className="cms-array-item-grid">
              <Field label="Số" value={s.number} onChange={(v) => updateArrayItem('gallery', 'stats', i, 'number', v)} />
              <Field label="Nhãn" value={s.label} onChange={(v) => updateArrayItem('gallery', 'stats', i, 'label', v)} />
            </div>
            <button className="admin-btn-icon delete" onClick={() => removeArrayItem('gallery', 'stats', i)}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function renderContactForm(data, updateField) {
  return (
    <div className="cms-form">
      <Field label="Địa chỉ" value={data.address} onChange={(v) => updateField('contact', 'address', v)} type="textarea" rows={3} />
      <div className="admin-form-grid">
        <Field label="Link Google Map (mở tab mới)" value={data.mapUrl} onChange={(v) => updateField('contact', 'mapUrl', v)} />
        <Field label="Link iframe bản đồ (embed SRC)" value={data.mapEmbed} onChange={(v) => updateField('contact', 'mapEmbed', v)} />
      </div>
      <div className="admin-form-grid">
        <Field label="Số điện thoại" value={data.phone} onChange={(v) => updateField('contact', 'phone', v)} />
        <Field label="Email" value={data.email} onChange={(v) => updateField('contact', 'email', v)} />
      </div>
      <Field label="Giờ mở cửa" value={data.hours} onChange={(v) => updateField('contact', 'hours', v)} />
    </div>
  )
}

function renderFooterForm(data, updateField, updateNestedField) {
  return (
    <div className="cms-form">
      <Field label="Mô tả thương hiệu" value={data.brandDesc} onChange={(v) => updateField('footer', 'brandDesc', v)} type="textarea" rows={3} />
      <div className="admin-form-grid">
        <Field label="Ca sáng (Cả tuần: T2-CN)" value={data.morningHours} onChange={(v) => updateField('footer', 'morningHours', v)} />
        <Field label="Ca chiều (Cả tuần: T2-CN)" value={data.eveningHours} onChange={(v) => updateField('footer', 'eveningHours', v)} />
      </div>
      <h4 style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '16px 0 8px' }}>Mạng xã hội</h4>
      <div className="admin-form-grid">
        <Field label="Facebook URL" value={data.socials?.facebook} onChange={(v) => updateNestedField('footer', 'socials', 'facebook', v)} />
        <Field label="Instagram URL" value={data.socials?.instagram} onChange={(v) => updateNestedField('footer', 'socials', 'instagram', v)} />
        <Field label="TikTok URL" value={data.socials?.tiktok} onChange={(v) => updateNestedField('footer', 'socials', 'tiktok', v)} />
        <Field label="YouTube URL" value={data.socials?.youtube} onChange={(v) => updateNestedField('footer', 'socials', 'youtube', v)} />
      </div>
    </div>
  )
}
