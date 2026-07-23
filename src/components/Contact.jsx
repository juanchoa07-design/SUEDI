import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, slideLeft, slideRight, viewportConfig } from '../animations'

const WEB3FORMS_KEY = 'b8f41f72-bf43-485f-bb52-39c3ce80380c'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const formData = new FormData(e.target)
    formData.append('access_key', WEB3FORMS_KEY)
    formData.append('subject', `Contacto SUEDI — ${formData.get('asunto')}`)
    formData.append('from_name', 'Formulario SUEDI')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
        e.target.reset()
        setTimeout(() => setSubmitted(false), 6000)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section" id="contacto">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportConfig}
        >
          <span className="section-tag">Contacto</span>
          <h2>Contactanos</h2>
          <p className="section-desc">Completá el formulario y nos ponemos en contacto a la brevedad.</p>
        </motion.div>

        <div className="contact-grid">
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
          >
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
                <option value="Inscripción a evento">Inscripción a evento</option>
                <option value="Solicitud de membresía">Solicitud de membresía</option>
                <option value="Propuesta de evento">Propuesta de evento</option>
                <option value="Publicación / recursos">Publicación / recursos</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje *</label>
              <textarea id="mensaje" name="mensaje" rows="5" placeholder="Escribí tu consulta aquí..." required />
            </div>
            <motion.button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Enviando...' : 'Enviar mensaje'}
            </motion.button>

            {submitted && (
              <motion.div
                className="form-success show"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✓ ¡Mensaje enviado! Te contactaremos a la brevedad.
              </motion.div>
            )}
            {error && (
              <motion.div
                className="form-error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Hubo un error al enviar. Intentá de nuevo o escribinos directamente a suedi.endoped.uy@gmail.com
              </motion.div>
            )}
          </motion.form>

          <motion.div
            className="contact-info"
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
          >
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
                <motion.a href="https://www.instagram.com/suediuy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
