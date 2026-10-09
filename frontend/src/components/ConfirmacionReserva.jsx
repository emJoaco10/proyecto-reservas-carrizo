import React from "react";
import "../styles/components/ConfirmacionReserva.css";

/**
 * Presenta una confirmación visual de que la reserva se registró correctamente
 * y ofrece una acción para continuar.
 * @param {object} props
 * @param {Function} props.onCerrar Función ejecutada al pulsar «Continuar».
 */
const ConfirmacionReserva = ({ onCerrar }) => {
    return (
        <div className="confirmacion-reserva-overlay">
            
            {/* La superposición y el contenedor, estilizados mediante clases CSS, presentan la confirmación. */}
            <div className="confirmacion-reserva">

                {/* El símbolo indica visualmente que la operación fue exitosa. */}
                <div className="confirmacion-reserva__icono">
                    ✓
                </div>

                {/* El título y el mensaje informan que la reserva se registró correctamente. */}
                <h2>¡Reserva realizada correctamente!</h2>

                <p>
                    Tu reserva fue registrada con éxito.
                </p>

                {/* «Continuar» ejecuta la función recibida al pulsarse. */}
                <button
                    type="button"
                    className="confirmacion-reserva__boton"
                    onClick={onCerrar}
                >
                    Continuar
                </button>

            </div>
        </div>
    );
};

export default ConfirmacionReserva;