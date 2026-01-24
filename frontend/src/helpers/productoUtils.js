/**
 * Helpers para crear y consultar objetos Producto.
 * - Centraliza la forma (contrato) del objeto producto.
 * - Normaliza strings y encapsula búsquedas/comparaciones comunes.
 * - No realiza efectos secundarios (puros) para facilitar tests.
 */

/**
 * Crea un objeto Producto normalizado.
 *
 * @param {Object} params
 * @param {string} params.nombre - Nombre del producto
 * @param {string} params.descripcion - Descripción del producto
 * @param {string} [params.tipo] - Tipo de propiedad (casa|departamento|hotel)
 * @param {Array<string>} [params.imagenes] - Array de URLs de imágenes
 * @returns {Object} - Producto con la forma { id, nombre, descripcion, tipo, imagenes }
 *
 * @example
 * crearProducto({ nombre: 'Mi Casa', descripcion: 'Muy linda', tipo: 'casa', imagenes: [] })
 */

export const crearProducto = ({ nombre, descripcion, tipo = '', imagenes = [] } = {}) => {
  // Normalizamos entradas para evitar inconsistencias (espacios, nulls).
  const nombreNormalizado = typeof nombre === 'string' ? nombre.trim() : '';
  const descripcionNormalizada = typeof descripcion === 'string' ? descripcion.trim() : '';
  const tipoNormalizado = typeof tipo === 'string' ? tipo.trim() : '';

  return {
    id: Date.now(), // id simple; podés reemplazar por UUID si lo necesitás
    nombre: nombreNormalizado,
    descripcion: descripcionNormalizada,
    tipo: tipoNormalizado,
    imagenes: Array.isArray(imagenes) ? imagenes : []
  };
};

/**
 * Comprueba si existe un producto con el mismo nombre (comparación case-insensitive).
 *
 * @param {Array<Object>} productos - Lista de productos
 * @param {string} nombre - Nombre a comparar
 * @returns {boolean} - true si existe un producto con ese nombre
 *
 * @example
 * existeProducto(productos, 'Mi Casa') // => true | false
 */

export const existeProducto = (productos = [], nombre = '') => {
  if (!Array.isArray(productos) || !nombre) return false;

  const nombreBuscado = nombre.trim().toLowerCase();
  return productos.some((p) => {
    const n = (p && p.nombre) ? String(p.nombre).trim().toLowerCase() : '';
    return n === nombreBuscado;
  });
};

/**
 * Obtiene un producto por su id.
 *
 * @param {Array<Object>} productos - Lista de productos
 * @param {number|string} id - Id a buscar (acepta string o number)
 * @returns {Object|null} - Producto encontrado o null si no existe
 *
 * @example
 * obtenerProductoPorId(productos, 1634234234)
 */
export const obtenerProductoPorId = (productos = [], id) => {
  if (!Array.isArray(productos)) return null;
  if (id === undefined || id === null) return null;

  // Convertimos ambos a string para soportar tanto números como UUIDs
  const idStr = String(id);
  return productos.find((p) => String(p.id) === idStr) || null;
};


/**
 * Normaliza un nombre para comparaciones (utilidad pública por si se necesita elsewhere).
 *
 * @param {string} nombre
 * @returns {string} - nombre normalizado (trim + lowercase)
 */
export const normalizarNombre = (nombre = '') => {
  return String(nombre).trim().toLowerCase();
};

/**
 * Devuelve hasta `cantidad` productos aleatorios sin repetir.
 * Usa algoritmo Fisher-Yates para garantizar aleatoriedad real.
 *
 * @param {Array<Object>} productos - Lista de productos
 * @param {number} cantidad - Máximo de productos a devolver
 * @returns {Array<Object>} - Lista aleatoria de productos
 *
 * @example
 * obtenerProductosAleatorios(productos, 10)
 */
export const obtenerProductosAleatorios = (productos = [], cantidad = 10) => {
  if (!Array.isArray(productos) || productos.length === 0) return [];

  const copia = [...productos];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia.slice(0, cantidad);
};

