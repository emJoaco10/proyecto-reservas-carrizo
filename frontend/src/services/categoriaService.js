/**
 * Servicio que centraliza las solicitudes HTTP relacionadas con categorías
 * mediante la instancia compartida `apiService`. Delega en ella la comunicación
 * con el backend y no realiza validaciones propias de los datos. Los errores se
 * registran en la consola y se vuelven a lanzar, sin ocultarlos ni resolverlos.
 * @module categoriaService
 */
import apiService from "./apiService";

/** Ruta base utilizada por las solicitudes HTTP de este servicio. */
const URL_BASE = "/categoria";

/**
 * Obtiene todas las categorías.
 * Realiza una solicitud GET a `URL_BASE`.
 * @returns {Promise<*>} Los datos de la respuesta (`response.data`).
 * @throws {*} Registra en la consola y vuelve a lanzar cualquier error de la solicitud.
 */
export const getCategorias = async () => {
    try {
        const response = await apiService.get(URL_BASE);

        return response.data;
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        throw error;
    }
};

/**
 * Obtiene una categoría por su identificador.
 * Realiza una solicitud GET a la ruta formada por `URL_BASE` y `id`.
 * @param {*} id Identificador de la categoría.
 * @returns {Promise<*>} Los datos de la respuesta (`response.data`).
 * @throws {*} Registra en la consola el error junto con el identificador y lo vuelve a lanzar.
 */
export const getCategoriaById = async (id) => {
    try {
        const response = await apiService.get(
            `${URL_BASE}/${id}`
        );

        return response.data;
    } catch (error) {
        console.error(
            `Error al obtener categoría con id ${id}:`,
            error
        );
        throw error;
    }
};

/**
 * Crea una categoría enviando el objeto recibido en el cuerpo de una solicitud POST a `URL_BASE`.
 * @param {*} categoria Objeto de categoría que se enviará al backend.
 * @returns {Promise<*>} Los datos de la respuesta (`response.data`).
 * @throws {*} Registra en la consola y vuelve a lanzar cualquier error de la solicitud.
 */
export const createCategoria = async (categoria) => {
    try {
        const response = await apiService.post(
            URL_BASE,
            categoria
        );

        return response.data;
    } catch (error) {
        console.error(
            "Error al crear categoría:",
            error
        );
        throw error;
    }
};

/**
 * Actualiza una categoría mediante una solicitud PUT a la ruta formada por `URL_BASE` y `id`.
 * @param {*} id Identificador de la categoría.
 * @param {*} categoria Objeto con los datos que se enviarán al backend.
 * @returns {Promise<*>} Los datos de la respuesta (`response.data`).
 * @throws {*} Registra en la consola el error junto con el identificador y lo vuelve a lanzar.
 */
export const updateCategoria = async (id, categoria) => {
    try {
        const response = await apiService.put(
            `${URL_BASE}/${id}`,
            categoria
        );

        return response.data;
    } catch (error) {
        console.error(
            `Error al actualizar categoría con id ${id}:`,
            error
        );
        throw error;
    }
};

/**
 * Elimina una categoría mediante una solicitud DELETE a la ruta formada por `URL_BASE` y `id`.
 * @param {*} id Identificador de la categoría que se desea eliminar.
 * @returns {Promise<*>} Los datos de la respuesta (`response.data`).
 * @throws {*} Registra en la consola el error junto con el identificador y lo vuelve a lanzar.
 */
export const deleteCategoria = async (id) => {
    try {
        const response = await apiService.delete(
            `${URL_BASE}/${id}`
        );

        return response.data;
    } catch (error) {
        console.error(
            `Error al eliminar categoría con id ${id}:`,
            error
        );
        throw error;
    }
};