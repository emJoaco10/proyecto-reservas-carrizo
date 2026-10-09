import { useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import '../styles/pages/Administracion.css';

/**
 * Presenta el panel de navegación para acceder a las distintas secciones de
 * administración de Reservas Carrizo. Este componente no recibe props.
 */
const Administracion = () => {
    // Estado booleano que controla la restricción mostrada en dispositivos móviles; inicia en false.
    const [esMobile, setEsMobile] = useState(false);

    // Comprueba el ancho al montar y activa la restricción si es menor que 768 px.
    // Con dependencias vacías, esta comprobación no se repite al cambiar el tamaño de la ventana.
    useEffect(() => {
    const ancho = window.innerWidth;
    if (ancho < 768) {
      setEsMobile(true);
    }
  }, []);

// Si esMobile es true, solicita acceder desde una computadora; en caso contrario, muestra el panel habitual.
if (esMobile) {
    return (
      <div className="admin-bloqueado">
        <h2>Panel no disponible en dispositivos móviles</h2>
        <p>Por favor accedé desde una computadora para gestionar tu negocio.</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* Contenedor principal del panel administrativo. */}
      {/* Encabezado de la página. */}
      <h1>Panel de administración</h1>
      {/* Menú de navegación a las secciones de administración y consulta de reportes. */}
      <nav className="admin-menu">
        <ul>
          {/* /usuarios-admin: acciones de usuario. */}
          <li>
            <Link to="/usuarios-admin">Acciones de usuario</Link>
          </li>
          {/* futuras funciones */}
          {/* /productos-admin: acciones de productos. */}
          <li>
            <Link to="/productos-admin">Acciones de productos</Link>
          </li>
          {/* /caracteristicas-admin: acciones de características. */}
          <li>
            <Link to="/caracteristicas-admin">Acciones de características</Link>
          </li>
          {/* /categorias-admin: acciones de categorías. */}
          <li>
            <Link to="/categorias-admin">Acciones de categorías</Link>
          </li>
          {/* /reportes: consulta de reportes. */}
          <li>
            <Link to="/reportes">Ver reportes</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Administracion;
