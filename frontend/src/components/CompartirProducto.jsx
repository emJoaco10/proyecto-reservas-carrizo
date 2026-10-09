import React, { useState } from 'react';
import '../styles/components/CompartirProducto.css';

/**
 * Muestra la información de un producto y permite compartir su enlace en
 * distintas redes sociales con un mensaje personalizable.
 * @param {{ producto?: { nombre: string, descripcion: string, imagenes: string[] } }} props
 *   `producto` contiene los datos que se muestran y comparten: nombre,
 *   descripción e imágenes. Si no está definido, el componente no renderiza contenido.
 */
const CompartirProducto = ({ producto }) => {
    // Controla si la ventana modal está visible.
    const [mostrarVentana, setMostrarVentana] = useState(false);
    // Identifica la red elegida; Facebook es la opción inicial.
    const [redSeleccionada, setRedSeleccionada] = useState('facebook');
    // Guarda el mensaje personalizado ingresado por el usuario.
    const [mensaje, setMensaje] = useState('');

    if (!producto) {
        return null;
    }

    // URL actual de la página.
    const urlProducto = window.location.href;

    // Mensaje inicial construido a partir del nombre del producto.
    const mensajePredeterminado =
        `Mirá este alojamiento: ${producto.nombre}`;

    // Usa el mensaje personalizado si no queda vacío al quitar espacios externos;
    // de lo contrario, recurre al mensaje predeterminado.
    const mensajeCompartir =
        mensaje.trim() || mensajePredeterminado;

    /**
     * Prepara y ejecuta la acción de compartir según la red seleccionada.
     * Codifica el mensaje y la URL; Facebook y X/Twitter generan sus respectivas
     * URL externas, que se abren en una ventana nueva. Instagram usa
     * `navigator.share` cuando está disponible; si falla, registra el error salvo
     * que sea una cancelación (`AbortError`). Si no está disponible, intenta copiar
     * la URL con `navigator.clipboard.writeText` y muestra un aviso al usuario.
     * La función puede finalizar anticipadamente según la red seleccionada.
     */
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
            {/* Abre la ventana de compartir; el nombre accesible identifica el botón. */}
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

            {/* La superposición cierra el modal al hacer clic fuera; dentro se detiene la propagación. */}
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

                        {/* Cierra el modal; los atributos del diálogo lo identifican para tecnologías de asistencia. */}
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

                            {/* Muestra la primera imagen disponible o un marcador alternativo. */}
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

                            {/* Presenta los datos del producto y la URL actual de la página. */}
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

                            {/* Permite elegir la red; el estilo señala la opción seleccionada. */}
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

                            {/* Campo para ingresar el mensaje personalizado que se compartirá. */}
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

                        {/* Ejecuta el flujo de compartir según la red elegida. */}
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