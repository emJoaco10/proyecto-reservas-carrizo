import { useCallback } from 'react';

import {
  getDisponibilidad,
  getProductosDisponibles,
  createReserva,
  obtenerMisReservas
} from '../services/reservaService';

/**
 * Hook personalizado que centraliza las operaciones relacionadas con reservas
 * y disponibilidad, delegando las solicitudes en las funciones importadas de
 * `reservaService`.
 *
 * No administra estados locales de carga o error ni implementa validaciones
 * propias.
 *
 * @returns {Object} Objeto con las funciones del hook.
 * @property {Function} fetchDisponibilidad Consulta los períodos reservados
 * de un producto.
 * @property {Function} fetchProductosDisponibles Consulta productos disponibles
 * entre dos fechas.
 * @property {Function} registrarReserva Delega la creación de una reserva.
 * @property {Function} fetchMisReservas Consulta las reservas del usuario
 * autenticado.
 */
const useReservaAPI = () => {

  /**
   * Consulta los períodos reservados de un producto, delegando la solicitud a
   * `getDisponibilidad(productoId)` y devolviendo el resultado de esa llamada.
   *
   * @param {number|string} productoId ID del producto.
   * @returns {Promise<Array>} Promesa con el resultado de la consulta.
   * @remarks Está definida mediante `useCallback` con un array de dependencias
   * vacío.
   */
  const fetchDisponibilidad = useCallback(async (productoId) => {
    return await getDisponibilidad(productoId);
  }, []);

  /**
    * Consulta los productos disponibles para un rango de fechas, delegando la
    * solicitud a `getProductosDisponibles(fechaInicio, fechaFin)` y devolviendo
    * el resultado de esa llamada.
   *
   * @param {string} fechaInicio Fecha inicial.
   * @param {string} fechaFin Fecha final.
    * @returns {Promise<Array>} Promesa con el resultado de la consulta.
    * @remarks Está definida mediante `useCallback` con dependencias vacías.
   */
  const fetchProductosDisponibles = useCallback(
    async (fechaInicio, fechaFin) => {
      return await getProductosDisponibles(
        fechaInicio,
        fechaFin
      );
    },
    []
  );

  /**
    * Delega la creación de una reserva a `createReserva(reserva)` y devuelve el
    * resultado de esa llamada.
   *
    * @param {Object} reserva Datos que se enviarán para crear la reserva.
    * @returns {Promise<Object>} Promesa con el resultado de la operación.
    * @remarks Está definida mediante `useCallback` con dependencias vacías.
   */
  const registrarReserva = useCallback(async (reserva) => {
    return await createReserva(reserva);
  }, []);

  /**
   * Consulta las reservas del usuario autenticado, delegando la solicitud a
   * `obtenerMisReservas()` y devolviendo el resultado de esa llamada.
   *
   * @returns {Promise<Array>} Promesa con el resultado de la consulta.
   * @remarks Está definida mediante `useCallback` con dependencias vacías.
   */
  const fetchMisReservas = useCallback(async () => {
    return await obtenerMisReservas();
  }, []);

  return {
    fetchDisponibilidad,
    fetchProductosDisponibles,
    registrarReserva,
    fetchMisReservas
  };
};

export default useReservaAPI;