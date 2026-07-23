import { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'
import { motion } from 'framer-motion'
import { fadeUp, slideLeft, staggerContainer, cardVariant, viewportConfig } from '../animations'
import { db } from '../firebase'

const base = import.meta.env.BASE_URL

const staticNews = [
  { id: 'slep', title: 'SLEP 2026', desc: 'El principal encuentro latinoamericano de endocrinología pediátrica, dedicado a la actualización científica, la innovación y el intercambio de experiencias entre especialistas de la región.', img: `${base}noticias.jpeg`, link: 'https://slep2026.com/', featured: true },
  { id: 'cholead', title: 'CHOLEAD – Curso Internacional de Obesidad', desc: 'Curso de actualización enfocado en el abordaje integral de la obesidad, con revisión de la evidencia más reciente, estrategias terapéuticas y discusión de casos clínicos.', img: `${base}noticias1.jpeg` },
  { id: 'ispad', title: 'ISPAD 2026', desc: 'Congreso internacional de referencia en diabetes pediátrica y del adolescente, que reúne a expertos de todo el mundo para presentar los últimos avances en investigación, tecnología y tratamiento.', img: `${base}noticias3.png`, link: 'https://share.google/J6pzm6K5JK8EDyNOR' },
  { id: 'espe', title: '64th ESPE Annual Meeting', desc: 'El congreso europeo más importante en endocrinología pediátrica, donde se presentan los avances científicos y clínicos más relevantes, promoviendo la colaboración internacional y la excelencia en la atención de niños y adolescentes.', img: `${base}noticias4.jpeg`, link: 'https://share.google/Ebm4HW5mufG1SDQuV' },
]

function NewsCard({ item, featured }) {
  if (featured) {
    return (
      <motion.article
        className="news-card news-card-featured"
        variants={slideLeft}
        initial="hidden"
        whileInView="show"
        viewport={viewportConfig}
        whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,42,92,.12)' }}
      >
        {item.img && (
          <div className="news-card-image">
            <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
        <div className="news-card-body">
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
          {item.link && (
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-block', fontSize: '13px', padding: '8px 18px' }}>
              Ver sitio oficial →
            </a>
          )}
        </div>
      </motion.article>
    )
  }
  return (
    <motion.article
      className="news-small"
      whileHover={{ x: 6, boxShadow: '0 8px 24px rgba(0,42,92,.10)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {item.img && (
        <div className="news-small-image">
          <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      <h4>{item.title}</h4>
      <p>{item.desc}</p>
      {item.link
        ? <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-block', fontSize: '12px', padding: '6px 14px' }}>Ver sitio oficial →</a>
        : <a href="#" className="news-link">Leer más →</a>
      }
    </motion.article>
  )
}

export default function News() {
  const [dbNews, setDbNews] = useState([])

  useEffect(() => {
    return onValue(ref(db, 'news'), snap => {
      if (snap.exists()) {
        const data = Object.entries(snap.val()).map(([id, val]) => ({ id, ...val }))
        setDbNews(data.reverse())
      }
    }, () => {})
  }, [])

  const allNews = [...dbNews, ...staticNews]
  const featured = allNews[0]
  const rest = allNews.slice(1)

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
          {featured && <NewsCard item={featured} featured />}
          <div className="news-side">
            {rest.map(n => <NewsCard key={n.id} item={n} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
