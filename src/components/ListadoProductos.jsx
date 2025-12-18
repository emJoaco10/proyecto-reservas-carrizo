import { Link } from 'react-router-dom';
import useProductosAleatorios from '../hooks/useProductosAleatorios';
import '../styles/components/ListadoProductos.css';

const ListadoProductos = () => {
  const productosAleatorios = useProductosAleatorios();

  if (productosAleatorios.length === 0) {
    return <p className="mensaje-vacio">No hay productos registrados aún.</p>;
  }

  return (
    <div className="listado-productos">
      {productosAleatorios.map((producto) => (
        <Link key={producto.id} to={`/producto/${producto.id}`} className="producto-link">
          <div className="producto-card">
            {Array.isArray(producto.imagenes) && producto.imagenes.length > 0 && (
              <img 
              src={producto.imagenes[0]} 
              alt={`Imagen de ${producto.nombre}`} 
              className="miniatura" />
            )}
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <span className="tipo">{producto.tipo}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListadoProductos;