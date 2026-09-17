import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useProductoAPI from '../hooks/useProductoAPI';
import '../styles/components/ListadoProductos.css';

const MisFavoritos = () => {
    const {
        fetchFavoritos,
        removeFavorito
    } = useProductoAPI();

    const [favoritos, setFavoritos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        cargarFavoritos();
    }, [fetchFavoritos]);

    if (cargando) {
        return (
            <div className="listado-productos-wrapper">
                <h1>Mis favoritos</h1>
                <p className="mensaje-vacio">Cargando favoritos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="listado-productos-wrapper">
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

                    {favoritos.map((producto) => (

                        <Link
                            key={producto.id}
                            to={`/producto/${producto.id}`}
                            className="producto-link"
                        >

                            <div className="producto-card">

                                {/* Botón para quitar de favoritos */}
                                <button
                                    type="button"
                                    className="producto-favorito producto-favorito--activo"
                                    onClick={(e) => quitarFavorito(e, producto.id)}
                                    aria-label={`Quitar ${producto.nombre} de favoritos`}
                                >
                                    ♥
                                </button>

                                {/* Imagen del producto */}
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

                                {/* Información del producto */}
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