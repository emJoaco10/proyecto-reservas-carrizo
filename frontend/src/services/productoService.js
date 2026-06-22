import axios from 'axios';
import { validarDescripcion, validarNombre } from '../helpers/validaciones';
import { crearProducto } from '../helpers/productoUtils';

// URL base de la API
const URL_BASE = 'http://localhost:8080/api/producto';

// Obtener todos los productos
export const getProductos = async () => {
  try {
    const response = await axios.get(`${URL_BASE}/admin`); // ajustar según tu backend
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

// Obtener un producto por su id
export const getProductoById = async (id) => {
  try {
    const response = await axios.get(`${URL_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener producto con id ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo producto
export const createProducto = async (producto) => {
  try {
    // Validar antes de enviar
    const errNombre = validarNombre(producto.nombre);
    if (errNombre) {
      throw new Error(errNombre);
    }

    const errDesc = validarDescripcion(producto.descripcion);
    if (errDesc) {
      throw new Error(errDesc);
    }


    // Normalizar con productoUtils
    const normalizado = crearProducto(producto);

    const response = await axios.post(URL_BASE, normalizado);
    return response.data;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

// Obtener productos paginados
export const getPaginados = async (page, size) => {
  try {
    const response = await axios.get(`${URL_BASE}/paginados?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos paginados:', error);
    throw error;
  }
};

// Eliminar un producto por su id
export const deleteProductoById = async (id) => {
  try {
    const response = await axios.delete(`${URL_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar producto con id ${id}:`, error);
    throw error;
  }
};

// Eliminar todos los productos
export const deleteProducto = async () => {
  try {
    const response = await axios.delete(URL_BASE);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar productos:', error);
    throw error;
  }
};

// Editar un producto completo (incluye categoría)
export const updateProducto = async (id, producto) => {
  try {
    // Validar antes de enviar
    const errNombre = validarNombre(producto.nombre);
    if (errNombre) throw new Error(errNombre);

    const errDesc = validarDescripcion(producto.descripcion);
    if (errDesc) throw new Error(errDesc);

    // Normalizar con productoUtils
    const normalizado = crearProducto(producto);

    const response = await axios.put(`${URL_BASE}/${id}`, normalizado);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar producto con id ${id}:`, error);
    throw error;
  }
};

// Asignar categoría a un producto (si tu backend tiene endpoint específico)
export const asignarCategoria = async (id, categoriaId) => {
  try {
    const response = await axios.put(
      `${URL_BASE}/${id}/categoria`, categoriaId, { headers: { "Content-Type": "application/json" } });
    return response.data;
  } catch (error) {
    console.error(`Error al asignar categoría al producto ${id}:`, error);
    throw error;
  }
};

// Obtener todas las categorías
export const getCategorias = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/producto/categorias");
    const data = response.data;

    return Array.isArray(data) ? data : (data?.content ?? []);

  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  }
};