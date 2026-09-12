import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import '../styles/pages/Main.css';

import ListadoProductos from '../components/ListadoProductos';
import CategoryFilter from '../components/CategoryFilter';
import ListadoProductosFiltrados from '../components/ListadoProductosFiltrados';

import useProductoAPI from '../hooks/useProductoAPI';
import BuscadorProductos from '../components/BuscadorProductos';

/**
 * Página principal de la aplicación.
 *
 * Se encarga de mostrar el filtro de categorías, los productos
 * filtrados y las recomendaciones de productos.
 *
 * También muestra el acceso al panel de administración cuando
 * existe un usuario autenticado con rol ADMIN.
 */
const Main = () => {

  const {
    categorias,
    fetchCategorias,
    fetchProductosPorCategorias
  } = useProductoAPI();

  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  /**
   * Carga las categorías disponibles cuando se monta la página.
   *
   * Las categorías obtenidas desde el backend se utilizan
   * posteriormente en CategoryFilter.
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {

    fetchCategorias();

  }, []);

  /**
   * Actualiza las categorías seleccionadas y obtiene los productos
   * correspondientes cuando el usuario aplica un filtro.
   *
   * Si no se selecciona ninguna categoría, se limpia el listado
   * de productos filtrados.
   *
   * @param {number[]} nuevasCategorias IDs de las categorías seleccionadas.
   */
  const handleCambiarCategorias = async (nuevasCategorias) => {

    setCategoriasSeleccionadas(nuevasCategorias);

    if (nuevasCategorias.length === 0) {

      setProductosFiltrados([]);

      return;
    }

    const resultados =
      await fetchProductosPorCategorias(
        nuevasCategorias
      );

    setProductosFiltrados(resultados);
  };

  /**
   * Restablece el estado de los filtros y elimina los resultados
   * de la búsqueda por categorías.
   */
  const handleLimpiarFiltros = () => {

    setCategoriasSeleccionadas([]);

    setProductosFiltrados([]);
  };

  return (
    <div className="main-container">

      {/* Sección reservada para futuras funcionalidades de búsqueda. */}
      <section className="bloque buscador-container">
        <BuscadorProductos />
      </section>

      <section className="bloque">

        <CategoryFilter
          categorias={categorias}
          categoriasSeleccionadas={categoriasSeleccionadas}
          onCambiarCategorias={handleCambiarCategorias}
          onLimpiarFiltros={handleLimpiarFiltros}
        />

        {categoriasSeleccionadas.length > 0 && (

          <ListadoProductosFiltrados
            productos={productosFiltrados}
          />

        )}
      </section>

      {/* Muestra el listado de productos utilizado como recomendaciones. */}
      <section className="bloque">
        <h2>Recomendaciones</h2>
        <ListadoProductos />
      </section>

    </div>
  );
};

export default Main;