import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import NewsManager from './NewsManager'
import EventsManager from './EventsManager'

const base = import.meta.env.BASE_URL

const IconNews = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2"/>
    <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>
  </svg>
)

const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
  </svg>
)

const IconLogout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)

export default function AdminPanel({ user }) {
  const [tab, setTab] = useState('news')

  const initial = user.email?.[0]?.toUpperCase() ?? 'A'

  return (
    <div className="admin-panel">
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <img src={`${base}suedi.jpg`} alt="SUEDI" className="admin-sidebar-logo" />
          <div className="admin-sidebar-brand">
            <span className="admin-logo">Panel SUEDI</span>
            <span className="admin-logo-sub">Administración</span>
          </div>
        </div>

        <div className="admin-user-section">
          <div className="admin-user-row">
            <div className="admin-avatar">{initial}</div>
            <span className="admin-user">{user.email}</span>
          </div>
        </div>

        <nav className="admin-nav">
          <p className="admin-nav-label">Contenido</p>
          <button className={tab === 'news' ? 'active' : ''} onClick={() => setTab('news')}>
            <IconNews /> Noticias
          </button>
          <button className={tab === 'events' ? 'active' : ''} onClick={() => setTab('events')}>
            <IconCalendar /> Eventos
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-logout" onClick={() => signOut(auth)}>
            <IconLogout /> Cerrar sesión
          </button>
        </div>
      </div>

      <div className="admin-main">
        <div className="admin-topbar">
          <span className="admin-topbar-title">
            {tab === 'news' ? 'Gestión de Noticias' : 'Gestión de Eventos'}
          </span>
          <span className="admin-topbar-badge">
            {tab === 'news' ? 'Noticias' : 'Eventos'}
          </span>
        </div>

        <div className="admin-content">
          {tab === 'news' ? <NewsManager /> : <EventsManager />}
        </div>
      </div>
    </div>
  )
}
