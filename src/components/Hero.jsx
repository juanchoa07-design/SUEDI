import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../animations'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-bg" />
      <div className="container hero-content">
        <motion.div
          className="hero-layout"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <div className="hero-text">
            <motion.h1 variants={fadeUp}>
              Sociedad Uruguaya de Endocrinología y Diabetes Infantil
            </motion.h1>
            <motion.p className="hero-desc" variants={fadeUp}>
              Unimos a profesionales de la salud para impulsar el conocimiento, la innovación y la
              mejor atención en Endocrinología y Diabetología Pediátrica.
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
          </div>
          <motion.div className="hero-mascot-wrap" variants={fadeUp}>
            <img
              src={`${import.meta.env.BASE_URL}carita-suedi.png`}
              alt="Mascota SUEDI"
              className="hero-mascot"
            />
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
