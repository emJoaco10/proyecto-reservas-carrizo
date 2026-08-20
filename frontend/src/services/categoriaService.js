import axios from "axios";

const URL_BASE = "http://localhost:8080/api/categoria";

// Obtener todas las categorías
export const getCategorias = async () => {

  try {

    const response = await axios.get(URL_BASE);

    return response.data;

  } catch (error) {

    console.error(
      "Error al obtener categorías:",
      error
    );

    throw error;
  }
};


// Obtener una categoría por ID
export const getCategoriaById = async (id) => {

  try {

    const response =
      await axios.get(`${URL_BASE}/${id}`);

    return response.data;

  } catch (error) {

    console.error(
      `Error al obtener categoría con id ${id}:`,
      error
    );

    throw error;
  }
};


// Crear una categoría
export const createCategoria = async (categoria) => {

  try {

    const response =
      await axios.post(
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