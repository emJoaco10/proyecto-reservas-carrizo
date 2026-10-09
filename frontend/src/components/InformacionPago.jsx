import React from "react";
import "../styles/components/InformacionPago.css";

/**
 * Muestra la sección informativa relacionada con el pago de una reserva.
 */
const InformacionPago = () => {
    return (
        /* Sección principal de información de pago. */
        <section className="informacion-pago">

            {/* Encabezado que identifica el propósito de la sección. */}
            <h2>Información de pago</h2>

            {/* Contenedor del contenido informativo. */}
            <div className="informacion-pago__contenido">

                {/* Mensaje estático sobre la disponibilidad del pago y la reserva. */}
                <div className="informacion-pago__mensaje">
                    <h3>Pago</h3>

                    <p>
                        La información de pago estará disponible próximamente.
                    </p>

                    <span>
                        Actualmente no es necesario realizar ningún pago
                        para confirmar la reserva.
                    </span>
                </div>

            </div>

        </section>
    );
};

export default InformacionPago;