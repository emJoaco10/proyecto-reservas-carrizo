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

export const loginUsuario = async (credenciales) => {

    const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credenciales),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
};

export const obtenerUsuarios = async () => {

    const response = await fetch(API_BASE);

    if (!response.ok) {
        throw new Error("No se pudieron obtener los usuarios.");
    }

    return await response.json();

};

export const cambiarRol = async (id, rol) => {

    const response = await fetch(
        `${API_BASE}/${id}/rol`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                rol
            })
        }
    );

    if (!response.ok) {
        throw new Error("No se pudo actualizar el rol.");
    }

    return await response.json();

};

