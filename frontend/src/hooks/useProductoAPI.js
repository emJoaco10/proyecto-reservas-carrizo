import React from 'react'
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProductoById,
  deleteProducto,
  getPaginados,
  asignarCategoria,
  asignarCaracteristicas,
  getCategorias
} from '../services/productoService';
import { obtenerProductosAleatorios } from '../helpers/productoUtils';
import { useState, useEffect } from 'react';

export default function useProductoAPI() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categorias, setCategorias] = useState([]);

  // Cargar productos al montar
  useEffect(() => {
    fetchProductos();
  }, []);

  // Obtener todos los productos
  const fetchProductos = async () => {
    setLoading(true);
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (err) {
      console.error('[fetchProductos] Error:', err);
      setError('Mensaje de error para el usuario');
    } finally {
      setLoading(false);
    }
  };

  // Obtener producto por id
  const fetchProductoById = async (id) => {
    try {
      return await getProductoById(id);
    } catch (err) {
      console.error('[fetchProductoById] Error:', err);
      setError(`Error al obtener producto con id ${id}`);
      return null;
    }
  };

  // Crear producto
  const addProducto = async (producto) => {
    try {
      const nuevo = await createProducto(producto);
      setProductos((prev) => [...prev, nuevo]);
      return nuevo;
    } catch (err) {
      console.error('[addProducto] Error:', err);
      setError('Error al crear producto');
      return null;
    }
  };

  // Editar producto (incluye categoría)
  const editProducto = async (id, cambios) => {
    try {
      const actualizado = await updateProducto(id, cambios);
      setProductos((prev) =>
        prev.map((p) => (p.id === id ? actualizado : p))
      );
      return actualizado;
    } catch (err) {
      console.error('[editProducto] Error:', err);
      setError(`Error al actualizar producto con id ${id}`);
      return null;
    }
  };

  // Asignar categoría (si tu backend tiene endpoint específico)
  const setCategoriaProducto = async (id, categoriaId) => {
    try {
      const actualizado = await asignarCategoria(id, categoriaId);
      setProductos((prev) =>
        prev.map((p) => (p.id === id ? actualizado : p))
      );
      return actualizado;
    } catch (err) {
      console.error('[setCategoriaProducto] Error:', err);
      setError(`Error al asignar categoría al producto ${id}`);
      return null;
    }
  };

  const setCaracteristicasProducto = async (
    id,
    caracteristicasId
  ) => {

    try {

      const actualizado = await asignarCaracteristicas(

        id,

        caracteristicasId

      );

      setProductos((prev) =>

        prev.map((p) =>

          p.id === id

            ? actualizado

            : p

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

  // Eliminar producto por id
  const removeProductoById = async (id) => {
    try {
      await deleteProductoById(id);
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('[removeProductoById] Error:', err);
      setError(`Error al eliminar producto con id ${id}`);
    }
  };

  // Eliminar todos los productos
  const removeAllProductos = async () => {
    try {
      await deleteProducto();
      setProductos([]);
    } catch (err) {
      console.error('[removeAllProductos] Error:', err);
      setError('Error al eliminar todos los productos');
    }
  };

  // Obtener productos paginados
  const fetchPaginados = async (page, size) => {
    try {
      return await getPaginados(page, size);
    } catch (err) {
      console.error('[fetchPaginados] Error:', err);
      setError('Error al obtener productos paginados');
      return [];
    }
  };

  // Obtener productos aleatorios
  const getProductosAleatorios = (cantidad = 10) => {
    return obtenerProductosAleatorios(productos, cantidad);
  };

  const fetchCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("[fetchCategorias] Error:", err);
      setError("Error al obtener categorías");
      setCategorias([]);
    }
  };

  return {
    productos,
    categorias,
    loading,
    error,
    fetchProductos,
    fetchProductoById,
    fetchCategorias,
    addProducto,
    editProducto,
    setCategoriaProducto,
    setCaracteristicasProducto,
    removeProductoById,
    removeAllProductos,
    fetchPaginados,
    getProductosAleatorios
  };
}

