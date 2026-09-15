import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/components/CalendarioDisponibilidad.css';
import useReservaAPI from '../hooks/useReservaAPI';

const CalendarioDisponibilidad = ({ productoId }) => {
    const { fetchDisponibilidad } = useReservaAPI();

    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [fechasOcupadas, setFechasOcupadas] = useState([]);
    const [cargandoDisponibilidad, setCargandoDisponibilidad] = useState(true);
    const [errorDisponibilidad, setErrorDisponibilidad] = useState('');
    const [mensajeSeleccion, setMensajeSeleccion] = useState('');

    /**
     * Convierte una fecha YYYY-MM-DD en una fecha local.
     */
    const convertirFechaLocal = (fechaString) => {
        const [anio, mes, dia] = fechaString.split('-').map(Number);

        return new Date(anio, mes - 1, dia);
    };

    /**
     * Obtiene todas las fechas comprendidas entre
     * fechaInicio y fechaFin.
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
     * Comprueba si una fecha está ocupada.
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
     * Comprueba si un rango contiene alguna fecha ocupada.
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
     * Obtiene las reservas del producto desde el backend.
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

    useEffect(() => {
        cargarDisponibilidad();
    }, [productoId, fetchDisponibilidad]);

    /**
     * Maneja la selección del rango.
     *
     * Las fechas ocupadas no pueden formar parte
     * de una reserva.
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
    };

    /**
     * Formatea una fecha para mostrarla al usuario.
     */
    const formatearFecha = (fecha) => {
        if (!fecha) return '';

        return fecha.toLocaleDateString('es-AR');
    };

    /**
     * Clase visual para identificar las fechas ocupadas.
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