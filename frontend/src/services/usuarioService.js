import apiService from "./apiService";

const URL_BASE = "/usuario";

// Registrar usuario
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

// Iniciar sesión
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

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
    try {
        const response = await apiService.get(URL_BASE);
        return response.data;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
    }
};

// Cambiar rol de usuario
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