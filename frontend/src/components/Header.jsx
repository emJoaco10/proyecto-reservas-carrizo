import '../styles/components/Header.css';
import logo from '../assets/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { leerLocal } from '../helpers/storageUtils';

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
  const usuario = leerLocal("usuario");

  const iniciales = usuario
    ? `${usuario.nombre.charAt(0)}${usuario.apellido.charAt(0)}`.toUpperCase()
    : "";

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
          <img src={logo}
            alt="Reservas Carrizo"
            className="logo"
            onClick={() => navigate("/")} />
          <span className="slogan">Tu viaje comienza aquí</span>
        </div>

        {/* Sección derecha: Botones de autenticación */}
        <div className="header-right">

          {!usuario ? (

            <>
              <button
                className="btn btn-outline"
                onClick={() => navigate("/registro-usuario")}
                type="button"
              >
                Crear cuenta
              </button>

              <button
                className="btn btn-filled"
                onClick={() => navigate("/iniciar-sesion")}
                type="button"
              >
                Iniciar sesión
              </button>
            </>

          ) : (

            <button
              className="usuario-logueado"
              type="button"
            >

              <div className="avatar">
                {iniciales}
              </div>

              <div className="datos-usuario">

                <span>Hola,</span>

                <strong>{usuario.nombre}</strong>

              </div>

            </button>

          )}

        </div>
      </div>
    </header>
  );
}


export default Header;