// src/hooks/useProductosLocalStorage.js

import { useState, useEffect, useCallback } from 'react';
import { leerLocal, escribirLocal, updateLocal } from '../helpers/storageUtils';
import { crearProducto, existeProducto, obtenerProductoPorId } from '../helpers/productoUtils';
import { validarProducto } from '../helpers/validaciones';
import { filesToObjectURLs, revokeObjectURLs } from '../helpers/imageUtils';

/**
 * Hook para gestionar productos persistidos en localStorage.
 *
 * API:
 *  - productos: Array de productos actuales
 *  - guardarProducto(datos): { ok: boolean, error?: string, producto?: Object }
 *  - actualizarProducto(id, cambios): { ok: boolean, error?: string }
 *  - eliminarProducto(id): { ok: boolean, error?: string }
 *  - borrarTodos(): { ok: boolean, error?: string }
 *  - recargarProductos(): void
 *
 * El hook orquesta helpers puros: validaciones, creación/normalización, lectura/escritura en localStorage
 * y conversión opcional de FileList a ObjectURLs (si se pasan archivos en `guardarProducto`).
 *
 * @param {Object} options
 * @param {string} options.clave - clave en localStorage (default 'productos')
 * @param {(err: Error) => void} options.onError - callback opcional para reportar errores
 */

const useProductosLocalStorage = ({ clave = 'productos', onError } = {}) => {
  const [productos, setProductos] = useState([]);

  // Inicializar leyendo desde localStorage
  useEffect(() => {
    try {
      const cargados = leerLocal(clave, [], onError);
      setProductos(Array.isArray(cargados) ? cargados : []);
    } catch (err) {
      // leerLocal ya maneja errores, pero por si acaso:
      console.error('[useProductosLocalStorage] Error inicializando productos:', err);
      if (typeof onError === 'function') onError(err);
      setProductos([]);
    }
  }, [clave, onError]);

  // Recargar desde localStorage (útil tras cambios externos)
  const recargarProductos = useCallback(() => {
    const cargados = leerLocal(clave, [], onError);
    setProductos(Array.isArray(cargados) ? cargados : []);
  }, [clave, onError]);

  /**
   * Guardar un producto nuevo.
   * - Valida los campos.
   * - Evita duplicados por nombre.
   * - Convierte FileList a ObjectURLs si viene `imagenesFiles`.
   *
   * @param {Object} datos
   * @param {string} datos.nombre
   * @param {string} datos.descripcion
   * @param {string} datos.tipo
   * @param {FileList|Array<File>} [datos.imagenesFiles] - opcional, si se pasan archivos se generan objectURLs
   * @returns {{ ok: boolean, error?: string, producto?: Object }}
   */
  const guardarProducto = useCallback(
  ({ nombre, descripcion, tipo, imagenesFiles, imagenesUrls } = {}) => {
    try {
      // 1. Validar campos obligatorios (tipo, nombre, descripción).
      // Si alguna regla falla, devolvemos un objeto con ok:false y el mensaje de error.
      const errMsg = validarProducto({ nombre, descripcion, tipo });
      if (errMsg) return { ok: false, error: errMsg };

      // 2. Evitar duplicados por nombre (case-insensitive).
      if (existeProducto(productos, nombre)) {
        return { ok: false, error: 'El nombre del producto ya existe. Elegí otro nombre.' };
      }

      // 3. Generar array de imágenes.
      // - Si se subieron archivos, convertirlos a objectURLs (previews).
      // - Si no, usar URLs externas como fallback.
      let imagenes = [];
      let blobUrls = []; // guardamos las URLs creadas para poder revocarlas si algo falla
      if (imagenesFiles?.length > 0) {
        blobUrls = filesToObjectURLs(imagenesFiles);
        imagenes = blobUrls;
      } else if (Array.isArray(imagenesUrls)) {
        imagenes = imagenesUrls;
      }

      // 4. Crear objeto producto normalizado con id, nombre, descripción, tipo e imágenes.
      const nuevo = crearProducto({ nombre, descripcion, tipo, imagenes });

      // 5. Intentar persistir en localStorage.
      // Si falla la escritura, revocamos las objectURLs creadas para liberar memoria.
      const nuevos = [...productos, nuevo];
      const ok = escribirLocal(clave, nuevos, onError);
      if (!ok) {
        if (blobUrls.length > 0) revokeObjectURLs(blobUrls);
        return { ok: false, error: 'No se pudo guardar el producto en localStorage' };
      }

      // 6. Actualizar estado local con el nuevo array de productos.
      setProductos(nuevos);

      // 7. Devolver resultado exitoso con el producto creado.
      return { ok: true, producto: nuevo };
    } catch (err) {
      // 8. Manejo de errores inesperados.
      console.error('[useProductosLocalStorage.guardarProducto] Error:', err);
      if (typeof onError === 'function') onError(err);
      return { ok: false, error: 'Error inesperado al guardar el producto' };
    }
  },
  [productos, clave, onError]
);

  /**
   * Actualiza un producto existente por id.
   * - Normaliza cambios sencillos.
   * - Si se pasan imagenesFiles, convierte y concatena (no borra por defecto).
   *
   * @param {number|string} id
   * @param {Object} cambios - campos a actualizar: { nombre, descripcion, tipo, imagenesFiles, imagenesUrls }
   * @returns {{ ok: boolean, error?: string }}
   */
  const actualizarProducto = useCallback(
  (id, cambios = {}) => {
    try {
      // 1. Buscar el producto por id en la lista actual.
      const producto = obtenerProductoPorId(productos, id);
      if (!producto) return { ok: false, error: 'Producto no encontrado' };

      // 2. Si se cambia el nombre, validar que no exista otro producto con ese nombre.
      const nombreNuevo = cambios.nombre?.trim().toLowerCase();
      const nombreActual = producto.nombre.trim().toLowerCase();
      if (nombreNuevo && nombreNuevo !== nombreActual) {
        if (existeProducto(productos, cambios.nombre)) {
          return { ok: false, error: 'Ya existe otro producto con ese nombre' };
        }
      }

      // 3. Validar campos esenciales (nombre, descripción, tipo) con los valores nuevos o actuales.
      const nombreCheck = cambios.nombre ?? producto.nombre;
      const descripcionCheck = cambios.descripcion ?? producto.descripcion;
      const tipoCheck = cambios.tipo ?? producto.tipo;
      const errMsg = validarProducto({ nombre: nombreCheck, descripcion: descripcionCheck, tipo: tipoCheck });
      if (errMsg) return { ok: false, error: errMsg };

      // 4. Manejo de imágenes:
      // - Antes de agregar nuevas, revocamos las objectURLs viejas para liberar memoria.
      const blobUrlsViejas = (producto.imagenes || []).filter(u => typeof u === 'string' && u.startsWith('blob:'));
      if (blobUrlsViejas.length > 0) revokeObjectURLs(blobUrlsViejas);

      // - Copiamos las imágenes actuales y concatenamos las nuevas (archivos o URLs).
      let nuevasImagenes = Array.isArray(producto.imagenes) ? [...producto.imagenes] : [];
      if (cambios.imagenesFiles?.length > 0) {
        nuevasImagenes = nuevasImagenes.concat(filesToObjectURLs(cambios.imagenesFiles));
      }
      if (Array.isArray(cambios.imagenesUrls)) {
        nuevasImagenes = nuevasImagenes.concat(cambios.imagenesUrls);
      }

      // 5. Crear objeto actualizado con los cambios aplicados.
      const actualizado = {
        ...producto,
        nombre: cambios.nombre !== undefined ? cambios.nombre.trim() : producto.nombre,
        descripcion: cambios.descripcion !== undefined ? cambios.descripcion.trim() : producto.descripcion,
        tipo: cambios.tipo !== undefined ? cambios.tipo : producto.tipo,
        imagenes: nuevasImagenes
      };

      // 6. Persistir en localStorage.
      const actualizados = productos.map(p => (String(p.id) === String(id) ? actualizado : p));
      const ok = escribirLocal(clave, actualizados, onError);
      if (!ok) return { ok: false, error: 'No se pudo actualizar en localStorage' };

      // 7. Actualizar estado local con la lista modificada.
      setProductos(actualizados);

      // 8. Devolver resultado exitoso.
      return { ok: true };
    } catch (err) {
      // 9. Manejo de errores inesperados.
      console.error('[useProductosLocalStorage.actualizarProducto] Error:', err);
      if (typeof onError === 'function') onError(err);
      return { ok: false, error: 'Error inesperado al actualizar el producto' };
    }
  },
  [productos, clave, onError]
);

  /**
   * Elimina un producto por id.
   * - Revoke de objectURLs si las imágenes fueron generadas como previews.
   *
   * @param {number|string} id
   * @returns {{ ok: boolean, error?: string }}
   */
  const eliminarProducto = useCallback(
    (id) => {
      try {
        const producto = obtenerProductoPorId(productos, id);
        if (!producto) return { ok: false, error: 'Producto no encontrado' };

        // Liberar objectURLs (silencioso)
        if (Array.isArray(producto.imagenes) && producto.imagenes.length > 0) {
          // Filtrar URLs locales heurísticamente (objectURL empieza por "blob:")
          const blobUrls = producto.imagenes.filter((u) => typeof u === 'string' && u.startsWith('blob:'));
          if (blobUrls.length > 0) revokeObjectURLs(blobUrls);
        }

        const filtrados = productos.filter((p) => Number(p.id) !== Number(id));
        const ok = escribirLocal(clave, filtrados, onError);
        if (!ok) return { ok: false, error: 'No se pudo eliminar en localStorage' };

        setProductos(filtrados);
        return { ok: true };
      } catch (err) {
        console.error('[useProductosLocalStorage.eliminarProducto] Error:', err);
        if (typeof onError === 'function') onError(err);
        return { ok: false, error: 'Error inesperado al eliminar el producto' };
      }
    },
    [productos, clave, onError]
  );

  /**
   * Borra todos los productos (operación destructiva).
   *
   * @returns {{ ok: boolean, error?: string }}
   */
  const borrarTodos = useCallback(() => {
  try {
    // 1. Antes de borrar, recorrer todos los productos actuales
    //    y revocar las objectURLs (blob:) de sus imágenes para liberar memoria.
    productos.forEach(p => {
      const blobUrls = (p.imagenes || []).filter(
        u => typeof u === 'string' && u.startsWith('blob:')
      );
      if (blobUrls.length > 0) revokeObjectURLs(blobUrls);
    });

    // 2. Usar updateLocal para reemplazar la clave en localStorage con un array vacío.
    const ok = updateLocal(clave, () => [], [], onError);
    if (!ok) {
      return { ok: false, error: 'No se pudo borrar los productos' };
    }

    // 3. Actualizar el estado local a [] para reflejar que ya no hay productos.
    setProductos([]);

    // 4. Devolver resultado exitoso.
    return { ok: true };
  } catch (err) {
    // 5. Manejo de errores inesperados.
    console.error('[useProductosLocalStorage.borrarTodos] Error:', err);
    if (typeof onError === 'function') onError(err);
    return { ok: false, error: 'Error inesperado al borrar todos los productos' };
  }
}, [productos, clave, onError]);
  return {
    productos,
    guardarProducto,
    actualizarProducto,
    eliminarProducto,
    borrarTodos,
    recargarProductos
  };
};

export default useProductosLocalStorage;