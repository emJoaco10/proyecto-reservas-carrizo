import { useEffect, useState } from 'react';
import '../styles/pages/ListaProductosAdmin.css';

const ListaProductosAdmin = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const productosGuardados = localStorage.getItem("productos");
    if (productosGuardados) {
      try {
        const parsed = JSON.parse(productosGuardados);
        if (Array.isArray(parsed)) {
          setProductos(parsed);
        }
      } catch (e) {
        console.error("Error al parsear productos del localStorage", e);
      }
    }
  }, []);

  const handleEliminar = (id) => {
    const confirmar = window.confirm("¿Estás seguro de que querés eliminar este producto?");
    if (!confirmar) return;

    const actualizados = productos.filter((p) => p.id !== id);
    localStorage.setItem("productos", JSON.stringify(actualizados));
    setProductos(actualizados); // actualiza la vista
  };


  return (
    <div className="lista-admin-container">
      <h1>Lista de productos</h1>

      {productos.length === 0 ? (
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
                  <button onClick={() => console.log("Editar", p)}>Editar</button>
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