import { useState, useEffect } from 'react'
import { ref, push, onValue, remove, update } from 'firebase/database'
import { db } from '../../firebase'

const empty = { type: '', month: '', day: '', title: '', desc: '', color: 'teal' }
const colors = [
  { value: 'teal', label: 'Verde azulado' },
  { value: 'blue', label: 'Azul' },
  { value: 'indigo', label: 'Índigo' },
  { value: 'purple', label: 'Violeta' },
]

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

export default function EventsManager() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    return onValue(ref(db, 'events'), snap => {
      if (snap.exists()) {
        const data = Object.entries(snap.val()).map(([id, val]) => ({ id, ...val }))
        setItems(data.reverse())
      } else {
        setItems([])
      }
    })
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    try {
      const data = { ...form, createdAt: Date.now() }
      if (editing) {
        await update(ref(db, `events/${editing}`), data)
        setMsg('Evento actualizado correctamente.')
      } else {
        await push(ref(db, 'events'), data)
        setMsg('Evento publicado correctamente.')
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
    setForm({ type: item.type, month: item.month, day: item.day, title: item.title, desc: item.desc, color: item.color || 'teal' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleDelete(id) {
    if (!confirm('¿Eliminar este evento?')) return
    await remove(ref(db, `events/${id}`))
  }

  return (
    <div className="admin-manager">
      <p className="admin-section-title">{editing ? 'Editar evento' : 'Nuevo evento'}</p>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-row">
          <div className="admin-field">
            <label>Tipo de evento</label>
            <input
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              placeholder="Ej: Jornada, Curso, Congreso"
              required
            />
          </div>
          <div className="admin-field">
            <label>Mes</label>
            <input
              value={form.month}
              onChange={e => setForm({ ...form, month: e.target.value.toUpperCase() })}
              placeholder="OCT"
              required
              maxLength={3}
            />
          </div>
          <div className="admin-field">
            <label>Día / Año</label>
            <input
              value={form.day}
              onChange={e => setForm({ ...form, day: e.target.value })}
              placeholder="15 ó 2026"
              required
            />
          </div>
        </div>

        <div className="admin-field">
          <label>Título del evento</label>
          <input
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Nombre completo del evento"
            required
          />
        </div>
        <div className="admin-field">
          <label>Descripción</label>
          <textarea
            rows={3}
            value={form.desc}
            onChange={e => setForm({ ...form, desc: e.target.value })}
            placeholder="Descripción breve del evento..."
            required
          />
        </div>
        <div className="admin-field">
          <label>Color de la tarjeta</label>
          <select value={form.color} onChange={e => setForm({ ...form, color: e.target.value })}>
            {colors.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>

        {msg && <p className={msg.startsWith('Error') ? 'admin-error' : 'admin-msg'}>{msg}</p>}

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn-primary" disabled={loading}>
            {loading ? 'Guardando...' : editing ? 'Actualizar evento' : 'Publicar evento'}
          </button>
          {editing && (
            <button type="button" className="admin-btn-secondary" onClick={() => { setEditing(null); setForm(empty) }}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <p className="admin-section-title">Eventos publicados</p>
      <div className="admin-list">
        {items.length === 0 && <p className="admin-empty">Todavía no hay eventos cargados.</p>}
        {items.map(item => (
          <div className="admin-list-item" key={item.id}>
            <div className="admin-list-info">
              <strong>{item.month} {item.day} — {item.title}</strong>
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
