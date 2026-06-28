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
                diabetes en la infancia y la adolescencia.
              </p>
              <p>
                Abarca patologías como la diabetes, los trastornos del crecimiento y del desarrollo
                puberal, las enfermedades de la tiroides, la obesidad, las alteraciones de las glándulas
                suprarrenales, hipófisis y gónadas, los trastornos del metabolismo óseo y del calcio,
                entre otras, brindando una atención integral basada en la mejor evidencia científica.
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
              <img
                src={`${import.meta.env.BASE_URL}carita-suedi.png`}
                alt="Mascota SUEDI"
                className="about-mascot"
              />
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
