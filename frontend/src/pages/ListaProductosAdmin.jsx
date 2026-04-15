// src/components/ListaProductosAdmin.jsx
import '../styles/pages/ListaProductosAdmin.css';

import useProductosLocalStorage from '../hooks/useProductosLocalStorage';

const ListaProductosAdmin = () => {
  const { productos, eliminarProducto } = useProductosLocalStorage();

  if (!Array.isArray(productos) || productos.length === 0) {
    return <p className="mensaje-vacio">No hay productos registrados aún.</p>;
  }

  return (
    <div className="lista-admin-container">
  <h1>Lista de productos</h1>

  <table className="tabla-productos">
    <thead>
      <tr>
        <th>Imagen</th>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Tipo</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {productos.map((producto) => (
        <tr key={producto.id}>
          <td>
            {producto.imagenes && producto.imagenes.length > 0 ? (
              <img src={producto.imagenes[0]} alt={producto.nombre} width="80" />
            ) : (
              <span>Sin imagen</span>
            )}
          </td>
          <td>{producto.nombre}</td>
          <td>{producto.descripcion}</td>
          <td>{producto.tipo}</td>
          <td>
            <div className="acciones">
              <button className="btn-accion btn-danger" onClick={() => eliminarProducto(producto.id)}>
                Eliminar
              </button>
            </div>
          </td>
        </tr>

      ))}
    </tbody>
  </table>
</div>
  );
};

export default ListaProductosAdmin;