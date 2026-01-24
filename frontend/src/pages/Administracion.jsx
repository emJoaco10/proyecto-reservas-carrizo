import { useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import '../styles/pages/Administracion.css';

const Administracion = () => {
    const [esMobile, setEsMobile] = useState(false);

    useEffect(() => {
    const ancho = window.innerWidth;
    if (ancho < 768) {
      setEsMobile(true);
    }
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
      <nav className="admin-menu">
        <ul>
          <li>
            <Link to="/agregar-producto">Registrar producto</Link>
          </li>
          {/* futuras funciones */}
          <li>
            <Link to="/lista-productos">Lista de productos</Link>
          </li>
          <li>
            <Link to="/reportes">Ver reportes</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Administracion;
