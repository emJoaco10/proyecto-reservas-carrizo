import ProductoAsociacionCard from "./ProductoAsociacionCard";
import "../styles/components/ListadoProductosAsociacion.css";

/**
 * Muestra tarjetas de asociación para una lista de productos y comunica la
 * selección al componente padre.
 * @param {Object} props
 * @param {Array} props.productos - Lista de productos que se deben mostrar.
 * @param {Array} props.productosSeleccionados - Identificadores de productos seleccionados.
 * @param {Function} props.onSeleccionarProducto - Callback para comunicar la selección desde cada tarjeta.
 */
const ListadoProductosAsociacion = ({
    productos,
    productosSeleccionados,
    onSeleccionarProducto
}) => {

    // Si la lista está vacía, muestra el mensaje y finaliza el renderizado con un retorno anticipado.
    if (productos.length === 0) {

        return (

            <p>

                No hay productos disponibles.

            </p>

        );

    }

    return (

        <section className="listado-productos-asociacion">
            {/* Sección que agrupa las tarjetas de asociación de los productos. */}

            
            {/* map crea una tarjeta por producto: key usa su ID, producto transmite sus datos, seleccionado comprueba su inclusión en productosSeleccionados y onSeleccionar recibe el callback del padre. */}
            {productos.map((producto) => (

                <ProductoAsociacionCard
                    key={producto.id}
                    producto={producto}
                    seleccionado={
                        productosSeleccionados.includes(producto.id)
                    }
                    onSeleccionar={onSeleccionarProducto}
                />

            ))}

        </section>

    );

};

export default ListadoProductosAsociacion;