import ProductoAsociacionCard from "./ProductoAsociacionCard";
import "../styles/components/ListadoProductosAsociacion.css";

const ListadoProductosAsociacion = ({
    productos,
    productosSeleccionados,
    onSeleccionarProducto
}) => {

    if (productos.length === 0) {

        return (

            <p>

                No hay productos disponibles.

            </p>

        );

    }

    return (

        <section className="listado-productos-asociacion">

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