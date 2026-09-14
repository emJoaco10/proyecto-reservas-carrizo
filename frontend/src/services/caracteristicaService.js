import apiService from "./apiService";

const URL_BASE = "/caracteristica";

// Obtener todas las características
export const getCaracteristicas = async () => {
    try {
        const response = await apiService.get(URL_BASE);
        return response.data;
    } catch (error) {
        console.error("Error al obtener características:", error);
        throw error;
    }
};

// Obtener una característica por ID
export const obtenerCaracteristicaPorId = async (id) => {
    try {
        const response = await apiService.get(`${URL_BASE}/${id}`);
        return response.data;
    } catch (error) {
        console.error(
            `Error al obtener característica con id ${id}:`,
            error
        );
        throw error;
    }
};

// Crear una característica
export const postCaracteristica = async (caracteristica) => {
    try {
        const response = await apiService.post(
            URL_BASE,
            caracteristica
        );

        return response.data;
    } catch (error) {
        console.error("Error al crear característica:", error);
        throw error;
    }
};

// Actualizar una característica
export const putCaracteristica = async (id, caracteristica) => {
    try {
        const response = await apiService.put(
            `${URL_BASE}/${id}`,
            caracteristica
        );

        return response.data;
    } catch (error) {
        console.error(
            `Error al actualizar característica con id ${id}:`,
            error
        );
        throw error;
    }
};

// Eliminar una característica
export const deleteCaracteristica = async (id) => {
    try {
        const response = await apiService.delete(
            `${URL_BASE}/${id}`
        );

        return response.data;
    } catch (error) {
        console.error(
            `Error al eliminar característica con id ${id}:`,
            error
        );
        throw error;
    }
};