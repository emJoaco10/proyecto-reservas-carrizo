import "../styles/components/UsuarioCard.css";

const UsuarioCard = ({ usuario , onCambiarRol }) => {

    const iniciales =
        `${usuario.nombre.charAt(0)}${usuario.apellido.charAt(0)}`.toUpperCase();

    return (

        <article className="usuario-card">

            <div className="usuario-datos">

                <div className="usuario-avatar">
                    {iniciales}
                </div>

                <div className="usuario-info">

                    <h3>
                        {usuario.nombre} {usuario.apellido}
                    </h3>

                    <p>{usuario.email}</p>

                </div>

            </div>

            <div className="usuario-acciones">

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

                <button
                    className={
                        usuario.rol === "ADMIN"
                            ? "btn btn-danger"
                            : "btn btn-filled"
                    }
                    onClick={() => onCambiarRol(usuario)}
                >

                    {usuario.rol === "ADMIN"
                        ? "Quitar administrador"
                        : "Hacer administrador"}

                </button>

            </div>

        </article>

    );

};

export default UsuarioCard;