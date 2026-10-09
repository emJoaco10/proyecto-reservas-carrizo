import apiService from './apiService';

/**
 * Obtiene los productos favoritos asociados al usuario autenticado mediante
 * una solicitud GET a `/favoritos`.
 *
 * @returns {Promise<any>} Promesa que se resuelve con `response.data` si la
 * solicitud se completa correctamente.
 * @throws Los errores de la solicitud se propagan a quien invoque la función;
 * no se gestionan mediante un bloque `try/catch` propio.
 */
export const obtenerFavoritos = async () => {
    const response = await apiService.get('/favoritos');
    return response.data;
};

/**
 * Agrega un producto a los favoritos del usuario autenticado mediante una
 * solicitud POST a `/favoritos/${productoId}`, sin enviar un cuerpo explícito.
 *
 * @param {number} productoId ID del producto que se desea agregar a favoritos.
 * @returns {Promise<any>} Promesa que se resuelve con `response.data` si la
 * solicitud se completa correctamente.
 * @throws Los errores de la solicitud se propagan al código que invoca la
 * función.
 */
export const agregarFavorito = async (productoId) => {
    const response = await apiService.post(`/favoritos/${productoId}`);
    return response.data;
};

/**
 * Elimina de favoritos un producto del usuario autenticado mediante una
 * solicitud DELETE a `/favoritos/${productoId}`.
 *
 * @param {number} productoId ID del producto que se desea quitar de favoritos.
 * @returns {Promise<any>} Promesa que se resuelve con `response.data` si la
 * solicitud se completa correctamente.
 * @throws Los errores de la solicitud se propagan a quien invoque la función;
 * no se gestionan mediante un bloque `try/catch` propio.
 */
export const eliminarFavorito = async (productoId) => {
    const response = await apiService.delete(`/favoritos/${productoId}`);
    return response.data;
};