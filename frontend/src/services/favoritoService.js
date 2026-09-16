import apiService from './apiService';

/**
 * Obtiene los productos favoritos del usuario autenticado.
 */
export const obtenerFavoritos = async () => {
    const response = await apiService.get('/favoritos');
    return response.data;
};

/**
 * Agrega un producto a los favoritos del usuario autenticado.
 *
 * @param {number} productoId - ID del producto
 */
export const agregarFavorito = async (productoId) => {
    const response = await apiService.post(`/favoritos/${productoId}`);
    return response.data;
};

/**
 * Elimina un producto de los favoritos del usuario autenticado.
 *
 * @param {number} productoId - ID del producto
 */
export const eliminarFavorito = async (productoId) => {
    const response = await apiService.delete(`/favoritos/${productoId}`);
    return response.data;
};