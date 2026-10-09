import { ICONOS } from "../constantes/iconos";
import { CircleHelp } from "lucide-react";
import "../styles/components/CaracteristicasListado.css";

/**
 * Muestra las características asociadas a un producto con sus iconos y nombres.
 * @param {{ caracteristicas?: Array<{ id: string|number, icono: string, nombre: string }> }} props
 * Colección de características; si se omite, se utiliza un arreglo vacío.
 */
const CaracteristicasListado = ({ caracteristicas = [] }) => {

    return (

        <section className="caracteristicas-producto">

            {/* Sección principal y encabezado; la clase define su presentación visual. */}
            <h2>Características</h2>

            {caracteristicas.length === 0 ? (

                /* Mensaje presentado cuando la colección no contiene características. */
                <p className="sin-caracteristicas">

                    Este producto todavía no tiene características.

                </p>

            ) : (

                /* La lista se genera recorriendo la colección; sus clases controlan la presentación. */
                <div className="caracteristicas-lista">

                    {caracteristicas.map((caracteristica) => {

                        // Busca el icono cuyo valor coincide con caracteristica.icono.
                        const iconoEncontrado = ICONOS.find(
                            (item) =>
                                item.valor === caracteristica.icono
                        );

                        // Si no hay coincidencia, utiliza el icono genérico CircleHelp.
                        const Icono =
                            iconoEncontrado?.icono || CircleHelp;

                        return (

                            /* Cada elemento usa su id como clave y muestra el icono y el nombre. */
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