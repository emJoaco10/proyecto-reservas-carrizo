// Hooks de React para el estado local y la ejecución del efecto de carga.
import { useEffect, useState } from "react";
// Hooks de enrutamiento para navegar y obtener el identificador de la ruta.
import { useNavigate, useParams } from "react-router-dom";
// Proporciona fetchCategoriaById y el estado de carga de la consulta.
import useCategoriaAPI from "../hooks/useCategoriaAPI";
// Formulario reutilizado para editar los datos de una categoría.
import FormularioCategoria from "../components/FormularioCategoria";
// Navegación jerárquica de la sección administrativa.
import BreadcrumAdministracion from "../components/BreadcrumAdministracion";
// Estilos específicos de esta página.
import "../styles/pages/CategoriaFormulario.css";

/**
 * Página que obtiene una categoría por su identificador y presenta el formulario
 * para editarla cuando los datos están disponibles. Gestiona los estados de
 * carga y error, y delega la edición de los datos a `FormularioCategoria`.
 */
function EditarCategorias() {

    const { id } = useParams();
    const navigate = useNavigate();

    const {
        fetchCategoriaById, loading
    } = useCategoriaAPI();

    // Almacena los datos obtenidos; `loading` proviene de useCategoriaAPI y no es estado local.
    const [categoria, setCategoria] = useState(null);
    // Mensaje que se muestra si falla la carga de la categoría.
    const [error, setError] = useState("");

    // Ejecuta la carga cuando cambia el identificador recibido desde la ruta.
    useEffect(() => {

        // Limpia errores anteriores, consulta la categoría y guarda los datos; ante una excepción, la registra y establece el mensaje de error.
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

        // Solo inicia la consulta si existe un identificador.
        if (id) {
            cargarCategoria();
        }

    // La dependencia [id] hace que el efecto se ejecute al cambiar el identificador.
    }, [id]);

    // Tras una operación exitosa comunicada por el formulario, navega al listado administrativo.
    const handleExito = () => {
        navigate("/categorias-admin");
    };

    // Durante la carga inicial, muestra el breadcrumb y el mensaje de espera.
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

    // Si hay un error, muestra el breadcrumb y el mensaje en una región de alerta.
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

    // Contenido principal: breadcrumb de Administración → Administración de categorías → Editar categoría; los dos primeros elementos tienen destino y el último indica la página actual.
    // Cuando hay datos, el formulario recibe la categoría inicial, el modo de edición y el callback de éxito.
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