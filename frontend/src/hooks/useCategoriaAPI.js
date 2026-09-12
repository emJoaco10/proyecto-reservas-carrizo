import { useState } from "react";

import {
    getCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria
} from "../services/categoriaService";

const useCategoriaAPI = () => {

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Obtener todas las categorías
    const fetchCategorias = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getCategorias();

            setCategorias(data);

            return data;
        } catch (error) {
            console.error(error);

            setError(
                "No se pudieron obtener las categorías."
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Obtener categoría por ID
    const fetchCategoriaById = async (id) => {
        try {
            setLoading(true);
            setError(null);

            const data = await getCategoriaById(id);

            return data;
        } catch (error) {
            console.error(error);

            setError(
                "No se pudo obtener la categoría."
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Crear categoría
    const registerCategoria = async (categoria) => {
        try {
            setLoading(true);
            setError(null);

            const data = await createCategoria(categoria);

            setCategorias((prev) => [
                ...prev,
                data
            ]);

            return data;
        } catch (error) {
            console.error(error);

            setError(
                "No se pudo crear la categoría."
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Actualizar categoría
    const editCategoria = async (id, categoria) => {
        try {
            setLoading(true);
            setError(null);

            const data = await updateCategoria(
                id,
                categoria
            );

            setCategorias((prev) =>
                prev.map((item) =>
                    item.id === id ? data : item
                )
            );

            return data;
        } catch (error) {
            console.error(error);

            setError(
                "No se pudo actualizar la categoría."
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Eliminar categoría
    const removeCategoria = async (id) => {
        try {
            setLoading(true);
            setError(null);

            const data = await deleteCategoria(id);

            setCategorias((prev) =>
                prev.filter((item) => item.id !== id)
            );

            return data;
        } catch (error) {
            console.error(error);

            setError(
                "No se pudo eliminar la categoría."
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        categorias,
        loading,
        error,
        fetchCategorias,
        fetchCategoriaById,
        registerCategoria,
        editCategoria,
        removeCategoria
    };
};

export default useCategoriaAPI;