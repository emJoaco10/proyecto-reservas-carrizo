import { ICONOS } from "../constantes/iconos";
import "../styles/components/CaracteristicaCard.css";

const CaracteristicaCard = ({
    caracteristica,
    onEditar,
    onEliminar,
    onAsociar
}) => {

    const iconoEncontrado = ICONOS.find(
        (item) => item.valor === caracteristica.icono
    );

    const Icono = iconoEncontrado?.icono;

    return (

        <article className="caracteristica-card">

            <div className="caracteristica-header">

                {Icono && (
                    <Icono
                        size={40}
                        className="caracteristica-icono"
                    />
                )}

                <h3>{caracteristica.nombre}</h3>

            </div>

            <div className="caracteristica-acciones">

                <div className="acciones-superiores">

                    <button
                        className="btn btn-filled"
                        onClick={() => onEditar?.(caracteristica)}
                    >
                        Editar
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={() => onEliminar?.(caracteristica)}
                    >
                        Eliminar
                    </button>

                </div>

                <button
                    className="btn btn-outline btn-asociar"
                    onClick={() => onAsociar?.(caracteristica)}
                >
                    Asociar producto
                </button>

            </div>

        </article>

    );

};

export default CaracteristicaCard;