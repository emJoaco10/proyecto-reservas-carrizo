/**
 * Utility functions to safely interact with localStorage.
 * - Encapsula parse/stringify y manejo de errores para evitar que un JSON corrupto rompa la app.
 * - Centraliza la clave por defecto y ofrece funciones pequeñas y reutilizables.
 */

/**
 * Lee y parsea de manera segura una clave de localStorage.
 * Devuelve un valor por defecto ([]) si no existe o si el parse falla.
 *
 * @param {string} clave - Nombre de la clave en localStorage
 * @param {any} defecto - Valor a retornar si no hay dato o ocurre error (por defecto [])
 * @returns {any} - El valor parseado desde localStorage o el valor por defecto
 */

export const leerLocal = (clave, defecto = []) => {
  try {
    const raw = localStorage.getItem(clave);
    if (!raw) return defecto;
    return JSON.parse(raw);
  } catch (err) {
    // Logueo consistente y callback opcional para reporting
    console.error(`[storageUtils.leerLocal] Error leyendo/parceando la clave "${clave}":`, err);
    if (typeof onError === 'function') onError(err);
    return defecto;
  }
};

/**
 * Serializa y escribe un valor en localStorage.
 * Envuelve JSON.stringify en try/catch para evitar excepciones por datos no serializables.
 *
 * @param {string} clave - Nombre de la clave en localStorage
 * @param {any} valor - Valor a serializar y almacenar
 * @returns {boolean} - true si la operación tuvo éxito, false en caso contrario
 */
export const escribirLocal = (clave, valor) => {
  try {
    const raw = JSON.stringify(valor);
    localStorage.setItem(clave, raw);
    return true;
  } catch (err) {
    console.error(`[storageUtils.escribirLocal] Error escribiendo la clave "${clave}":`, err);
    if (typeof onError === 'function') onError(err);
    return false;
  }
};

/**
 * Remueve una clave de localStorage.
 *
 * @param {string} clave - Nombre de la clave a eliminar
 * @returns {void}
 */
export const removerLocal = (clave) => {
  try {
    localStorage.removeItem(clave);
  } catch (err) {
    console.error(`[storageUtils.removerLocal] Error removiendo la clave "${clave}":`, err);
    if (typeof onError === 'function') onError(err);
    return false;
  }
};

/**
 * Reemplazo práctico: leer, transformar y escribir en una única operación atómica.
 * Útil para actualizar listas como 'productos' sin duplicar lectura/escritura en componentes.
 *
 * @param {string} clave
 * @param {(valorActual:any)=>any} transformFn - Función que recibe el valor actual y retorna el nuevo valor a guardar
 * @param {any} defecto - Valor por defecto si no existe
 * @returns {boolean} - true si la operación tuvo éxito
 */
export const updateLocal = (clave, transformFn, defecto = []) => {
  try {
    const actual = leerLocal(clave, defecto);
    const nuevo = transformFn(actual);
    return escribirLocal(clave, nuevo);
  } catch (err) {
    console.error(`[storageUtils.updateLocal] Error actualizando la clave "${clave}":`, err);
    if (typeof onError === 'function') onError(err);
    return false;
  }
};

