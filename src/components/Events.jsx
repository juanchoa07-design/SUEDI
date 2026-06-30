import { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, cardVariant, viewportConfig } from '../animations'
import { db } from '../firebase'

const staticEvents = [
  { id: 'pesquisa', color: 'teal', type: 'Jornada', month: 'OCT', day: '2026', title: 'Pesquisa Neonatal y Patología Adrenal Infantil', desc: 'Actualización en Hiperplasia suprarrenal congénita no clásica y adrenarquia precoz.' },
]

function EventCard({ color, type, month, day, title, desc }) {
  return (
    <motion.article
      className="event-card"
      variants={cardVariant}
      whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,42,92,.15)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="event-card-header" data-color={color}>
        <span className="event-card-type">{type}</span>
        <div className="event-card-date">
          <span className="event-month">{month}</span>
          <span className="event-day">{day}</span>
        </div>
      </div>
      <div className="event-card-body">
        <h4>{title}</h4>
        <p>{desc}</p>
        <span className="event-card-soon">Próximamente — más detalles</span>
      </div>
    </motion.article>
  )
}

export default function Events() {
  const [dbEvents, setDbEvents] = useState([])

  useEffect(() => {
    return onValue(ref(db, 'events'), snap => {
      if (snap.exists()) {
        const data = Object.entries(snap.val()).map(([id, val]) => ({ id, ...val }))
        setDbEvents(data.reverse())
      }
    }, () => {})
  }, [])

  const allEvents = [...dbEvents, ...staticEvents]

  return (
    <section className="section section-alt" id="eventos">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportConfig}
        >
          <span className="section-tag">Agenda</span>
          <h2>Próximos Eventos</h2>
          <p className="section-desc">
            Participá en nuestras jornadas, congresos y cursos de formación dirigidos a profesionales
            de la salud especializados en endocrinología y diabetes pediátrica.
          </p>
        </motion.div>

        <h3 className="events-subtitle">Nuestros Eventos</h3>
        <motion.div
          className="events-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportConfig}
        >
          {allEvents.map(e => <EventCard key={e.id} {...e} />)}
          <motion.article
            className="event-card event-card-cta"
            variants={cardVariant}
            whileHover={{ y: -6 }}
          >
            <div className="event-cta-content">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              <h4>¿Querés proponer un evento?</h4>
              <p>Si sos socio SUEDI podés enviar una propuesta de actividad científica para ser evaluada por la comisión directiva.</p>
              <a href="#contacto" className="btn btn-primary">Enviar propuesta</a>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  )
}
