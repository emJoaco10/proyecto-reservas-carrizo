import { useState } from 'react';
import { registerUsuario as registerUsuarioService } from "../services/usuarioService";

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

  return {
    usuario,
    loading,
    error,
    registerUsuario,
  };
};

export default useUsuarioAPI;
