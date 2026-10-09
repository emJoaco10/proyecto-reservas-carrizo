import { useEffect, useState } from "react";
import "../styles/components/CategoryFilter.css";

/**
 * Muestra categorías seleccionables, permite elegir varias y ofrece limpiar la selección.
 *
 * @param {Object} props Propiedades del componente.
 * @param {Array} props.categorias Categorías disponibles; por defecto, un arreglo vacío.
 * @param {Array} props.categoriasSeleccionadas Identificadores seleccionados recibidos del componente padre; por defecto, un arreglo vacío.
 * @param {Function} props.onCambiarCategorias Recibe la nueva colección de identificadores seleccionados.
 * @param {Function} props.onLimpiarFiltros Se invoca al solicitar la limpieza de los filtros.
 */
const CategoryFilter = ({
    categorias = [],
    categoriasSeleccionadas = [],
    onCambiarCategorias,
    onLimpiarFiltros
}) => {

    // Mantiene los identificadores de las categorías seleccionadas en el componente.
    const [seleccionadas, setSeleccionadas] = useState(
        categoriasSeleccionadas
    );

    // Actualiza la selección interna cuando cambia la propiedad recibida del componente padre.
    useEffect(() => {

        setSeleccionadas(categoriasSeleccionadas);

    }, [categoriasSeleccionadas]);

    /**
     * Alterna la selección de una categoría y comunica la colección resultante.
     * Comprueba si el identificador ya está seleccionado para eliminarlo o agregarlo.
     * Usa el actualizador funcional de setSeleccionadas para calcular el nuevo estado a partir del anterior.
     *
     * @param {*} categoriaId Identificador de la categoría seleccionada.
     */
    const seleccionarCategoria = (categoriaId) => {

        setSeleccionadas((prev) => {

            const yaSeleccionada = prev.includes(categoriaId);

            const nuevasCategorias = yaSeleccionada
                ? prev.filter((id) => id !== categoriaId)
                : [...prev, categoriaId];

            onCambiarCategorias(nuevasCategorias);

            return nuevasCategorias;

        });

    };

    /**
     * Restablece la selección interna a un arreglo vacío e invoca onLimpiarFiltros
     * para comunicar la solicitud de limpieza al componente padre.
     */
    const limpiarFiltros = () => {

        setSeleccionadas([]);

        onLimpiarFiltros();

    };

    return (

        <section className="category-filter">

            {/* Encabezado con el título y el botón de limpieza, visible si hay categorías seleccionadas. */}
            <div className="category-filter-header">

                <h2>Categorías</h2>

                {seleccionadas.length > 0 && (

                    <button
                        type="button"
                        className="btn btn-outline category-filter-limpiar"
                        onClick={limpiarFiltros}
                    >

                        Limpiar filtros

                    </button>
                )}
            </div>

            {/* Genera un elemento para cada categoría disponible. */}
            <div className="category-filter-lista">

                {categorias.map((categoria) => {

                    // Determina si el identificador de esta categoría está en la selección actual.
                    const seleccionada =
                        seleccionadas.includes(categoria.id);

                    return (

                        <button
                            key={categoria.id}
                            type="button"
                            {/* Las clases reflejan visualmente si la categoría está seleccionada. */}
                            className={
                                seleccionada
                                    ? "category-filter-item seleccionada"
                                    : "category-filter-item"
                            }
                            onClick={() =>
                                seleccionarCategoria(categoria.id)
                            }
                        >

                            {/* Indicador visual oculto a las tecnologías de asistencia porque el estado también se expresa en el botón. */}
                            <span
                                className="category-filter-checkbox"
                                aria-hidden="true"
                            >
                                {seleccionada ? "✓" : ""}
                            </span>

                            <span>
                                {categoria.nombre}
                            </span>
                        </button>
                    );
                })}
            </div>

        </section>
    );
};

export default CategoryFilter;