import { useEffect, useState } from "react";
import "../styles/components/CategoryFilter.css";

const CategoryFilter = ({
    categorias = [],
    categoriasSeleccionadas = [],
    onCambiarCategorias,
    onLimpiarFiltros
}) => {

    const [seleccionadas, setSeleccionadas] = useState(
        categoriasSeleccionadas
    );

    useEffect(() => {

        setSeleccionadas(categoriasSeleccionadas);

    }, [categoriasSeleccionadas]);

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

    const limpiarFiltros = () => {

        setSeleccionadas([]);

        onLimpiarFiltros();

    };

    return (

        <section className="category-filter">

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

            <div className="category-filter-lista">

                {categorias.map((categoria) => {

                    const seleccionada =
                        seleccionadas.includes(categoria.id);

                    return (

                        <button
                            key={categoria.id}
                            type="button"
                            className={
                                seleccionada
                                    ? "category-filter-item seleccionada"
                                    : "category-filter-item"
                            }
                            onClick={() =>
                                seleccionarCategoria(categoria.id)
                            }
                        >

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