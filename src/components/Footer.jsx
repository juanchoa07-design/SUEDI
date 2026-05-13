import logo from '/suedi.jpg'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <img src={logo} alt="Logo SUEDI" className="logo-img logo-img-footer" />
            </div>
            <p>Sociedad Uruguaya de Endocrinología y Diabetes Infantil. Promoviendo la excelencia en la atención médica pediátrica desde su fundación.</p>
          </div>
          <div className="footer-col">
            <h5>Institucional</h5>
            <ul>
              <li><a href="#quienes-somos">Quiénes somos</a></li>
              <li><a href="#historia">Historia</a></li>
              <li><a href="#autoridades">Autoridades</a></li>
              <li><a href="#socios">Hacerse socio</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Actividades</h5>
            <ul>
              <li><a href="#eventos">Próximos eventos</a></li>
              <li><a href="#noticias">Noticias</a></li>
              <li><a href="#recursos">Guías clínicas</a></li>
              <li><a href="#recursos">Webinars</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contacto</h5>
            <ul>
              <li>Hospital Pereira Rossell</li>
              <li>Bulevar Artigas 1550</li>
              <li>Montevideo, Uruguay</li>
              <li><a href="mailto:suedi.endoped.uy@gmail.com">suedi.endoped.uy@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 SUEDI – Sociedad Uruguaya de Endocrinología y Diabetes Infantil. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
