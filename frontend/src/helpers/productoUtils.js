/**
 * Helpers para crear y consultar objetos Producto.
 * - Centraliza la forma (contrato) del objeto producto.
 * - Normaliza strings y encapsula búsquedas/comparaciones comunes.
 * - No realiza efectos secundarios (puros) para facilitar tests.
 *
 * MODELO DE PRODUCTO:
 * {
 *   id: number|string,   // generado por el backend
 *   nombre: string,      // requerido, sin duplicados
 *   descripcion: string, // requerido
 *   categoria?: string,  // opcional, manejado por backend
 *   imagenes: string[]   // Array de base64 o URLs
 * }
 *
 * USO PRINCIPAL: Todas las operaciones con productos pasan por estas funciones.
 * Nunca manipular objetos producto directamente en componentes.
 */

export const crearProducto = (
  p = {}) => {
  return {
    id: p.id,
    nombre: typeof p.nombre === 'string' ? p.nombre.trim() : (p.nombre ?? ''),
    descripcion: typeof p.descripcion === 'string' ? p.descripcion.trim() : (p.descripcion ?? ''),
    categoria: p.categoria ? {id: p.categoria.id, nombre: p.categoria.nombre} : null,
    imagenes: Array.isArray(p.imagenes) ? p.imagenes : []
  };
};

export const existeProducto = (productos = [], nombre = '') => {
  if (!Array.isArray(productos) || !nombre) return false;
  const nombreBuscado = nombre.trim().toLowerCase();
  return productos.some((p) => normalizarNombre(p?.nombre) === nombreBuscado);
};

export const obtenerProductoPorId = (productos = [], id) => {
  if (!Array.isArray(productos) || id == null) return null;
  const idStr = String(id);
  return productos.find((p) => String(p.id) === idStr) || null;
};

export const normalizarNombre = (nombre = '') => String(nombre).trim().toLowerCase();

export const normalizarCategoria = (categoria) => {
  if (!categoria) return { id: null, nombre: "Sin categoría" };
  return {
    id: categoria.id,
    nombre: String(categoria.nombre).trim()
  };
};

export const obtenerProductosAleatorios = (productos = [], cantidad = 10) => {
  if (!Array.isArray(productos) || productos.length === 0) return [];
  const copia = [...productos];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia.slice(0, cantidad);
};
