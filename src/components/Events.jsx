import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, cardVariant, viewportConfig } from '../animations'

const IconLocation = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
)
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
)

const events = [
  { color: 'teal', type: 'Jornada', month: 'OCT', day: '2026', title: 'Pesquisa Neonatal y Patología Adrenal Infantil', desc: 'Actualización en Hiperplasia suprarrenal congénita no clásica y adrenarquia precoz.' },
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
          {events.map(e => <EventCard key={e.title} {...e} />)}
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
