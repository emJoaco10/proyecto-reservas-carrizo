// React y sus hooks permiten definir el componente, gestionar estado y ejecutar efectos.
import React, { useEffect, useState } from 'react';
// Link permite navegar entre rutas sin recargar la aplicación.
import { Link } from 'react-router-dom';
// Proporciona las operaciones de API para consultar y modificar favoritos.
import useProductoAPI from '../hooks/useProductoAPI';
// Estilos compartidos para la presentación del listado de productos.
import '../styles/components/ListadoProductos.css';

/**
 * Muestra los productos favoritos del usuario y permite quitarlos de la lista.
 */
const MisFavoritos = () => {
    // fetchFavoritos recupera la lista y removeFavorito solicita quitar un producto.
    const {
        fetchFavoritos,
        removeFavorito
    } = useProductoAPI();

    // Productos favoritos recuperados para mostrarlos.
    const [favoritos, setFavoritos] = useState([]);
    // Indica si se está realizando la carga de favoritos.
    const [cargando, setCargando] = useState(true);
    // Mensaje que se muestra cuando falla la carga.
    const [error, setError] = useState(null);

    /**
     * Activa la carga, limpia el error anterior, consulta los favoritos y actualiza
     * el estado con el resultado. Si la consulta falla, registra el error en consola;
     * finally desactiva la carga tanto si la consulta finaliza como si falla.
     */
    const cargarFavoritos = async () => {
        try {
            setCargando(true);
            setError(null);

            const productosFavoritos = await fetchFavoritos();

            setFavoritos(productosFavoritos);
        } catch (error) {
            console.error('Error al cargar favoritos:', error);
            setError('No se pudieron cargar tus favoritos.');
        } finally {
            setCargando(false);
        }
    };

    /**
     * Evita la navegación del enlace y la propagación del evento, solicita quitar
     * el producto y, si el resultado es verdadero, lo excluye del estado local.
     * Registra en consola los errores producidos durante la operación.
     * @param {React.MouseEvent} e Evento del clic en el botón.
     * @param {string|number} productoId Identificador del producto que se quitará.
     */
    const quitarFavorito = async (e, productoId) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const resultado = await removeFavorito(productoId);

            if (resultado) {
                setFavoritos((favoritosActuales) =>
                    favoritosActuales.filter(
                        (producto) => producto.id !== productoId
                    )
                );
            }
        } catch (error) {
            console.error('Error al quitar favorito:', error);
        }
    };

    // Ejecuta la carga al efecto y declara fetchFavoritos como dependencia.
    useEffect(() => {
        cargarFavoritos();
    }, [fetchFavoritos]);

    if (cargando) {
        return (
            <div className="listado-productos-wrapper">
                {/* Estado de carga mientras se recupera la lista. */}
                <h1>Mis favoritos</h1>
                <p className="mensaje-vacio">Cargando favoritos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="listado-productos-wrapper">
                {/* Estado de error: presenta el mensaje y la opción de reintentar. */}
                <h1>Mis favoritos</h1>
                <p className="mensaje-vacio">{error}</p>

                <button type="button" onClick={cargarFavoritos}>
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="listado-productos-wrapper">

            <h1>Mis favoritos</h1>

            {/* Si no hay favoritos, muestra un enlace para explorar productos. */}
            {favoritos.length === 0 ? (
                <div className="mensaje-favoritos-vacio">

                    <p>
                        No tenés productos favoritos todavía.
                    </p>

                    <Link
                        to="/"
                        className="btn-explorar-favoritos"
                    >
                        Explorar productos
                    </Link>

                </div>
            ) : (

                <div className="listado-productos">

                    {/* Genera una tarjeta por producto, usa su ID como clave y enlaza con su detalle. */}
                    {favoritos.map((producto) => (

                        <Link
                            key={producto.id}
                            to={`/producto/${producto.id}`}
                            className="producto-link"
                        >

                            <div className="producto-card">

                                {/* El clic llama a quitarFavorito; aria-label identifica la acción y el producto. */}
                                <button
                                    type="button"
                                    className="producto-favorito producto-favorito--activo"
                                    onClick={(e) => quitarFavorito(e, producto.id)}
                                    aria-label={`Quitar ${producto.nombre} de favoritos`}
                                >
                                    ♥
                                </button>

                                {/* Si imágenes es un array no vacío, muestra la primera; si no, usa el marcador. */}
                                {Array.isArray(producto.imagenes) &&
                                    producto.imagenes.length > 0 ? (

                                    <img
                                        src={producto.imagenes[0]}
                                        alt={`Imagen de ${producto.nombre}`}
                                        className="miniatura"
                                    />

                                ) : (

                                    <div className="placeholder-imagen">
                                        Sin imagen
                                    </div>

                                )}

                                {/* Presenta nombre, descripción y categoría; indica cuando no hay categoría. */}
                                <h3>{producto.nombre}</h3>

                                <p>{producto.descripcion}</p>

                                <span className="categoria">
                                    {producto.categoria?.nombre || 'Sin categoría'}
                                </span>

                            </div>

                        </Link>

                    ))}

                </div>

            )}

        </div>
    );
};

export default MisFavoritos;