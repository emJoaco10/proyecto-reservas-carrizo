import React from 'react'
import '../styles/components/Footer.css'

/**
 * Representa el pie de página de Reservas Carrizo con la identidad visual de la empresa
 * y la información de copyright.
 */
export const Footer = () => {

// Obtiene el año actual para mostrarlo dinámicamente en el copyright.
const year = new Date().getFullYear();

  return (
    <footer className="app-footer" role="contentinfo" aria-label="Pie de página">
        {/* Sección semántica del pie de página con atributos de accesibilidad. */}
        {/* Contenedor principal que organiza el contenido del pie de página. */}
        <div className="container footer-content">
        {/* Sector izquierdo con el logo y la información de la empresa. */}
        <div className="footer-left">
          {/* Logo de la empresa con texto alternativo, dimensiones y carga diferida. */}
          <img className="footer-logo" src="/src/assets/logo.png" alt="Empresa" width="120" height="40" loading="lazy" />
          {/* Nombre de la empresa y leyenda de copyright. */}
          <div className="footer-copy">
            <span className="company-name">Reservas Carrizo</span>
            <span className="copyright">© {year} Todos los derechos reservados</span>
          </div>
        </div>
        {/* Sector derecho reservado para futuros enlaces a redes sociales. */}
        <div className="footer-right">
          {/*Espacio para links a redes sociales*/}
        </div>
      </div>
      
    </footer>
  )
}
