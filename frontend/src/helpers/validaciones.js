// src/helpers/validaciones.js

export const validarNombre = (nombre = '') => {
  const n = nombre.trim();
  if (!n) return 'El nombre es obligatorio';
  if (n.length < 3) return 'El nombre debe tener al menos 3 caracteres';
  return '';
};

export const validarDescripcion = (descripcion = '') => {
  const d = descripcion.trim();
  if (!d) return 'La descripción es obligatoria';
  if (d.length < 5) return 'La descripción debe tener al menos 5 caracteres';
  return '';
};

export const validarProducto = ({ nombre = '', descripcion = '', tipo = '' } = {}) => {
  if (!tipo.trim()) return 'Seleccioná un tipo de propiedad';
  return validarNombre(nombre) || validarDescripcion(descripcion);
};