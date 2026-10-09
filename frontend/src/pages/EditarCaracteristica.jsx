// Hooks para gestionar el estado local y ejecutar efectos asociados a la carga.
import { useEffect, useState } from "react";
// Obtiene el identificador de la característica desde los parámetros de la ruta.
import { useParams } from "react-router-dom";
// Formulario reutilizado para presentar la edición de una característica.
import FormularioCaracteristicas from "../components/FormularioCaracteristicas";
// Hook que proporciona la consulta de características por identificador.
import useCaracteristicaAPI from "../hooks/useCaracteristicaAPI";
// Componente de navegación jerárquica de la sección administrativa.
import BreadcrumAdministracion from "../components/BreadcrumAdministracion";

/**
 * Obtiene una característica por su identificador y, cuando los datos están
 * disponibles, presenta el formulario correspondiente para editarla. La página
 * delega la edición del formulario a `FormularioCaracteristicas`, proporcionándole
 * `modo="editar"` y la característica obtenida.
 */
const EditarCaracteristica = () => {

    const { id } = useParams();

    const { getCaracteristicaPorId } = useCaracteristicaAPI();

    // Característica consultada; comienza en null y recibe el resultado cuando la consulta se resuelve correctamente.
    const [caracteristica, setCaracteristica] = useState(null);

    // Carga la característica y registra en consola las excepciones de la consulta.
    // Este efecto se vuelve a ejecutar cuando cambia el identificador `id`.
    useEffect(() => {

        // Consulta la característica por identificador y guarda el resultado en el estado.
        const fetchCaracteristica = async () => {

            try {

                const data = await getCaracteristicaPorId(id);

                setCaracteristica(data);

            } catch (error) {

                console.error(
                    "Error al obtener la característica:",
                    error
                );

            }

        };

        fetchCaracteristica();

    }, [id]);

    // Mientras no haya una característica disponible, muestra el mensaje de carga.
    if (!caracteristica) {

        return <p>Cargando característica...</p>;

    }

    // Con los datos disponibles, presenta la navegación administrativa y el formulario de edición.
    return (

        <>
            {/* Jerarquía: Administración → Administración de características → Listado de características → Editar característica. Los tres primeros elementos tienen ruta; el último representa la página actual. */}
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
                    label: "Editar característica"
                }
            ]} 
            
            />

            {/* El formulario recibe la característica consultada y se presenta en modo edición. */}
            <FormularioCaracteristicas
                modo="editar"
                caracteristica={caracteristica} />
                
        </>

    );

};

export default EditarCaracteristica;