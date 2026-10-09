// Link sirve para navegar mediante enlaces de React Router; no se utiliza en este archivo.
import { Link } from 'react-router-dom';
// useEffect ejecuta el efecto de carga y useState mantiene el estado local de la página.
import { useEffect, useState } from 'react';

// Hoja de estilos propia de la página principal.
import '../styles/pages/Main.css';

// Componentes para mostrar el listado de productos y filtrar categorías y resultados.
import ListadoProductos from '../components/ListadoProductos';
import CategoryFilter from '../components/CategoryFilter';
import ListadoProductosFiltrados from '../components/ListadoProductosFiltrados';

// Hook que proporciona las categorías y las consultas de productos usadas por esta página.
import useProductoAPI from '../hooks/useProductoAPI';
// Componente de búsqueda presentado en la página principal.
import BuscadorProductos from '../components/BuscadorProductos';

/**
 * Página principal de la aplicación.
 *
 * Presenta el buscador, permite filtrar productos por categorías y muestra
 * las recomendaciones disponibles.
 */
const Main = () => {

  /**
   * Proporciona las categorías disponibles y las funciones para cargarlas
   * y consultar productos según las categorías seleccionadas.
   */
  const {
    categorias,
    fetchCategorias,
    fetchProductosPorCategorias
  } = useProductoAPI();

  /** IDs de las categorías seleccionadas en el filtro. */
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  /** Productos obtenidos al aplicar el filtro por categorías. */
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  /**
  * Solicita las categorías disponibles cuando se ejecuta el efecto.
   *
   * Las categorías obtenidas desde el backend se utilizan
   * posteriormente en CategoryFilter.
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {

    fetchCategorias();

  }, []);

  /**
  * Actualiza las categorías seleccionadas y consulta los productos
  * correspondientes cuando hay categorías elegidas.
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

      {/* Muestra el componente de búsqueda en la página principal. */}
      <section className="bloque buscador-container">
        <BuscadorProductos />
      </section>

      <section className="bloque">

        {/* Recibe las categorías disponibles, la selección actual y los callbacks para cambiarla o limpiarla. */}
        <CategoryFilter
          categorias={categorias}
          categoriasSeleccionadas={categoriasSeleccionadas}
          onCambiarCategorias={handleCambiarCategorias}
          onLimpiarFiltros={handleLimpiarFiltros}
        />

        {/* Solo se muestra con categorías seleccionadas y recibe los productos obtenidos para ese filtro. */}
        {categoriasSeleccionadas.length > 0 && (

          <ListadoProductosFiltrados
            productos={productosFiltrados}
          />

        )}
      </section>

      {/* Sección de recomendaciones con su título y el listado de productos. */}
      <section className="bloque">
        <h2>Recomendaciones</h2>
        <ListadoProductos />
      </section>

    </div>
  );
};

export default Main;