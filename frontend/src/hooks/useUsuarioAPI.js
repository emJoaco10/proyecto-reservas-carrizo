import { useState } from 'react';
import { registerUsuario as registerUsuarioService } from "../services/usuarioService";
import { loginUsuario as loginUsuarioService } from "../services/usuarioService";
import { obtenerUsuarios as obtenerUsuariosService } from "../services/usuarioService";
import { cambiarRol as cambiarRolService } from "../services/usuarioService";

const useUsuarioAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usuario, setUsuario] = useState(null); // nuevo estado

  const registerUsuario = async (datosUsuario) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerUsuarioService(datosUsuario);
      setUsuario(response); // guardamos el usuario registrado
      return response;
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || 'Error al registrar usuario';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false); // simplificado con finally
    }
  };

  const loginUsuario = async (credenciales) => {
    setLoading(true);
    setError(null);

    try {

        const usuario = await loginUsuarioService(credenciales);

        return usuario;

    } catch (err) {

        setError(err.message);

        throw err;

    } finally {

        setLoading(false);

    }
};

const getUsuarios = async () => {

    return await obtenerUsuariosService();

};

const actualizarRol = async (id, rol) => {

    return await cambiarRolService(id, rol);

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
