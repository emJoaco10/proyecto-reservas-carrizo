import React from 'react'
import '../styles/components/Footer.css'

export const Footer = () => {

const year = new Date().getFullYear();

  return (
    <footer className="app-footer" role="contentinfo" aria-label="Pie de página">
        <div className="container footer-content">
        <div className="footer-left">
          <img className="footer-logo" src="/src/assets/logo.png" alt="Empresa" width="120" height="40" loading="lazy" />
          <div className="footer-copy">
            <span className="company-name">Rservas Carrizo</span>
            <span className="copyright">© {year} Todos los derechos reservados</span>
          </div>
        </div>
        <div className="footer-right">
          {/*Espacio para links a redes sociales*/}
        </div>
      </div>
      
    </footer>
  )
}
