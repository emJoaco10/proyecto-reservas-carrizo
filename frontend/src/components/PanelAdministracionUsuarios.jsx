import { Link } from "react-router-dom";

const PanelAdministracionUsuarios = () => {
    return (
        <section className="bloque">

            <h2>Administración de usuarios</h2>

            <p>
                Aquí podrás administrar los usuarios registrados del sistema.
            </p>

            <Link to="/lista-usuarios">
                <button className="btn btn-filled">
                    Lista de usuarios
                </button>
            </Link>

        </section>
    );
};

export default PanelAdministracionUsuarios;