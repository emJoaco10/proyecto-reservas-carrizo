import { useState, useEffect } from "react";

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

const useProductoAPI = () => {

    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ============================================================
    // PRODUCTOS PÚBLICOS
    // ============================================================

    // Cargar productos públicos automáticamente
    useEffect(() => {
        fetchProductos();
    }, []);

    // Obtener productos públicos
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

    // Obtener producto por ID
    const fetchProductoById = async (id) => {
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
    };

    // Obtener productos paginados
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

    // Obtener productos aleatorios desde el estado local
    const getProductosAleatorios = (cantidad = 10) => {
        return obtenerProductosAleatorios(
            productos,
            cantidad
        );
    };

    // Obtener productos por categorías
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

    // Buscar productos
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

    // Obtener todos los productos para administración
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

    // Crear producto
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

    // Actualizar producto
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

    // Eliminar producto por ID
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

    // Eliminar todos los productos
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

    // Asignar categoría
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

    // Asignar características
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

    // ============================================================
    // CATEGORÍAS
    // ============================================================

    // Obtener categorías
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
        removeAllProductos
    };
};

export default useProductoAPI;