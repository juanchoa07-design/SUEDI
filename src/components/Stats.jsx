import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, cardVariant, viewportConfig } from '../animations'

const STATS = [
  { value: 20, prefix: '+', label: 'Años de trayectoria' },
  { value: 150, prefix: '+', label: 'Socios activos' },
  { value: 40, prefix: '+', label: 'Eventos realizados' },
  { value: 19, prefix: '', label: 'Departamentos cubiertos' },
]

function AnimatedNumber({ value, prefix }) {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const observed = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || observed.current) return
      observed.current = true
      let count = 0
      const step = Math.ceil(value / 40)
      const timer = setInterval(() => {
        count = Math.min(count + step, value)
        setCurrent(count)
        if (count >= value) clearInterval(timer)
      }, 30)
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return <span className="stat-number" ref={ref}>{prefix}{current}</span>
}

export default function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <motion.div
          className="stats-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportConfig}
        >
          {STATS.map(s => (
            <motion.div className="stat-item" key={s.label} variants={cardVariant}>
              <AnimatedNumber value={s.value} prefix={s.prefix} />
              <span className="stat-label">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
