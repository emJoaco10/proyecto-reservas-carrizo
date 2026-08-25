import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/components/ListadoProductosFilatrados.css";

const ListadoProductosFiltrados = ({ productos = [] }) => {

    const [abierto, setAbierto] = useState(true);

    if (productos.length === 0) {
        return (
            <div className="resultados-filtro-vacio">
                <p>
                    No se encontraron productos para las categorías seleccionadas.
                </p>
            </div>
        );
    }

    return (
        <section className="listado-productos-filtrados">

            <button
                type="button"
                className="resultados-filtro-header"
                onClick={() => setAbierto((prev) => !prev)}
                aria-expanded={abierto}
            >

                <span>
                    Productos encontrados: <strong>{productos.length}</strong>
                </span>

                <span
                    className={`resultados-filtro-flecha ${abierto ? "abierto" : ""
                        }`}
                    aria-hidden="true"
                >
                    ▼
                </span>
            </button>


            {abierto && (

                <div className="resultados-filtro-lista">

                    {productos.map((producto) => (

                        <div
                            className="producto-filtrado-fila"
                            key={producto.id}
                        >

                            <div className="producto-filtrado-info">

                                <h3>
                                    {producto.nombre}
                                </h3>

                                <span className="categoria">
                                    {producto.categoria?.nombre || "Sin categoría"}
                                </span>

                            </div>

                            <Link
                                to={`/producto/${producto.id}`}
                                className="producto-filtrado-ver"
                            >
                                Ver más →
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ListadoProductosFiltrados;