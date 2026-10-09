import { useState } from "react";
import {
    registerUsuario as registerUsuarioService,
    loginUsuario as loginUsuarioService,
    obtenerUsuarios as obtenerUsuariosService,
    cambiarRol as cambiarRolService
} from "../services/usuarioService";

/**
 * Centraliza las operaciones relacionadas con usuarios mediante funciones de `usuarioService`.
 * Los estados compartidos son `loading` (indicador booleano de carga, inicializado en `false`)
 * y `error` (mensaje actual o `null`, inicializado en `null`); no son independientes por
 * operación. `usuario` almacena el resultado del registro y comienza en `null`; el inicio de
 * sesión no actualiza este estado.
 *
 * @returns {Object} Objeto del hook, organizado por finalidad:
 *   Estados: `usuario` contiene el resultado del registro, `loading` indica carga y `error`
 *   contiene el mensaje actual o `null`.
 *   Operaciones: `registerUsuario` registra, `loginUsuario` inicia sesión, `getUsuarios`
 *   consulta los usuarios y `actualizarRol` solicita un cambio de rol.
 */
const useUsuarioAPI = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [usuario, setUsuario] = useState(null);

    /**
     * Registra un usuario delegando la operación a `registerUsuarioService`.
     * Activa `loading` y limpia el error anterior antes de la llamada. Si tiene éxito, guarda
     * y devuelve la respuesta. Si falla, obtiene el mensaje de `err.response.data.message`,
     * luego de `err.message` o, si ninguno está disponible, usa `"Error al registrar usuario"`;
     * guarda ese mensaje en `error` y lanza un nuevo `Error` con él. Siempre restablece
     * `loading` a `false` mediante `finally`.
     *
     * @param {*} datosUsuario Objeto con los datos que se enviarán para registrar al usuario.
     * @returns {Promise<*>} Respuesta del servicio si el registro tiene éxito.
     * @throws {Error} Nuevo error con el mensaje determinado a partir del fallo.
     * @sideEffects Actualiza los estados compartidos `loading`, `error` y `usuario`.
     */
    const registerUsuario = async (datosUsuario) => {
        setLoading(true);
        setError(null);

        try {
            const response = await registerUsuarioService(datosUsuario);

            setUsuario(response);

            return response;
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Error al registrar usuario";

            setError(message);

            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Delega el inicio de sesión a `loginUsuarioService` y devuelve su respuesta si tiene éxito.
     * Activa `loading` y limpia el error anterior; no actualiza el estado `usuario`. Si falla,
     * guarda `err.message` en `error` y vuelve a lanzar el error original mediante `throw err`.
     * Siempre restablece `loading` a `false` mediante `finally`.
     *
     * @param {*} credenciales Objeto de credenciales que se enviará al servicio.
     * @returns {Promise<*>} Respuesta del servicio si el inicio de sesión tiene éxito.
     * @throws {*} El error original producido durante la operación.
     * @sideEffects Actualiza los estados compartidos `loading` y `error`; no modifica `usuario`.
     */
    const loginUsuario = async (credenciales) => {
        setLoading(true);
        setError(null);

        try {
            const response = await loginUsuarioService(credenciales);

            return response;
        } catch (err) {
            setError(err.message);

            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Delega la consulta a `obtenerUsuariosService()` y devuelve el resultado de esa llamada.
     * No modifica `loading`, `error` ni `usuario`. No captura errores, por lo que se propagan
     * al código que invoque esta función.
     *
     * @returns {Promise<*>} Resultado de la consulta al servicio.
     * @throws {*} Error propagado desde `obtenerUsuariosService()`.
     */
    const getUsuarios = async () => {
        return obtenerUsuariosService();
    };

    /**
     * Delega la operación a `cambiarRolService(id, rol)` y devuelve el resultado de esa llamada.
     * No modifica los estados del hook ni captura errores, por lo que estos se propagan al
     * código que invoque la función.
     *
     * @param {*} id Identificador del usuario.
     * @param {*} rol Rol que se enviará al servicio.
     * @returns {Promise<*>} Resultado de la operación del servicio.
     * @throws {*} Error propagado desde `cambiarRolService`.
     */
    const actualizarRol = async (id, rol) => {
        return cambiarRolService(id, rol);
    };

    return {
        usuario,
        loading,
        error,
        registerUsuario,
        loginUsuario,
        getUsuarios,
        actualizarRol
    };
};

export default useUsuarioAPI;