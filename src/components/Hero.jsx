import { motion } from 'framer-motion'
import { fadeUp, fadeIn, staggerContainer, viewportConfig } from '../animations'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-bg" />
      <div className="container hero-content">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.p className="hero-tag" variants={fadeIn}>
            Sociedad Uruguaya de Endocrinología y Diabetes Infantil
          </motion.p>
          <motion.h1 variants={fadeUp}>
            Cuidando la salud<br />endocrina de los niños<br /><span>de Uruguay</span>
          </motion.h1>
          <motion.p className="hero-desc" variants={fadeUp}>
            Promovemos la excelencia en la atención médica, la investigación científica y la
            formación continua de especialistas en endocrinología y diabetes pediátrica.
          </motion.p>
          <motion.div className="hero-actions" variants={fadeUp}>
            <motion.a
              href="#eventos"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver próximos eventos
            </motion.a>
            <motion.a
              href="#quienes-somos"
              className="btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Conocenos
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      <div className="hero-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f4f8fd" />
        </svg>
      </div>
    </section>
  )
}
