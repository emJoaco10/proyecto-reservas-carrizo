import React, { useState, useEffect } from "react";
import "../styles/pages/Administracion.css";
import AgregarProductos from "../pages/AgregarProducto";
import ListaProductosAdmin from "../pages/ListaProductosAdmin";
import useProductosLocalStorage from "../hooks/useProductosLocalStorage";

const Administracion = () => {
  const [esMobile, setEsMobile] = useState(false);

  const { productos, guardarProducto, eliminarProducto } = useProductosLocalStorage();

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

      <section className="admin-section">
        <h2>Registrar producto</h2>
        <AgregarProductos onGuardar={guardarProducto} />
      </section>

      <section className="admin-section">
        <h2>Lista de productos</h2>
        <ListaProductosAdmin productos={productos} onEliminar={eliminarProducto} />
      </section>

      {/* Futuras funciones */}
      <section className="admin-section">
        <h2>Reportes</h2>
        <p>Próximamente podrás ver estadísticas y reportes de tu negocio.</p>
      </section>
    </div>
  );
};

export default Administracion;