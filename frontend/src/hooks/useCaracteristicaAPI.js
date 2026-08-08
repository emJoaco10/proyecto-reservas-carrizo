import {
    getCaracteristicas,
    obtenerCaracteristicaPorId,
    postCaracteristica,
    putCaracteristica,
    deleteCaracteristica
} from "../services/caracteristicaService";

const useCaracteristicaAPI = () => {

    const obtenerCaracteristicas = async () => {
        return await getCaracteristicas();
    };

    const getCaracteristicaPorId = async (id) => {

    return await obtenerCaracteristicaPorId(id);

};

    const registrarCaracteristica = async (caracteristica) => {
        return await postCaracteristica(caracteristica);
    };

    const editarCaracteristica = async (id, caracteristica) => {
        return await putCaracteristica(id, caracteristica);
    };

    const eliminarCaracteristica = async (id) => {
        return await deleteCaracteristica(id);
    };

    return {

        obtenerCaracteristicas,

        getCaracteristicaPorId,

        registrarCaracteristica,

        editarCaracteristica,

        eliminarCaracteristica

    };

};

export default useCaracteristicaAPI;