import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/usuario';

export const registerUsuario = async (usuarioData) => {
  try {
    const response = await axios.post(`${API_BASE}/registro`, usuarioData);
    return response.data;
  } catch (error) {
    // Re-throw a normalized error for callers to handle
    if (error.response && error.response.data) {
      throw new Error(error.response.data); // mensaje del backend (ej: email duplicado)
    } else {
      throw new Error("Error al registrar usuario");
    }
  }
}

