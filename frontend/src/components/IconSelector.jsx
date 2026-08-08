import { ICONOS } from "../constantes/iconos.js";
import "../styles/components/IconSelector.css";

const IconSelector = ({ value, onChange }) => {

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

            {ICONOS.map((item) => {

                const Icono = item.icono;

                return (

                    <button
                        key={item.valor}
                        type="button"
                        className={
                            value === item.valor
                                ? "icon-card seleccionada"
                                : "icon-card"
                        }
                        onClick={() => seleccionarIcono(item.valor)}
                    >

                        <Icono size={32} />

                        <span>{item.nombre}</span>

                    </button>

                );

            })}

        </div>

    );

};

export default IconSelector;