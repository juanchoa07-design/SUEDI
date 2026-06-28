import { motion } from 'framer-motion'
import { fadeUp, slideLeft, slideRight, viewportConfig } from '../animations'

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
              una sociedad científica multidisciplinaria que reúne a profesionales de la salud dedicados
              a la prevención, diagnóstico, tratamiento, investigación y educación en las enfermedades
              endocrinas, metabólicas y la diabetes de niños y adolescentes.
            </p>
            <p>
              Promovemos la excelencia asistencial, la formación continua, la investigación científica
              y el trabajo en equipo, con el compromiso de mejorar la salud y la calidad de vida de la
              población pediátrica.
            </p>
            <motion.div variants={fadeUp}>
              <h3 className="about-subtitle">¿Qué es la Endocrinología y Diabetología Pediátrica?</h3>
              <p>
                La Endocrinología y Diabetología Pediátrica es la especialidad dedicada a la prevención,
                diagnóstico, tratamiento y seguimiento de las enfermedades endocrinas, metabólicas y la
                diabetes en la infancia y la adolescencia. Abarca patologías como la diabetes, los
                trastornos del crecimiento y del desarrollo puberal, las enfermedades de la tiroides, la
                obesidad, las alteraciones de las glándulas suprarrenales, hipófisis y gónadas, los
                trastornos del metabolismo óseo y del calcio, entre otras, brindando una atención integral
                basada en la mejor evidencia científica.
              </p>
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
