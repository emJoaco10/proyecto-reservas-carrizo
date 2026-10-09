import { Link } from "react-router-dom";

/**
 * Presenta el panel de navegación para acceder a las opciones de administración
 * de usuarios. No recibe props.
 */
const PanelAdministracionUsuarios = () => {
    return (
        <section className="bloque">

            {/* Sección principal que agrupa el contenido del panel. */}
            {/* El encabezado y el párrafo describen el propósito de la sección. */}
            <h2>Administración de usuarios</h2>

            <p>
                Aquí podrás administrar los usuarios registrados del sistema.
            </p>

            {/* Enlace de React Router que permite acceder al listado de usuarios. */}
            <Link to="/lista-usuarios">
                {/* Las clases btn btn-filled definen la presentación visual del botón. */}
                <button className="btn btn-filled">
                    Lista de usuarios
                </button>
            </Link>

        </section>
    );
};

export default PanelAdministracionUsuarios;