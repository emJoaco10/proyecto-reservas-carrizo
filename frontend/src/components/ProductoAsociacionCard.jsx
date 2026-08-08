import "../styles/components/ProductoAsociacionCard.css";

const ProductoAsociacionCard = ({
    producto,
    seleccionado,
    onSeleccionar
}) => {

    return (

        <article className="producto-asociacion-card">

            <div className="producto-info">

                <h3>

                    {producto.nombre}

                </h3>

                <p>

                    <strong>Categoría:</strong>{" "}

                    {producto.categoria
                        ? producto.categoria.nombre
                        : "Sin categoría"}

                </p>

            </div>

            <div className="producto-checkbox">

                <input
                    type="checkbox"
                    checked={seleccionado}
                    onChange={() => onSeleccionar(producto.id)}
                />

            </div>

        </article>

    );

};

export default ProductoAsociacionCard;