// Valida el nombre de un producto.
// - Elimina espacios con trim.
// - Si está vacío, devuelve un mensaje de error.
// - Si tiene menos de 3 caracteres, devuelve otro mensaje.
// - Si pasa las condiciones, devuelve '' (sin error).
export const validarNombre = (nombre = '') => {
  const n = nombre.trim();
  if (!n) return 'El nombre es obligatorio';
  if (n.length < 3) return 'El nombre debe tener al menos 3 caracteres';
  return '';
};

// Valida la descripción de un producto.
// - Elimina espacios con trim.
// - Si está vacía, devuelve un mensaje de error.
// - Si tiene menos de 5 caracteres, devuelve otro mensaje.
// - Si pasa las condiciones, devuelve '' (sin error).
export const validarDescripcion = (descripcion = '') => {
  const d = descripcion.trim();
  if (!d) return 'La descripción es obligatoria';
  if (d.length < 5) return 'La descripción debe tener al menos 5 caracteres';
  return '';
};

// Valida un objeto producto completo.
// - Verifica que el tipo no esté vacío.
// - Si el tipo está bien, valida nombre y descripción.
// - Devuelve el primer error encontrado o '' si todo está correcto.
export const validarProducto = ({ nombre = '', descripcion = '', tipo = '' } = {}) => {
  if (!tipo.trim()) return 'Seleccioná un tipo de propiedad';
  return validarNombre(nombre) || validarDescripcion(descripcion);
};

// Valida un conjunto de imágenes subidas.
// - Verifica que sea un array y que no esté vacío.
// - Controla cantidad máxima de archivos.
// - Controla formatos permitidos (JPEG, PNG, WEBP).
// - Controla tamaño máximo por archivo.
// - Devuelve un mensaje de error si algo falla, o '' si todo está correcto.
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