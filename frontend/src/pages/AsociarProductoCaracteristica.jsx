import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useCaracteristicaAPI from "../hooks/useCaracteristicaAPI";
import useProductoAPI from "../hooks/useProductoAPI";
import ListadoProductosAsociacion from "../components/ListadoProductosAsociacion";
import "../styles/pages/AsociarProductoCaracteristica.css";

const AsociarProductoCaracteristica = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const { getCaracteristicaPorId } = useCaracteristicaAPI();

    const {
        productos,
        fetchProductos,
        loading,
        setCaracteristicasProducto
    } = useProductoAPI();

    const [caracteristica, setCaracteristica] = useState(null);

    // Todavía no implementamos la lógica.
    // Solo dejamos preparado el estado.
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);

    const [productosSeleccionadosOriginal, setProductosSeleccionadosOriginal] = useState([]);

    useEffect(() => {

        const cargarDatos = async () => {

            try {

                const data = await getCaracteristicaPorId(id);

                setCaracteristica(data);

                await fetchProductos();

            } catch (error) {

                console.error(error);

            }

        };

        cargarDatos();

    }, [id]);

    useEffect(() => {

        if (!caracteristica || productos.length === 0) {

            return;

        }

        const asociados = productos
            .filter((producto) =>
                producto.caracteristicas?.some(
                    (caracteristicaProducto) =>
                        caracteristicaProducto.id === Number(id)
                )
            )
            .map((producto) => producto.id);

        setProductosSeleccionados(asociados);

        setProductosSeleccionadosOriginal(asociados);

    }, [productos, caracteristica, id]);

    const seleccionarProducto = (productoId) => {

        setProductosSeleccionados((prev) => {

            if (prev.includes(productoId)) {

                return prev.filter((id) => id !== productoId);

            }

            return [...prev, productoId];

        });

    };

    if (!caracteristica) {

        return (

            <section className="bloque">

                <h2>Cargando característica...</h2>

            </section>

        );

    }

    const guardarAsociaciones = async () => {

        const seleccionActual = [...productosSeleccionados].sort();

        const seleccionOriginal = [...productosSeleccionadosOriginal].sort();

        if (
            JSON.stringify(seleccionActual) ===
            JSON.stringify(seleccionOriginal)
        ) {

            alert("No se realizaron cambios.");

            return;

        }

        try {

            let cambiosRealizados = 0;

            for (const producto of productos) {

                // Características actuales del producto
                const caracteristicasActuales =
                    producto.caracteristicas?.map((c) => c.id) || [];

                // Copia para trabajar
                let nuevasCaracteristicas = [...caracteristicasActuales];

                const estaSeleccionado =
                    productosSeleccionados.includes(producto.id);

                const tieneCaracteristica =
                    caracteristicasActuales.includes(Number(id));

                // Agregar característica
                if (estaSeleccionado && !tieneCaracteristica) {

                    nuevasCaracteristicas.push(Number(id));

                }

                // Quitar característica
                if (!estaSeleccionado && tieneCaracteristica) {

                    nuevasCaracteristicas =
                        nuevasCaracteristicas.filter(
                            (caracteristicaId) =>
                                caracteristicaId !== Number(id)
                        );

                }

                // Solo actualizar si hubo cambios
                const huboCambios =
                    JSON.stringify(caracteristicasActuales.sort()) !==
                    JSON.stringify(nuevasCaracteristicas.sort());

                if (huboCambios) {

                    await setCaracteristicasProducto(
                        producto.id,
                        nuevasCaracteristicas
                    );

                    cambiosRealizados++;

                }

            }

            if (cambiosRealizados === 1) {

                alert("Se actualizó 1 producto correctamente.");

            } else {

                alert(
                    `Se actualizaron ${cambiosRealizados} productos correctamente.`
                );

            }

            await fetchProductos();

            navigate("/lista-caracteristicas");

        } catch (error) {

            console.error(error);

            alert(
                "No fue posible guardar las asociaciones. Intente nuevamente."
            );
        }

    };

    return (

        <section className="bloque">

            <h1>

                Asociar productos

            </h1>

            <h2>

                Característica: {caracteristica.nombre}

            </h2>

            <p className="contador-productos">

                Productos seleccionados:

                <strong>

                    {" "}{productosSeleccionados.length}

                </strong>

            </p>

            {loading ? (

                <p>

                    Cargando productos...

                </p>

            ) : (

                <>

                    <ListadoProductosAsociacion

                        productos={productos}

                        productosSeleccionados={productosSeleccionados}

                        onSeleccionarProducto={seleccionarProducto}

                    />

                    <div className="acciones-asociacion">

                        <button
                            className="btn btn-outline"
                            onClick={() => navigate("/lista-caracteristicas")}
                        >
                            Cancelar
                        </button>


                        <button
                            className="btn btn-filled"
                            onClick={guardarAsociaciones}
                        >

                            Guardar asociaciones

                        </button>

                    </div>

                </>

            )
            }

        </section>

    );

};

export default AsociarProductoCaracteristica;