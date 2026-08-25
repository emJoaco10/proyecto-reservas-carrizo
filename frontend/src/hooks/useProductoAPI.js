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
  getCategorias,
  getProductosPorCategorias
} from '../services/productoService';
import { obtenerProductosAleatorios } from '../helpers/productoUtils';
import { useState, useEffect } from 'react';

/**
 * Hook personalizado que centraliza la comunicación con la API
 * relacionada con productos y categorías.
 *
 * También mantiene el estado local de los productos, categorías,
 * estados de carga y errores para que los componentes puedan
 * reutilizar esta lógica.
 */
export default function useProductoAPI() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categorias, setCategorias] = useState([]);

  // Carga automáticamente los productos cuando el hook se monta.
  useEffect(() => {
    fetchProductos();
  }, []);

  /**
   * Obtiene todos los productos desde el backend y actualiza
   * el estado local de productos.
   *
   * También controla los estados de carga y error de la petición.
   */
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

  /**
   * Obtiene un producto específico mediante su ID.
   *
   * @param {number} id Identificador del producto.
   * @returns {Promise<Object|null>} Producto encontrado o null si ocurre un error.
   */
  const fetchProductoById = async (id) => {
    try {
      return await getProductoById(id);
    } catch (err) {
      console.error('[fetchProductoById] Error:', err);
      setError(`Error al obtener producto con id ${id}`);
      return null;
    }
  };

  /**
   * Crea un nuevo producto mediante la API y lo incorpora
   * al estado local de productos.
   *
   * @param {Object} producto Datos del producto a crear.
   * @returns {Promise<Object|null>} Producto creado o null si ocurre un error.
   */
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

  /**
   * Actualiza un producto existente.
   *
   * Después de recibir la respuesta del backend, reemplaza
   * el producto correspondiente dentro del estado local.
   *
   * @param {number} id Identificador del producto.
   * @param {Object} cambios Datos actualizados del producto.
   * @returns {Promise<Object|null>} Producto actualizado o null si ocurre un error.
   */
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

  /**
   * Asigna una categoría a un producto existente utilizando
   * el endpoint específico de categorías del backend.
   *
   * @param {number} id Identificador del producto.
   * @param {number} categoriaId Identificador de la categoría.
   * @returns {Promise<Object|null>} Producto actualizado o null si ocurre un error.
   */
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

  /**
   * Asigna una lista de características a un producto.
   *
   * Después de la actualización, reemplaza el producto correspondiente
   * en el estado local con la información devuelta por el backend.
   *
   * @param {number} id Identificador del producto.
   * @param {number[]} caracteristicasId IDs de las características.
   * @returns {Promise<Object|null>} Producto actualizado o null si ocurre un error.
   */
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

  /**
   * Elimina un producto mediante su ID.
   *
   * Si la eliminación en el backend es exitosa, también se elimina
   * el producto del estado local para mantener actualizada la interfaz.
   *
   * @param {number} id Identificador del producto.
   */
  const removeProductoById = async (id) => {
    try {
      await deleteProductoById(id);

      setProductos((prev) =>
        prev.filter((p) => p.id !== id)
      );

    } catch (err) {
      console.error('[removeProductoById] Error:', err);
      setError(`Error al eliminar producto con id ${id}`);
    }
  };

  /**
   * Elimina todos los productos mediante la API.
   *
   * Si la operación se completa correctamente, limpia también
   * el estado local de productos.
   */
  const removeAllProductos = async () => {
    try {
      await deleteProducto();
      setProductos([]);
    } catch (err) {
      console.error('[removeAllProductos] Error:', err);
      setError('Error al eliminar todos los productos');
    }
  };

  /**
   * Obtiene productos de forma paginada.
   *
   * La respuesta se devuelve directamente para que el componente
   * que utiliza el hook pueda manejar la información de paginación.
   *
   * @param {number} page Número de página.
   * @param {number} size Cantidad de productos por página.
   * @returns {Promise<Object|Array>} Resultado de la consulta paginada
   * o un array vacío si ocurre un error.
   */
  const fetchPaginados = async (page, size) => {
    try {
      return await getPaginados(page, size);
    } catch (err) {
      console.error('[fetchPaginados] Error:', err);
      setError('Error al obtener productos paginados');
      return [];
    }
  };

  /**
   * Obtiene una cantidad determinada de productos aleatorios
   * a partir de los productos disponibles en el estado local.
   *
   * @param {number} cantidad Cantidad de productos solicitada.
   * @returns {Array} Lista de productos aleatorios.
   */
  const getProductosAleatorios = (cantidad = 10) => {
    return obtenerProductosAleatorios(
      productos,
      cantidad
    );
  };

  /**
   * Obtiene los productos asociados a una o varias categorías.
   *
   * Los IDs de las categorías se envían al backend y la respuesta
   * se devuelve al componente que realizó la consulta.
   *
   * @param {number[]} categoriaIds IDs de las categorías seleccionadas.
   * @returns {Promise<Array>} Productos correspondientes a las categorías
   * o un array vacío si ocurre un error.
   */
  const fetchProductosPorCategorias = async (categoriaIds) => {
    try {
      return await getProductosPorCategorias(
        categoriaIds
      );

    } catch (err) {

      console.error(
        '[fetchProductosPorCategorias] Error:',
        err
      );

      setError(
        'Error al obtener productos por categorías'
      );

      return [];
    }
  };

  /**
   * Obtiene las categorías disponibles desde el backend
   * y actualiza el estado local de categorías.
   *
   * Si la respuesta no tiene el formato esperado, se utiliza
   * un array vacío para mantener un estado válido.
   */
  const fetchCategorias = async () => {
    try {
      const data = await getCategorias();

      setCategorias(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {

      console.error(
        "[fetchCategorias] Error:",
        err
      );

      setError(
        "Error al obtener categorías"
      );

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
    fetchProductosPorCategorias,
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