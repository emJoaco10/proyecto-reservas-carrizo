import { useState } from "react";

import {
    getCategorias,
    getCategoriaById,
    createCategoria
} from "../services/categoriaService";


const useCategoriaAPI = () => {

    const [categorias, setCategorias] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);


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

            const data =
                await getCategoriaById(id);

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

            const data =
                await createCategoria(categoria);

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


    return {
        categorias,
        loading,
        error,
        fetchCategorias,
        fetchCategoriaById,
        registerCategoria

    };

};


export default useCategoriaAPI;