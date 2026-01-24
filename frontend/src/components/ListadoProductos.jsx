import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProductosAleatorios from '../hooks/useProductosAleatorios';
import '../styles/components/ListadoProductos.css';

const ListadoProductos = () => {
  const productosAleatorios = useProductosAleatorios();
  const [paginaActual, setPaginaActual] = useState(1);
  const pageSize = 4;

  const totalProductos = productosAleatorios.length;
  const totalPaginas = Math.max(1, Math.ceil(totalProductos / pageSize));

  useEffect(() => {
    if (paginaActual > totalPaginas) {
      setPaginaActual(totalPaginas);
    }
  }, [totalPaginas, paginaActual]);

  if (totalProductos === 0) {
    return <p className="mensaje-vacio">No hay productos registrados aún.</p>;
  }

  const startIndex = (paginaActual - 1) * pageSize;
  const productosVisibles = productosAleatorios.slice(startIndex, startIndex + pageSize);

  return (
    <div className="listado-productos-wrapper">
      <div className="listado-productos">
        {productosVisibles.map((producto) => (
          <Link key={producto.id} to={`/producto/${producto.id}`} className="producto-link">
            <div className="producto-card">
              {Array.isArray(producto.imagenes) && producto.imagenes.length > 0 && (
                <img
                  src={producto.imagenes[0]}
                  alt={`Imagen de ${producto.nombre}`}
                  className="miniatura"
                />
              )}
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <span className="tipo">{producto.tipo}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Paginador */}
      <div className="paginador">
        <div className="page-actions">
          <button
            className="page-nav"
            onClick={() => setPaginaActual(1)}
            disabled={paginaActual === 1}
          >
            Inicio
          </button>
          <button
            className="page-nav"
            onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
            disabled={paginaActual === 1}
          >
            Atrás
          </button>
          <button
            className="page-nav"
            onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
            disabled={paginaActual === totalPaginas}
          >
            Adelante
          </button>
        </div>

        <div className="page-list">
          {Array.from({ length: totalPaginas }, (_, i) => {
            const page = i + 1;
            const isActive = page === paginaActual;
            return (
              <button
                key={page}
                className={`page-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => setPaginaActual(page)}
              >
                {page}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListadoProductos;