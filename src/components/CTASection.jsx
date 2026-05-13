import { motion } from 'framer-motion'
import { fadeUp, viewportConfig } from '../animations'

export default function CTASection() {
  return (
    <section className="section-cta" id="socios">
      <div className="container">
        <motion.div
          className="cta-content"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportConfig}
        >
          <h2>Formá parte de SUEDI</h2>
          <p>
            Uní a más de 150 médicos especialistas que trabajan juntos para mejorar la salud endócrina
            infantil en Uruguay. Como socio accedés a eventos con descuento, recursos exclusivos y la
            red de colegas más importante del país en la especialidad.
          </p>
          <motion.a
            href="#contacto"
            className="btn btn-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Solicitar membresía
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
