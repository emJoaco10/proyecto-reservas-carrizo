import apiService from "./apiService";

/**
 * Centraliza las solicitudes HTTP relacionadas con las operaciones de usuarios
 * y reutiliza la instancia compartida `apiService`.
 */
/** Ruta base utilizada para las solicitudes HTTP de este servicio. */
const URL_BASE = "/usuario";

/**
 * Registra un usuario mediante una solicitud POST a `/usuario/registro`.
 * Envía `usuarioData` en el cuerpo de la solicitud.
 *
 * @param {Object} usuarioData Objeto con los datos que se enviarán para registrar al usuario.
 * @returns {*} Los datos incluidos en `response.data` si la solicitud tiene éxito.
 * @throws {*} Registra el error en la consola y vuelve a lanzarlo si la solicitud falla.
 */
export const registerUsuario = async (usuarioData) => {
    try {
        const response = await apiService.post(
            `${URL_BASE}/registro`,
            usuarioData
        );

        return response.data;
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        throw error;
    }
};

/**
 * Inicia sesión mediante una solicitud POST a `/usuario/login`.
 * Envía `credenciales` en el cuerpo de la solicitud.
 *
 * @param {Object} credenciales Objeto que se envía para iniciar sesión.
 * @returns {*} Los datos incluidos en `response.data` si la solicitud tiene éxito.
 * @throws {*} Registra el error en la consola y vuelve a lanzarlo si la solicitud falla.
 */
export const loginUsuario = async (credenciales) => {
    try {
        const response = await apiService.post(
            `${URL_BASE}/login`,
            credenciales
        );

        return response.data;
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error;
    }
};

/**
 * Obtiene usuarios mediante una solicitud GET a `/usuario`.
 *
 * @returns {*} Los datos incluidos en `response.data` si la solicitud tiene éxito.
 * @throws {*} Registra el error en la consola y vuelve a lanzarlo si la solicitud falla.
 */
export const obtenerUsuarios = async () => {
    try {
        const response = await apiService.get(URL_BASE);
        return response.data;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
    }
};

/**
 * Cambia el rol de un usuario mediante una solicitud PUT a `/usuario/{id}/rol`.
 * Envía un objeto con la propiedad `rol` en el cuerpo de la solicitud.
 *
 * @param {*} id Identificador del usuario cuyo rol se cambiará.
 * @param {*} rol Nuevo rol que se enviará en la solicitud.
 * @returns {*} Los datos incluidos en `response.data` si la solicitud tiene éxito.
 * @throws {*} Registra el error en la consola incluyendo el identificador del usuario y vuelve a lanzarlo si la solicitud falla.
 */
export const cambiarRol = async (id, rol) => {
    try {
        const response = await apiService.put(
            `${URL_BASE}/${id}/rol`,
            { rol }
        );

        return response.data;
    } catch (error) {
        console.error(
            `Error al actualizar rol del usuario ${id}:`,
            error
        );
        throw error;
    }
};