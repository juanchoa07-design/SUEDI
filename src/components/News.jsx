import { motion } from 'framer-motion'
import { fadeUp, slideLeft, slideRight, staggerContainer, cardVariant, viewportConfig } from '../animations'

const newsSmall = [
  { tag: 'Congreso', date: '10 abr 2025', title: 'Abierta la convocatoria de resúmenes para el XII Congreso', desc: 'Plazo límite de envío: 30 de mayo de 2025. Modalidades oral y póster.' },
  { tag: 'Formación', date: '2 abr 2025', title: 'Becas de capacitación para residentes 2025', desc: 'SUEDI otorgará 5 becas para participación en el Congreso de SLEP en Buenos Aires.' },
  { tag: 'Institucional', date: '20 mar 2025', title: 'Renovación de la comisión directiva', desc: 'Se realizaron las elecciones para la nueva comisión directiva 2025–2027.' },
]

export default function News() {
  return (
    <section className="section" id="noticias">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportConfig}
        >
          <span className="section-tag">Actualidad</span>
          <h2>Noticias</h2>
          <p className="section-desc">Últimas novedades en endocrinología y diabetes pediátrica.</p>
        </motion.div>

        <div className="news-grid">
          <motion.article
            className="news-card news-card-featured"
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,42,92,.12)' }}
          >
            <div className="news-card-image">
              <div className="news-placeholder news-placeholder-lg">
                <svg viewBox="0 0 80 60" fill="none"><rect width="80" height="60" rx="4" fill="#c2d8f4"/><circle cx="28" cy="24" r="10" fill="#7ab3e0"/><path d="M0 45 Q20 35 40 45 Q60 55 80 45 L80 60 L0 60 Z" fill="#7ab3e0"/></svg>
              </div>
            </div>
            <div className="news-card-body">
              <span className="news-tag">Investigación</span>
              <span className="news-date">18 abr 2025</span>
              <h3>Nueva guía nacional de manejo de diabetes tipo 1 en pediatría</h3>
              <p>SUEDI presentó la actualización de las guías clínicas nacionales, incorporando las últimas evidencias sobre tecnología de diabetes y objetivos de control glucémico en niños y adolescentes.</p>
              <a href="#" className="news-link">Leer más →</a>
            </div>
          </motion.article>

          <motion.div
            className="news-side"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
          >
            {newsSmall.map(n => (
              <motion.article
                className="news-small"
                key={n.title}
                variants={cardVariant}
                whileHover={{ x: 6, boxShadow: '0 8px 24px rgba(0,42,92,.10)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="news-tag">{n.tag}</span>
                <span className="news-date">{n.date}</span>
                <h4>{n.title}</h4>
                <p>{n.desc}</p>
                <a href="#" className="news-link">Leer más →</a>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
