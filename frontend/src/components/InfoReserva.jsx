import React from "react";
import "../styles/components/InfoReserva.css";

const InfoReserva = ({ datosReserva, onChange }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;

        onChange({
            ...datosReserva,
            [name]: value
        });
    };

    return (
        <section className="info-reserva">

            <h2>Información de la reserva</h2>

            <div className="info-reserva__formulario">

                <div className="info-reserva__campo">
                    <label htmlFor="cantidadHuespedes">
                        Cantidad de huéspedes
                    </label>
                   /**
                    * Muestra y actualiza los datos del formulario de reserva.
                    * @param {Object} props
                    * @param {Object} props.datosReserva Valores actuales de los campos del formulario.
                    * @param {Function} props.onChange Callback que recibe el objeto actualizado con el campo modificado.
                    */

                    <input
                        /**
                         * Recibe el evento de cambio de un campo y extrae su `name` y `value`.
                         * Crea una copia de `datosReserva` con la propiedad correspondiente actualizada
                         * y la envía mediante `onChange` para que el componente padre gestione el estado.
                         */
                        type="number"
                        id="cantidadHuespedes"
                        name="cantidadHuespedes"
                        value={datosReserva.cantidadHuespedes}
                        onChange={handleChange}
                        placeholder="Ingresá la cantidad de huéspedes"
                        min="1"
                    />
                </div>

                <div className="info-reserva__campo">
                    <label htmlFor="dni">
                        DNI
                        {/* Sección principal con la información de la reserva. */}
                    </label>

                    <input
                        type="text"
                        id="dni"
                        name="dni"
                        value={datosReserva.dni}
                        onChange={handleChange}
                        placeholder="Ingresá el DNI"
                    />
                </div>


                <div className="info-reserva__campo">
                    <label htmlFor="edadesHuespedes">
                        Edad de los huéspedes
                        {/* Campo de texto para el DNI. */}
                    </label>

                    <input
                        type="text"
                        id="edadesHuespedes"
                        name="edadesHuespedes"
                        value={datosReserva.edadesHuespedes}
                        onChange={handleChange}
                        placeholder="Ej.: 25, 27"
                    />

                    <small>
                        Ingresá una edad por cada huésped, separadas por coma.
                    </small>
                </div>


                <div className="info-reserva__campo info-reserva__campo--completo">
                    <label htmlFor="observaciones">
                        Observaciones
                    </label>

                    <textarea
                        id="observaciones"
                        name="observaciones"
                        value={datosReserva.observaciones}
                        onChange={handleChange}
                        placeholder="Ingresá alguna observación"
                        maxLength="500"
                    />
                </div>

            </div>

            {/* Área de observaciones con un límite de 500 caracteres. */}
        </section>
    );
};

export default InfoReserva;