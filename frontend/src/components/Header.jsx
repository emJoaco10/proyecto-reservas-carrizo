import '../styles/components/Header.css';
import logo from '../assets/logo.png';

/**
 * Componente Header - Barra de navegación superior.
 *
 * CARACTERÍSTICAS:
 * - Posición fija (fixed) en la parte superior
 * - Diseño responsivo con contenedor centrado
 * - Logo + eslogan a la izquierda
 * - Botones de autenticación a la derecha (sin funcionalidad actual)
 *
 * ESTRUCTURA:
 * - header.app-header: Contenedor principal fijo
 * - .header-left: Logo y eslogan (navega a home)
 * - .header-right: Botones "Crear cuenta" e "Iniciar sesión"
 *
 * NOTA: Los botones son placeholders para futuras funcionalidades de autenticación.
 * Actualmente solo tienen estilos hover.
 */
const Header = () => {
  return (
    <header className="app-header">
      {/* Contenedor centrado con ancho máximo */}
      <div className="container header-content">

        {/* Sección izquierda: Logo y eslogan */}
        <div className="header-left">
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