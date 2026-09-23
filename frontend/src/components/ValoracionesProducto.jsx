import React, { useEffect, useState } from 'react';
import useProductoAPI from '../hooks/useProductoAPI';
import '../styles/components/ValoracionesProducto.css';
import { leerLocal } from '../helpers/storageUtils';

const ValoracionesProducto = ({ productoId, producto }) => {

    const usuario = leerLocal("usuario");

    const {
        fetchValoraciones,
        addValoracion,
        fetchPuedeValorar,
        fetchYaValoro
    } = useProductoAPI();

    const [valoraciones, setValoraciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [puntuacion, setPuntuacion] = useState(0);
    const [comentario, setComentario] = useState('');
    const [enviando, setEnviando] = useState(false);
    const [mensaje, setMensaje] = useState('');

    const [puedeValorar, setPuedeValorar] = useState(false);
    const [cargandoPermiso, setCargandoPermiso] = useState(true);
    const [yaValoro, setYaValoro] = useState(false);

    useEffect(() => {
        const cargarValoraciones = async () => {
            if (!productoId) {
                return;
            }

            try {
                setCargando(true);
                setError(null);

                const data = await fetchValoraciones(productoId);

                setValoraciones(data);
            } catch (err) {
                console.error(
                    'Error al cargar valoraciones:',
                    err
                );

                setError(
                    'No se pudieron cargar las valoraciones.'
                );
            } finally {
                setCargando(false);
            }
        };

        cargarValoraciones();
    }, [productoId, fetchValoraciones]);

    useEffect(() => {
        const verificarPermisos = async () => {
            if (!productoId) {
                return;
            }

            if (!usuario) {
                setPuedeValorar(false);
                setYaValoro(false);
                setCargandoPermiso(false);
                return;
            }

            try {
                setCargandoPermiso(true);

                const puedeValorarResultado =
                    await fetchPuedeValorar(productoId);

                setPuedeValorar(puedeValorarResultado);

                if (puedeValorarResultado) {
                    const yaValoroResultado =
                        await fetchYaValoro(productoId);

                    setYaValoro(yaValoroResultado);
                } else {
                    setYaValoro(false);
                }

            } catch (err) {
                console.error(
                    'Error al verificar permisos para valorar:',
                    err
                );

                setPuedeValorar(false);
                setYaValoro(false);

            } finally {
                setCargandoPermiso(false);
            }
        };

        verificarPermisos();

    }, [productoId, usuario?.email, fetchPuedeValorar, fetchYaValoro]);

    const calcularPromedio = () => {
        if (valoraciones.length === 0) {
            return 0;
        }

        const suma = valoraciones.reduce(
            (total, valoracion) =>
                total + valoracion.puntuacion,
            0
        );

        return suma / valoraciones.length;
    };

    const promedio = calcularPromedio();

    const seleccionarEstrella = (numero) => {
        setPuntuacion(numero);
        setMensaje('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (puntuacion === 0) {
            setMensaje(
                'Seleccioná una puntuación de 1 a 5 estrellas.'
            );
            return;
        }

        try {
            setEnviando(true);
            setMensaje('');

            const nuevaValoracion = await addValoracion(
                productoId,
                puntuacion,
                comentario
            );

            setValoraciones((valoracionesActuales) => [
                nuevaValoracion,
                ...valoracionesActuales
            ]);

            setYaValoro(true);

            setPuntuacion(0);
            setComentario('');

            setMensaje(
                '¡Gracias por tu valoración!'
            );

        } catch (err) {
            console.error(
                'Error al enviar valoración:',
                err
            );

            const mensajeError =
                err?.response?.data ||
                'No se pudo enviar la valoración.';

            setMensaje(mensajeError);
        } finally {
            setEnviando(false);
        }
    };

    const renderEstrellas = (valor) => {
        return (
            <div
                className="valoraciones-producto__estrellas"
                aria-label={`${valor} de 5 estrellas`}
            >
                {[1, 2, 3, 4, 5].map((estrella) => (
                    <span
                        key={estrella}
                        className={
                            estrella <= Math.round(valor)
                                ? 'estrella estrella--activa'
                                : 'estrella'
                        }
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <section className="valoraciones-producto">

            <div className="valoraciones-producto__header">

                <div>
                    <h2>Valoraciones</h2>

                    <p>
                        Conocé la experiencia de otros huéspedes.
                    </p>
                </div>

                <div className="valoraciones-producto__resumen">

                    <div className="valoraciones-producto__promedio">
                        <strong>
                            {promedio.toFixed(1)}
                        </strong>

                        <span>
                            / 5
                        </span>
                    </div>

                    {renderEstrellas(promedio)}

                    <span className="valoraciones-producto__cantidad">
                        {valoraciones.length}{' '}
                        {valoraciones.length === 1
                            ? 'valoración'
                            : 'valoraciones'}
                    </span>

                </div>

            </div>

            {cargandoPermiso ? (
                <div className="valoraciones-producto__login">
                    <p>
                        Verificando si podés dejar una valoración...
                    </p>
                </div>
            ) : !usuario ? (
                <div className="valoraciones-producto__login">
                    <h3>
                        ¿Querés dejar una valoración?
                    </h3>

                    <p>
                        Iniciá sesión para poder valorar este alojamiento.
                    </p>
                </div>
            ) : !puedeValorar ? (
                <div className="valoraciones-producto__login">
                    <h3>
                        Valoración disponible después de tu estadía
                    </h3>

                    <p>
                        Para dejar una valoración necesitás haber
                        completado una reserva en este alojamiento.
                    </p>
                </div>
            ) : yaValoro ? (
                <div className="valoraciones-producto__login">
                    <h3>
                        Ya valoraste este alojamiento
                    </h3>

                    <p>
                        Gracias por compartir tu experiencia.
                    </p>
                </div>
            ) : (
                <div className="valoraciones-producto__formulario">

                    <h3>
                        Dejá tu valoración
                    </h3>

                    <form onSubmit={handleSubmit}>

                        <div className="valoraciones-producto__seleccion">

                            <span>
                                Tu puntuación
                            </span>

                            <div
                                className="selector-estrellas"
                                role="radiogroup"
                                aria-label="Seleccionar puntuación"
                            >
                                {[1, 2, 3, 4, 5].map((estrella) => (
                                    <button
                                        key={estrella}
                                        type="button"
                                        className={
                                            estrella <= puntuacion
                                                ? 'estrella-selector estrella-selector--activa'
                                                : 'estrella-selector'
                                        }
                                        onClick={() =>
                                            seleccionarEstrella(estrella)
                                        }
                                        aria-label={`${estrella} estrellas`}
                                        aria-pressed={
                                            estrella === puntuacion
                                        }
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>

                        </div>

                        <div className="valoraciones-producto__campo">

                            <label htmlFor="comentario-valoracion">
                                Comentario
                            </label>

                            <textarea
                                id="comentario-valoracion"
                                value={comentario}
                                onChange={(e) =>
                                    setComentario(e.target.value)
                                }
                                placeholder="Contanos tu experiencia..."
                                rows="4"
                            />

                        </div>

                        <button
                            type="submit"
                            className="valoraciones-producto__boton"
                            disabled={enviando}
                        >
                            {enviando
                                ? 'Enviando...'
                                : 'Publicar valoración'}
                        </button>

                    </form>

                    {mensaje && (
                        <p
                            className="valoraciones-producto__mensaje"
                            role="alert"
                        >
                            {mensaje}
                        </p>
                    )}

                </div>
            )}

            <div className="valoraciones-producto__lista">

                {cargando && (
                    <p>
                        Cargando valoraciones...
                    </p>
                )}

                {error && (
                    <p
                        className="valoraciones-producto__error"
                    >
                        {error}
                    </p>
                )}

                {!cargando &&
                    !error &&
                    valoraciones.length === 0 && (
                        <div className="valoraciones-producto__vacio">
                            <p>
                                Este alojamiento todavía no tiene
                                valoraciones.
                            </p>
                        </div>
                    )}

                {!cargando &&
                    !error &&
                    valoraciones.map((valoracion) => (
                        <article
                            key={valoracion.id}
                            className="valoracion-card"
                        >

                            <div className="valoracion-card__header">

                                <div>
                                    <h4>
                                        {valoracion.nombreUsuario}
                                    </h4>

                                    <span>
                                        {valoracion.fecha}
                                    </span>
                                </div>

                                {renderEstrellas(
                                    valoracion.puntuacion
                                )}

                            </div>

                            {valoracion.comentario && (
                                <p className="valoracion-card__comentario">
                                    {valoracion.comentario}
                                </p>
                            )}

                        </article>
                    ))}

            </div>

        </section>
    );
};

export default ValoracionesProducto;