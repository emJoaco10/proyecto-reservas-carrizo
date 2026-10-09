import '../styles/components/Header.css';
import logo from '../assets/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { leerLocal, removerLocal } from '../helpers/storageUtils';
import { useState } from 'react';
import menuIcon from '../assets/menu-icon.png';

/**
 * Componente Header - Encabezado de navegación de Reservas Carrizo.
 *
 * Muestra el logo y el eslogan, y ofrece volver desde las rutas de detalle
 * de producto. Si no hay un usuario almacenado, permite navegar al registro
 * o al inicio de sesión. Si hay un usuario, muestra su información y el menú;
 * para el rol ADMIN también presenta el acceso al panel de administración.
 */
const Header = () => {
  // location y navigate permiten consultar la ruta actual y navegar entre rutas.
  const location = useLocation();
  const navigate = useNavigate();
  // Determina si la ruta actual corresponde al detalle de un producto.
  const showBackButton = location.pathname.startsWith('/producto/');
  // Obtiene del almacenamiento local los datos del usuario.
  const usuario = leerLocal("usuario");
  // Controla la visibilidad del menú desplegable del usuario.
  const [mostrarMenu, setMostrarMenu] = useState(false);

  // Iniciales del nombre y apellido, en mayúsculas cuando existe un usuario.
  const iniciales = usuario
    ? `${usuario.nombre.charAt(0)}${usuario.apellido.charAt(0)}`.toUpperCase() : "";

  /**
   * Cierra la sesión eliminando los datos locales después de pedir confirmación.
   * Si se cancela, termina sin cambios; si se confirma, elimina usuario y token,
   * cierra el menú, muestra un mensaje, navega al inicio y recarga la página.
   */
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
      {/* Contenedor principal del encabezado, centrado y con ancho máximo. */}
      <div className="container header-content">

        {/* Sector izquierdo: botón de volver en detalle, logo y eslogan. */}
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

        {/* Sector derecho: accesos de autenticación o contenido del usuario. */}
        <div className="header-right">

          {!usuario ? (

            <>
              {/* Accesos al registro y al inicio de sesión cuando no hay usuario almacenado. */}
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

                {/* Acceso al panel de administración, visible solo para el rol ADMIN. */}
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

                {/* Perfil con el avatar y la información personal del usuario. */}
                <div className="header-perfil">

                  <div className="header-avatar">
                    {iniciales}
                  </div>

                  <div className="header-datos">
                    <span>Hola,</span>
                    <strong>{usuario.nombre}</strong>
                  </div>

                </div>

                {/* Alterna el menú y comunica su estado mediante aria-expanded. */}
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
                  {/* Opciones de perfil, favoritos, reservas y cierre de sesión. */}

                  <button
                    type="button"
                    className="menu-item"
                    onClick={() => {
                      setMostrarMenu(false);
                      navigate("/mi-perfil");
                    }}
                  >
                    Mi perfil
                  </button>

                  <button
                    type="button"
                    className="menu-item"
                    onClick={() => {
                      setMostrarMenu(false);
                      navigate("/mis-favoritos");
                    }}
                  >
                    Mis favoritos
                  </button>

                  <button
                    type="button"
                    className="menu-item"
                    onClick={() => {
                      setMostrarMenu(false);
                      navigate("/mis-reservas");
                    }}
                  >
                    Mis reservas
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