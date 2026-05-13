import { useState, useEffect } from 'react'
import logo from '/suedi.jpg'

export default function Header() {
  const [navOpen, setNavOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeNav = () => setNavOpen(false)

  return (
    <header
      className="header"
      id="header"
      style={{ boxShadow: scrolled ? '0 4px 24px rgba(0,42,92,.15)' : '0 2px 12px rgba(0,42,92,.10)' }}
    >
      <div className="container header-inner">
        <a href="#inicio" className="logo" onClick={closeNav}>
          <img src={logo} alt="Logo SUEDI" className="logo-img" />
        </a>

        <button
          className="nav-toggle"
          onClick={() => setNavOpen(o => !o)}
          aria-label="Abrir menú"
        >
          <span /><span /><span />
        </button>

        <nav className={`nav${navOpen ? ' open' : ''}`} id="mainNav">
          <ul>
            <li><a href="#inicio" onClick={closeNav}>Inicio</a></li>
            <li><a href="#quienes-somos" onClick={closeNav}>Institucional</a></li>
            <li><a href="#eventos" onClick={closeNav}>Eventos</a></li>
            <li><a href="#noticias" onClick={closeNav}>Noticias</a></li>
            <li><a href="#recursos" onClick={closeNav}>Recursos</a></li>
            <li><a href="#contacto" className="btn-nav" onClick={closeNav}>Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
