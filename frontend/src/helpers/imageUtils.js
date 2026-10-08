/**
 * Utilidades para crear URLs temporales de archivos, liberarlas y obtener URLs
 * de imágenes representativas según el tipo de propiedad.
 *
 * Las URLs creadas con `URL.createObjectURL` deben revocarse cuando dejan de
 * utilizarse. Estas utilidades no validan que los archivos sean imágenes válidas
 * ni comprueban la disponibilidad de las URLs remotas.
 */

/**
 * Crea URLs temporales mediante `URL.createObjectURL` para los archivos que
 * superan las restricciones configuradas.
 *
 * Acepta un array de archivos o un objeto iterable compatible con `Array.from`,
 * como un `FileList`. Omite los archivos que no superan las restricciones o cuyo
 * procesamiento falla. Maneja errores por archivo y errores del procesamiento
 * general; ante un error general devuelve un array vacío. Si se proporciona,
 * `onError` recibe los errores de procesamiento y los generados por las
 * restricciones. Esta función crea URLs temporales, pero no las revoca.
 *
 * @param {File[]|FileList} fileList Lista de archivos que se procesará.
 * @param {Object} [options={}] Opciones de filtrado.
 * @param {number} [options.maxSize] Tamaño máximo por archivo, en bytes. Si el
 *   valor es verdadero, se descartan los archivos que superen este límite.
 * @param {string[]} [options.allowedTypes] Tipos MIME permitidos. Si se
 *   proporciona un array no vacío, se descartan los tipos que no estén incluidos.
 * @param {(err: Error) => void} [onError] Callback opcional que recibe errores.
 * @returns {string[]} URLs temporales creadas correctamente.
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
 * Intenta liberar las URLs recibidas mediante `URL.revokeObjectURL`.
 * Solo intenta revocar los valores que sean strings y comiencen con `blob:`.
 * Si el argumento no es un array, termina sin realizar la iteración. Los errores
 * individuales se registran con `console.warn` y los errores generales con
 * `console.error`. No devuelve un resultado explícito.
 *
 * @param {string[]} [urls=[]] Array de URLs que se intentará revocar.
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
 * Comprueba si el valor recibido es un string que comienza con `blob:`.
 * Es una comprobación superficial del prefijo, no una validación completa de URL.
 *
 * @param {*} url Valor que se comprobará.
 * @returns {boolean} `true` si es un string con el prefijo `blob:`; de lo
 *   contrario, `false`.
 */
export const isObjectURL = (url) => {
  return typeof url === 'string' && url.startsWith('blob:');
};

/**
 * Devuelve URLs de imágenes predefinidas para un tipo de propiedad o genera
 * URLs de Picsum cuando el tipo no está reconocido. Normaliza `tipo`
 * convirtiéndolo a string, eliminando los espacios iniciales y finales y pasando
 * el texto a minúsculas. Busca en el mapa de `Casa`, `Departamento` y `Hotel`
 * sin distinguir mayúsculas y minúsculas. Para tipos reconocidos, repite las
 * URLs disponibles de forma cíclica si `count` supera su cantidad; para los
 * demás, genera una URL de Picsum por cada índice utilizado. No descarga las
 * imágenes ni comprueba la disponibilidad de las URLs.
 *
 * @param {string} [tipo=''] Tipo de propiedad que se buscará en el mapa.
 * @param {number} [count=5] Cantidad de URLs que se incorporarán al resultado.
 * @param {number} [width=1200] Ancho usado en las URLs generadas de Picsum.
 * @param {number} [height=800] Alto usado en las URLs generadas de Picsum.
 * @param {*} [seedBase=Date.now()] Valor predeterminado al resultado de
 *   `Date.now()` en el momento de la llamada, usado para construir URLs de
 *   Picsum; no modifica las URLs predefinidas.
 * @returns {string[]} Array de URLs seleccionadas o generadas.
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
