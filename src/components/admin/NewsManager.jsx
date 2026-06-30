import { useState, useEffect, useRef } from 'react'
import { ref, push, onValue, remove, update } from 'firebase/database'
import { db } from '../../firebase'

const empty = { title: '', desc: '', link: '', img: '' }

const IconEdit = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)

const IconTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
)

const IconUpload = () => (
  <svg className="admin-upload-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
)

function compressImage(file, maxWidth = 1000) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = e => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let { width, height } = img
        if (width > maxWidth) {
          height = Math.round(height * maxWidth / width)
          width = maxWidth
        }
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d').drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.82))
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

export default function NewsManager() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [dragover, setDragover] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    return onValue(ref(db, 'news'), snap => {
      if (snap.exists()) {
        const data = Object.entries(snap.val()).map(([id, val]) => ({ id, ...val }))
        setItems(data.reverse())
      } else {
        setItems([])
      }
    })
  }, [])

  async function handleImageFile(file) {
    if (!file || !file.type.startsWith('image/')) return
    const b64 = await compressImage(file)
    setForm(f => ({ ...f, img: b64 }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    try {
      const data = { ...form, createdAt: Date.now() }
      if (editing) {
        await update(ref(db, `news/${editing}`), data)
        setMsg('Noticia actualizada correctamente.')
      } else {
        await push(ref(db, 'news'), data)
        setMsg('Noticia publicada correctamente.')
      }
      setForm(empty)
      setEditing(null)
    } catch (err) {
      setMsg('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  function startEdit(item) {
    setEditing(item.id)
    setForm({ title: item.title, desc: item.desc, link: item.link || '', img: item.img || '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleDelete(id) {
    if (!confirm('¿Eliminar esta noticia?')) return
    await remove(ref(db, `news/${id}`))
  }

  return (
    <div className="admin-manager">
      <p className="admin-section-title">{editing ? 'Editar noticia' : 'Nueva noticia'}</p>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-field">
          <label>Título</label>
          <input
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Título de la noticia"
            required
          />
        </div>
        <div className="admin-field">
          <label>Descripción</label>
          <textarea
            rows={3}
            value={form.desc}
            onChange={e => setForm({ ...form, desc: e.target.value })}
            placeholder="Descripción breve de la noticia..."
            required
          />
        </div>
        <div className="admin-field">
          <label>Enlace externo (opcional)</label>
          <input
            value={form.link}
            onChange={e => setForm({ ...form, link: e.target.value })}
            placeholder="https://..."
          />
        </div>
        <div className="admin-field">
          <label>Imagen</label>
          {form.img ? (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div className="admin-upload-preview" style={{ margin: 0 }}>
                <img src={form.img} alt="Vista previa" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  type="button"
                  className="admin-btn-secondary"
                  style={{ fontSize: 13, padding: '7px 14px' }}
                  onClick={() => fileInputRef.current?.click()}
                >Cambiar imagen</button>
                <button
                  type="button"
                  className="admin-btn-icon admin-btn-delete"
                  onClick={() => setForm(f => ({ ...f, img: '' }))}
                >× Quitar</button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={e => handleImageFile(e.target.files[0])}
              />
            </div>
          ) : (
            <div
              className={`admin-upload-zone${dragover ? ' dragover' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragover(true) }}
              onDragLeave={() => setDragover(false)}
              onDrop={e => { e.preventDefault(); setDragover(false); handleImageFile(e.dataTransfer.files[0]) }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={e => handleImageFile(e.target.files[0])}
              />
              <IconUpload />
              <p className="admin-upload-text">Arrastrá una imagen o hacé clic para subir</p>
              <p className="admin-upload-hint">JPG, PNG — se comprime automáticamente</p>
            </div>
          )}
        </div>

        {msg && <p className={msg.startsWith('Error') ? 'admin-error' : 'admin-msg'}>{msg}</p>}

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn-primary" disabled={loading}>
            {loading ? 'Guardando...' : editing ? 'Actualizar noticia' : 'Publicar noticia'}
          </button>
          {editing && (
            <button type="button" className="admin-btn-secondary" onClick={() => { setEditing(null); setForm(empty) }}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <p className="admin-section-title">Noticias publicadas</p>
      <div className="admin-list">
        {items.length === 0 && <p className="admin-empty">Todavía no hay noticias cargadas.</p>}
        {items.map(item => (
          <div className="admin-list-item" key={item.id}>
            {item.img && <img src={item.img} alt="" />}
            <div className="admin-list-info">
              <strong>{item.title}</strong>
              <p>{item.desc}</p>
            </div>
            <div className="admin-list-actions">
              <button className="admin-btn-icon admin-btn-edit" onClick={() => startEdit(item)}>
                <IconEdit /> Editar
              </button>
              <button className="admin-btn-icon admin-btn-delete" onClick={() => handleDelete(item.id)}>
                <IconTrash /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
