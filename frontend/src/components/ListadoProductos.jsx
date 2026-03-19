import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useProductosAleatorios from '../hooks/useProductosAleatorios';
import { obtenerImagenesPorTipo } from '../helpers/imageUtils';
import '../styles/components/ListadoProductos.css';


const ListadoProductos = () => {
   const productosAleatorios = useProductosAleatorios() || [];
  const [paginaActual, setPaginaActual] = useState(1);
  const pageSize = 4;

  const { productosVisibles, totalPaginas } = useMemo(() => {
    const total = Array.isArray(productosAleatorios) ? productosAleatorios.length : 0;
    const paginas = Math.max(1, Math.ceil(total / pageSize));
    const start = (paginaActual - 1) * pageSize;
    return {
      productosVisibles: Array.isArray(productosAleatorios)
        ? productosAleatorios.slice(start, start + pageSize)
        : [],
      totalPaginas: paginas
    };
  }, [productosAleatorios, paginaActual]);

  if (productosAleatorios.length === 0) {
    return <p className="mensaje-vacio">No hay productos registrados aún.</p>;
  }

  return (
    <div className="listado-productos-wrapper">
      <div className="listado-productos">
        {productosVisibles.map((producto) => {
          const imagenes = Array.isArray(producto.imagenes) && producto.imagenes.length > 0
            ? producto.imagenes
            : obtenerImagenesPorTipo(producto.tipo, 1);

          return (
            <Link key={producto.id} to={`/producto/${producto.id}`} className="producto-link">
              <div className="producto-card">
                <img
                  src={imagenes[0]}
                  alt={`Imagen de ${producto.nombre}`}
                  className="miniatura"
                />
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <span className="tipo">{producto.tipo}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Paginador */}
      <div className="paginador">
        <button onClick={() => setPaginaActual(1)} disabled={paginaActual === 1}>Inicio</button>
        <button onClick={() => setPaginaActual(p => Math.max(1, p - 1))} disabled={paginaActual === 1}>Atrás</button>
        <button onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))} disabled={paginaActual === totalPaginas}>Adelante</button>

        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            className={`page-btn ${paginaActual === i + 1 ? 'is-active' : ''}`}
            onClick={() => setPaginaActual(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListadoProductos;
