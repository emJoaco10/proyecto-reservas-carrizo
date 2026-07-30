import "../styles/components/ConfirmacionModal.css";

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

    if (!abierto) return null;

    return (

        <div className="modal-overlay">

            <div className="modal-confirmacion">

                <h2>{titulo}</h2>

                <p>{mensaje}</p>

                <div className="modal-botones">

                    <button
                        className="btn btn-outline"
                        onClick={onCancelar}
                    >
                        {textoCancelar}
                    </button>

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