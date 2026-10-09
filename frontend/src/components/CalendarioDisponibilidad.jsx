import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/components/CalendarioDisponibilidad.css';
import useReservaAPI from '../hooks/useReservaAPI';

/**
 * Muestra la disponibilidad de un producto en un calendario, permite seleccionar
 * un rango de fechas y comunica al componente padre los rangos aceptados.
 *
 * @param {object} props Propiedades del componente.
 * @param {*} props.productoId Identificador del producto cuya disponibilidad se consulta.
 * @param {Function} props.onFechasSeleccionadas Recibe las fechas cuando se completa un rango válido, si está disponible.
 */
const CalendarioDisponibilidad = ({ productoId, onFechasSeleccionadas }) => {
    // El hook proporciona la función para consultar las reservas del producto.
    const { fetchDisponibilidad } = useReservaAPI();

    /*
     * fechaInicio y fechaFin representan el rango seleccionado; fechasOcupadas
     * reúne los días derivados de las reservas. Los demás estados indican la
     * carga, el error de consulta y los problemas con el rango elegido.
     */
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [fechasOcupadas, setFechasOcupadas] = useState([]);
    const [cargandoDisponibilidad, setCargandoDisponibilidad] = useState(true);
    const [errorDisponibilidad, setErrorDisponibilidad] = useState('');
    const [mensajeSeleccion, setMensajeSeleccion] = useState('');

    /**
     * Separa una fecha YYYY-MM-DD y construye una fecha local con sus componentes.
     * @param {string} fechaString Fecha en formato YYYY-MM-DD.
     * @returns {Date} Fecha local correspondiente.
     */
    const convertirFechaLocal = (fechaString) => {
        const [anio, mes, dia] = fechaString.split('-').map(Number);

        return new Date(anio, mes - 1, dia);
    };

    /**
     * Genera las fechas entre ambos extremos, incluidos, normalizadas a medianoche.
     * @param {Date} fechaInicio Inicio del intervalo.
     * @param {Date} fechaFin Fin del intervalo.
     * @returns {Date[]} Fechas comprendidas en el intervalo.
     */
    const obtenerFechasEntre = (fechaInicio, fechaFin) => {
        const fechas = [];

        const fechaActual = new Date(fechaInicio);
        fechaActual.setHours(0, 0, 0, 0);

        const fechaFinal = new Date(fechaFin);
        fechaFinal.setHours(0, 0, 0, 0);

        while (fechaActual <= fechaFinal) {
            fechas.push(new Date(fechaActual));

            fechaActual.setDate(
                fechaActual.getDate() + 1
            );
        }

        return fechas;
    };

    /**
     * Comprueba si la fecha coincide con alguna fecha ocupada, comparando a medianoche.
     * @param {Date} fecha Fecha que se quiere comprobar.
     * @returns {boolean} Indica si la fecha está ocupada.
     */
    const fechaEstaOcupada = (fecha) => {
        const fechaComparar = new Date(fecha);
        fechaComparar.setHours(0, 0, 0, 0);

        return fechasOcupadas.some((fechaOcupada) => {
            const fechaOcupadaNormalizada = new Date(fechaOcupada);
            fechaOcupadaNormalizada.setHours(0, 0, 0, 0);

            return (
                fechaComparar.getTime() ===
                fechaOcupadaNormalizada.getTime()
            );
        });
    };

    /**
     * Verifica si el rango incluye alguna fecha ocupada; si falta un extremo, devuelve false.
     * @param {Date|null} inicio Inicio del rango.
     * @param {Date|null} fin Fin del rango.
     * @returns {boolean} Indica si el rango contiene una fecha ocupada.
     */
    const rangoContieneFechaOcupada = (inicio, fin) => {
        if (!inicio || !fin) {
            return false;
        }

        const fechasDelRango = obtenerFechasEntre(
            inicio,
            fin
        );

        return fechasDelRango.some((fecha) =>
            fechaEstaOcupada(fecha)
        );
    };

    /**
     * Consulta las reservas mediante fetchDisponibilidad, expande sus fechas de inicio y fin
     * en días ocupados, actualiza los estados y gestiona errores y finalización de la carga.
     */
    const cargarDisponibilidad = async () => {
        if (!productoId) {
            setFechasOcupadas([]);
            setCargandoDisponibilidad(false);
            return;
        }

        setCargandoDisponibilidad(true);
        setErrorDisponibilidad('');
        setMensajeSeleccion('');

        try {
            const reservas =
                await fetchDisponibilidad(productoId);

            const fechas = [];

            reservas.forEach((reserva) => {
                if (
                    reserva.fechaInicio &&
                    reserva.fechaFin
                ) {
                    const inicio =
                        convertirFechaLocal(
                            reserva.fechaInicio
                        );

                    const fin =
                        convertirFechaLocal(
                            reserva.fechaFin
                        );

                    fechas.push(
                        ...obtenerFechasEntre(
                            inicio,
                            fin
                        )
                    );
                }
            });

            setFechasOcupadas(fechas);
        } catch (error) {
            console.error(
                '[CalendarioDisponibilidad] Error al obtener disponibilidad:',
                error
            );

            setFechasOcupadas([]);

            setErrorDisponibilidad(
                'No se pudo obtener la información de disponibilidad en este momento.'
            );
        } finally {
            setCargandoDisponibilidad(false);
        }
    };

    // Vuelve a consultar cuando cambia el producto o la función de consulta.
    useEffect(() => {
        cargarDisponibilidad();
    }, [productoId, fetchDisponibilidad]);

    /**
     * Gestiona el rango: conserva un inicio pendiente, rechaza rangos con fechas
     * ocupadas y notifica al padre cuando se completa uno aceptado.
     * @param {[Date|null, Date|null]} fechas Fechas inicial y final seleccionadas.
     */
    const handleCambioFechas = (fechas) => {
        const [inicio, fin] = fechas;

        setMensajeSeleccion('');

        /*
         * Se seleccionó solamente la fecha inicial.
         */
        if (inicio && !fin) {
            setFechaInicio(inicio);
            setFechaFin(null);
            return;
        }

        /*
         * Se completó el rango.
         */
        if (inicio && fin) {
            const rangoOcupado =
                rangoContieneFechaOcupada(
                    inicio,
                    fin
                );

            if (rangoOcupado) {
                setFechaInicio(inicio);
                setFechaFin(null);

                setMensajeSeleccion(
                    'El rango seleccionado contiene fechas ocupadas. Elegí una fecha de finalización disponible.'
                );

                return;
            }
        }

        setFechaInicio(inicio);
        setFechaFin(fin);

        if (inicio && fin && onFechasSeleccionadas) {
            onFechasSeleccionadas({
                fechaInicio: inicio,
                fechaFin: fin
            });
        }
    };

    /**
     * Devuelve una cadena vacía si no hay fecha; de lo contrario, la formatea para es-AR.
     * @param {Date|null} fecha Fecha que se mostrará.
     * @returns {string} Fecha formateada o una cadena vacía.
     */
    const formatearFecha = (fecha) => {
        if (!fecha) return '';

        return fecha.toLocaleDateString('es-AR');
    };

    /**
     * Devuelve la clase CSS de una fecha ocupada o una cadena vacía en otro caso.
     * @param {Date} fecha Fecha que se quiere clasificar.
     * @returns {string} Clase CSS correspondiente o cadena vacía.
     */
    const obtenerClaseDia = (fecha) => {
        if (fechaEstaOcupada(fecha)) {
            return 'calendario-dia-ocupado';
        }

        return '';
    };

    return (
        <section className="calendario-disponibilidad">

            <h2>Disponibilidad</h2>

            <p className="calendario-disponibilidad__descripcion">
                Seleccioná las fechas de tu estadía para consultar la disponibilidad.
            </p>

            {/* La consulta muestra su estado de carga o, ante un error, ofrece reintentar. */}
            {cargandoDisponibilidad && (
                <p className="calendario-disponibilidad__estado">
                    Cargando disponibilidad...
                </p>
            )}

            {!cargandoDisponibilidad &&
                errorDisponibilidad && (
                    <div
                        className="calendario-disponibilidad__error"
                        role="alert"
                    >
                        <p>
                            {errorDisponibilidad}
                        </p>

                        <button
                            type="button"
                            onClick={cargarDisponibilidad}
                            className="calendario-disponibilidad__reintentar"
                        >
                            Reintentar
                        </button>
                    </div>
                )}

            {!cargandoDisponibilidad &&
                !errorDisponibilidad && (
                    <>

                        {/* La leyenda distingue días disponibles y ocupados; el calendario muestra dos meses, limita la fecha mínima y permite navegar con un encabezado propio. excludeDates impide seleccionar días ocupados y dayClassName les aplica su estilo visual. */}
                        <div className="calendario-disponibilidad__leyenda">

                            <div className="calendario-disponibilidad__leyenda-item">
                                <span className="calendario-disponibilidad__indicador calendario-disponibilidad__indicador--disponible" />

                                <span>
                                    Disponible
                                </span>
                            </div>

                            <div className="calendario-disponibilidad__leyenda-item">
                                <span className="calendario-disponibilidad__indicador calendario-disponibilidad__indicador--ocupado" />

                                <span>
                                    Ocupado
                                </span>
                            </div>

                        </div>

                        <div className="calendario-disponibilidad__contenedor">

                            <DatePicker
                                selected={fechaInicio}

                                onChange={handleCambioFechas}

                                startDate={fechaInicio}

                                endDate={fechaFin}

                                selectsRange

                                monthsShown={2}

                                minDate={new Date()}

                                openToDate={new Date()}

                                excludeDates={fechasOcupadas}

                                dayClassName={obtenerClaseDia}

                                isClearable

                                dateFormat="dd/MM/yyyy"

                                placeholderText="Seleccioná un rango de fechas"

                                inline

                                renderCustomHeader={({
                                    monthDate,
                                    customHeaderCount,
                                    decreaseMonth,
                                    increaseMonth,
                                    prevMonthButtonDisabled,
                                    nextMonthButtonDisabled
                                }) => (

                                    <div className="calendario-disponibilidad__header">

                                        {customHeaderCount === 0 && (
                                            <button
                                                type="button"
                                                className="calendario-disponibilidad__nav calendario-disponibilidad__nav--prev"
                                                onClick={decreaseMonth}
                                                disabled={prevMonthButtonDisabled}
                                                aria-label="Mes anterior"
                                            >
                                                ‹
                                            </button>
                                        )}

                                        <span className="calendario-disponibilidad__mes">

                                            {monthDate.toLocaleDateString(
                                                'es-AR',
                                                {
                                                    month: 'long',
                                                    year: 'numeric'
                                                }
                                            ).replace(
                                                /^./,
                                                (letra) =>
                                                    letra.toUpperCase()
                                            )}

                                        </span>

                                        {customHeaderCount === 1 && (
                                            <button
                                                type="button"
                                                className="calendario-disponibilidad__nav calendario-disponibilidad__nav--next"
                                                onClick={increaseMonth}
                                                disabled={nextMonthButtonDisabled}
                                                aria-label="Mes siguiente"
                                            >
                                                ›
                                            </button>
                                        )}

                                    </div>

                                )}
                            />

                        </div>

                        {/* Se informa si el rango no es aceptable y, cuando está completo, se resumen sus extremos. */}
                        {mensajeSeleccion && (
                            <p
                                className="calendario-disponibilidad__mensaje"
                                role="alert"
                            >
                                {mensajeSeleccion}
                            </p>
                        )}

                        {fechaInicio && fechaFin && (
                            <p className="calendario-disponibilidad__seleccion">

                                Desde:{' '}

                                <strong>
                                    {formatearFecha(fechaInicio)}
                                </strong>

                                {' — '}

                                Hasta:{' '}

                                <strong>
                                    {formatearFecha(fechaFin)}
                                </strong>

                            </p>
                        )}

                    </>
                )}

        </section>
    );
};

export default CalendarioDisponibilidad;