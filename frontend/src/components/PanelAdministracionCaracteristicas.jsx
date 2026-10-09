import { Link } from "react-router-dom";

/**
 * Presenta el panel de navegación para acceder a las opciones de administración
 * de características. No recibe props.
 */
const PanelAdministracionCaracteristicas = () => {

    return (
        <div className="admin-container">
            {/* Contenedor principal del panel de administración. */}

            {/* Identifica la sección de administración de características. */}
            <h1>Administración de características</h1>

            {/* Menú que agrupa las opciones de navegación disponibles. */}
            <nav className="admin-menu">

                <ul>
                    {/* Enlace de React Router al listado de características: /lista-caracteristicas. */}
                    <li>
                        <Link to="/lista-caracteristicas">
                            Listado de características
                        </Link>
                    </li>

                    {/* Enlace de React Router para agregar una característica: /agregar-caracteristica. */}
                    <li>
                        <Link to="/agregar-caracteristica">
                            Agregar característica
                        </Link>
                    </li>
                </ul>

            </nav>

        </div>
    );
};

export default PanelAdministracionCaracteristicas;