import '../styles/components/Header.css';
import logo from '../assets/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Componente Header - Barra de navegación superior.
 *
 * CARACTERÍSTICAS:
 * - Posición fija (fixed) en la parte superior
 * - Diseño responsivo con contenedor centrado
 * - Botón "Volver" en rutas de detalle de producto
 * - Logo + eslogan a la izquierda
 * - Botones de autenticación a la derecha (sin funcionalidad actual)
 *
 * ESTRUCTURA:
 * - header.app-header: Contenedor principal fijo
 * - .header-left: Botón de volver + logo + eslogan
 * - .header-right: Botones "Crear cuenta" e "Iniciar sesión"
 *
 * NOTA: El botón de volver aparece solo en rutas de detalle de producto.
 */
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const showBackButton = location.pathname.startsWith('/producto/');

  return (
    <header className="app-header">
      {/* Contenedor centrado con ancho máximo */}
      <div className="container header-content">

        {/* Sección izquierda: botón de volver + logo y eslogan */}
        <div className="header-left">
          {showBackButton && (
            <button
              type="button"
              className="btn btn-volver"
              onClick={() => navigate(-1)}
              aria-label="Volver"
            >
              Volver
            </button>
          )}
          <img src={logo} alt="Logo" className="logo" />
          <span className="slogan">Tu viaje comienza aquí</span>
        </div>

        {/* Sección derecha: Botones de autenticación */}
        <div className="header-right">
          <button className="btn btn-outline">Crear cuenta</button>
          <button className="btn btn-filled">Iniciar sesión</button>
        </div>

      </div>
    </header>
  );
};

export default Header;