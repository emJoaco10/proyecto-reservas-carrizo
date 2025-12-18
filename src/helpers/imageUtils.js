/**
 * Utilities para convertir FileList/Array<File> en Object URLs (previews)
 * y para liberar esas Object URLs cuando ya no se necesiten.
 *
 * - filesToObjectURLs: devuelve un array de string (blob:...) para usar como src en <img>.
 * - revokeObjectURLs: intenta revocar cada URL pasada (silencioso ante errores).
 *
 * Nota: las Object URLs creadas con URL.createObjectURL deben revocarse con URL.revokeObjectURL
 * cuando ya no se usan (por ejemplo al desmontar componentes o al eliminar un producto)
 * para evitar fugas de memoria.
 */

/**
 * Convierte un FileList o array de File en un array de Object URLs.
 *
 * @param {FileList|Array<File>} fileList - Lista de archivos (p. ej. event.target.files)
 * @param {(err: Error) => void} [onError] - Callback opcional para reportar errores
 * @returns {Array<string>} - Array de object URLs (puede ser vacío si no hay archivos o falla)
 */
export const filesToObjectURLs = (fileList, onError) => {
  try {
    if (!fileList) return [];
    const files = Array.isArray(fileList) ? fileList : Array.from(fileList);
    return files.map((file) => {
      try {
        return URL.createObjectURL(file);
      } catch (err) {
        // Si falla crear la URL para un archivo individual, reportamos y devolvemos null para ese índice
        console.error('[imageUtils.filesToObjectURLs] Error creando objectURL para un archivo:', err);
        if (typeof onError === 'function') onError(err);
        return null;
      }
    }).filter(Boolean); // Eliminamos nulls si hubo fallos parciales
  } catch (err) {
    console.error('[imageUtils.filesToObjectURLs] Error procesando fileList:', err);
    if (typeof onError === 'function') onError(err);
    return [];
  }
};

/**
 * Revoca un array de Object URLs (blob:...) para liberar memoria.
 *
 * @param {Array<string>} urls - Array de object URLs a revocar
 * @param {(err: Error) => void} [onError] - Callback opcional para reportar errores
 * @returns {void}
 */
export const revokeObjectURLs = (urls = [], onError) => {
  if (!Array.isArray(urls) || urls.length === 0) return;
  urls.forEach((u) => {
    try {
      if (typeof u === 'string' && u.startsWith('blob:')) {
        URL.revokeObjectURL(u);
      }
    } catch (err) {
      console.error('[imageUtils.revokeObjectURLs] Error revocando objectURL:', err);
      if (typeof onError === 'function') onError(err);
    }
  });
};

/**
 * Heurística simple para detectar si una URL es probablemente una object URL (blob:)
 *
 * @param {string} url
 * @returns {boolean}
 */
export const isObjectURL = (url) => {
  return typeof url === 'string' && url.startsWith('blob:');
};

/**
 * Devuelve un array de URLs representativas según el tipo de propiedad.
 * @param {string} tipo
 * @returns {Array<string>}
 */
export const obtenerImagenesPorTipo = (tipo = '') => {
  const limpio = tipo.trim().toLowerCase();
  switch (limpio) {
    case 'casa':
      return [
        'https://cdn.pixabay.com/photo/2016/11/29/05/08/architecture-1867187_1280.jpg',
        'https://cdn.pixabay.com/photo/2017/08/06/11/40/house-2593570_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/18/15/07/house-1836070_1280.jpg',
        'https://cdn.pixabay.com/photo/2017/03/28/12/10/house-2187170_1280.jpg',
        'https://cdn.pixabay.com/photo/2015/03/26/09/54/house-690189_1280.jpg'
      ];
    case 'departamento':
      return [
        'https://cdn.pixabay.com/photo/2016/11/18/14/54/apartment-1836070_1280.jpg',
        'https://cdn.pixabay.com/photo/2017/01/16/19/40/apartment-1989341_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/18/15/07/building-1836071_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/18/15/07/architecture-1836072_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/18/15/07/urban-1836073_1280.jpg'
      ];
    case 'hotel':
      return [
        'https://cdn.pixabay.com/photo/2016/11/18/15/07/hotel-1836074_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/18/15/07/lobby-1836075_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/18/15/07/room-1836076_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/18/15/07/pool-1836077_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/18/15/07/restaurant-1836078_1280.jpg'
      ];
    default:
      return [
        `https://picsum.photos/seed/${Date.now()}a/300/200`,
        `https://picsum.photos/seed/${Date.now()}b/300/200`
      ];
  }
};