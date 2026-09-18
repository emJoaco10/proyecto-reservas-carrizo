import React, { useState } from 'react';
import '../styles/components/CompartirProducto.css';

const CompartirProducto = ({ producto }) => {
    const [mostrarVentana, setMostrarVentana] = useState(false);
    const [redSeleccionada, setRedSeleccionada] = useState('facebook');
    const [mensaje, setMensaje] = useState('');

    if (!producto) {
        return null;
    }

    const urlProducto = window.location.href;

    const mensajePredeterminado =
        `Mirá este alojamiento: ${producto.nombre}`;

    const mensajeCompartir =
        mensaje.trim() || mensajePredeterminado;

    const handleCompartir = () => {
        const textoCodificado = encodeURIComponent(mensajeCompartir);
        const urlCodificada = encodeURIComponent(urlProducto);

        let urlCompartir = '';

        switch (redSeleccionada) {
            case 'facebook':
                urlCompartir =
                    `https://www.facebook.com/sharer/sharer.php?u=${urlCodificada}`;
                break;

            case 'twitter':
                urlCompartir =
                    `https://twitter.com/intent/tweet?text=${textoCodificado}&url=${urlCodificada}`;
                break;

            case 'instagram':
                if (navigator.share) {
                    navigator.share({
                        title: producto.nombre,
                        text: mensajeCompartir,
                        url: urlProducto
                    }).catch((error) => {
                        if (error.name !== 'AbortError') {
                            console.error(
                                'Error al compartir:',
                                error
                            );
                        }
                    });

                    return;
                }

                navigator.clipboard.writeText(urlProducto);

                alert(
                    'El enlace del producto fue copiado. Podés pegarlo en Instagram para compartirlo.'
                );

                return;

            default:
                return;
        }

        window.open(
            urlCompartir,
            '_blank',
            'noopener,noreferrer,width=600,height=600'
        );
    };

    return (
        <>
            <button
                type="button"
                className="btn-compartir-producto"
                onClick={() => setMostrarVentana(true)}
                aria-label="Compartir producto"
            >
                <span className="btn-compartir-producto__icono" aria-hidden="true">
                    ↗
                </span>

                <span>
                    Compartir producto
                </span>
            </button>

            {mostrarVentana && (
                <div
                    className="compartir-overlay"
                    onClick={() => setMostrarVentana(false)}
                >
                    <div
                        className="compartir-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="titulo-compartir"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button
                            type="button"
                            className="compartir-modal__cerrar"
                            onClick={() => setMostrarVentana(false)}
                            aria-label="Cerrar ventana de compartir"
                        >
                            ×
                        </button>

                        <h2 id="titulo-compartir">
                            Compartir producto
                        </h2>

                        <div className="compartir-producto__contenido">

                            {Array.isArray(producto.imagenes) &&
                                producto.imagenes.length > 0 ? (
                                <img
                                    src={producto.imagenes[0]}
                                    alt={`Imagen de ${producto.nombre}`}
                                    className="compartir-producto__imagen"
                                />
                            ) : (
                                <div className="compartir-producto__imagen-placeholder">
                                    Sin imagen
                                </div>
                            )}

                            <div className="compartir-producto__info">

                                <h3>{producto.nombre}</h3>

                                <p>
                                    {producto.descripcion}
                                </p>

                                <span className="compartir-producto__url">
                                    {urlProducto}
                                </span>

                            </div>

                        </div>

                        <div className="compartir-redes">

                            <h3>
                                ¿Dónde querés compartirlo?
                            </h3>

                            <div className="compartir-redes__opciones">

                                <button
                                    type="button"
                                    className={`red-social ${redSeleccionada === 'facebook'
                                        ? 'red-social--seleccionada'
                                        : ''
                                        }`}
                                    onClick={() =>
                                        setRedSeleccionada('facebook')
                                    }
                                >
                                    Facebook
                                </button>

                                <button
                                    type="button"
                                    className={`red-social ${redSeleccionada === 'twitter'
                                        ? 'red-social--seleccionada'
                                        : ''
                                        }`}
                                    onClick={() =>
                                        setRedSeleccionada('twitter')
                                    }
                                >
                                    X / Twitter
                                </button>

                                <button
                                    type="button"
                                    className={`red-social ${redSeleccionada === 'instagram'
                                        ? 'red-social--seleccionada'
                                        : ''
                                        }`}
                                    onClick={() =>
                                        setRedSeleccionada('instagram')
                                    }
                                >
                                    Instagram
                                </button>

                            </div>

                        </div>

                        <div className="compartir-mensaje">

                            <label htmlFor="mensaje-compartir">
                                Mensaje personalizado
                            </label>

                            <textarea
                                id="mensaje-compartir"
                                value={mensaje}
                                onChange={(e) =>
                                    setMensaje(e.target.value)
                                }
                                placeholder={mensajePredeterminado}
                                rows="4"
                            />

                        </div>

                        <button
                            type="button"
                            className="btn-confirmar-compartir"
                            onClick={handleCompartir}
                        >
                            Compartir
                        </button>

                    </div>
                </div>
            )}
        </>
    );
};

export default CompartirProducto;