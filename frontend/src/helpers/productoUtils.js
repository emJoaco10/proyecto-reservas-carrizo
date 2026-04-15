// Crea un nuevo objeto producto con valores normalizados.
// - Genera un id único usando la fecha actual (Date.now()).
// - Limpia espacios en nombre, descripción y tipo.
// - Asegura que 'imagenes' siempre sea un array.
export const crearProducto = ({ nombre = '', descripcion = '', tipo = '', imagenes = [] } = {}) => ({
  id: Date.now(),
  nombre: nombre.trim(),
  descripcion: descripcion.trim(),
  tipo: tipo.trim(),
  imagenes: Array.isArray(imagenes) ? imagenes : []
});

// Verifica si ya existe un producto con el mismo nombre en la lista.
// - Compara nombres ignorando mayúsculas/minúsculas y espacios.
// - Devuelve true si encuentra coincidencia, false si no.
export const existeProducto = (productos = [], nombre = '') =>
  productos.some(p => p?.nombre?.trim().toLowerCase() === nombre.trim().toLowerCase());

// Busca un producto por su id dentro de la lista.
// - Convierte ambos ids a string para evitar problemas de tipo.
// - Devuelve el producto encontrado o null si no existe.
export const obtenerProductoPorId = (productos = [], id) =>
  productos.find(p => String(p.id) === String(id)) || null;

// Normaliza un nombre: elimina espacios y lo pasa a minúsculas.
// Útil para comparar nombres sin importar formato.
export const normalizarNombre = (nombre = '') => nombre.trim().toLowerCase();

// Devuelve una lista de productos aleatorios.
// - Hace una copia del array original.
// - Aplica el algoritmo de Fisher-Yates para mezclar los elementos.
// - Retorna los primeros 'cantidad' productos del array mezclado.
export const obtenerProductosAleatorios = (productos = [], cantidad = 10) => {
  const copia = [...productos];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia.slice(0, cantidad);
};