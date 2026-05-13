import { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      e.target.reset()
      setTimeout(() => setSubmitted(false), 5000)
    }, 1200)
  }

  return (
    <section className="section" id="contacto">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Contacto</span>
          <h2>Contactanos</h2>
          <p className="section-desc">Completá el formulario y nos ponemos en contacto a la brevedad.</p>
        </div>
        <div className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre y apellido *</label>
                <input type="text" id="nombre" name="nombre" placeholder="Dr. Juan García" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo electrónico *</label>
                <input type="email" id="email" name="email" placeholder="correo@ejemplo.com" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="asunto">Asunto *</label>
              <select id="asunto" name="asunto" required>
                <option value="">Seleccioná un asunto</option>
                <option value="inscripcion">Inscripción a evento</option>
                <option value="membresia">Solicitud de membresía</option>
                <option value="propuesta">Propuesta de evento</option>
                <option value="publicacion">Publicación / recursos</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje *</label>
              <textarea id="mensaje" name="mensaje" rows="5" placeholder="Escribí tu consulta aquí..." required />
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar mensaje'}
            </button>
            {submitted && (
              <div className="form-success show">
                ¡Mensaje enviado correctamente! Te contactaremos pronto.
              </div>
            )}
          </form>

          <div className="contact-info">
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <strong>Dirección</strong>
                <p>Hospital Pereira Rossell, Bulevar Artigas 1550, Montevideo, Uruguay</p>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <strong>Correo electrónico</strong>
                <p>suedi.endoped.uy@gmail.com</p>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.6C1.6 3.56 2.32 2.67 3.34 2.5h3a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l1.77-1.77a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <strong>Teléfono</strong>
                <p>+598 2 XXX XXXX</p>
              </div>
            </div>
            <div className="contact-social">
              <p>Seguinos en redes</p>
              <div className="social-links">
                <a href="#" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://www.instagram.com/suediuy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                </a>
                <a href="#" aria-label="Twitter/X">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
