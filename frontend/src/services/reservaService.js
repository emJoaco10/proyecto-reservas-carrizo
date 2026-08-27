import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reserva';

/**
 * Consulta si un producto está disponible para un rango
 * determinado de fechas.
 *
 * @param {number|string} productoId ID del producto.
 * @param {string} fechaInicio Fecha inicial en formato YYYY-MM-DD.
 * @param {string} fechaFin Fecha final en formato YYYY-MM-DD.
 * @returns {Promise<boolean>} true si está disponible.
 */
export const getDisponibilidad = async (
  productoId,
  fechaInicio,
  fechaFin
) => {

  const response = await axios.get(
    `${API_URL}/disponibilidad/${productoId}`,
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
 * Obtiene los productos disponibles para un rango
 * determinado de fechas.
 *
 * @param {string} fechaInicio Fecha inicial en formato YYYY-MM-DD.
 * @param {string} fechaFin Fecha final en formato YYYY-MM-DD.
 * @returns {Promise<Array>} productos disponibles.
 */
export const getProductosDisponibles = async (
  fechaInicio,
  fechaFin
) => {

  const response = await axios.get(
    `${API_URL}/disponibles`,
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
 * @param {Object} reserva Datos de la reserva.
 * @param {number} reserva.usuarioId ID del usuario.
 * @param {number} reserva.productoId ID del producto.
 * @param {string} reserva.fechaInicio Fecha inicial.
 * @param {string} reserva.fechaFin Fecha final.
 * @returns {Promise<Object>} reserva creada.
 */
export const createReserva = async (reserva) => {

  const response = await axios.post(
    API_URL,
    reserva
  );

  return response.data;
};