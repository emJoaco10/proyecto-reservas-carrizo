import { useEffect, useState } from 'react';
import useReservaAPI from '../hooks/useReservaAPI';
import '../styles/pages/ListaReservas.css';

const ListaReservas = () => {

    const { fetchMisReservas } = useReservaAPI();

    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const cargarReservas = async () => {
            try {
                setCargando(true);
                setError(null);

                const data = await fetchMisReservas();

                setReservas(data);
            } catch (error) {
                console.error('Error al obtener mis reservas:', error);
                setError('No se pudieron cargar tus reservas.');
            } finally {
                setCargando(false);
            }
        };

        cargarReservas();

    }, [fetchMisReservas]);

    if (cargando) {
        return <p>Cargando tus reservas...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (reservas.length === 0) {
        return <p>No tenés reservas realizadas.</p>;
    }

    return (
        <section className="mis-reservas">

            <div className="mis-reservas-header">
                <h1>Mis reservas</h1>
                <p>Consultá tus reservas y el estado de cada una.</p>
            </div>

            <div className="reservas-lista">

                {reservas.map((reserva) => (
                    <article
                        key={reserva.id}
                        className={`reserva-card estado-${reserva.estado
                            .toLowerCase()
                            .replace(' ', '-')}`}
                    >

                        <div className="reserva-card-header">
                            <h2>{reserva.productoNombre}</h2>

                            <span className="reserva-estado">
                                {reserva.estado}
                            </span>
                        </div>

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