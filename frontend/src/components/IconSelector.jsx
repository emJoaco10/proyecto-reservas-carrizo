import { ICONOS } from "../constantes/iconos.js";
import "../styles/components/IconSelector.css";

/**
 * Muestra una colección de iconos seleccionables y comunica al componente padre cuál se eligió.
 * @param {Object} props Propiedades del componente.
 * @param {*} props.value Valor del icono seleccionado actualmente.
 * @param {(event: { target: { name: string, value: * } }) => void} props.onChange
 * Función que recibe un objeto con estructura de evento de formulario; `target.name` es "icono"
 * y `target.value` contiene el identificador del icono seleccionado.
 */
const IconSelector = ({ value, onChange }) => {

    /**
     * Comunica la selección mediante un objeto que simula la estructura de `event.target`,
     * para que el componente padre pueda procesarla como una selección de un campo de formulario.
     * @param {*} valor Valor del icono seleccionado.
     */
    const seleccionarIcono = (valor) => {

        onChange({
            target: {
                name: "icono",
                value: valor
            }
        });

    };

    return (

        <div className="icon-selector">

            {/* Recorre la colección para generar una opción por cada icono. */}
            {ICONOS.map((item) => {

                /* Obtiene el componente visual definido para este elemento. */
                const Icono = item.icono;

                return (

                    <button
                        {/* Usa el identificador del icono para distinguir cada botón en la lista. */}
                        key={item.valor}
                        type="button"
                        {/* La clase refleja si este icono coincide con el valor seleccionado. */}
                        className={
                            value === item.valor
                                ? "icon-card seleccionada"
                                : "icon-card"
                        }
                        {/* Comunica al padre el identificador de la opción pulsada. */}
                        onClick={() => seleccionarIcono(item.valor)}
                    >

                        {/* Presenta el icono junto con su nombre. */}
                        <Icono size={32} />

                        <span>{item.nombre}</span>

                    </button>

                );

            })}

        </div>

    );

};

export default IconSelector;