import apiService from './apiService';

/**
 * Obtiene los períodos reservados de un producto.
 *
 * @param {number|string} productoId ID del producto.
 * @returns {Promise<Array>} lista de períodos reservados.
 */
export const getDisponibilidad = async (productoId) => {
  const response = await apiService.get(
    `/reserva/disponibilidad/${productoId}`
  );

  return response.data;
};

/**
 * Obtiene los productos disponibles para un rango
 * determinado de fechas.
 *
 * Este endpoint será utilizado cuando se implemente
 * la búsqueda de productos disponibles.
 *
 * @param {string} fechaInicio Fecha inicial en formato YYYY-MM-DD.
 * @param {string} fechaFin Fecha final en formato YYYY-MM-DD.
 * @returns {Promise<Array>} productos disponibles.
 */
export const getProductosDisponibles = async (
  fechaInicio,
  fechaFin
) => {
  const response = await apiService.get(
    '/reserva/disponibles',
    {
      params: {
        fechaInicio,
        fechaFin
      }
    }
  );

  return response.data;
};

/**
 * Crea una nueva reserva.
 *
 * Este endpoint será utilizado cuando se implemente
 * la creación de reservas.
 *
 * @param {Object} reserva Datos de la reserva.
 * @returns {Promise<Object>} reserva creada.
 */
export const createReserva = async (reserva) => {
  const response = await apiService.post(
    '/reserva',
    reserva
  );

  return response.data;
};