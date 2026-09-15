import { useCallback } from 'react';

import {
  getDisponibilidad,
  getProductosDisponibles,
  createReserva
} from '../services/reservaService';

/**
 * Hook para centralizar las operaciones relacionadas
 * con reservas y disponibilidad.
 */
const useReservaAPI = () => {

  /**
   * Obtiene los períodos reservados de un producto.
   *
   * @param {number|string} productoId ID del producto.
   * @returns {Promise<Array>} períodos reservados.
   */
  const fetchDisponibilidad = useCallback(async (productoId) => {
    return await getDisponibilidad(productoId);
  }, []);

  /**
   * Obtiene los productos disponibles para un rango de fechas.
   *
   * @param {string} fechaInicio Fecha inicial.
   * @param {string} fechaFin Fecha final.
   * @returns {Promise<Array>} productos disponibles.
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
   * Crea una nueva reserva.
   *
   * @param {Object} reserva Datos de la reserva.
   * @returns {Promise<Object>} reserva creada.
   */
  const registrarReserva = useCallback(async (reserva) => {
    return await createReserva(reserva);
  }, []);

  return {
    fetchDisponibilidad,
    fetchProductosDisponibles,
    registrarReserva
  };
};

export default useReservaAPI;