import { ICONOS } from "../constantes/iconos";
import { CircleHelp } from "lucide-react";
import "../styles/components/CaracteristicasListado.css";

const CaracteristicasListado = ({ caracteristicas = [] }) => {

    return (

        <section className="caracteristicas-producto">

            <h2>Características</h2>

            {caracteristicas.length === 0 ? (

                <p className="sin-caracteristicas">

                    Este producto todavía no tiene características.

                </p>

            ) : (

                <div className="caracteristicas-lista">

                    {caracteristicas.map((caracteristica) => {

                        const iconoEncontrado = ICONOS.find(
                            (item) =>
                                item.valor === caracteristica.icono
                        );

                        const Icono =
                            iconoEncontrado?.icono || CircleHelp;

                        return (

                            <div
                                className="caracteristica-item"
                                key={caracteristica.id}
                            >

                                <Icono
                                    size={30}
                                    className="caracteristica-item-icono"
                                />

                                <span>
                                    {caracteristica.nombre}
                                </span>

                            </div>

                        );

                    })}

                </div>

            )}

        </section>

    );

};

export default CaracteristicasListado;