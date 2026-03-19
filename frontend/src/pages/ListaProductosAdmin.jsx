// src/components/ListaProductosAdmin.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/ListaProductosAdmin.css';
import { obtenerImagenesPorTipo } from '../helpers/imageUtils';
import useProductosLocalStorage from '../hooks/useProductosLocalStorage';

const ListaProductosAdmin = () => {
  const { productos, eliminarProducto } = useProductosLocalStorage();

  if (!Array.isArray(productos) || productos.length === 0) {
    return <p className="mensaje-vacio">No hay productos registrados aún.</p>;
  }

  return (
    <div className="lista-admin-container">
      <h1>Lista de productos</h1>

      <div className="lista-productos-admin">
        {productos.map((p) => {
          const imagenes = Array.isArray(p.imagenes) && p.imagenes.length > 0
            ? p.imagenes
            : obtenerImagenesPorTipo(p.tipo, 1);

          return (
            <div key={p.id} className="producto-admin-card">
              <img
                src={imagenes[0]}
                alt={`Imagen de ${p.nombre}`}
                className="miniatura"
              />
              <div className="producto-info">
                <h3>{p.nombre}</h3>
                <p>{p.descripcion}</p>
                <span className="tipo">{p.tipo}</span>
              </div>

              <div className="acciones">
                <Link to={`/producto/${p.id}`} className="btn btn-link">
                  Ver detalle
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    if (confirm(`¿Seguro que querés eliminar "${p.nombre}"?`)) {
                      eliminarProducto(p.id);
                    }
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListaProductosAdmin;