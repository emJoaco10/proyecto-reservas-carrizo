// Hooks de React para gestionar el estado local y ejecutar efectos asociados al ciclo de vida.
import { useEffect, useState } from "react";
// Hooks de enrutamiento para leer parámetros de la ruta y navegar entre páginas.
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Hooks de acceso a los datos de características y productos.
import useCaracteristicaAPI from "../hooks/useCaracteristicaAPI";
import useProductoAPI from "../hooks/useProductoAPI";
// Lista los productos y comunica al componente padre los cambios de selección.
import ListadoProductosAsociacion from "../components/ListadoProductosAsociacion";
// Estilos específicos de esta página.
import "../styles/pages/AsociarProductoCaracteristica.css";
// Breadcrumb con la jerarquía de navegación de la sección administrativa.
import BreadcrumAdministracion from "../components/BreadcrumAdministracion";

/**
 * Gestiona la asociación entre una característica y los productos.
 * Obtiene el identificador desde los parámetros de la ruta, carga los datos
 * necesarios, permite modificar la selección de productos y guarda las
 * asociaciones mediante las funciones proporcionadas por los hooks.
 */
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

    // Característica obtenida para mostrar sus datos en la página.
    const [caracteristica, setCaracteristica] = useState(null);

    // Todavía no implementamos la lógica.
    // Solo dejamos preparado el estado.
    // Identificadores de los productos seleccionados actualmente.
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);

    // Selección inicial, conservada para comparar si hubo cambios.
    const [productosSeleccionadosOriginal, setProductosSeleccionadosOriginal] = useState([]);

    /**
     * Carga la característica identificada en la ruta y solicita los productos.
     * Los errores de estas consultas se registran en consola. El efecto se
     * vuelve a ejecutar cuando cambia `id`.
     */
    useEffect(() => {

        // Ejecuta las consultas necesarias para preparar los datos de la página.
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

    /**
     * Cuando hay una característica y productos cargados, identifica los que
     * ya están asociados y establece tanto la selección actual como la original.
     * Depende de `[productos, caracteristica, id]`.
     */
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

    /**
     * Alterna la selección de un producto: elimina su identificador si ya está
     * seleccionado o lo agrega en caso contrario. Usa la actualización
     * funcional del estado para calcular el siguiente valor a partir del previo.
     * @param {number} productoId Identificador del producto que se alterna.
     */
    const seleccionarProducto = (productoId) => {

        setProductosSeleccionados((prev) => {

            if (prev.includes(productoId)) {

                return prev.filter((id) => id !== productoId);

            }

            return [...prev, productoId];

        });

    };

    // Mientras no esté disponible la característica, muestra el estado de carga.
    if (!caracteristica) {

        return (

            <section className="bloque">

                <h2>Cargando característica...</h2>

            </section>

        );

    }

    /**
     * Compara las selecciones actual y original y, si difieren, recorre los
     * productos para agregar o quitar la característica donde corresponda.
     * Actualiza únicamente los productos con cambios mediante llamadas
     * secuenciales con `await`, informa el resultado, vuelve a cargar los
     * productos y navega al listado. Si ocurre una excepción, la registra en
     * consola y muestra un mensaje de error; las actualizaciones no forman una
     * transacción atómica.
     */
    const guardarAsociaciones = async () => {

        // Ordena copias de ambas selecciones para comparar sus identificadores.
        const seleccionActual = [...productosSeleccionados].sort();

        const seleccionOriginal = [...productosSeleccionadosOriginal].sort();

        // Si no hay diferencias, informa al usuario y termina sin actualizar.
        if (
            JSON.stringify(seleccionActual) ===
            JSON.stringify(seleccionOriginal)
        ) {

            alert("No se realizaron cambios.");

            return;

        }

        try {

            let cambiosRealizados = 0;

            // Revisa cada producto y prepara sus características según la selección actual.
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

                // Persiste solo los productos cuya lista de características cambió.
                if (huboCambios) {

                    await setCaracteristicasProducto(
                        producto.id,
                        nuevasCaracteristicas
                    );

                    cambiosRealizados++;

                }

            }

            // Informa cuántos productos se actualizaron.
            if (cambiosRealizados === 1) {

                alert("Se actualizó 1 producto correctamente.");

            } else {

                alert(
                    `Se actualizaron ${cambiosRealizados} productos correctamente.`
                );

            }

            // Recarga los productos y regresa al listado de características.
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

            {/* Jerarquía: Administración → Administración de características → Listado de características → Asociar característica a productos. */}
            <BreadcrumAdministracion
                        items={[
                            {
                                label: "Administración",
                                path: "/administracion"
                            },
                            {
                                label: "Administración de características",
                                path: "/caracteristicas-admin"
                            },
                            {
                                label: "Listado de características",
                                path: "/lista-caracteristicas"
                            },
                            {
                                label: "Asociar característica a productos"
                            }
                        ]} 
                        
                        />

            {/* Encabezados con el título de la página y el nombre de la característica. */}
            <h1>

                Asociar productos

            </h1>

            <h2>

                Característica: {caracteristica.nombre}

            </h2>

            {/* El contador refleja la cantidad de identificadores seleccionados. */}
            <p className="contador-productos">

                Productos seleccionados:

                <strong>

                    {" "}{productosSeleccionados.length}

                </strong>

            </p>

            {/* Muestra la carga de productos o, cuando termina, la lista y las acciones. */}
            {loading ? (

                <p>

                    Cargando productos...

                </p>

            ) : (

                <>

                    {/* La lista recibe los productos, la selección actual y el alternador. */}
                    <ListadoProductosAsociacion

                        productos={productos}

                        productosSeleccionados={productosSeleccionados}

                        onSeleccionarProducto={seleccionarProducto}

                    />

                    {/* Acciones para cancelar la edición o guardar las asociaciones. */}
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