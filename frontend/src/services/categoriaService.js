import apiService from "./apiService";

const URL_BASE = "/categoria";

// Obtener todas las categorías
export const getCategorias = async () => {
    try {
        const response = await apiService.get(URL_BASE);

        return response.data;
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        throw error;
    }
};

// Obtener una categoría por ID
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

// Crear una categoría
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

// Actualizar una categoría
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

// Eliminar una categoría
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