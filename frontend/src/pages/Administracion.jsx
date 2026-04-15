import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/Administracion.css";

// Page del panel de administración.
// - Detecta si el usuario está en mobile y bloquea el acceso.
// - Muestra navegación hacia distintas secciones del panel.
const Administracion = () => {

  // Estado: indica si el dispositivo es mobile.
  const [esMobile, setEsMobile] = useState(false);

  // Efecto: al montar el componente, detecta el ancho de la ventana.
  useEffect(() => {
    setEsMobile(window.innerWidth < 768);
  }, []);

  // Renderizado condicional: si es mobile, bloquea el acceso.
  if (esMobile) {
    return (
      <div className="admin-bloqueado">
        <h2>Panel no disponible en dispositivos móviles</h2>
        <p>Por favor accedé desde una computadora para gestionar tu negocio.</p>
      </div>
    );
  }

  // Renderizado normal: panel de administración con navegación.
  return (
    <div className="admin-container">
      <h1>Panel de administración</h1>

      <nav className="admin-nav">
        <ul>
          <li>
            <Link to="/admin/agregar">Registrar producto</Link>
          </li>
          <li>
            <Link to="/admin/lista">Lista de productos</Link>
          </li>
          <li>
            <Link to="/admin/reportes">Reportes</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Administracion;
