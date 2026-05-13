export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-bg" />
      <div className="container hero-content">
        <p className="hero-tag">Sociedad Uruguaya de Endocrinología y Diabetes Infantil</p>
        <h1>Cuidando la salud<br />endocrina de los niños<br /><span>de Uruguay</span></h1>
        <p className="hero-desc">
          Promovemos la excelencia en la atención médica, la investigación científica y la
          formación continua de especialistas en endocrinología y diabetes pediátrica.
        </p>
        <div className="hero-actions">
          <a href="#eventos" className="btn btn-primary">Ver próximos eventos</a>
          <a href="#quienes-somos" className="btn btn-outline">Conocenos</a>
        </div>
      </div>
      <div className="hero-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f4f8fd" />
        </svg>
      </div>
    </section>
  )
}
