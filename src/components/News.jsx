import { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, slideLeft, viewportConfig } from '../animations'
import { db } from '../firebase'

const base = import.meta.env.BASE_URL

const staticNews = [
  { id: 'slep', title: 'SLEP 2026', desc: 'El principal encuentro latinoamericano de endocrinología pediátrica, dedicado a la actualización científica, la innovación y el intercambio de experiencias entre especialistas de la región.', img: `${base}noticias.jpeg`, link: 'https://slep2026.com/' },
  { id: 'cholead', title: 'CHOLEAD – Curso Internacional de Obesidad', desc: 'Curso de actualización enfocado en el abordaje integral de la obesidad, con revisión de la evidencia más reciente, estrategias terapéuticas y discusión de casos clínicos.', img: `${base}noticias1.jpeg` },
  { id: 'ispad', title: 'ISPAD 2026', desc: 'Congreso internacional de referencia en diabetes pediátrica y del adolescente, que reúne a expertos de todo el mundo para presentar los últimos avances en investigación, tecnología y tratamiento.', img: `${base}noticias3.png`, link: 'https://share.google/J6pzm6K5JK8EDyNOR' },
  { id: 'espe', title: '64th ESPE Annual Meeting', desc: 'El congreso europeo más importante en endocrinología pediátrica, donde se presentan los avances científicos y clínicos más relevantes, promoviendo la colaboración internacional y la excelencia en la atención de niños y adolescentes.', img: `${base}noticias4.jpeg`, link: 'https://share.google/Ebm4HW5mufG1SDQuV' },
]

function NewsModal({ item, onClose }) {
  // Cerrar con Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        className="news-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="news-modal"
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          onClick={e => e.stopPropagation()}
        >
          {item.img && (
            <div className="news-modal-image">
              <img src={item.img} alt={item.title} />
            </div>
          )}
          <div className="news-modal-body">
            <button className="news-modal-close" onClick={onClose} aria-label="Cerrar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <span className="news-featured-tag" style={{ marginBottom: 12 }}>Noticia</span>
            <h3 className="news-modal-title">{item.title}</h3>
            <p className="news-modal-desc">{item.desc}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function FeaturedCard({ item, onOpen }) {
  return (
    <motion.article
      className="news-featured"
      variants={slideLeft}
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,42,92,.12)' }}
    >
      {item.img && (
        <div className="news-featured-image">
          <img src={item.img} alt={item.title} />
        </div>
      )}
      <div className="news-featured-body">
        <span className="news-featured-tag">Destacado</span>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
        {item.link
          ? <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-block', fontSize: '13px', padding: '9px 20px' }}>Ver sitio oficial →</a>
          : <button className="news-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={() => onOpen(item)}>Leer más →</button>
        }
      </div>
    </motion.article>
  )
}

function SmallCard({ item, onOpen }) {
  return (
    <motion.article
      className="news-small"
      whileHover={{ y: -4, boxShadow: '0 10px 28px rgba(0,42,92,.10)' }}
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
        : <button className="news-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '13.5px' }} onClick={() => onOpen(item)}>Leer más →</button>
      }
    </motion.article>
  )
}

export default function News() {
  const [dbNews, setDbNews] = useState([])
  const [modalItem, setModalItem] = useState(null)

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

        <div className="news-layout">
          {featured && <FeaturedCard item={featured} onOpen={setModalItem} />}
          {rest.length > 0 && (
            <div className="news-bottom-grid">
              {rest.map(n => <SmallCard key={n.id} item={n} onOpen={setModalItem} />)}
            </div>
          )}
        </div>
      </div>

      {modalItem && <NewsModal item={modalItem} onClose={() => setModalItem(null)} />}
    </section>
  )
}
