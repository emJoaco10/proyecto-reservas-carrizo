import {
    getCaracteristicas,
    obtenerCaracteristicaPorId,
    postCaracteristica,
    putCaracteristica,
    deleteCaracteristica
} from "../services/caracteristicaService";

/**
 * Agrupa y expone las operaciones relacionadas con las características,
 * delegando las solicitudes al servicio `caracteristicaService`. No implementa
 * solicitudes HTTP ni agrega validaciones, estados de carga o manejo de errores
 * propios; cada función devuelve el resultado de la operación del servicio.
 *
 * @returns {Object} Objeto con las funciones públicas para operar con características.
 * @returns {Function} returns.obtenerCaracteristicas Consulta todas las características.
 * @returns {Function} returns.getCaracteristicaPorId Consulta una característica por su identificador.
 * @returns {Function} returns.registrarCaracteristica Crea una característica.
 * @returns {Function} returns.editarCaracteristica Actualiza una característica.
 * @returns {Function} returns.eliminarCaracteristica Elimina una característica.
 */
const useCaracteristicaAPI = () => {

    /**
     * Delega al servicio la consulta de todas las características.
     *
     * @returns {*} Resultado de la llamada a `getCaracteristicas()`.
     */
    const obtenerCaracteristicas = () => {
        return getCaracteristicas();
    };

    /**
     * Delega al servicio la consulta de una característica por su identificador.
     *
     * @param {*} id Identificador de la característica.
     * @returns {*} Resultado de la llamada a `obtenerCaracteristicaPorId(id)`.
     */
    const getCaracteristicaPorId = (id) => {
        return obtenerCaracteristicaPorId(id);
    };

    /**
     * Delega al servicio la creación de una característica.
     *
     * @param {Object} caracteristica Objeto que se enviará para crear la característica.
     * @returns {*} Resultado de la llamada a `postCaracteristica(caracteristica)`.
     */
    const registrarCaracteristica = (caracteristica) => {
        return postCaracteristica(caracteristica);
    };

    /**
     * Delega al servicio la actualización de una característica.
     *
     * @param {*} id Identificador de la característica que se actualizará.
     * @param {Object} caracteristica Objeto que se enviará para actualizarla.
     * @returns {*} Resultado de la llamada a `putCaracteristica(id, caracteristica)`.
     */
    const editarCaracteristica = (id, caracteristica) => {
        return putCaracteristica(id, caracteristica);
    };

    /**
     * Delega al servicio la eliminación de una característica.
     *
     * @param {*} id Identificador de la característica que se desea eliminar.
     * @returns {*} Resultado de la llamada a `deleteCaracteristica(id)`.
     */
    const eliminarCaracteristica = (id) => {
        return deleteCaracteristica(id);
    };

    /**
     * Expone las operaciones disponibles para consultar, crear, actualizar y
     * eliminar características.
     *
     * @returns {Object} Funciones públicas del hook.
     * @returns {Function} returns.obtenerCaracteristicas Consulta todas las características.
     * @returns {Function} returns.getCaracteristicaPorId Consulta una característica por identificador.
     * @returns {Function} returns.registrarCaracteristica Registra una característica.
     * @returns {Function} returns.editarCaracteristica Modifica una característica existente.
     * @returns {Function} returns.eliminarCaracteristica Elimina una característica.
     */
    return {
        obtenerCaracteristicas,
        getCaracteristicaPorId,
        registrarCaracteristica,
        editarCaracteristica,
        eliminarCaracteristica
    };
};

export default useCaracteristicaAPI;