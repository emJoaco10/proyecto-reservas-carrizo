import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProductoAPI from '../hooks/useProductoAPI';
import { leerLocal } from '../helpers/storageUtils';
import '../styles/components/ListadoProductos.css';

/**
 * Muestra los productos proporcionados por `useProductoAPI` en páginas de
 * cuatro elementos y permite navegar a la ficha de cada producto mediante `Link`.
 * También consulta y modifica favoritos cuando hay un usuario disponible, y
 * presenta los estados de carga, error o lista vacía.
 *
 * `paginaActual` controla la página seleccionada; los productos visibles y el
 * total de páginas se calculan a partir de los productos obtenidos. Un efecto
 * limita la página actual al total disponible. Otro consulta favoritos y
 * mantiene sus identificadores en el estado local; depende de `fetchFavoritos`
 * y `usuario?.email`.
 */
const ListadoProductos = () => {

  // Usuario recuperado del almacenamiento local.
  const usuario = leerLocal("usuario");

  // Funciones de productos y favoritos, y estados de carga y error proporcionados por el hook.
  const {
    getProductosAleatorios,
    fetchFavoritos,
    addFavorito,
    removeFavorito,
    loading,
    error
  } = useProductoAPI();

  // Número de página seleccionado; la numeración comienza en 1.
  const [paginaActual, setPaginaActual] = useState(1);

  // Identificadores de productos favoritos y estado de las operaciones de favoritos.
  const [favoritos, setFavoritos] = useState([]);
  const [cargandoFavoritos, setCargandoFavoritos] = useState(false);

  // Cantidad de productos mostrados por página.
  const pageSize = 4;

  // Productos aleatorios obtenidos mediante el hook.
  const productosAleatorios = getProductosAleatorios();

  // Cantidad de productos y páginas, con al menos una página calculada.
  const totalProductos = productosAleatorios.length;
  const totalPaginas = Math.max(1, Math.ceil(totalProductos / pageSize));

  // Ajusta la página seleccionada si supera el total disponible.
  useEffect(() => {
    if (paginaActual > totalPaginas) {
      setPaginaActual(totalPaginas);
    }
  }, [totalPaginas, paginaActual]);

  // Consulta favoritos cuando hay usuario; guarda sus identificadores y limpia
  // el estado en caso de error. El indicador se activa durante la consulta y se
  // desactiva al finalizar; las dependencias son fetchFavoritos y usuario?.email.
  useEffect(() => {
    const cargarFavoritos = async () => {

      // Sin usuario, no se consultan favoritos y se deja vacía la lista local.
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
  }, [fetchFavoritos, usuario?.email]);

  // Evita que el clic active el enlace, requiere usuario y bloquea operaciones
  // simultáneas. Agrega o quita el favorito y actualiza el estado solo si la API
  // devuelve un resultado verdadero; registra los errores en la consola.
  const toggleFavorito = async (e, productoId) => {
    e.preventDefault();
    e.stopPropagation();

    // Si no hay usuario disponible, no se realiza la operación de favoritos.
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

  // Indica si el identificador del producto está en la lista de favoritos.
  const esFavorito = (productoId) => {
    return favoritos.includes(productoId);
  };

  // Retornos anticipados para carga, error de la API y lista sin productos.
  if (loading) {
    return <p className="mensaje-vacio">Cargando productos...</p>;
  }
  if (error) {
    return <p className="mensaje-vacio">{error}</p>;
  }
  if (totalProductos === 0) {
    return <p className="mensaje-vacio">No hay productos registrados aún.</p>;
  }

  // Calcula el inicio del segmento y obtiene los productos de la página con slice.
  const startIndex = (paginaActual - 1) * pageSize;
  const productosVisibles = productosAleatorios.slice(startIndex, startIndex + pageSize);

  return (
    <div className="listado-productos-wrapper">

      {/* Tarjetas de los productos visibles, generadas a partir de la página actual. */}
      <div className="listado-productos">
        {productosVisibles.map((producto) => (
          <Link key={producto.id} to={`/producto/${producto.id}`} className="producto-link">
            <div className="producto-card">

              {/* Control accesible cuyo texto y estado visual indican si es favorito. */}
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

              {/* Muestra la primera imagen disponible o un marcador alternativo. */}
              {Array.isArray(producto.imagenes) && producto.imagenes.length > 0 ? (
                <img
                  src={producto.imagenes[0]}
                  alt={`Imagen de ${producto.nombre}`}
                  className="miniatura"
                />
              ) : (
                <div className="placeholder-imagen">Sin imagen</div>
              )}


              {/* Nombre, descripción y categoría; muestra un texto alternativo si falta la categoría. */}
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <span className="categoria">
                {producto.categoria?.nombre || "Sin categoría"}
              </span>

              {/* Valoración: estrellas redondeadas, promedio con un decimal y cantidad de valoraciones. */}
              <div className="producto-valoracion">

                <div className="producto-valoracion__estrellas">
                  {[1, 2, 3, 4, 5].map((estrella) => (
                    <span
                      key={estrella}
                      className={
                        estrella <= Math.round(producto.puntuacionPromedio || 0)
                          ? "producto-valoracion__estrella producto-valoracion__estrella--activa"
                          : "producto-valoracion__estrella"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>

                <span className="producto-valoracion__promedio">
                  {(producto.puntuacionPromedio || 0).toFixed(1)}
                </span>

                <span className="producto-valoracion__cantidad">
                  ({producto.cantidadValoraciones || 0})
                </span>

              </div>

            </div>
          </Link>
        ))}
      </div>

      {/* Controles para cambiar la página actual. */}
      <div className="paginador">

        {/* Inicio y Atrás se deshabilitan en la primera página; Adelante, en la última. */}
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

        {/* Un botón por página; el seleccionado recibe la clase activa y permite navegar a esa página. */}
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