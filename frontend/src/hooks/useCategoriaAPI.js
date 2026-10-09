import { useState } from "react";

import {
    getCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria
} from "../services/categoriaService";

/**
 * Centraliza las operaciones de consulta, creación, actualización y eliminación
 * de categorías, delegando las solicitudes HTTP en las funciones de
 * `categoriaService`.
 *
 * Administra tres estados: `categorias`, un array local que inicia vacío;
 * `loading`, un indicador booleano compartido por las operaciones asíncronas
 * que inicia en `false`; y `error`, que contiene el mensaje definido por el
 * hook o `null` cuando no hay un error registrado.
 *
 * @returns {Object} Estado y operaciones para gestionar categorías.
 * @returns {Array} returns.categorias Categorías almacenadas en el estado local.
 * @returns {boolean} returns.loading Indicador compartido de carga.
 * @returns {?string} returns.error Mensaje de error actual o `null`.
 * @returns {Function} returns.fetchCategorias Consulta todas las categorías.
 * @returns {Function} returns.fetchCategoriaById Consulta una categoría por identificador.
 * @returns {Function} returns.registerCategoria Crea una categoría y la agrega al estado local.
 * @returns {Function} returns.editCategoria Actualiza una categoría en el estado local.
 * @returns {Function} returns.removeCategoria Elimina una categoría del estado local.
 */
const useCategoriaAPI = () => {

    /** Categorías disponibles en el estado local; se inicializa como un array vacío. */
    const [categorias, setCategorias] = useState([]);
    /** Indicador booleano compartido de que una operación asíncrona está en curso; inicia en `false`. */
    const [loading, setLoading] = useState(false);
    /** Mensaje de error definido por el hook, o `null` cuando no hay un error registrado. */
    const [error, setError] = useState(null);

    /**
     * Consulta todas las categorías, guarda los datos obtenidos en el estado
     * local y los devuelve. Activa `loading` y limpia el error anterior antes de
     * consultar. Si ocurre un error, lo registra en la consola, establece el
     * mensaje correspondiente y vuelve a lanzarlo. Restablece `loading` a
     * `false` en el bloque `finally`.
     *
     * @returns {Promise<*>} Datos recibidos de `getCategorias()`.
     * @throws {*} Vuelve a lanzar el error ocurrido durante la consulta.
     */
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

    /**
     * Consulta una categoría mediante su identificador y devuelve los datos sin
     * modificar el estado local `categorias`. Activa `loading` y limpia el error
     * anterior. Si ocurre un error, lo registra en la consola, establece el
     * mensaje correspondiente y vuelve a lanzarlo. Restablece `loading` a
     * `false` en el bloque `finally`.
     *
     * @param {*} id Identificador de la categoría que se desea consultar.
     * @returns {Promise<*>} Datos recibidos de `getCategoriaById(id)`.
     * @throws {*} Vuelve a lanzar el error ocurrido durante la consulta.
     */
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

    /**
     * Crea una categoría y agrega el resultado al final del array actual usando
     * una actualización funcional del estado. Activa `loading` y limpia el
     * error anterior. Si ocurre un error, lo registra en la consola, establece
     * el mensaje correspondiente y vuelve a lanzarlo. Restablece `loading` a
     * `false` en el bloque `finally`.
     *
     * @param {*} categoria Objeto que se enviará para crear la categoría.
     * @returns {Promise<*>} Datos recibidos de `createCategoria(categoria)`.
     * @throws {*} Vuelve a lanzar el error ocurrido durante la creación.
     */
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

    /**
     * Actualiza una categoría y reemplaza en el estado local el elemento cuyo
     * `item.id === id` por los datos recibidos; conserva los demás elementos.
     * Activa `loading` y limpia el error anterior. Si ocurre un error, lo
     * registra en la consola, establece el mensaje correspondiente y vuelve a
     * lanzarlo. Restablece `loading` a `false` en el bloque `finally`.
     *
     * @param {*} id Identificador de la categoría que se desea actualizar.
     * @param {*} categoria Objeto con los datos que se enviarán para actualizarla.
     * @returns {Promise<*>} Datos recibidos de `updateCategoria(id, categoria)`.
     * @throws {*} Vuelve a lanzar el error ocurrido durante la actualización.
     */
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

    /**
     * Elimina una categoría y filtra del estado local el elemento cuyo
     * `item.id === id`. Activa `loading` y limpia el error anterior. Si ocurre
     * un error, lo registra en la consola, establece el mensaje correspondiente
     * y vuelve a lanzarlo. Restablece `loading` a `false` en el bloque `finally`.
     *
     * @param {*} id Identificador de la categoría que se desea eliminar.
     * @returns {Promise<*>} Resultado recibido de `deleteCategoria(id)`.
     * @throws {*} Vuelve a lanzar el error ocurrido durante la eliminación.
     */
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