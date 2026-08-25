// src/helpers/validaciones.js

/**
 * Reglas de validación para el formulario de producto.
 * - Funciones puras que devuelven mensajes de error (string) o '' si la validación pasa.
 * - Diseñadas para ser usadas tanto en el hook (pre-persistencia) como en componentes (ui).
 */

/**
 * Valida los campos mínimos de un producto.
 *
 * @param {Object} params
 * @param {string} params.nombre - Nombre del producto
 * @param {string} params.descripcion - Descripción del producto
 * @returns {string} - Mensaje de error si hay fallo, o cadena vacía si todo OK
 *
 * @example
 * validarProducto({ nombre: 'Mi Casa', descripcion: 'Muy linda' }) // => ''
 * validarProducto({ nombre: '', descripcion: 'x' }) // => 'El nombre es obligatorio'
 */
export const validarProducto = ({ nombre = '', descripcion = '' } = {}) => {
  
  // Nombre
  const errNombre = validarNombre(nombre);
  if (errNombre) return errNombre;

  // Descripción
  const errDesc = validarDescripcion(descripcion);
  if (errDesc) return errDesc;

  // Si todas las validaciones pasan
  return '';
};

/**
 * Valida el nombre del producto.
 *
 * Reglas:
 * - Debe existir y tener al menos 3 caracteres (después de trim).
 *
 * @param {string} nombre
 * @returns {string} - Mensaje de error o '' si OK
 *
 * @example
 * validarNombre('Casa') // => ''
 * validarNombre('  ') // => 'El nombre debe tener al menos 3 caracteres'
 */
export const validarNombre = (nombre = '') => {
  const n = String(nombre || '').trim();
  if (!n) return 'El nombre es obligatorio';
  if (n.length < 3) return 'El nombre debe tener al menos 3 caracteres';
  return '';
};

/**
 * Valida la descripción del producto.
 *
 * Reglas:
 * - Debe existir y tener al menos 5 caracteres (después de trim).
 *
 * @param {string} descripcion
 * @returns {string} - Mensaje de error o '' si OK
 *
 * @example
 * validarDescripcion('Hermosa casa') // => ''
 * validarDescripcion('x') // => 'La descripción debe tener al menos 5 caracteres'
 */
export const validarDescripcion = (descripcion = '') => {
  const d = String(descripcion || '').trim();
  if (!d) return 'La descripción es obligatoria';
  if (d.length < 5) return 'La descripción debe tener al menos 5 caracteres';
  return '';
};