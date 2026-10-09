import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/components/ListadoProductosFilatrados.css";

/**
 * Muestra productos recibidos por prop, permite expandir o contraer los
 * resultados y proporciona enlaces a los detalles de cada producto.
 * @param {{ productos?: Array }} props Lista de productos; por defecto, un arreglo vacío.
 */
const ListadoProductosFiltrados = ({ productos = [] }) => {

    // Controla la visibilidad de la lista; inicia en true para mostrar los resultados desplegados.
    const [abierto, setAbierto] = useState(true);

    // Si no hay productos, muestra un mensaje informativo y realiza un retorno anticipado.
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

            {/* El botón muestra la cantidad de productos y alterna abierto usando su valor anterior. */}
            <button
                type="button"
                className="resultados-filtro-header"
                onClick={() => setAbierto((prev) => !prev)}
                aria-expanded={abierto}
            >

                <span>
                    Productos encontrados: <strong>{productos.length}</strong>
                </span>

                {/* La clase de la flecha refleja abierto; aria-hidden la oculta de tecnologías de asistencia. */}
                <span
                    className={`resultados-filtro-flecha ${abierto ? "abierto" : ""
                        }`}
                    aria-hidden="true"
                >
                    ▼
                </span>
            </button>


            {/* Los resultados solo se muestran cuando abierto es verdadero. */}
            {abierto && (

                <div className="resultados-filtro-lista">

                    {/* map genera una fila por producto, identificada por su id mediante key. */}
                    {productos.map((producto) => (

                        <div
                            className="producto-filtrado-fila"
                            key={producto.id}
                        >

                            <div className="producto-filtrado-info">

                                {/* Cada fila muestra el nombre y la categoría, o «Sin categoría». */}
                                <h3>
                                    {producto.nombre}
                                </h3>

                                <span className="categoria">
                                    {producto.categoria?.nombre || "Sin categoría"}
                                </span>

                            </div>

                            {/* El enlace dirige a la ruta de detalle correspondiente al id del producto. */}
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