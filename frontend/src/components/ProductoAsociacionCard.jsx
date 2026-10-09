import "../styles/components/ProductoAsociacionCard.css";

/**
 * Representa una tarjeta de producto dentro de una interfaz de asociación.
 * @param {Object} props Propiedades del componente.
 * @param {Object} props.producto Datos mostrados del producto: identificador, nombre y categoría cuando está disponible.
 * @param {boolean} props.seleccionado Determina si la casilla aparece marcada.
 * @param {(id: number|string) => void} props.onSeleccionar Callback que se ejecuta al cambiar la casilla y recibe el identificador del producto.
 */
const ProductoAsociacionCard = ({
    producto,
    seleccionado,
    onSeleccionar
}) => {

    return (

        <article className="producto-asociacion-card">
            {/* Artículo principal que agrupa la información y la selección del producto. */}

            <div className="producto-info">
                {/* Presenta el nombre y la categoría del producto. */}

                <h3>

                    {producto.nombre}

                </h3>

                <p>

                    <strong>Categoría:</strong>{" "}

                    {producto.categoria
                        ? producto.categoria.nombre
                        /* Si no hay categoría, se muestra el texto alternativo «Sin categoría». */
                        : "Sin categoría"}

                </p>

            </div>

            {/* Contiene la casilla controlada por la prop seleccionado. */}
            <div className="producto-checkbox">

                <input
                    type="checkbox"
                    checked={seleccionado}
                    // Al cambiar, comunica la selección al componente padre con el identificador del producto.
                    onChange={() => onSeleccionar(producto.id)}
                />

            </div>

        </article>

    );

};

export default ProductoAsociacionCard;