import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCategoriaAPI from "../hooks/useCategoriaAPI";
import FormularioCategoria from "../components/FormularioCategoria";
import BreadcrumAdministracion from "../components/BreadcrumAdministracion";
import "../styles/pages/CategoriaFormulario.css";

function EditarCategorias() {

    const { id } = useParams();
    const navigate = useNavigate();

    const {
        fetchCategoriaById, loading
    } = useCategoriaAPI();

    const [categoria, setCategoria] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {

        const cargarCategoria = async () => {

            try {

                setError("");

                const data = await fetchCategoriaById(id);

                setCategoria(data);

            } catch (error) {

                console.error(
                    "Error al cargar categoría:",
                    error
                );

                setError(
                    "No se pudo cargar la categoría."
                );
            }
        };

        if (id) {
            cargarCategoria();
        }

    }, [id]);

    const handleExito = () => {
        navigate("/categorias-admin");
    };

    if (loading && !categoria) {

        return (
            <section className="bloque">

                <BreadcrumAdministracion
                    items={[
                        {
                            label: "Administración",
                            path: "/administracion"
                        },
                        {
                            label: "Administración de categorías",
                            path: "/categorias-admin"
                        },
                        {
                            label: "Editar categoría"
                        }
                    ]} />

                <p>Cargando categoría...</p>

            </section>
        );
    }

    if (error) {

        return (
            <section className="bloque">

                <BreadcrumAdministracion
                    items={[
                        {
                            label: "Administración",
                            path: "/administracion"
                        },
                        {
                            label: "Administración de categorías",
                            path: "/categorias-admin"
                        },
                        {
                            label: "Editar categoría"
                        }
                    ]} />

                <p role="alert">
                    {error}
                </p>

            </section>
        );
    }

    return (
        <section className="bloque">

            <BreadcrumAdministracion
                items={[
                    {
                        label: "Administración",
                        path: "/administracion"
                    },
                    {
                        label: "Administración de categorías",
                        path: "/categorias-admin"
                    },
                    {
                        label: "Editar categoría"
                    }
                ]} />

            <h1>Editar categoría</h1>

            <p className="descripcion-pagina">
                Modificá la información de la categoría y guardá los cambios.
            </p>

            {categoria && (
                <FormularioCategoria
                    categoriaInicial={categoria}
                    modoEdicion={true}
                    onExito={handleExito} />
            )}

        </section>
    );
}

export default EditarCategorias;