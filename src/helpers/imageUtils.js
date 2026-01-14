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
 * Convierte una lista de File en objectURLs seguros.
 * Opcionalmente valida tamaño y tipos antes de crear las URLs.
 *
 * @param {File[]|FileList} fileList
 * @param {Object} [options]
 * @param {number} [options.maxSize] - bytes máximos por archivo
 * @param {string[]} [options.allowedTypes] - tipos MIME permitidos
 * @param {(err:Error)=>void} [onError]
 * @returns {string[]} - array de objectURLs (solo archivos válidos)
 */
export const filesToObjectURLs = (fileList, options = {}, onError) => {
  try {
    if (!fileList) return [];
    const files = Array.isArray(fileList) ? fileList : Array.from(fileList);
    const { maxSize, allowedTypes } = options;

    const urls = [];
    for (const file of files) {
      try {
        if (maxSize && file.size > maxSize) {
          const err = new Error(`File too large: ${file.name}`);
          if (typeof onError === 'function') onError(err);
          continue;
        }
        if (Array.isArray(allowedTypes) && allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
          const err = new Error(`Invalid file type: ${file.name} (${file.type})`);
          if (typeof onError === 'function') onError(err);
          continue;
        }
        const url = URL.createObjectURL(file);
        urls.push(url);
      } catch (err) {
        console.error('[filesToObjectURLs] Error creando objectURL para', file.name, err);
        if (typeof onError === 'function') onError(err);
      }
    }

    return urls;
  } catch (err) {
    console.error('[filesToObjectURLs] Error procesando fileList:', err);
    if (typeof onError === 'function') onError(err);
    return [];
  }
};

/**
 * Revoca un array de objectURLs (libera memoria).
 *
 * @param {string[]} urls
 */
export const revokeObjectURLs = (urls = []) => {
  try {
    if (!Array.isArray(urls)) return;
    urls.forEach((u) => {
      try {
        if (typeof u === 'string' && u.startsWith('blob:')) URL.revokeObjectURL(u);
      } catch (err) {
        console.warn('[revokeObjectURLs] Error revocando', u, err);
      }
    });
  } catch (err) {
    console.error('[revokeObjectURLs] Error general:', err);
  }
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
export const obtenerImagenesPorTipo = (tipo = '', count = 5, width = 1200, height = 800, seedBase = Date.now()) => {

  // Normalizar tipo: quitar espacios y pasar a minúsculas
const limpio = String(tipo || '').trim().toLowerCase();
const makePicsum = (i) => `https://picsum.photos/seed/${seedBase}-${i}/${width}/${height}`

// Mapa original (puede tener llaves con mayúsculas o minúsculas)
const mapByType = {
  Casa: [
    'https://cdn.pixabay.com/photo/2016/11/29/05/08/architecture-1867187_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/08/06/11/40/house-2593570_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/18/15/07/house-1836070_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/03/28/12/10/house-2187170_1280.jpg',
    'https://cdn.pixabay.com/photo/2015/03/26/09/54/house-690189_1280.jpg'
  ],
  Departamento: [
    'https://cdn.pixabay.com/photo/2016/11/18/14/54/apartment-1836070_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/01/16/19/40/apartment-1989341_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/18/15/07/building-1836071_1280.jpg',
   'https://cdn.pixabay.com/photo/2016/11/29/05/08/architecture-1867187_1280.jpg',
   'https://cdn.pixabay.com/photo/2017/08/06/11/40/house-2593570_1280.jpg',
   'https://cdn.pixabay.com/photo/2016/11/18/15/07/house-1836070_1280.jpg',
   'https://cdn.pixabay.com/photo/2017/03/28/12/10/house-2187170_1280.jpg',
   'https://cdn.pixabay.com/photo/2015/03/26/09/54/house-690189_1280.jpg'
 ],
 Hotel: [
   'https://cdn.pixabay.com/photo/2016/11/18/15/07/hotel-1836074_1280.jpg',
   'https://cdn.pixabay.com/photo/2016/11/18/15/07/lobby-1836075_1280.jpg',
   'https://cdn.pixabay.com/photo/2016/11/18/15/07/room-1836076_1280.jpg',
   'https://cdn.pixabay.com/photo/2016/11/18/15/07/pool-1836077_1280.jpg',
   'https://cdn.pixabay.com/photo/2016/11/18/15/07/restaurant-1836078_1280.jpg'
 ]
};

// Normalizar las llaves del mapa a minúsculas para búsqueda insensible a mayúsculas
const normalizedMap = Object.fromEntries(
 Object.entries(mapByType).map(([k, v]) => [String(k).trim().toLowerCase(), v])
);

const base = normalizedMap[limpio] || Array.from({ length: count }, (_, i) => makePicsum(i));
const result = [];
for (let i = 0; i < count; i++) result.push(base[i % base.length]);
return result};
