import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


import '../styles/pages/Main.css';

import ListadoProductos from '../components/ListadoProductos';
import CategoryFilter from '../components/CategoryFilter';
import ListadoProductosFiltrados from '../components/ListadoProductosFiltrados';

import { leerLocal } from "../helpers/storageUtils";
import useProductoAPI from '../hooks/useProductoAPI';

/**
 * Página principal (Home) de la aplicación.
 *
 * ESTRUCTURA:
 * - 4 bloques principales en layout vertical
 * - Fondo verde claro según identidad de marca
 * - Contenido centrado con ancho máximo
 *
 * BLOQUES:
 * 1. "Buscador" - Placeholder para futuras funcionalidades
 * 2. "Categorías" - Placeholder para futuras funcionalidades
 * 3. "Recomendaciones" - Lista de productos aleatorios (funcional)
 * 4. "Panel de administración" - Enlace al panel admin
 *
 * FUNCIONALIDAD ACTUAL:
 * - Solo el bloque de recomendaciones está implementado
 * - Los otros bloques son placeholders con estilos
 * - Enlace al panel admin con navegación React Router
 *
 * FUTURO:
 * - Implementar buscador real
 * - Agregar filtros por categoría
 * - Posiblemente más secciones dinámicas
 */
const Main = () => {

  const usuario = leerLocal("usuario");

  const {
    categorias,
    fetchCategorias,
    fetchProductosPorCategorias
  } = useProductoAPI();

  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  //Cargar categorías al montar el componente
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {

    fetchCategorias();

  }, []);

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

  const handleLimpiarFiltros = () => {

    setCategoriasSeleccionadas([]);

    setProductosFiltrados([]);

  };

  return (
    <div className="main-container">

      {/* Placeholder para buscador - futuro desarrollo */}
      <section className="bloque">Buscador</section>

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

      {/* Sección funcional: Productos aleatorios */}
      <section className="bloque">
        <h2>Recomendaciones</h2>
        <ListadoProductos />
      </section>

      {/* Sección funcional: Enlace al panel admin */}
      {usuario?.rol === "ADMIN" && (

        <section className="bloque">

          <h2>Panel de administración</h2>

          <p>
            Aquí podés encontrar las herramientas para gestionar tu negocio.
          </p>

          <Link to="/administración">
            <button className="btn btn-filled">
              Acceder al panel
            </button>
          </Link>

        </section>

      )}

    </div>
  );
};

export default Main;