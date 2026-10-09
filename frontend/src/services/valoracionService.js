import apiService from './apiService';

/**
 * Centraliza las solicitudes HTTP de valoraciones de productos mediante `apiService`.
 */

/**
 * Obtiene las valoraciones asociadas a un producto.
 *
 * @param {string|number} productoId Identificador del producto.
 * @returns {Promise<*>} Datos (`response.data`) de la respuesta satisfactoria.
 * @throws {*} Propaga los errores de la solicitud al código que invoca la función.
 * @description Realiza una solicitud GET a `/valoraciones/producto/{productoId}`. No captura los errores.
 */
export const obtenerValoraciones = async (productoId) => {
    const response = await apiService.get(
        `/valoraciones/producto/${productoId}`
    );

    return response.data;
};

/**
 * Envía una valoración para un producto.
 *
 * @param {string|number} productoId Identificador del producto.
 * @param {*} puntuacion Puntuación que se enviará en la solicitud.
 * @param {string} comentario Comentario que se enviará en la solicitud.
 * @returns {Promise<*>} Datos (`response.data`) de la respuesta satisfactoria.
 * @throws {*} Propaga los errores de la solicitud al código que invoca la función.
 * @description Realiza una solicitud POST a `/valoraciones/producto/{productoId}` con `puntuacion` y `comentario` en el cuerpo. No captura los errores.
 */
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

/**
 * Consulta si se puede valorar un producto.
 *
 * @param {string|number} productoId Identificador del producto.
 * @returns {Promise<*>} Datos (`response.data`) de la respuesta satisfactoria.
 * @throws {*} Propaga los errores de la solicitud al código que invoca la función.
 * @description Realiza una solicitud GET a `/reserva/puede-valorar/{productoId}`, endpoint destinado a verificar si se puede valorar el producto. No captura los errores ni determina los criterios de esa decisión.
 */
export const verificarPuedeValorar = async (productoId) => {
    const response = await apiService.get(
        `/reserva/puede-valorar/${productoId}`
    );

    return response.data;
};

/**
 * Consulta el endpoint que informa si el usuario ya valoró un producto.
 *
 * @param {string|number} productoId Identificador del producto.
 * @returns {Promise<*>} Datos (`response.data`) de la respuesta satisfactoria.
 * @throws {*} Propaga los errores de la solicitud al código que invoca la función.
 * @description Realiza una solicitud GET a `/valoraciones/producto/{productoId}/ya-valoro`. No registra ni modifica una valoración y no captura los errores.
 */
export const verificarYaValoro = async (productoId) => {
    const response = await apiService.get(
        `/valoraciones/producto/${productoId}/ya-valoro`
    );

    return response.data;
};