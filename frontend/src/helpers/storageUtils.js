// src/helpers/storageUtils.js

export const leerLocal = (clave, defecto = []) => {
  try {
    const raw = localStorage.getItem(clave);
    return raw ? JSON.parse(raw) : defecto;
  } catch (err) {
    console.error(`[storageUtils] Error leyendo "${clave}":`, err);
    return defecto;
  }
};

export const escribirLocal = (clave, valor) => {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (err) {
    console.error(`[storageUtils] Error escribiendo "${clave}":`, err);
    return false;
  }
};

export const removerLocal = (clave) => {
  try {
    localStorage.removeItem(clave);
  } catch (err) {
    console.error(`[storageUtils] Error removiendo "${clave}":`, err);
  }
};

export const actualizarLocal = (clave, transformFn, defecto = []) => {
  const actual = leerLocal(clave, defecto);
  const nuevo = transformFn(actual);
  return escribirLocal(clave, nuevo);
};