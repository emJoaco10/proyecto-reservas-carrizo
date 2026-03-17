// src/helpers/productoUtils.js

export const crearProducto = ({ nombre = '', descripcion = '', tipo = '', imagenes = [] } = {}) => ({
  id: Date.now(),
  nombre: nombre.trim(),
  descripcion: descripcion.trim(),
  tipo: tipo.trim(),
  imagenes: Array.isArray(imagenes) ? imagenes : []
});

export const existeProducto = (productos = [], nombre = '') =>
  productos.some(p => p?.nombre?.trim().toLowerCase() === nombre.trim().toLowerCase());

export const obtenerProductoPorId = (productos = [], id) =>
  productos.find(p => String(p.id) === String(id)) || null;

export const normalizarNombre = (nombre = '') => nombre.trim().toLowerCase();

export const obtenerProductosAleatorios = (productos = [], cantidad = 10) => {
  const copia = [...productos];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia.slice(0, cantidad);
};