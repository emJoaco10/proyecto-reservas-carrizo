import { Link } from "react-router-dom";

const PanelAdministracionCaracteristicas = () => {

    return (
        <div className="admin-container">

            <h1>Administración de características</h1>

            <nav className="admin-menu">

                <ul>
                    <li>
                        <Link to="/lista-caracteristicas">
                            Listado de características
                        </Link>
                    </li>

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