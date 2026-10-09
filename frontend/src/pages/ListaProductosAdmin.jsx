// Permite ejecutar la solicitud de carga al inicializar la página.
import { useEffect } from 'react';
// Proporciona los productos, las operaciones de carga y eliminación, y sus estados.
import useProductoAPI from '../hooks/useProductoAPI';
// Facilita la navegación a la edición de cada producto.
import { Link } from 'react-router-dom';
// Define los estilos específicos de esta página.
import '../styles/pages/ListaProductosAdmin.css';
// Presenta la jerarquía de navegación de la sección administrativa.
import BreadcrumAdministracion from "../components/BreadcrumAdministracion";

/**
 * Muestra una tabla administrativa de productos y permite acceder a su edición
 * o solicitar su eliminación. Obtiene los productos y los estados de carga y
 * error desde `useProductoAPI`, solicita la carga mediante un efecto, pide
 * confirmación antes de eliminar y muestra el listado con sus acciones.
 */
const ListaProductosAdmin = () => {
  const { productos, fetchProductos, removeProductoById, loading, error } = useProductoAPI();

  // La lista de dependencias está vacía; al ejecutarse, el efecto solicita la carga inicial de productos.
  useEffect(() => {
    fetchProductos();
  }, []);

  /**
   * Solicita la eliminación de un producto después de pedir confirmación.
   * Si el usuario cancela, detiene la operación; si confirma, llama a
   * `removeProductoById` con el identificador y espera su resultado.
   *
   * @param {*} id Identificador del producto que se desea eliminar.
   */
  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que querés eliminar este producto?");
    if (!confirmar) return;
    await removeProductoById(id);
  };

  return (

    <div className="lista-admin-container">

      {/* Contenedor principal de la página de administración de productos. */}
      {/* Breadcrumb: Administración → Administración de productos → Lista de productos. */}
      <BreadcrumAdministracion
        items={[
          {
            label: "Administración",
            path: "/administracion"
          },
          {
            label: "Administración de productos",
            path: "/productos-admin"
          },
          {
            label: "Lista de productos"
          }
        ]}
      />

      {/* Título principal de la página. */}
      <h1>Lista de productos</h1>

      {/* Mensajes condicionales para los estados de carga y error. */}
      {loading && <div className="estado">Cargando productos...</div>}
      {error && <div className="estado estado-error">{error}</div>}

      {/* Mensaje mostrado cuando no hay productos y loading es falso. */}
      {productos.length === 0 && !loading ? (
        <div className="estado estado-vacio">No hay productos disponibles.</div>
      ) : (
        <table className="tabla-productos">
          {/* Tabla con las columnas Id, Nombre y Acciones. */}
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Recorre productos y usa p.id como clave para cada fila. */}
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td className="acciones">
                  {/* Enlace a la ruta de edición del producto. */}
                  <Link to={`/admin/producto/editar/${p.id}`}>
                    <button>Editar</button>
                  </Link>
                  {/* Ejecuta la solicitud de eliminación para el identificador del producto. */}
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