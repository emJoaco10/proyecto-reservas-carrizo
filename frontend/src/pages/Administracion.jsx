import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/Administracion.css";

const Administracion = () => {
  const [esMobile, setEsMobile] = useState(false);

  useEffect(() => {
    setEsMobile(window.innerWidth < 768);
  }, []);

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
