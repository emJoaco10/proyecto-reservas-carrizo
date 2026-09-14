import { useState } from "react";
import {
    registerUsuario as registerUsuarioService,
    loginUsuario as loginUsuarioService,
    obtenerUsuarios as obtenerUsuariosService,
    cambiarRol as cambiarRolService
} from "../services/usuarioService";

const useUsuarioAPI = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [usuario, setUsuario] = useState(null);

    // Registrar usuario
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

    // Iniciar sesión
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

    // Obtener todos los usuarios
    const getUsuarios = async () => {
        return obtenerUsuariosService();
    };

    // Actualizar rol de usuario
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