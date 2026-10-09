import { ICONOS } from "../constantes/iconos";
import "../styles/components/CaracteristicaCard.css";

/**
 * Representa una característica mediante su icono y nombre, y ofrece acciones
 * para editarla, eliminarla o asociarla a un producto.
 * @param {Object} props Propiedades del componente.
 * @param {Object} props.caracteristica Datos mostrados; se utilizan `icono` y `nombre`.
 * @param {Function} [props.onEditar] Recibe la característica al solicitar su edición.
 * @param {Function} [props.onEliminar] Recibe la característica al solicitar su eliminación.
 * @param {Function} [props.onAsociar] Recibe la característica al solicitar asociarla a un producto.
 */
const CaracteristicaCard = ({
    caracteristica,
    onEditar,
    onEliminar,
    onAsociar
}) => {

    // Busca en el catálogo el elemento cuyo valor coincide con el icono de la característica.
    const iconoEncontrado = ICONOS.find(
        (item) => item.valor === caracteristica.icono
    );

    // Obtiene el componente de icono si se encontró una coincidencia.
    const Icono = iconoEncontrado?.icono;

    return (

        <article className="caracteristica-card">

            {/* La cabecera presenta el icono (si existe) y el nombre de la característica. */}
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

                {/* Las clases CSS organizan visualmente las acciones de la tarjeta. */}
                <div className="acciones-superiores">

                    {/* Los callbacks disponibles reciben la característica al solicitar cada acción. */}
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

                {/* Solicita la asociación con un producto mediante el callback disponible. */}
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