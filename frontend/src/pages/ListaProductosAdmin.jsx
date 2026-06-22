import { useEffect } from 'react';
import useProductoAPI from '../hooks/useProductoAPI';
import { Link } from 'react-router-dom';
import '../styles/pages/ListaProductosAdmin.css';

const ListaProductosAdmin = () => {
  const { productos, fetchProductos, removeProductoById, loading, error } = useProductoAPI();

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que querés eliminar este producto?");
    if (!confirmar) return;
    await removeProductoById(id);
  };

  return (
    <div className="lista-admin-container">
      <h1>Lista de productos</h1>

      {loading && <div className="estado">Cargando productos...</div>}
      {error && <div className="estado estado-error">{error}</div>}

      {productos.length === 0 && !loading ? (
        <div className="estado estado-vacio">No hay productos disponibles.</div>
      ) : (
        <table className="tabla-productos">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td className="acciones">
                  <Link to={`/admin/producto/editar/${p.id}`}>
                    <button>Editar</button>
                  </Link>
                  <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaProductosAdmin;