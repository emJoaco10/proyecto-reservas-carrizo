import '../styles/components/Header.css';
import logo from '../assets/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { leerLocal, removerLocal } from '../helpers/storageUtils';
import { useState } from 'react';
import menuIcon from '../assets/menu-icon.png';

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
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const iniciales = usuario
    ? `${usuario.nombre.charAt(0)}${usuario.apellido.charAt(0)}`.toUpperCase() : "";

  const handleCerrarSesion = () => {

    const confirmar = window.confirm(
      "¿Está seguro que desea cerrar la sesión?"
    );

    if (!confirmar) {
      return;
    }

    removerLocal("usuario");

    removerLocal("token");

    setMostrarMenu(false);

    alert("Sesión cerrada correctamente.");

    navigate("/");

    window.location.reload();

  };

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

            <div className="contenedor-usuario">

              <div className="usuario-logueado">

                {/* Panel de administración */}
                {usuario.rol === "ADMIN" && (
                  <button
                    type="button"
                    className="btn-panel-admin"
                    onClick={() => {
                      setMostrarMenu(false);
                      navigate("/administracion");
                    }}
                  >
                    Panel de administración
                  </button>
                )}

                {/* Perfil del usuario */}
                <div className="header-perfil">

                  <div className="header-avatar">
                    {iniciales}
                  </div>

                  <div className="header-datos">
                    <span>Hola,</span>
                    <strong>{usuario.nombre}</strong>
                  </div>

                </div>
                
                {/* Menú */}
                <button
                  type="button"
                  className="btn-menu-usuario"
                  onClick={() => setMostrarMenu(!mostrarMenu)}
                  aria-label="Abrir menú de usuario"
                  aria-expanded={mostrarMenu}
                >
                  <img src={menuIcon} alt="Menú" />
                </button>

              </div>

              {mostrarMenu && (
                <div className="menu-usuario">

                  <button
                    type="button"
                    className="menu-item"
                    onClick={() => navigate("/mi-perfil")}
                  >
                    Mi perfil
                  </button>

                  <button
                    type="button"
                    className="menu-item cerrar-sesion"
                    onClick={handleCerrarSesion}
                  >
                    Cerrar sesión
                  </button>

                </div>
              )}

            </div>

          )}

        </div>
      </div>
    </header>
  );
}


export default Header;