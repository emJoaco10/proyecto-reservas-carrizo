import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormularioCaracteristicas from "../components/FormularioCaracteristicas";
import useCaracteristicaAPI from "../hooks/useCaracteristicaAPI";

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

        <FormularioCaracteristicas
            modo="editar"
            caracteristica={caracteristica}
        />

    );

};

export default EditarCaracteristica;