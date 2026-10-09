import { Link } from "react-router-dom";

/**
 * Presenta el panel de navegación para acceder a las opciones de administración de productos.
 * No recibe props.
 */
const PanelAdministracionProductos = () => {
    return (
        // Sección principal que agrupa el contenido del panel.
        <section className="bloque">

            {/* El encabezado y el párrafo presentan el propósito de la sección. */}
            <h2>Administración de productos</h2>

            <p>
                Aquí podrás administrar los productos publicados.
            </p>

            {/* Agrupa las opciones de navegación disponibles. */}
            <div className="acciones-productos">

                {/* Permite acceder al listado de productos. */}
                <Link to="/lista-productos">
                    {/* Ambos enlaces usan estas clases para mantener su presentación visual. */}
                    <button className="btn btn-filled">
                        Lista de productos
                    </button>
                </Link>

                {/* Permite acceder a la opción de agregar un producto. */}
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