import "../styles/components/ConfirmacionModal.css";

/**
 * Muestra una ventana modal de confirmación reutilizable, con contenido y acciones
 * configurables mediante propiedades. Las clases CSS definen su presentación visual.
 * @param {Object} props Propiedades del componente.
 * @param {boolean} props.abierto Determina si el modal debe mostrarse.
 * @param {string} props.titulo Texto que se presenta como encabezado.
 * @param {string} props.mensaje Contenido descriptivo de la confirmación.
 * @param {string} [props.textoConfirmar="Confirmar"] Texto del botón de confirmación.
 * @param {string} [props.textoCancelar="Cancelar"] Texto del botón de cancelación.
 * @param {Function} props.onConfirmar Función ejecutada al pulsar el botón de confirmación.
 * @param {Function} props.onCancelar Función ejecutada al pulsar el botón de cancelación.
 * @param {string} [props.claseBotonConfirmar="btn btn-filled"] Clases CSS del botón de confirmación.
 */
const ConfirmacionModal = ({
    abierto,
    titulo,
    mensaje,
    textoConfirmar = "Confirmar",
    textoCancelar = "Cancelar",
    onConfirmar,
    onCancelar,
    claseBotonConfirmar = "btn btn-filled"

}) => {

    // Si no está abierto, el componente no renderiza el modal.
    if (!abierto) return null;

    return (

        <div className="modal-overlay">

            {/* La superposición y este contenedor conforman la ventana modal. */}
            <div className="modal-confirmacion">

                {/* Presenta el encabezado y el contenido descriptivo. */}
                <h2>{titulo}</h2>

                <p>{mensaje}</p>

                {/* Agrupa las acciones disponibles en el modal. */}
                <div className="modal-botones">

                    {/* Usa el texto indicado y ejecuta la acción de cancelación recibida. */}
                    <button
                        className="btn btn-outline"
                        onClick={onCancelar}
                    >
                        {textoCancelar}
                    </button>

                    {/* Aplica las clases configuradas, muestra el texto y ejecuta la acción recibida. */}
                    <button
                        className={claseBotonConfirmar}
                        onClick={onConfirmar}
                    >
                        {textoConfirmar}
                    </button>

                </div>

            </div>

        </div>

    );

};

export default ConfirmacionModal;