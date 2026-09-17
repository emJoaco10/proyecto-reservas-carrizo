import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProductoAPI from '../hooks/useProductoAPI';
import { leerLocal } from '../helpers/storageUtils';
import '../styles/components/ListadoProductos.css';

/**
 * Componente ListadoProductos - Muestra lista paginada de productos aleatorios.
 *
 * FUNCIONALIDAD:
 * - Obtiene productos aleatorios usando hook personalizado
 * - Implementa paginación local (4 productos por página)
 * - Cada producto es un enlace a su página de detalle
 * - Diseño responsive con grid de productos
 *
 * PAGINACIÓN:
 * - Estado local: paginaActual (empieza en 1)
 * - pageSize: 4 productos por página
 * - Cálculo: slice() para obtener productos visibles
 * - Navegación: Inicio, Atrás, números de página, Adelante
 *
 * ESTADO:
 * - productosAleatorios: Array de productos del hook
 * - paginaActual: Página actual (1-indexed)
 * - totalPaginas: Calculado dinámicamente
 *
 * EFECTOS:
 * - useEffect para resetear página si excede totalPaginas
 * - Actualización automática cuando cambian productos
 *
 * NAVEGACIÓN:
 * - Link de React Router a /producto/:id
 * - Mantiene navegación SPA (Single Page Application)
 */
const ListadoProductos = () => {

  const usuario = leerLocal("usuario");

  // Hook unificado con backend
  const {
    getProductosAleatorios,
    fetchFavoritos,
    addFavorito,
    removeFavorito,
    loading,
    error
  } = useProductoAPI();

  // Estado de paginación (1-indexed para UX)
  const [paginaActual, setPaginaActual] = useState(1);

  const [favoritos, setFavoritos] = useState([]);
  const [cargandoFavoritos, setCargandoFavoritos] = useState(false);

  const pageSize = 4; // 4 productos por página

  // Selección aleatoria desde productos cargados
  const productosAleatorios = getProductosAleatorios(); // por ejemplo, 12 para recomendaciones

  // Cálculos de paginación
  const totalProductos = productosAleatorios.length;
  const totalPaginas = Math.max(1, Math.ceil(totalProductos / pageSize));

  // Resetear página si excede el total disponible
  useEffect(() => {
    if (paginaActual > totalPaginas) {
      setPaginaActual(totalPaginas);
    }
  }, [totalPaginas, paginaActual]);

  useEffect(() => {
    const cargarFavoritos = async () => {

      // Los favoritos solo se consultan
      // si existe un usuario autenticado.
      if (!usuario) {
        setFavoritos([]);
        setCargandoFavoritos(false);
        return;
      }

      try {
        setCargandoFavoritos(true);

        const favoritosUsuario = await fetchFavoritos();

        const idsFavoritos = favoritosUsuario.map(
          (producto) => producto.id
        );

        setFavoritos(idsFavoritos);

      } catch (error) {
        console.error("Error al cargar favoritos:", error);
        setFavoritos([]);

      } finally {
        setCargandoFavoritos(false);
      }
    };

    cargarFavoritos();
  }, [fetchFavoritos, usuario]);

  // Marcar o desmarcar un producto como favorito
  const toggleFavorito = async (e, productoId) => {
    e.preventDefault();
    e.stopPropagation();

    // Los favoritos solo están disponibles
    // para usuarios autenticados.
    if (!usuario) {
      alert("Iniciá sesión para agregar productos a favoritos.");
      return;
    }

    if (cargandoFavoritos) {
      return;
    }

    const esFavoritoActual = favoritos.includes(productoId);

    try {
      setCargandoFavoritos(true);

      if (esFavoritoActual) {
        const resultado = await removeFavorito(productoId);

        if (resultado) {
          setFavoritos((favoritosActuales) =>
            favoritosActuales.filter((id) => id !== productoId)
          );
        }
      } else {
        const resultado = await addFavorito(productoId);

        if (resultado) {
          setFavoritos((favoritosActuales) => [
            ...favoritosActuales,
            productoId
          ]);
        }
      }
    } catch (error) {
      console.error("Error al modificar favorito:", error);
    } finally {
      setCargandoFavoritos(false);
    }
  };

  // Verificar si un producto está marcado como favorito
  const esFavorito = (productoId) => {
    return favoritos.includes(productoId);
  };

  // Estados de carga y error
  if (loading) {
    return <p className="mensaje-vacio">Cargando productos...</p>;
  }
  if (error) {
    return <p className="mensaje-vacio">{error}</p>;
  }
  if (totalProductos === 0) {
    return <p className="mensaje-vacio">No hay productos registrados aún.</p>;
  }

  // Calcular productos visibles en página actual
  const startIndex = (paginaActual - 1) * pageSize;
  const productosVisibles = productosAleatorios.slice(startIndex, startIndex + pageSize);

  return (
    <div className="listado-productos-wrapper">

      {/* Grid de productos */}
      <div className="listado-productos">
        {productosVisibles.map((producto) => (
          <Link key={producto.id} to={`/producto/${producto.id}`} className="producto-link">
            <div className="producto-card">

              {/* Botón de favorito */}
              <button
                type="button"
                className={`producto-favorito ${esFavorito(producto.id) ? 'producto-favorito--activo' : ''
                  }`}
                onClick={(e) => toggleFavorito(e, producto.id)}
                aria-label={
                  esFavorito(producto.id)
                    ? `Quitar ${producto.nombre} de favoritos`
                    : `Agregar ${producto.nombre} a favoritos`
                }
                aria-pressed={esFavorito(producto.id)}
              >
                {esFavorito(producto.id) ? '♥' : '♡'}
              </button>

              {/* Imagen del producto subida */}
              {Array.isArray(producto.imagenes) && producto.imagenes.length > 0 ? (
                <img
                  src={producto.imagenes[0]}
                  alt={`Imagen de ${producto.nombre}`}
                  className="miniatura"
                />
              ) : (
                <div className="placeholder-imagen">Sin imagen</div>
              )}


              {/* Información del producto */}
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <span className="categoria">
                {producto.categoria?.nombre || "Sin categoría"}
              </span>

            </div>
          </Link>
        ))}
      </div>

      {/* Componente de paginación */}
      <div className="paginador">

        {/* Botones de navegación principal */}
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

        {/* Lista de números de página */}
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