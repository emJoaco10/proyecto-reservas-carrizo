/**
 * Centraliza operaciones de lectura, escritura y eliminación en localStorage.
 * También ofrece utilidades para cachear productos y guardar preferencias.
 *
 * Las operaciones principales capturan excepciones y las registran en consola.
 * Solo las funciones que aceptan `onError` ejecutan ese callback al capturar
 * una excepción.
 */

/**
 * Callback opcional ejecutado cuando una operación captura una excepción.
 * @callback StorageErrorCallback
 * @param {*} error - Excepción capturada.
 */

/**
 * Lee y parsea el contenido de una clave de localStorage.
 * Devuelve `defecto` si el contenido es una cadena vacía o si ocurre una
 * excepción; en este último caso registra el error y ejecuta `onError`, si se
 * proporcionó. JSON.parse no valida la estructura del valor parseado.
 * @param {string} clave - Nombre de la clave en localStorage.
 * @param {*} [defecto=null] - Valor alternativo si no hay contenido utilizable.
 * @param {StorageErrorCallback} [onError] - Callback ejecutado ante una excepción.
 * @returns {*} El valor parseado o `defecto`.
 */
export const leerLocal = (clave, defecto = null, onError) => {
  try {
    const raw = localStorage.getItem(clave);
    if (!raw) return defecto;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`[storageUtils.leerLocal] Error leyendo "${clave}":`, err);
    if (typeof onError === "function") onError(err);
    return defecto;
  }
};

/**
 * Serializa un valor y lo escribe en localStorage.
 * Si ocurre una excepción, registra el error, ejecuta `onError` si se
 * proporcionó y devuelve `false`.
 * @param {string} clave - Nombre de la clave en localStorage.
 * @param {*} valor - Valor que se serializará y guardará.
 * @param {StorageErrorCallback} [onError] - Callback ejecutado ante una excepción.
 * @returns {boolean} `true` si no se produjo una excepción; `false` si se capturó una.
 */
export const escribirLocal = (clave, valor, onError) => {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (err) {
    console.error(`[storageUtils.escribirLocal] Error escribiendo "${clave}":`, err);
    if (typeof onError === "function") onError(err);
    return false;
  }
};

/**
 * Elimina una clave de localStorage.
 * Si ocurre una excepción, la registra en consola y devuelve `false`.
 * @param {string} clave - Nombre de la clave en localStorage.
 * @returns {boolean} `true` si no se produjo una excepción; `false` si se capturó una.
 */
export const removerLocal = (clave) => {
  try {
    localStorage.removeItem(clave);
    return true;
  } catch (err) {
    console.error(`[storageUtils.removerLocal] Error removiendo "${clave}":`, err);
    return false;
  }
};

/**
 * Guarda los productos en la clave `productos_cache` mediante `escribirLocal`.
 * @param {*} productos - Valor de productos que se guardará.
 * @returns {boolean} Resultado devuelto por `escribirLocal`.
 */
export const cacheProductos = (productos) => escribirLocal("productos_cache", productos);

/**
 * Lee el valor de la clave `productos_cache` mediante `leerLocal`.
 * @returns {*} Valor parseado, o un arreglo vacío como valor por defecto.
 */
export const leerProductosCache = () => leerLocal("productos_cache", []);

/**
 * Guarda una preferencia en la clave `pref_${clave}` mediante `escribirLocal`.
 * @param {string} clave - Identificador de la preferencia, usado para formar la clave.
 * @param {*} valor - Valor de la preferencia que se guardará.
 * @returns {boolean} Resultado devuelto por `escribirLocal`.
 */
export const guardarPreferencia = (clave, valor) => escribirLocal(`pref_${clave}`, valor);

/**
 * Lee una preferencia de la clave `pref_${clave}` mediante `leerLocal`.
 * @param {string} clave - Identificador usado para formar la clave.
 * @param {*} [defecto=null] - Valor alternativo pasado a `leerLocal`.
 * @returns {*} Valor parseado o el valor por defecto.
 */
export const leerPreferencia = (clave, defecto = null) => leerLocal(`pref_${clave}`, defecto);
