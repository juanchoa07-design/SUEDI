import { motion } from 'framer-motion'
import { fadeUp, slideLeft, slideRight, staggerContainer, viewportConfig } from '../animations'

const values = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: 'Excelencia clínica',
    desc: 'Fomentamos los más altos estándares en la práctica médica pediátrica.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
    title: 'Formación continua',
    desc: 'Apoyamos la capacitación permanente de médicos y especialistas.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'Comunidad médica',
    desc: 'Creamos redes de colaboración entre especialistas de todo el país.',
  },
]

export default function About() {
  return (
    <section className="section" id="quienes-somos">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportConfig}
        >
          <span className="section-tag">Institucional</span>
          <h2>Quiénes somos</h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-text"
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
          >
            <p>
              La <strong>Sociedad Uruguaya de Endocrinología y Diabetes Infantil (SUEDI)</strong> es
              una institución médico-científica sin fines de lucro, fundada con el propósito de reunir
              a los profesionales de la salud especializados en el diagnóstico, tratamiento e
              investigación de las patologías endócrinas y metabólicas en la población pediátrica.
            </p>
            <p>
              Trabajamos de manera continua para mejorar la calidad de vida de los niños y adolescentes
              uruguayos que padecen enfermedades como diabetes tipo 1, trastornos del crecimiento,
              alteraciones tiroideas y otras patologías endócrinas.
            </p>
            <motion.div
              className="about-values"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportConfig}
            >
              {values.map(v => (
                <motion.div
                  className="value-item"
                  key={v.title}
                  variants={fadeUp}
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="value-icon">{v.icon}</div>
                  <div>
                    <strong>{v.title}</strong>
                    <p>{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="about-image"
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
          >
            <div className="about-image-card">
              <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="220" rx="16" fill="#e8f1fc"/>
                <circle cx="100" cy="75" r="45" fill="#c2d8f4"/>
                <path d="M60 75 h80 M100 35 v80" stroke="#005a9e" strokeWidth="6" strokeLinecap="round"/>
                <path d="M55 140 Q100 120 145 140 L155 200 Q100 220 45 200 Z" fill="#c2d8f4"/>
                <circle cx="100" cy="75" r="45" stroke="#005a9e" strokeWidth="3" fill="none"/>
              </svg>
              <div className="about-image-label">
                <strong>SUEDI</strong>
                <span>Comprometidos con la salud infantil</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
