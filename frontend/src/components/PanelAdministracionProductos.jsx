import { Link } from "react-router-dom";

const PanelAdministracionProductos = () => {
    return (
        <section className="bloque">

            <h2>Administración de productos</h2>

            <p>
                Aquí podrás administrar los productos publicados.
            </p>

            <div className="acciones-productos">

                <Link to="/lista-productos">
                    <button className="btn btn-filled">
                        Lista de productos
                    </button>
                </Link>

                <Link to="/agregar-producto">
                    <button className="btn btn-filled">
                        Agregar producto
                    </button>
                </Link>

            </div>

        </section>
    );
};

export default PanelAdministracionProductos;