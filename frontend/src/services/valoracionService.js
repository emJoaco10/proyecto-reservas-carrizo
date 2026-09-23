import apiService from './apiService';

export const obtenerValoraciones = async (productoId) => {
    const response = await apiService.get(
        `/valoraciones/producto/${productoId}`
    );

    return response.data;
};

export const crearValoracion = async (
    productoId,
    puntuacion,
    comentario
) => {
    const response = await apiService.post(
        `/valoraciones/producto/${productoId}`,
        {
            puntuacion,
            comentario
        }
    );

    return response.data;
};

export const verificarPuedeValorar = async (productoId) => {
    const response = await apiService.get(
        `/reserva/puede-valorar/${productoId}`
    );

    return response.data;
};

export const verificarYaValoro = async (productoId) => {
    const response = await apiService.get(
        `/valoraciones/producto/${productoId}/ya-valoro`
    );

    return response.data;
};