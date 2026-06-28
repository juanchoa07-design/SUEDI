import { motion } from 'framer-motion'
import { fadeUp, slideLeft, slideRight, staggerContainer, cardVariant, viewportConfig } from '../animations'

const base = import.meta.env.BASE_URL

const newsSmall = [
  { tag: 'Congreso', date: '10 abr 2025', title: 'Abierta la convocatoria de resúmenes para el XII Congreso', desc: 'Plazo límite de envío: 30 de mayo de 2025. Modalidades oral y póster.', img: `${base}noticias1.jpeg` },
  { tag: 'Formación', date: '2 abr 2025', title: 'Becas de capacitación para residentes 2025', desc: 'SUEDI otorgará 5 becas para participación en el Congreso de SLEP en Buenos Aires.', img: `${base}noticias3.png` },
  { tag: 'Institucional', date: '20 mar 2025', title: 'Renovación de la comisión directiva', desc: 'Se realizaron las elecciones para la nueva comisión directiva 2025–2027.', img: `${base}noticias4.jpeg` },
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
              <img src={`${base}noticias.jpeg`} alt="Noticia destacada" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <div className="news-small-image">
                  <img src={n.img} alt={n.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
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
