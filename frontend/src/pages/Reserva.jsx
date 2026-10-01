import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useProductoAPI from "../hooks/useProductoAPI";
import { leerLocal } from "../helpers/storageUtils";
import "../styles/pages/Reserva.css";
import useReservaAPI from "../hooks/useReservaAPI";

const Reserva = () => {
    const { id } = useParams();

    const { fetchProductoById, loading, error } = useProductoAPI();
    const { registrarReserva } = useReservaAPI();

    const [producto, setProducto] = useState(null);

    const location = useLocation();

    const [fechaInicio, setFechaInicio] = useState(
        location.state?.fechaInicio || null
    );

    const [fechaFin, setFechaFin] = useState(
        location.state?.fechaFin || null
    );

    const [usuario] = useState(() => leerLocal("usuario"));
    const [reservando, setReservando] = useState(false);
    const [mensajeReserva, setMensajeReserva] = useState("");
    const [errorReserva, setErrorReserva] = useState("");

    const formatearFecha = (fecha) => {
        if (!fecha) return "";

        if (fecha instanceof Date) {
            return fecha.toLocaleDateString("es-AR");
        }

        return new Date(fecha).toLocaleDateString("es-AR");
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

                    <div className="reserva-producto__contenido">

                        <h2>Producto</h2>

                        <h3 className="reserva-producto__nombre">
                            {producto.nombre}
                        </h3>

                        {producto.imagenes?.length > 0 && (
                            <div className="reserva-producto__imagenes">
                                {producto.imagenes.map((imagen, index) => (
                                    <img
                                        key={index}
                                        className="reserva-producto__imagen"
                                        src={imagen}
                                        alt={`Imagen ${index + 1} de ${producto.nombre}`}
                                    />
                                ))}
                            </div>
                        )}

                        <div className="reserva-producto__informacion">

                            <div className="reserva-producto__bloque">
                                <h3>Descripción</h3>

                                <p>
                                    {producto.descripcion}
                                </p>
                            </div>

                            <div className="reserva-producto__bloque">
                                <h3>Ubicación</h3>

                                <p>
                                    {producto.ubicacion}
                                </p>
                            </div>

                            <div className="reserva-producto__bloque">
                                <h3>Información</h3>

                                {producto.caracteristicas?.length > 0 ? (
                                    <div className="reserva-producto__caracteristicas">

                                        {producto.caracteristicas.map((caracteristica) => (
                                            <div
                                                key={caracteristica.id}
                                                className="reserva-producto__caracteristica"
                                            >
                                                {caracteristica.icono && (
                                                    <span>
                                                        {caracteristica.icono}
                                                    </span>
                                                )}

                                                <span>
                                                    {caracteristica.nombre}
                                                </span>
                                            </div>
                                        ))}

                                    </div>
                                ) : (
                                    <p>
                                        No hay información adicional disponible.
                                    </p>
                                )}

                            </div>

                        </div>

                    </div>

                </section>

                <section className="reserva-usuario">

                    <h2>Usuario</h2>

                    <div className="reserva-usuario__informacion">

                        <div className="reserva-usuario__dato">
                            <strong>Nombre:</strong>
                            <span>{usuario?.nombre || "No disponible"}</span>
                        </div>

                        <div className="reserva-usuario__dato">
                            <strong>Apellido:</strong>
                            <span>{usuario?.apellido || "No disponible"}</span>
                        </div>

                        <div className="reserva-usuario__dato">
                            <strong>Correo electrónico:</strong>
                            <span>{usuario?.email || "No disponible"}</span>
                        </div>

                    </div>

                </section>

                <section className="reserva-fechas">

                    <h2>Información de reserva</h2>

                    <div className="reserva-fechas__datos">

                        <div className="reserva-fechas__dato">
                            <strong>Fecha de ingreso:</strong>

                            <span>
                                {formatearFecha(fechaInicio)}
                            </span>
                        </div>

                        <div className="reserva-fechas__dato">
                            <strong>Fecha de salida:</strong>

                            <span>
                                {formatearFecha(fechaFin)}
                            </span>
                        </div>

                    </div>

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