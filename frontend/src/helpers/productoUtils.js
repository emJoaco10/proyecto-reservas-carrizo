/**
 * Helpers para crear y consultar objetos Producto.
 * - Centraliza la forma (contrato) del objeto producto.
 * - Normaliza strings y encapsula búsquedas/comparaciones comunes.
 * - No realiza efectos secundarios (puros) para facilitar tests.
 *
 * ESTRUCTURA DE PRODUCTO:
 * {
 *   id: number|string,   // generado por el backend
 *   nombre: string,
 *   descripcion: string,
 *   ubicacion: string,
 *   categoria: { id, nombre }|null,
 *   imagenes: string[]
 * }
 *
 * USO PRINCIPAL: Todas las operaciones con productos pasan por estas funciones.
 * Nunca manipular objetos producto directamente en componentes.
 */

/**
 * Construye un objeto producto con una estructura normalizada.
 * Recorta los extremos de `nombre`, `descripcion` y `ubicacion` si son strings;
 * si no lo son, conserva sus valores no nulos sin convertirlos a texto.
 * Representa `categoria` como `{ id, nombre }` si el valor recibido es verdadero,
 * o como `null` en caso contrario. Usa `[]` para `imagenes` si no recibe un array.
 * No valida que el producto completo sea válido.
 *
 * @param {Object} [p={}] Datos de origen del producto.
 * @returns {Object} Producto con los campos `id`, `nombre`, `descripcion`,
 *   `ubicacion`, `categoria` e `imagenes`.
 */
export const crearProducto = (
  p = {}) => {
  return {
    id: p.id,
    nombre: typeof p.nombre === 'string' ? p.nombre.trim() : (p.nombre ?? ''),
    descripcion: typeof p.descripcion === 'string' ? p.descripcion.trim() : (p.descripcion ?? ''),
    ubicacion: typeof p.ubicacion === 'string'
      ? p.ubicacion.trim()
      : (p.ubicacion ?? ''),
    categoria: p.categoria
      ? {
        id: p.categoria.id,
        nombre: p.categoria.nombre
      }
      : null,
    imagenes: Array.isArray(p.imagenes) ? p.imagenes : []
  };
};

/**
 * Indica si existe un producto cuyo nombre coincide con el nombre buscado.
 * La comparación ignora mayúsculas y minúsculas y normaliza el nombre del
 * producto mediante {@link normalizarNombre}.
 *
 * @param {Array<Object>} [productos=[]] Productos donde realizar la búsqueda.
 * @param {string} [nombre=''] Nombre que se desea buscar.
 * @returns {boolean} `true` si encuentra una coincidencia; `false` si no la
 *   encuentra o si `productos` no es un array o `nombre` está vacío.
 */
export const existeProducto = (productos = [], nombre = '') => {
  if (!Array.isArray(productos) || !nombre) return false;
  const nombreBuscado = nombre.trim().toLowerCase();
  return productos.some((p) => normalizarNombre(p?.nombre) === nombreBuscado);
};

/**
 * Busca un producto por identificador, convirtiendo ambos identificadores a
 * string para que, por ejemplo, `5` y `"5"` se consideren coincidentes.
 *
 * @param {Array<Object>} [productos=[]] Productos donde realizar la búsqueda.
 * @param {number|string} id Identificador del producto buscado.
 * @returns {Object|null} El primer producto coincidente, o `null` si el array no
 *   es válido, el identificador es `null` o `undefined`, o no hay coincidencia.
 */
export const obtenerProductoPorId = (productos = [], id) => {
  if (!Array.isArray(productos) || id == null) return null;
  const idStr = String(id);
  return productos.find((p) => String(p.id) === idStr) || null;
};

/**
 * Convierte el valor a string, elimina los espacios iniciales y finales y lo
 * transforma a minúsculas; no modifica espacios internos ni caracteres especiales.
 *
 * @param {*} [nombre=''] Valor que se desea normalizar.
 * @returns {string} Nombre convertido a minúsculas y sin espacios en los extremos.
 */
export const normalizarNombre = (nombre = '') => String(nombre).trim().toLowerCase();

/**
 * Devuelve una representación de categoría con los campos `id` y `nombre`.
 * Si la entrada es falsy, usa `null` como identificador y `"Sin categoría"`
 * como nombre. En caso contrario, conserva el identificador y convierte el
 * nombre a string, eliminando sus espacios iniciales y finales.
 *
 * @param {Object|null|undefined} categoria Categoría que se desea normalizar.
 * @returns {{id: *, nombre: string}} Categoría normalizada; no verifica su
 *   existencia en el backend.
 */
export const normalizarCategoria = (categoria) => {
  if (!categoria) return { id: null, nombre: "Sin categoría" };
  return {
    id: categoria.id,
    nombre: String(categoria.nombre).trim()
  };
};

/**
 * Devuelve una selección de productos en orden aleatorio. Mezcla una copia del
 * array mediante el algoritmo implementado aquí, sin alterar el orden original,
 * y aplica `slice(0, cantidad)` para limitar el resultado según la semántica de
 * `slice`. Devuelve un array vacío si la entrada no es un array o está vacío.
 *
 * @param {Array<Object>} [productos=[]] Productos que se pueden seleccionar.
 * @param {number} [cantidad=10] Límite usado para extraer el resultado con `slice`.
 * @returns {Array<Object>} Productos en orden aleatorio.
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
