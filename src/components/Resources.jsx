import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, cardVariant, viewportConfig } from '../animations'

const resources = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>, title: 'Guías Clínicas', desc: 'Protocolos y guías de práctica clínica actualizadas.' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>, title: 'Webinars grabados', desc: 'Acceso a las grabaciones de actividades científicas anteriores.' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>, title: 'Presentaciones', desc: 'Slides y materiales de congresos y jornadas SUEDI.' },
]

export default function Resources() {
  return (
    <section className="section section-alt" id="recursos">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportConfig}
        >
          <span className="section-tag">Materiales</span>
          <h2>Recursos para profesionales</h2>
        </motion.div>

        <motion.div
          className="resources-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportConfig}
        >
          {resources.map(r => (
            <motion.a
              href="#"
              className="resource-card"
              key={r.title}
              variants={cardVariant}
              whileHover={{ y: -6, borderColor: 'var(--blue-500)', boxShadow: '0 12px 32px rgba(0,90,158,.15)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="resource-icon">{r.icon}</div>
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
            </motion.a>
          ))}
          <motion.a
            href="#socios"
            className="resource-card resource-card-cta"
            variants={cardVariant}
            whileHover={{ y: -6 }}
          >
            <div className="resource-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
            </div>
            <h4>Hacete socio</h4>
            <p>Accedé a todos los recursos y beneficios exclusivos para socios SUEDI.</p>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
