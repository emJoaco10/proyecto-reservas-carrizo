import apiService from './apiService';
import { validarDescripcion, validarNombre } from '../helpers/validaciones';
import { crearProducto } from '../helpers/productoUtils';

const URL_BASE = '/producto';

/**
 * ============================================================
 * PRODUCTOS PÚBLICOS
 * ============================================================
 */

/**
 * Obtiene productos paginados para el catálogo público.
 *
 * No requiere autenticación.
 *
 * @param {number} page Número de página.
 * @param {number} size Cantidad de productos.
 * @returns {Promise<Array>} Lista de productos.
 */
export const getProductosPublicos = async (
  page = 0,
  size = 100
) => {
  try {
    const response = await apiService.get(
      `${URL_BASE}/paginados`,
      {
        params: {
          page,
          size
        }
      }
    );

    return response.data?.content ?? [];

  } catch (error) {
    console.error(
      'Error al obtener productos públicos:',
      error
    );

    throw error;
  }
};

/**
 * Obtiene un producto por su ID.
 */
export const getProductoById = async (id) => {
  try {
    const response = await apiService.get(
      `${URL_BASE}/${id}`
    );

    return response.data;

  } catch (error) {
    console.error(
      `Error al obtener producto con id ${id}:`,
      error
    );

    throw error;
  }
};

/**
 * Obtiene productos paginados.
 */
export const getPaginados = async (page, size) => {
  try {
    const response = await apiService.get(
      `${URL_BASE}/paginados`,
      {
        params: {
          page,
          size
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      'Error al obtener productos paginados:',
      error
    );

    throw error;
  }
};

/**
 * Obtiene productos aleatorios.
 */
export const obtenerProductosAleatorios = async () => {
  try {
    const response = await apiService.get(
      `${URL_BASE}/aleatorios`
    );

    return response.data;

  } catch (error) {
    console.error(
      'Error al obtener productos aleatorios:',
      error
    );

    throw error;
  }
};

/**
 * Obtiene productos filtrados por categorías.
 */
export const getProductosPorCategorias = async (
  categoriaIds
) => {
  try {
    const response = await apiService.get(
      `${URL_BASE}/categoriasFiltro`,
      {
        params: {
          ids: categoriaIds
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      'Error al obtener productos por categorías:',
      error
    );

    throw error;
  }
};

/**
 * Busca productos por palabra clave.
 */
export const buscarProductos = async (texto) => {
  try {
    const response = await apiService.get(
      `${URL_BASE}/buscar`,
      {
        params: {
          texto
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      'Error al buscar productos:',
      error
    );

    throw error;
  }
};

/**
 * Obtiene todas las categorías disponibles
 * para las funcionalidades públicas y formularios.
 */
export const getCategorias = async () => {
  try {
    const response = await apiService.get(
      `${URL_BASE}/categorias`
    );

    const data = response.data;

    return Array.isArray(data)
      ? data
      : (data?.content ?? []);

  } catch (error) {
    console.error(
      'Error al obtener categorías:',
      error
    );

    throw error;
  }
};


/**
 * ============================================================
 * PRODUCTOS ADMINISTRATIVOS
 * ============================================================
 */

/**
 * Obtiene TODOS los productos para administración.
 *
 * IMPORTANTE:
 * Este endpoint está protegido por Spring Security
 * y solamente puede utilizarlo un ADMIN.
 */
export const getProductosAdmin = async () => {
  try {
    const response = await apiService.get(
      `${URL_BASE}/admin`
    );

    return response.data;

  } catch (error) {
    console.error(
      'Error al obtener productos administrativos:',
      error
    );

    throw error;
  }
};


/**
 * ============================================================
 * CRUD ADMINISTRATIVO
 * ============================================================
 */

/**
 * Crear producto.
 */
export const createProducto = async (producto) => {
  try {

    const errNombre = validarNombre(
      producto.nombre
    );

    if (errNombre) {
      throw new Error(errNombre);
    }

    const errDesc = validarDescripcion(
      producto.descripcion
    );

    if (errDesc) {
      throw new Error(errDesc);
    }

    const normalizado = crearProducto(producto);

    const response = await apiService.post(
      URL_BASE,
      normalizado
    );

    return response.data;

  } catch (error) {

    console.error(
      'Error al crear producto:',
      error
    );

    throw error;
  }
};


/**
 * Actualizar producto completo.
 */
export const updateProducto = async (
  id,
  producto
) => {
  try {

    const errNombre = validarNombre(
      producto.nombre
    );

    if (errNombre) {
      throw new Error(errNombre);
    }

    const errDesc = validarDescripcion(
      producto.descripcion
    );

    if (errDesc) {
      throw new Error(errDesc);
    }

    const normalizado = crearProducto(producto);

    const response = await apiService.put(
      `${URL_BASE}/${id}`,
      normalizado
    );

    return response.data;

  } catch (error) {

    console.error(
      `Error al actualizar producto con id ${id}:`,
      error
    );

    throw error;
  }
};


/**
 * Eliminar un producto por ID.
 */
export const deleteProductoById = async (id) => {
  try {

    const response = await apiService.delete(
      `${URL_BASE}/${id}`
    );

    return response.data;

  } catch (error) {

    console.error(
      `Error al eliminar producto con id ${id}:`,
      error
    );

    throw error;
  }
};


/**
 * Eliminar todos los productos.
 */
export const deleteProducto = async () => {
  try {

    const response = await apiService.delete(
      URL_BASE
    );

    return response.data;

  } catch (error) {

    console.error(
      'Error al eliminar productos:',
      error
    );

    throw error;
  }
};


/**
 * Asignar categoría a un producto.
 */
export const asignarCategoria = async (
  id,
  categoriaId
) => {
  try {

    const response = await apiService.put(
      `${URL_BASE}/${id}/categoria`,
      categoriaId,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      `Error al asignar categoría al producto ${id}:`,
      error
    );

    throw error;
  }
};


/**
 * Asignar características a un producto.
 */
export const asignarCaracteristicas = async (
  id,
  caracteristicasId
) => {
  try {

    const response = await apiService.put(
      `${URL_BASE}/${id}/caracteristicas`,
      caracteristicasId,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      `Error al asignar características al producto ${id}:`,
      error
    );

    throw error;
  }
};