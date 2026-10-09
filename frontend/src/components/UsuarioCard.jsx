import "../styles/components/UsuarioCard.css";

/**
 * Representa una tarjeta con información de un usuario y permite solicitar un cambio de rol.
 * @param {Object} props Props del componente.
 * @param {Object} props.usuario Datos mostrados en la tarjeta: nombre, apellido, correo electrónico, identificador y rol cuando corresponda.
 * @param {Function} props.onCambiarRol Callback que se ejecuta al pulsar el botón y recibe el objeto usuario.
 */
const UsuarioCard = ({ usuario , onCambiarRol }) => {

    // Concatena la primera letra del nombre y del apellido y convierte el resultado a mayúsculas.
    const iniciales =
        `${usuario.nombre.charAt(0)}${usuario.apellido.charAt(0)}`.toUpperCase();

    return (

        <article className="usuario-card">
            {/* Artículo principal de la tarjeta del usuario. */}

            {/* Agrupa el avatar y la información personal. */}
            <div className="usuario-datos">

                {/* Muestra las iniciales calculadas. */}
                <div className="usuario-avatar">
                    {iniciales}
                </div>

                {/* Presenta el nombre completo y el correo electrónico. */}
                <div className="usuario-info">

                    <h3>
                        {usuario.nombre} {usuario.apellido}
                    </h3>

                    <p>{usuario.email}</p>

                </div>

            </div>

            {/* Agrupa la etiqueta del rol y el botón de acción. */}
            <div className="usuario-acciones">

                {/* La etiqueta y sus clases dependen del rol: ADMIN se muestra como «Administrador» y cualquier otro valor como «Usuario». */}
                <span
                    className={
                        usuario.rol === "ADMIN"
                            ? "badge-admin"
                            : "badge-user"
                    }
                >

                    {usuario.rol === "ADMIN"
                        ? "Administrador"
                        : "Usuario"}

                </span>

                {/* El texto y las clases dependen del rol; permite solicitar quitar los permisos de administrador o solicitarlos. */}
                <button
                    className={
                        usuario.rol === "ADMIN"
                            ? "btn btn-danger"
                            : "btn btn-filled"
                    }
                    onClick={() => onCambiarRol(usuario)}
                >

                    {/* onCambiarRol(usuario) comunica la acción al componente padre; esta tarjeta no actualiza directamente el rol. */}
                    {usuario.rol === "ADMIN"
                        ? "Quitar administrador"
                        : "Hacer administrador"}

                </button>

            </div>

        </article>

    );

};

export default UsuarioCard;