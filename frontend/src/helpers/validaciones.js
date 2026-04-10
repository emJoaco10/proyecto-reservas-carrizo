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

export const validarImagenes = (
  files = [],
  { maxSize = 5 * 1024 * 1024, allowedTypes = ['image/jpeg', 'image/png', 'image/webp'], maxFiles = 10 } = {}
) => {
  if (!Array.isArray(files) || files.length === 0) return '';

  if (files.length > maxFiles) {
    return `Podés subir hasta ${maxFiles} imágenes por producto.`;
  }

  const invalidType = files.find(f => !allowedTypes.includes(f.type));
  if (invalidType) {
    return `Formato no permitido: ${invalidType.name}`;
  }

  const tooLarge = files.find(f => f.size > maxSize);
  if (tooLarge) {
    return `La imagen "${tooLarge.name}" supera el límite de ${Math.round(maxSize / (1024 * 1024))}MB.`;
  }

  return '';
};