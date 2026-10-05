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

                    <input
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

        </section>
    );
};

export default InfoReserva;