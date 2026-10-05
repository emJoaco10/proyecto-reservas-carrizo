import React from "react";
import "../styles/components/InformacionPago.css";

const InformacionPago = () => {
    return (
        <section className="informacion-pago">

            <h2>Información de pago</h2>

            <div className="informacion-pago__contenido">

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