import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormularioCaracteristicas from "../components/FormularioCaracteristicas";
import useCaracteristicaAPI from "../hooks/useCaracteristicaAPI";
import BreadcrumAdministracion from "../components/BreadcrumAdministracion";

const EditarCaracteristica = () => {

    const { id } = useParams();

    const { getCaracteristicaPorId } = useCaracteristicaAPI();

    const [caracteristica, setCaracteristica] = useState(null);

    useEffect(() => {

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

    if (!caracteristica) {

        return <p>Cargando característica...</p>;

    }

    return (

        <><BreadcrumAdministracion
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
            
            <FormularioCaracteristicas
                modo="editar"
                caracteristica={caracteristica} />
                
        </>

    );

};

export default EditarCaracteristica;