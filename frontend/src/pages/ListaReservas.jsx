// useEffect coordina la consulta con el ciclo de vida del componente; useState conserva el estado local.
import { useEffect, useState } from 'react';
// Aporta la función de API usada para consultar las reservas del usuario actual.
import useReservaAPI from '../hooks/useReservaAPI';
// Aplica los estilos propios de la página de reservas.
import '../styles/pages/ListaReservas.css';

/**
 * Muestra las reservas del usuario y contempla los estados de carga, error,
 * ausencia de resultados y listado de reservas.
 */
const ListaReservas = () => {

    // La función permite solicitar las reservas del usuario actual.
    const { fetchMisReservas } = useReservaAPI();

    // Lista de reservas obtenida para mostrar en la página.
    const [reservas, setReservas] = useState([]);
    // Indica si la consulta de reservas está en curso.
    const [cargando, setCargando] = useState(true);
    // Mensaje de error que se presenta en la interfaz cuando corresponde.
    const [error, setError] = useState(null);

    // Ejecuta la consulta al montar el componente y cuando cambia fetchMisReservas.
    // La dependencia mantiene el efecto asociado a la referencia vigente de esa función.
    useEffect(() => {

        // Realiza la consulta asíncrona y actualiza el estado según su resultado.
        const cargarReservas = async () => {
            try {
                // Inicia la carga y limpia cualquier mensaje de error anterior.
                setCargando(true);
                setError(null);

                // Obtiene las reservas y guarda los datos recibidos.
                const data = await fetchMisReservas();

                setReservas(data);
            } catch (error) {
                // Registra el error en consola y establece el mensaje para la interfaz.
                console.error('Error al obtener mis reservas:', error);
                setError('No se pudieron cargar tus reservas.');
            } finally {
                // Finaliza la indicación de carga independientemente del resultado.
                setCargando(false);
            }
        };

        // Inicia la carga de reservas desde el efecto.
        cargarReservas();

    }, [fetchMisReservas]);

    // Mientras se completa la consulta, muestra un mensaje de carga.
    if (cargando) {
        return <p>Cargando tus reservas...</p>;
    }

    // Si la consulta produjo un error, muestra el mensaje correspondiente.
    if (error) {
        return <p>{error}</p>;
    }

    // Si no hay resultados, informa que el usuario no tiene reservas realizadas.
    if (reservas.length === 0) {
        return <p>No tenés reservas realizadas.</p>;
    }

    // Presenta el encabezado de la página y el listado de reservas obtenidas.
    return (
        <section className="mis-reservas">

            {/* Encabezado que identifica la página y describe el contenido del listado. */}
            <div className="mis-reservas-header">
                <h1>Mis reservas</h1>
                <p>Consultá tus reservas y el estado de cada una.</p>
            </div>

            {/* Crea una tarjeta por cada reserva almacenada. */}
            <div className="reservas-lista">

                {reservas.map((reserva) => (
                    <article
                        key={reserva.id}
                        className={`reserva-card estado-${reserva.estado
                            .toLowerCase()
                            .replace(' ', '-')}`}
                    >

                        {/* La clave identifica la reserva; la clase CSS se deriva dinámicamente de su estado. */}
                        {/* El encabezado de la tarjeta muestra el nombre del producto y el estado de la reserva. */}
                        <div className="reserva-card-header">
                            <h2>{reserva.productoNombre}</h2>

                            <span className="reserva-estado">
                                {reserva.estado}
                            </span>
                        </div>

                        {/* Detalla las fechas de ingreso y salida y la cantidad de huéspedes. */}
                        <div className="reserva-card-info">

                            <div className="reserva-dato">
                                <span>Fecha de ingreso</span>
                                <strong>{reserva.fechaInicio}</strong>
                            </div>

                            <div className="reserva-dato">
                                <span>Fecha de salida</span>
                                <strong>{reserva.fechaFin}</strong>
                            </div>

                            <div className="reserva-dato">
                                <span>Huéspedes</span>
                                <strong>{reserva.cantidadHuespedes}</strong>
                            </div>

                        </div>

                    </article>
                ))}

            </div>

        </section>
    );
};

export default ListaReservas;