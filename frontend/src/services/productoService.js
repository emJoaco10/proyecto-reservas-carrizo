/** Instancia de Axios utilizada para realizar solicitudes HTTP al backend. */
import apiService from './apiService';
/** Validadores auxiliares de los datos del producto para su creación o actualización. */
import { validarDescripcion, validarNombre } from '../helpers/validaciones';
/** Helper que normaliza el objeto de producto antes de enviarlo al backend. */
import { crearProducto } from '../helpers/productoUtils';

/** Ruta base utilizada por las solicitudes de este servicio. */
const URL_BASE = '/producto';

/**
 * ============================================================
 * PRODUCTOS PÚBLICOS
 * ============================================================
 */

/**
 * Obtiene productos paginados para el catálogo público mediante GET a
 * `/producto/paginados`, enviando `page` y `size` como parámetros de consulta.
 *
 * No requiere autenticación. Usa la página `0` y el tamaño `100` de forma
 * predeterminada. Devuelve `response.data.content` cuando está disponible;
 * en caso contrario, devuelve un array vacío. Si la solicitud falla, registra
 * el error en la consola y lo vuelve a lanzar.
 *
 * @param {number} page Número de página.
 * @param {number} size Cantidad de productos.
 * @returns {Promise<Array>} Contenido paginado o un array vacío si no está disponible.
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
 * Obtiene un producto mediante GET a `/producto/{id}`. Devuelve
 * `response.data`; si la solicitud falla, registra el error en la consola y
 * lo vuelve a lanzar.
 *
 * @param {number|string} id Identificador del producto.
 * @returns {Promise<*>} Datos devueltos por el backend.
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
 * Obtiene productos mediante GET a `/producto/paginados`, enviando `page` y
 * `size` como parámetros de consulta. Devuelve `response.data` sin transformar
 * el resultado. Si la solicitud falla, registra el error en la consola y lo
 * vuelve a lanzar.
 *
 * @param {number} page Número de página.
 * @param {number} size Cantidad de productos por página.
 * @returns {Promise<*>} Datos devueltos por el backend.
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
 * Solicita productos aleatorios mediante GET a `/producto/aleatorios` y
 * devuelve `response.data`. Si la solicitud falla, registra el error en la
 * consola y lo vuelve a lanzar.
 *
 * @returns {Promise<*>} Datos devueltos por el backend.
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
 * Consulta `/producto/categoriasFiltro` mediante GET, enviando `categoriaIds`
 * en el parámetro de consulta `ids`. Devuelve `response.data`; si la solicitud
 * falla, registra el error en la consola y lo vuelve a lanzar.
 *
 * @param {*} categoriaIds Valor enviado como parámetro de consulta `ids`.
 * @returns {Promise<*>} Datos devueltos por el backend.
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
 * Realiza una solicitud GET a `/producto/buscar`, enviando `texto` como
 * parámetro de consulta. Devuelve `response.data`; si la solicitud falla,
 * registra el error en la consola y lo vuelve a lanzar.
 *
 * @param {string} texto Texto enviado como parámetro de búsqueda.
 * @returns {Promise<*>} Datos devueltos por el backend.
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
 * Consulta `/producto/categorias` mediante GET. Devuelve directamente
 * `response.data` si es un array; de lo contrario, devuelve `data.content` o
 * un array vacío si ese valor es nulo o indefinido. Si la solicitud falla,
 * registra el error en la consola y lo vuelve a lanzar.
 *
 * @returns {Promise<Array|*>} Array recibido o contenido disponible en la respuesta.
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
 * Obtiene productos para administración mediante GET a `/producto/admin` y
 * devuelve `response.data`. Si la solicitud falla, registra el error en la
 * consola y lo vuelve a lanzar.
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
 * Valida el nombre y la descripción mediante `validarNombre` y
 * `validarDescripcion`; si cualquiera devuelve un mensaje verdadero, lanza un
 * error con ese mensaje. Luego normaliza el objeto mediante `crearProducto` y
 * lo envía en una solicitud POST a `URL_BASE`. Devuelve `response.data` si la
 * solicitud tiene éxito. Los errores capturados se registran en la consola y
 * se vuelven a lanzar.
 *
 * @param {Object} producto Datos del producto que se validarán y normalizarán.
 * @returns {Promise<*>} Datos devueltos por el backend.
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
 * Valida el nombre y la descripción mediante `validarNombre` y
 * `validarDescripcion`; si cualquiera devuelve un mensaje verdadero, lanza un
 * error con ese mensaje. Normaliza el objeto mediante `crearProducto` y envía
 * el objeto normalizado en una solicitud PUT a `/producto/{id}`. Devuelve
 * `response.data` si la solicitud tiene éxito. Los errores capturados se
 * registran en la consola con el identificador y se vuelven a lanzar.
 *
 * @param {number|string} id Identificador del producto que se actualizará.
 * @param {Object} producto Datos del producto que se validarán y normalizarán.
 * @returns {Promise<*>} Datos devueltos por el backend.
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
 * Realiza una solicitud DELETE a `/producto/{id}` y devuelve `response.data`.
 * Si la solicitud falla, registra el error en la consola y lo vuelve a lanzar.
 *
 * @param {number|string} id Identificador del producto.
 * @returns {Promise<*>} Datos devueltos por el backend.
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
 * Realiza una solicitud DELETE a `URL_BASE` y devuelve `response.data`. No
 * recibe parámetros. Si la solicitud falla, registra el error en la consola y
 * lo vuelve a lanzar.
 *
 * @returns {Promise<*>} Datos devueltos por el backend.
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
 * Realiza una solicitud PUT a `/producto/{id}/categoria`, enviando
 * `categoriaId` como cuerpo y especificando `Content-Type: application/json`.
 * Devuelve `response.data`; si la solicitud falla, registra el error en la
 * consola y lo vuelve a lanzar.
 *
 * @param {number|string} id Identificador del producto.
 * @param {*} categoriaId Valor enviado en el cuerpo de la solicitud.
 * @returns {Promise<*>} Datos devueltos por el backend.
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
 * Realiza una solicitud PUT a `/producto/{id}/caracteristicas`, enviando
 * `caracteristicasId` como cuerpo y especificando
 * `Content-Type: application/json`. Devuelve `response.data`; si la solicitud
 * falla, registra el error en la consola y lo vuelve a lanzar.
 *
 * @param {number|string} id Identificador del producto.
 * @param {*} caracteristicasId Valor enviado en el cuerpo de la solicitud.
 * @returns {Promise<*>} Datos devueltos por el backend.
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