import apiService from "./apiService";

/**
 * Centraliza las solicitudes HTTP relacionadas con características mediante
 * la instancia compartida `apiService`. Este servicio no valida los datos;
 * registra los errores y los vuelve a lanzar.
 */
/** Ruta base `/caracteristica` utilizada por las solicitudes HTTP del servicio. */
const URL_BASE = "/caracteristica";

/**
 * Obtiene todas las características mediante una solicitud GET a `URL_BASE`.
 * No recibe parámetros.
 *
 * @returns {Promise<*>} `response.data` cuando la solicitud se completa correctamente.
 * @throws {*} Registra el error en la consola y lo vuelve a lanzar si la solicitud falla.
 */
export const getCaracteristicas = async () => {
    try {
        const response = await apiService.get(URL_BASE);
        return response.data;
    } catch (error) {
        console.error("Error al obtener características:", error);
        throw error;
    }
};

/**
 * Obtiene una característica mediante una solicitud GET a la ruta formada por
 * `URL_BASE` y su identificador.
 *
 * @param {*} id Identificador de la característica.
 * @returns {Promise<*>} `response.data` si la solicitud tiene éxito.
 * @throws {*} Registra el error junto con el identificador y lo vuelve a lanzar si falla.
 */
export const obtenerCaracteristicaPorId = async (id) => {
    try {
        const response = await apiService.get(`${URL_BASE}/${id}`);
        return response.data;
    } catch (error) {
        console.error(
            `Error al obtener característica con id ${id}:`,
            error
        );
        throw error;
    }
};

/**
 * Envía una característica en el cuerpo de una solicitud POST a `URL_BASE`.
 *
 * @param {*} caracteristica Objeto de característica que se enviará al backend.
 * @returns {Promise<*>} `response.data` si la solicitud tiene éxito.
 * @throws {*} Registra el error en la consola y lo vuelve a lanzar si la solicitud falla.
 */
export const postCaracteristica = async (caracteristica) => {
    try {
        const response = await apiService.post(
            URL_BASE,
            caracteristica
        );

        return response.data;
    } catch (error) {
        console.error("Error al crear característica:", error);
        throw error;
    }
};

/**
 * Envía los datos de una característica mediante una solicitud PUT a la ruta
 * formada por `URL_BASE` y su identificador.
 *
 * @param {*} id Identificador de la característica.
 * @param {*} caracteristica Objeto con los datos que se enviarán.
 * @returns {Promise<*>} `response.data` si la solicitud tiene éxito.
 * @throws {*} Registra el error junto con el identificador y lo vuelve a lanzar si falla.
 */
export const putCaracteristica = async (id, caracteristica) => {
    try {
        const response = await apiService.put(
            `${URL_BASE}/${id}`,
            caracteristica
        );

        return response.data;
    } catch (error) {
        console.error(
            `Error al actualizar característica con id ${id}:`,
            error
        );
        throw error;
    }
};

/**
 * Elimina una característica mediante una solicitud DELETE a la ruta formada
 * por `URL_BASE` y su identificador.
 *
 * @param {*} id Identificador de la característica que se desea eliminar.
 * @returns {Promise<*>} `response.data` si la solicitud tiene éxito.
 * @throws {*} Registra el error junto con el identificador y lo vuelve a lanzar si falla.
 */
export const deleteCaracteristica = async (id) => {
    try {
        const response = await apiService.delete(
            `${URL_BASE}/${id}`
        );

        return response.data;
    } catch (error) {
        console.error(
            `Error al eliminar característica con id ${id}:`,
            error
        );
        throw error;
    }
};