import { useState, useEffect, useCallback } from "react";

import {
    getProductosPublicos,
    getProductosAdmin,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProductoById,
    deleteProducto,
    getPaginados,
    asignarCategoria,
    asignarCaracteristicas,
    getCategorias,
    getProductosPorCategorias,
    buscarProductos
} from "../services/productoService";

import { obtenerProductosAleatorios } from "../helpers/productoUtils";

import {
    agregarFavorito,
    eliminarFavorito,
    obtenerFavoritos
} from "../services/favoritoService";

import {
    obtenerValoraciones,
    crearValoracion,
    verificarPuedeValorar,
    verificarYaValoro
} from '../services/valoracionService';

/**
 * Centraliza las operaciones de productos, categorías, favoritos y valoraciones.
 * Delega las solicitudes a los servicios correspondientes y utiliza
 * `productoUtils` para obtener productos aleatorios desde el estado local.
 * @returns {Object} Estados y operaciones disponibles para el componente.
 */
const useProductoAPI = () => {

    /** @type {[Array, Function]} Productos almacenados localmente; inicia como `[]`. */
    const [productos, setProductos] = useState([]);
    /** @type {[Array, Function]} Categorías almacenadas localmente; inicia como `[]`. */
    const [categorias, setCategorias] = useState([]);
    /** @type {[boolean, Function]} Indicador de carga compartido entre operaciones; inicia como `false`. */
    const [loading, setLoading] = useState(false);
    /** @type {[string|null, Function]} Mensaje de error compartido o `null`; inicia como `null`. */
    const [error, setError] = useState(null);

    // ============================================================
    // PRODUCTOS PÚBLICOS
    // ============================================================

    /** Ejecuta `fetchProductos` al montar el componente; el arreglo vacío evita ejecuciones posteriores por dependencias. */
    useEffect(() => {
        fetchProductos();
    }, []);

    /**
     * Obtiene los productos públicos, actualiza el estado local con un arreglo
     * (o `[]` si la respuesta no es un arreglo) y gestiona el indicador y error compartidos.
     * @returns {Promise<Array>} Datos recibidos o `[]` si ocurre un error.
     */
    const fetchProductos = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getProductosPublicos();

            setProductos(
                Array.isArray(data) ? data : []
            );

            return data;
        } catch (err) {
            console.error(
                "[fetchProductos] Error:",
                err
            );

            setError(
                "Error al obtener productos"
            );

            return [];
        } finally {
            setLoading(false);
        }
    };

    /**
     * Consulta un producto por identificador. Callback memoizado sin dependencias.
     * @param {string|number} id Identificador del producto.
     * @returns {Promise<*>} Datos recibidos o `null` si ocurre un error; en ese caso registra el error y actualiza `error`.
     */
    const fetchProductoById = useCallback(async (id) => {
        try {
            const data = await getProductoById(id);

            return data;
        } catch (err) {
            console.error(
                "[fetchProductoById] Error:",
                err
            );

            setError(
                `Error al obtener producto con id ${id}`
            );

            return null;
        }
    }, []);

    /**
     * Consulta productos paginados y, si falla, registra el error y actualiza `error`.
     * @param {number} page Número de página.
     * @param {number} size Cantidad de productos solicitada.
     * @returns {Promise<*>} Resultado del servicio o `[]` si ocurre un error.
     */
    const fetchPaginados = async (page, size) => {
        try {
            return await getPaginados(page, size);
        } catch (err) {
            console.error(
                "[fetchPaginados] Error:",
                err
            );

            setError(
                "Error al obtener productos paginados"
            );

            return [];
        }
    };

    /**
     * Obtiene productos aleatorios del estado local mediante `obtenerProductosAleatorios`; no realiza una solicitud HTTP.
     * @param {number} [cantidad=10] Cantidad solicitada.
     * @returns {Array} Resultado de `obtenerProductosAleatorios`.
     */
    const getProductosAleatorios = (cantidad = 10) => {
        return obtenerProductosAleatorios(
            productos,
            cantidad
        );
    };

    /**
     * Consulta productos asociados a las categorías indicadas; si falla, registra el error y actualiza `error`.
     * @param {Array} categoriaIds Identificadores de categorías.
     * @returns {Promise<*>} Resultado del servicio o `[]` si ocurre un error.
     */
    const fetchProductosPorCategorias = async (categoriaIds) => {
        try {
            return await getProductosPorCategorias(
                categoriaIds
            );
        } catch (err) {
            console.error(
                "[fetchProductosPorCategorias] Error:",
                err
            );

            setError(
                "Error al obtener productos por categorías"
            );

            return [];
        }
    };

    /**
     * Busca productos por texto; si falla, registra el error y actualiza `error`.
     * @param {string} texto Texto de búsqueda.
     * @returns {Promise<*>} Resultado del servicio o `[]` si ocurre un error.
     */
    const fetchProductosPorBusqueda = async (texto) => {
        try {
            return await buscarProductos(texto);
        } catch (err) {
            console.error(
                "[fetchProductosPorBusqueda] Error:",
                err
            );

            setError(
                "Error al buscar productos"
            );

            return [];
        }
    };

    // ============================================================
    // PRODUCTOS ADMINISTRATIVOS
    // ============================================================

    /**
     * Obtiene productos administrativos, actualiza `productos` con un arreglo
     * (o `[]` si la respuesta no es un arreglo) y gestiona `loading` y `error` compartidos.
     * @returns {Promise<Array>} Datos recibidos o `[]` si ocurre un error.
     */
    const fetchProductosAdmin = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getProductosAdmin();

            setProductos(
                Array.isArray(data) ? data : []
            );

            return data;
        } catch (err) {
            console.error(
                "[fetchProductosAdmin] Error:",
                err
            );

            setError(
                "Error al obtener productos administrativos"
            );

            return [];
        } finally {
            setLoading(false);
        }
    };

    /**
     * Crea un producto y agrega el resultado al final de `productos` mediante actualización funcional.
     * @param {Object} producto Producto que se enviará al servicio.
     * @returns {Promise<*>} Producto creado o `null` si ocurre un error; registra el error y actualiza `error`.
     */
    const addProducto = async (producto) => {
        try {
            const nuevo = await createProducto(producto);

            setProductos((prev) => [
                ...prev,
                nuevo
            ]);

            return nuevo;
        } catch (err) {
            console.error(
                "[addProducto] Error:",
                err
            );

            setError(
                "Error al crear producto"
            );

            return null;
        }
    };

    /**
     * Actualiza un producto y reemplaza en `productos` el elemento cuyo `id` coincide.
     * @param {string|number} id Identificador del producto.
     * @param {Object} cambios Cambios que se enviarán al servicio.
     * @returns {Promise<*>} Producto actualizado o `null` si ocurre un error; registra el error y actualiza `error`.
     */
    const editProducto = async (id, cambios) => {
        try {
            const actualizado = await updateProducto(
                id,
                cambios
            );

            setProductos((prev) =>
                prev.map((producto) =>
                    producto.id === id
                        ? actualizado
                        : producto
                )
            );

            return actualizado;
        } catch (err) {
            console.error(
                "[editProducto] Error:",
                err
            );

            setError(
                `Error al actualizar producto con id ${id}`
            );

            return null;
        }
    };

    /**
     * Elimina un producto y, si la operación tiene éxito, quita de `productos` el elemento con el identificador indicado.
     * @param {string|number} id Identificador del producto.
     * @returns {Promise<void>} No tiene retorno explícito; si falla, registra el error y actualiza `error`.
     */
    const removeProductoById = async (id) => {
        try {
            await deleteProductoById(id);

            setProductos((prev) =>
                prev.filter(
                    (producto) => producto.id !== id
                )
            );
        } catch (err) {
            console.error(
                "[removeProductoById] Error:",
                err
            );

            setError(
                `Error al eliminar producto con id ${id}`
            );
        }
    };

    /**
     * Elimina todos los productos y vacía `productos` si la operación tiene éxito.
     * @returns {Promise<void>} No tiene retorno explícito; si falla, registra el error y actualiza `error`.
     */
    const removeAllProductos = async () => {
        try {
            await deleteProducto();

            setProductos([]);
        } catch (err) {
            console.error(
                "[removeAllProductos] Error:",
                err
            );

            setError(
                "Error al eliminar todos los productos"
            );
        }
    };

    /**
     * Asigna una categoría y reemplaza en `productos` el elemento cuyo identificador coincide.
     * @param {string|number} id Identificador del producto.
     * @param {string|number} categoriaId Identificador de la categoría.
     * @returns {Promise<*>} Producto actualizado o `null` si ocurre un error; registra el error y actualiza `error`.
     */
    const setCategoriaProducto = async (
        id,
        categoriaId
    ) => {
        try {
            const actualizado = await asignarCategoria(
                id,
                categoriaId
            );

            setProductos((prev) =>
                prev.map((producto) =>
                    producto.id === id
                        ? actualizado
                        : producto
                )
            );

            return actualizado;
        } catch (err) {
            console.error(
                "[setCategoriaProducto] Error:",
                err
            );

            setError(
                `Error al asignar categoría al producto ${id}`
            );

            return null;
        }
    };

    /**
     * Asigna características y reemplaza en `productos` el elemento cuyo identificador coincide.
     * @param {string|number} id Identificador del producto.
     * @param {Array} caracteristicasId Identificadores de las características.
     * @returns {Promise<*>} Producto actualizado o `null` si ocurre un error; registra el error y actualiza `error`.
     */
    const setCaracteristicasProducto = async (
        id,
        caracteristicasId
    ) => {
        try {
            const actualizado =
                await asignarCaracteristicas(
                    id,
                    caracteristicasId
                );

            setProductos((prev) =>
                prev.map((producto) =>
                    producto.id === id
                        ? actualizado
                        : producto
                )
            );

            return actualizado;
        } catch (err) {
            console.error(
                "[setCaracteristicasProducto] Error:",
                err
            );

            setError(
                `Error al asignar características al producto ${id}`
            );

            return null;
        }
    };

    /**
     * Obtiene favoritos y gestiona los estados compartidos `loading` y `error`. Callback memoizado sin dependencias.
     * @returns {Promise<*>} Datos obtenidos o `[]` si ocurre un error.
     */
    const fetchFavoritos = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await obtenerFavoritos();

            return data;
        } catch (err) {
            console.error("Error al obtener favoritos:", err);
            setError("No se pudieron obtener los favoritos.");
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Agrega un favorito sin modificar estados locales; registra en consola los errores.
     * @param {string|number} productoId Identificador del producto.
     * @returns {Promise<boolean>} `true` si la operación tiene éxito; `false` si falla.
     */
    const addFavorito = async (productoId) => {
        try {
            await agregarFavorito(productoId);
            return true;
        } catch (err) {
            console.error("Error al agregar favorito:", err);
            return false;
        }
    };

    /**
     * Elimina un favorito sin modificar estados locales; registra en consola los errores.
     * @param {string|number} productoId Identificador del producto.
     * @returns {Promise<boolean>} `true` si la operación tiene éxito; `false` si falla.
     */
    const removeFavorito = async (productoId) => {
        try {
            await eliminarFavorito(productoId);
            return true;
        } catch (err) {
            console.error("Error al eliminar favorito:", err);
            return false;
        }
    };

    // ============================================================
    // CATEGORÍAS
    // ============================================================

    /**
     * Obtiene las categorías, guarda en `categorias` la respuesta si es un arreglo
     * (o `[]` en caso contrario) y devuelve esa lista. Si falla, registra el error,
     * actualiza `error`, vacía el estado y devuelve `[]`.
     * @returns {Promise<Array>} Lista de categorías.
     */
    const fetchCategorias = async () => {
        try {
            const data = await getCategorias();

            const lista = Array.isArray(data)
                ? data
                : [];

            setCategorias(lista);

            return lista;
        } catch (err) {
            console.error(
                "[fetchCategorias] Error:",
                err
            );

            setError(
                "Error al obtener categorías"
            );

            setCategorias([]);

            return [];
        }
    };

    /**
     * Obtiene las valoraciones de un producto. Callback memoizado sin dependencias.
     * @param {string|number} productoId Identificador del producto.
     * @returns {Promise<*>} Datos recibidos o `[]` si ocurre un error, que se registra en consola.
     */
    const fetchValoraciones = useCallback(async (productoId) => {
        try {
            const data = await obtenerValoraciones(productoId);
            return data;
        } catch (err) {
            console.error("Error al obtener valoraciones:", err);
            return [];
        }
    }, []);

    /**
     * Consulta si se puede valorar un producto. Callback memoizado sin dependencias.
     * @param {string|number} productoId Identificador del producto.
     * @returns {Promise<boolean>} Resultado recibido o `false` si ocurre un error, que se registra en consola.
     */
    const fetchPuedeValorar = useCallback(async (productoId) => {
        try {
            const puedeValorar = await verificarPuedeValorar(productoId);
            return puedeValorar;
        } catch (err) {
            console.error("Error al verificar si puede valorar:", err);
            return false;
        }
    }, []);

    /**
     * Consulta si el usuario ya valoró un producto. Callback memoizado sin dependencias.
     * @param {string|number} productoId Identificador del producto.
     * @returns {Promise<boolean>} Resultado recibido o `false` si ocurre un error, que se registra en consola.
     */
    const fetchYaValoro = useCallback(async (productoId) => {
        try {
            const yaValoro = await verificarYaValoro(productoId);
            return yaValoro;
        } catch (err) {
            console.error("Error al verificar si ya valoró:", err);
            return false;
        }
    }, []);

    /**
     * Crea una valoración; ante un error lo registra en consola y vuelve a lanzarlo.
     * @param {string|number} productoId Identificador del producto.
     * @param {*} puntuacion Puntuación enviada al servicio.
     * @param {string} comentario Comentario enviado al servicio.
     * @returns {Promise<*>} Datos devueltos por el servicio.
     * @throws {*} Error producido por la creación, relanzado sin sustituirlo.
     */
    const addValoracion = async (
        productoId,
        puntuacion,
        comentario
    ) => {
        try {
            const data = await crearValoracion(
                productoId,
                puntuacion,
                comentario
            );

            return data;
        } catch (err) {
            console.error("Error al crear valoración:", err);
            throw err;
        }
    };

    /**
     * Objeto de acceso a los estados y operaciones del hook, agrupados por finalidad:
     * - Estados: `productos`, `categorias`, `loading`, `error`.
     * - Consultas públicas: `fetchProductos`, `fetchProductoById`, `fetchPaginados`, `getProductosAleatorios`, `fetchProductosPorCategorias`, `fetchProductosPorBusqueda`.
     * - Categorías: `fetchCategorias`.
     * - Operaciones administrativas: `fetchProductosAdmin`, `addProducto`, `editProducto`, `setCategoriaProducto`, `setCaracteristicasProducto`, `removeProductoById`, `removeAllProductos`.
     * - Favoritos: `fetchFavoritos`, `addFavorito`, `removeFavorito`.
     * - Valoraciones: `fetchValoraciones`, `addValoracion`, `fetchPuedeValorar`, `fetchYaValoro`.
     */
    return {
        productos,
        categorias,
        loading,
        error,

        fetchProductos,
        fetchProductosAdmin,
        fetchProductoById,
        fetchPaginados,
        getProductosAleatorios,

        fetchProductosPorCategorias,
        fetchProductosPorBusqueda,

        fetchCategorias,

        addProducto,
        editProducto,

        setCategoriaProducto,
        setCaracteristicasProducto,

        removeProductoById,
        removeAllProductos,

        fetchFavoritos,
        addFavorito,
        removeFavorito,

        fetchValoraciones,
        addValoracion,
        fetchPuedeValorar,
        fetchYaValoro
    };
};

export default useProductoAPI;