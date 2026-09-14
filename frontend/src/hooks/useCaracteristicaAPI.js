import {
    getCaracteristicas,
    obtenerCaracteristicaPorId,
    postCaracteristica,
    putCaracteristica,
    deleteCaracteristica
} from "../services/caracteristicaService";

const useCaracteristicaAPI = () => {

    // Obtener todas las características
    const obtenerCaracteristicas = () => {
        return getCaracteristicas();
    };

    // Obtener característica por ID
    const getCaracteristicaPorId = (id) => {
        return obtenerCaracteristicaPorId(id);
    };

    // Crear característica
    const registrarCaracteristica = (caracteristica) => {
        return postCaracteristica(caracteristica);
    };

    // Actualizar característica
    const editarCaracteristica = (id, caracteristica) => {
        return putCaracteristica(id, caracteristica);
    };

    // Eliminar característica
    const eliminarCaracteristica = (id) => {
        return deleteCaracteristica(id);
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