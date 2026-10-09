// React y sus hooks gestionan el estado local y los efectos del componente.
import React, { useEffect, useState } from "react";
// Hooks de enrutamiento para acceder a los parámetros y al estado de navegación.
import { useLocation, useParams } from "react-router-dom";
// Hook de consulta de productos y utilidad para leer datos del almacenamiento local.
import useProductoAPI from "../hooks/useProductoAPI";
import { leerLocal } from "../helpers/storageUtils";
// Hoja de estilos de la página y hook para registrar reservas.
import "../styles/pages/Reserva.css";
import useReservaAPI from "../hooks/useReservaAPI";
// Componentes que componen la información y las etapas visibles de la reserva.
import InfoReserva from "../components/InfoReserva";
import InformacionPago from "../components/InformacionPago";
import ConfirmacionReserva from "../components/ConfirmacionReserva";

/**
 * Página de reserva de un producto. Consulta su información, recopila los
 * datos necesarios y permite iniciar el proceso de confirmación.
 */
const Reserva = () => {
    // Identificador del producto obtenido de los parámetros de la ruta.
    const { id } = useParams();

    // Consulta del producto y estados de carga y error proporcionados por el hook.
    const { fetchProductoById, loading, error } = useProductoAPI();
    // Operación provista por el hook para registrar una reserva.
    const { registrarReserva } = useReservaAPI();

    // Almacena el producto consultado para representarlo en la página.
    const [producto, setProducto] = useState(null);

    // Estado de navegación usado para inicializar las fechas de la reserva.
    const location = useLocation();

    // Fechas recibidas en la navegación; se inicializan en null si no están disponibles.
    const [fechaInicio, setFechaInicio] = useState(
        location.state?.fechaInicio || null
    );

    const [fechaFin, setFechaFin] = useState(
        location.state?.fechaFin || null
    );

    // Datos del formulario: cantidad de huéspedes, DNI, edades y observaciones.
    const [datosReserva, setDatosReserva] = useState({
        cantidadHuespedes: "",
        dni: "",
        edadesHuespedes: "",
        observaciones: ""
    });

    // Controla si se muestra la interfaz de confirmación.
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    // Usuario leído del almacenamiento local y estados del envío y sus mensajes.
    const [usuario] = useState(() => leerLocal("usuario"));
    const [reservando, setReservando] = useState(false);
    const [mensajeReserva, setMensajeReserva] = useState("");
    const [errorReserva, setErrorReserva] = useState("");

    /**
     * Formatea una fecha para la configuración regional es-AR. Devuelve una
     * cadena vacía si no recibe fecha; formatea directamente las instancias de
     * Date y convierte los demás valores mediante new Date.
     */
    const formatearFecha = (fecha) => {
        if (!fecha) return "";

        if (fecha instanceof Date) {
            return fecha.toLocaleDateString("es-AR");
        }

        return new Date(fecha).toLocaleDateString("es-AR");
    };

    /**
     * Comprueba los datos requeridos, envía la reserva y, según el resultado,
     * muestra la confirmación o un mensaje de error. Siempre finaliza el estado
     * de procesamiento al terminar el intento.
     */
    const handleConfirmarReserva = async () => {
        // Se requieren las fechas de inicio y finalización.
        if (!fechaInicio || !fechaFin) {
            setErrorReserva("Seleccioná una fecha de inicio y una fecha de finalización.");
            return;
        }

        // La cantidad de huéspedes debe estar informada y ser mayor que cero.
        if (
            !datosReserva.cantidadHuespedes ||
            Number(datosReserva.cantidadHuespedes) <= 0
        ) {
            setErrorReserva(
                "La cantidad de huéspedes es obligatoria y debe ser mayor a 0."
            );
            return;
        }

        // Se exige que el DNI y las edades estén informados.
        if (!datosReserva.dni.trim()) {
            setErrorReserva("El DNI es obligatorio.");
            return;
        }

        if (!datosReserva.edadesHuespedes.trim()) {
            setErrorReserva("La edad de los huéspedes es obligatoria.");
            return;
        }

        // Separa las edades por comas, recorta espacios y descarta entradas vacías.
        const edades = datosReserva.edadesHuespedes
            .split(",")
            .map((edad) => edad.trim())
            .filter((edad) => edad !== "");

        // Compara la cantidad de edades ingresadas con la de huéspedes indicada.
        if (edades.length !== Number(datosReserva.cantidadHuespedes)) {
            setErrorReserva(
                `Debés ingresar la edad de los ${datosReserva.cantidadHuespedes} huéspedes.`
            );
            return;
        }

        // Las observaciones también son obligatorias para continuar.
        if (!datosReserva.observaciones.trim()) {
            setErrorReserva("Las observaciones son obligatorias.");
            return;
        }

        // Activa el procesamiento y limpia mensajes de intentos anteriores.
        setReservando(true);
        setMensajeReserva("");
        setErrorReserva("");

        try {
            // Envía el identificador, las fechas YYYY-MM-DD y los datos del formulario.
            const reserva = await registrarReserva({
                productoId: producto.id,
                fechaInicio: fechaInicio.toISOString().split("T")[0],
                fechaFin: fechaFin.toISOString().split("T")[0],
                cantidadHuespedes: Number(datosReserva.cantidadHuespedes),
                dni: datosReserva.dni,
                edadesHuespedes: datosReserva.edadesHuespedes,
                observaciones: datosReserva.observaciones
            });

            // Si el resultado es verdadero, limpia el mensaje y muestra la confirmación.
            if (reserva) {
                setMensajeReserva("");
                setMostrarConfirmacion(true);
            }
        } catch (error) {
            // Registra la excepción y establece el detalle disponible o el mensaje alternativo.
            console.error("Error al realizar la reserva:", error);

            const mensaje =
                error?.response?.data ||
                "No se pudo realizar la reserva.";

            setErrorReserva(mensaje);
        } finally {
            // Desactiva el estado de procesamiento al finalizar el intento.
            setReservando(false);
        }
    };

    // Si hay identificador, consulta el producto y almacena el resultado.
    useEffect(() => {
        if (!id) return;

        // Función asíncrona que solicita el producto al hook.
        const cargarProducto = async () => {
            const data = await fetchProductoById(id);
            setProducto(data);
        };

        cargarProducto();
    }, [id, fetchProductoById]);

    // Salidas anticipadas para la carga, el error de consulta o la falta de producto.
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

    // Contenido principal de la página cuando el producto está disponible.
    return (
        <main className="reserva-page">
            <div className="reserva-container">

                {/* Encabezado con el título y la explicación del proceso de reserva. */}
                <div className="reserva-header">
                    <h1>Realizar reserva</h1>
                    <p>
                        Seleccioná las fechas en las que querés reservar este alojamiento.
                    </p>
                </div>

                {/* Presenta nombre, imágenes, descripción, ubicación y características. */}
                <section className="reserva-producto">

                    <div className="reserva-producto__contenido">

                        <h2>Producto</h2>

                        <h3 className="reserva-producto__nombre">
                            {producto.nombre}
                        </h3>

                        {/* Si hay imágenes, genera un elemento para cada entrada de la colección. */}
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

                                {/* Representa cada característica con su icono opcional o informa si no hay. */}
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

                {/* Muestra los datos disponibles del usuario almacenado, o el texto alternativo. */}
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

                {/* Presenta las fechas mediante el formato local de formatearFecha. */}
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

                {/* Recibe los datos de la reserva y la función para actualizarlos. */}
                <InfoReserva
                    datosReserva={datosReserva}
                    onChange={setDatosReserva}
                />

                {/* Componente integrado en la interfaz de reserva. */}
                <InformacionPago />

                {/* Muestra mensajes de estado y permite iniciar el envío de la reserva. */}
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

                    {/* El botón invoca la validación y el envío; se deshabilita sin fechas o durante el envío. */}
                    <button
                        type="button"
                        className="btn-confirmar-reserva"
                        onClick={handleConfirmarReserva}
                        disabled={!fechaInicio || !fechaFin || reservando}
                    >
                        {/* El rótulo cambia mientras el envío está en curso. */}
                        {reservando ? "Reservando..." : "Confirmar reserva"}
                    </button>

                </div>

                {/* Se muestra según el estado y ofrece un callback para cerrarse. */}
                {mostrarConfirmacion && (
                    <ConfirmacionReserva
                        onCerrar={() => setMostrarConfirmacion(false)}
                    />
                )}
            </div>
        </main>
    );
};

export default Reserva;