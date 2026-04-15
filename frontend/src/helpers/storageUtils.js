// Lee un valor desde localStorage usando una clave.
// - Si existe, lo convierte de texto a objeto con JSON.parse.
// - Si no existe, devuelve el valor por defecto.
// - Maneja errores con try/catch para evitar que la app se rompa.
export const leerLocal = (clave, defecto = []) => {
  try {
    const raw = localStorage.getItem(clave);
    return raw ? JSON.parse(raw) : defecto;
  } catch (err) {
    console.error(`[storageUtils] Error leyendo "${clave}":`, err);
    return defecto;
  }
};

// Escribe un valor en localStorage bajo una clave.
// - Convierte el valor a texto con JSON.stringify.
// - Devuelve true si se guardó correctamente, false si hubo error.
export const escribirLocal = (clave, valor) => {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (err) {
    console.error(`[storageUtils] Error escribiendo "${clave}":`, err);
    return false;
  }
};

// Elimina un valor de localStorage usando su clave.
// - Si ocurre un error, lo registra en consola.
export const removerLocal = (clave) => {
  try {
    localStorage.removeItem(clave);
  } catch (err) {
    console.error(`[storageUtils] Error removiendo "${clave}":`, err);
  }
};

// Actualiza un valor en localStorage aplicando una transformación.
// - Lee el valor actual con leerLocal.
// - Aplica una función transformadora (transformFn) sobre ese valor.
// - Escribe el nuevo valor en localStorage.
// - Devuelve true/false según si la escritura fue exitosa.
export const actualizarLocal = (clave, transformFn, defecto = []) => {
  const actual = leerLocal(clave, defecto);
  const nuevo = transformFn(actual);
  return escribirLocal(clave, nuevo);
};