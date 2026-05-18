/**
 * storageUtils reducido:
 * - Cachea respuestas del backend (ej. productos).
 * - Guarda preferencias locales (ej. filtros, tema, idioma).
 * - No se usa como source of truth, solo soporte opcional.
 */

/**
 * Lee y parsea de manera segura una clave de localStorage.
 * Devuelve un valor por defecto si no existe o si el parse falla.
 *
 * @param {string} clave - Nombre de la clave en localStorage
 * @param {any} defecto - Valor por defecto si no existe
 * @param {function} [onError] - Callback opcional para manejar errores
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
 * Serializa y escribe un valor en localStorage.
 *
 * @param {string} clave - Nombre de la clave
 * @param {any} valor - Valor a guardar
 * @param {function} [onError] - Callback opcional para manejar errores
 * @returns {boolean} - true si la operación tuvo éxito, false en caso contrario
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
 * Remueve una clave de localStorage.
 *
 * @param {string} clave - Nombre de la clave
 * @returns {boolean} - true si la operación tuvo éxito, false en caso contrario
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
 * Cachear productos (ejemplo).
 */
export const cacheProductos = (productos) => escribirLocal("productos_cache", productos);
export const leerProductosCache = () => leerLocal("productos_cache", []);

/**
 * Guardar y leer preferencias de usuario.
 */
export const guardarPreferencia = (clave, valor) => escribirLocal(`pref_${clave}`, valor);
export const leerPreferencia = (clave, defecto = null) => leerLocal(`pref_${clave}`, defecto);
