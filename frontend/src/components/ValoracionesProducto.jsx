import React, { useEffect, useState } from 'react';
import useProductoAPI from '../hooks/useProductoAPI';
import '../styles/components/ValoracionesProducto.css';
import { leerLocal } from '../helpers/storageUtils';

/**
 * Muestra las valoraciones de un producto y permite publicar una nueva
 * cuando se cumplen las condiciones de acceso implementadas.
 * @param {Object} props Propiedades del componente.
 * @param {*} props.productoId Identificador consultado y asociado a la nueva valoración.
 * @param {*} props.producto Objeto del producto recibido como propiedad.
 */
const ValoracionesProducto = ({ productoId, producto }) => {

    // Usuario recuperado del almacenamiento local.
    const usuario = leerLocal("usuario");

    // Operaciones de consulta y gestión de valoraciones y permisos de acceso.
    const {
        fetchValoraciones,
        addValoracion,
        fetchPuedeValorar,
        fetchYaValoro
    } = useProductoAPI();

    // Valoraciones cargadas y estados de consulta.
    const [valoraciones, setValoraciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Puntuación y comentario ingresados para una nueva valoración.
    const [puntuacion, setPuntuacion] = useState(0);
    const [comentario, setComentario] = useState('');

    // Estado de envío y mensaje presentado al usuario.
    const [enviando, setEnviando] = useState(false);
    const [mensaje, setMensaje] = useState('');

    // Estados usados para decidir si corresponde mostrar el formulario.
    const [puedeValorar, setPuedeValorar] = useState(false);
    const [cargandoPermiso, setCargandoPermiso] = useState(true);
    const [yaValoro, setYaValoro] = useState(false);

    // Consulta las valoraciones del producto, actualiza la lista y gestiona la
    // carga; si falla, registra el error y establece el mensaje correspondiente.
    // Dependencias: productoId y fetchValoraciones.
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

    // Comprueba si hay un usuario y consulta si puede valorar y, cuando puede,
    // si ya publicó una valoración. Gestiona la carga y, ante errores, registra
    // el fallo y restablece los indicadores de permiso.
    // Dependencias: productoId, usuario?.email, fetchPuedeValorar y fetchYaValoro.
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

    // Devuelve cero sin valoraciones; de lo contrario, calcula el promedio de
    // sus puntuaciones.
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

    // Actualiza la puntuación seleccionada y limpia el mensaje actual.
    const seleccionarEstrella = (numero) => {
        setPuntuacion(numero);
        setMensaje('');
    };

    // Evita el envío tradicional, exige una puntuación distinta de cero y
    // publica la valoración. Si tiene éxito, la antepone a la lista, actualiza
    // el estado de valoración previa, limpia los campos y muestra confirmación;
    // ante errores, muestra el mensaje disponible y siempre restablece el envío.
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

    // Genera cinco estrellas y aplica la clase activa según el valor recibido.
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

            {/* Encabezado con promedio, representación en estrellas y cantidad de valoraciones. */}
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

            {/* El acceso presenta el estado de comprobación, la falta de sesión,
                la falta de permiso o una valoración ya publicada; si ninguna
                condición lo impide, muestra el formulario. */}
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

                            {/* Selector accesible: el grupo identifica su propósito y cada botón comunica su puntuación y selección. */}
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

                        {/* Campo para ingresar el comentario de la valoración. */}
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

                        {/* El botón de envío queda deshabilitado durante el envío. */}
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

                    {/* Mensaje condicional anunciado como alerta. */}
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

            {/* Lista de valoraciones con estados de carga, error y lista vacía; cada elemento muestra autor, fecha y puntuación. */}
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

                                {/* Representa la puntuación de esta valoración con estrellas. */}
                                {renderEstrellas(
                                    valoracion.puntuacion
                                )}

                            </div>

                            {/* El comentario solo se presenta cuando existe. */}
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