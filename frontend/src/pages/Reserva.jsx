import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProductoAPI from "../hooks/useProductoAPI";
import "../styles/pages/Reserva.css";
import CalendarioDisponibilidad from "../components/CalendarioDisponibilidad";
import useReservaAPI from "../hooks/useReservaAPI";

const Reserva = () => {
    const { id } = useParams();

    const { fetchProductoById, loading, error } = useProductoAPI();
    const { registrarReserva } = useReservaAPI();

    const [producto, setProducto] = useState(null);

    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [reservando, setReservando] = useState(false);
    const [mensajeReserva, setMensajeReserva] = useState("");
    const [errorReserva, setErrorReserva] = useState("");

    const handleFechasSeleccionadas = ({ fechaInicio, fechaFin }) => {
        setFechaInicio(fechaInicio);
        setFechaFin(fechaFin);
    };

    const handleConfirmarReserva = async () => {
        if (!fechaInicio || !fechaFin) {
            setErrorReserva("Seleccioná una fecha de inicio y una fecha de finalización.");
            return;
        }

        setReservando(true);
        setMensajeReserva("");
        setErrorReserva("");

        try {
            const reserva = await registrarReserva({
                productoId: producto.id,
                fechaInicio: fechaInicio.toISOString().split("T")[0],
                fechaFin: fechaFin.toISOString().split("T")[0]
            });

            if (reserva) {
                setMensajeReserva("Reserva realizada correctamente.");
            }
        } catch (error) {
            console.error("Error al realizar la reserva:", error);

            const mensaje =
                error?.response?.data ||
                "No se pudo realizar la reserva.";

            setErrorReserva(mensaje);
        } finally {
            setReservando(false);
        }
    };

    useEffect(() => {
        if (!id) return;

        const cargarProducto = async () => {
            const data = await fetchProductoById(id);
            setProducto(data);
        };

        cargarProducto();
    }, [id, fetchProductoById]);

    if (loading) {
        return (
            <main className="reserva-page">
                <div className="reserva-container">
                    <p>Cargando información del producto...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="reserva-page">
                <div className="reserva-container reserva-container--error">
                    <p>Error al cargar el producto: {error}</p>
                </div>
            </main>
        );
    }

    if (!producto) {
        return (
            <main className="reserva-page">
                <div className="reserva-container">
                    <p>No se encontró el producto seleccionado.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="reserva-page">
            <div className="reserva-container">

                <div className="reserva-header">
                    <h1>Realizar reserva</h1>
                    <p>
                        Seleccioná las fechas en las que querés reservar este alojamiento.
                    </p>
                </div>

                <section className="reserva-producto">
                    <h2>{producto.nombre}</h2>

                    <p>{producto.descripcion}</p>

                    {producto.imagenes?.length > 0 && (
                        <img
                            src={producto.imagenes[0]}
                            alt={`Imagen de ${producto.nombre}`}
                        />
                    )}
                </section>

                <section className="reserva-fechas">
                    <h2>Seleccionar fechas</h2>

                    <p>
                        Seleccioná la fecha de inicio y la fecha de finalización de tu reserva.
                    </p>

                    <CalendarioDisponibilidad
                        productoId={producto.id}
                        onFechasSeleccionadas={handleFechasSeleccionadas} />
                </section>

                <div className="reserva-confirmacion">

                    {mensajeReserva && (
                        <p className="reserva-confirmacion__exito">
                            {mensajeReserva}
                        </p>
                    )}

                    {errorReserva && (
                        <p className="reserva-confirmacion__error">
                            {errorReserva}
                        </p>
                    )}

                    <button
                        type="button"
                        className="btn-confirmar-reserva"
                        onClick={handleConfirmarReserva}
                        disabled={!fechaInicio || !fechaFin || reservando}
                    >
                        {reservando ? "Reservando..." : "Confirmar reserva"}
                    </button>

                </div>
            </div>
        </main>
    );
};

export default Reserva;