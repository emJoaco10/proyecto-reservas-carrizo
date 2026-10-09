import apiService from './apiService';

/**
 * Centraliza las solicitudes HTTP de disponibilidad y reservas mediante la
 * instancia compartida `apiService`.
 */

/**
 * Obtiene los períodos reservados de un producto mediante una solicitud GET
 * a `/reserva/disponibilidad/{productoId}`.
 *
 * @param {number|string} productoId Identificador del producto.
 * @returns {Promise<Array>} Promesa que resuelve con `response.data` si la
 * solicitud tiene éxito; el resultado depende de la respuesta del backend.
 * @throws Los errores de la solicitud se propagan al código invocador; esta
 * función no cuenta con un bloque `try/catch` propio.
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
 * Realiza una solicitud GET a `/reserva/disponibles` y envía las fechas como
 * parámetros de consulta. Este endpoint está previsto para la búsqueda de
 * productos disponibles.
 *
 * @param {string} fechaInicio Fecha inicial en formato YYYY-MM-DD.
 * @param {string} fechaFin Fecha final en formato YYYY-MM-DD.
 * @returns {Promise<Array>} Promesa que resuelve con `response.data` si la
 * solicitud tiene éxito.
 * @throws Los errores de la solicitud se propagan al código invocador; esta
 * función no cuenta con un bloque `try/catch` propio.
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
 * Realiza una solicitud POST a `/reserva` y envía el objeto recibido en el
 * cuerpo de la solicitud. Este endpoint está previsto para la creación de
 * reservas.
 *
 * @param {Object} reserva Objeto con los datos de la reserva que se enviarán
 * al backend.
 * @returns {Promise<Object>} Promesa que resuelve con `response.data` si la
 * solicitud tiene éxito.
 * @throws Los errores de la solicitud se propagan al código invocador; esta
 * función no cuenta con un bloque `try/catch` propio.
 */
export const createReserva = async (reserva) => {
  const response = await apiService.post(
    '/reserva',
    reserva
  );

  return response.data;
};

/**
 * Obtiene las reservas asociadas al usuario autenticado mediante una
 * solicitud GET a `/reserva/mis-reservas`.
 *
 * @returns {Promise<Array>} Promesa que resuelve con `response.data` si la
 * solicitud tiene éxito.
 * @throws Los errores de la solicitud se propagan al código invocador; esta
 * función no cuenta con un bloque `try/catch` propio.
 */
export const obtenerMisReservas = async () => {
    const response = await apiService.get("/reserva/mis-reservas");

    return response.data;
};