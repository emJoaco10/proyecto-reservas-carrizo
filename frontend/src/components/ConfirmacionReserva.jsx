import React from "react";
import "../styles/components/ConfirmacionReserva.css";

const ConfirmacionReserva = ({ onCerrar }) => {
    return (
        <div className="confirmacion-reserva-overlay">
            <div className="confirmacion-reserva">

                <div className="confirmacion-reserva__icono">
                    ✓
                </div>

                <h2>¡Reserva realizada correctamente!</h2>

                <p>
                    Tu reserva fue registrada con éxito.
                </p>

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