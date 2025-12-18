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
        // Validación de campos
        const errMsg = validarProducto({ nombre, descripcion, tipo });
        if (errMsg) return { ok: false, error: errMsg };

        // Chequear duplicado por nombre
        if (existeProducto(productos, nombre)) {
          return { ok: false, error: 'El nombre del producto ya existe. Elegí otro nombre.' };
        }

        // Generar array de imágenes: si se subieron archivos, convertirlos a objectURLs; si no, usar URLs externas como fallback
        let imagenes = [];
        if (imagenesFiles?.length > 0) {
          imagenes = filesToObjectURLs(imagenesFiles);
        } else
          if (Array.isArray(imagenesUrls)) {
            imagenes = imagenesUrls;
          }

        // Crear producto normalizado
        const nuevo = crearProducto({ nombre, descripcion, tipo, imagenes });

        // Persistir en localStorage y actualizar estado local
        const nuevos = [...productos, nuevo];
        const ok = escribirLocal(clave, nuevos, onError);
        if (!ok) {
          return { ok: false, error: 'No se pudo guardar el producto en localStorage' };
        }

        setProductos(nuevos);
        return { ok: true, producto: nuevo };
      } catch (err) {
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
        const producto = obtenerProductoPorId(productos, id);
        if (!producto) return { ok: false, error: 'Producto no encontrado' };

        // Si se modifica nombre, validar duplicado (excepto el propio)
        if (cambios.nombre && cambios.nombre.trim().toLowerCase() !== producto.nombre.trim().toLowerCase()) {
          if (existeProducto(productos, cambios.nombre)) {
            return { ok: false, error: 'Ya existe otro producto con ese nombre' };
          }
        }

        // Validación mínima si cambian campos esenciales
        const nombreCheck = cambios.nombre !== undefined ? cambios.nombre : producto.nombre;
        const descripcionCheck = cambios.descripcion !== undefined ? cambios.descripcion : producto.descripcion;
        const tipoCheck = cambios.tipo !== undefined ? cambios.tipo : producto.tipo;
        const errMsg = validarProducto({ nombre: nombreCheck, descripcion: descripcionCheck, tipo: tipoCheck });
        if (errMsg) return { ok: false, error: errMsg };

        // Manejo de imágenes: convertir archivos y/o concatenar urls
        let nuevasImagenes = Array.isArray(producto.imagenes) ? [...producto.imagenes] : [];
        if (cambios.imagenesFiles && cambios.imagenesFiles.length > 0) {
          nuevasImagenes = nuevasImagenes.concat(filesToObjectURLs(cambios.imagenesFiles));
        }
        if (Array.isArray(cambios.imagenesUrls)) {
          nuevasImagenes = nuevasImagenes.concat(cambios.imagenesUrls);
        }

        const actualizado = {
          ...producto,
          nombre: cambios.nombre !== undefined ? cambios.nombre.trim() : producto.nombre,
          descripcion: cambios.descripcion !== undefined ? cambios.descripcion.trim() : producto.descripcion,
          tipo: cambios.tipo !== undefined ? cambios.tipo : producto.tipo,
          imagenes: nuevasImagenes
        };

        // Persistir
        const actualizados = productos.map((p) => (Number(p.id) === Number(id) ? actualizado : p));
        const ok = escribirLocal(clave, actualizados, onError);
        if (!ok) return { ok: false, error: 'No se pudo actualizar en localStorage' };

        setProductos(actualizados);
        return { ok: true };
      } catch (err) {
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
      const ok = updateLocal(clave, () => [], [], onError);
      if (!ok) return { ok: false, error: 'No se pudo borrar los productos' };
      setProductos([]);
      return { ok: true };
    } catch (err) {
      console.error('[useProductosLocalStorage.borrarTodos] Error:', err);
      if (typeof onError === 'function') onError(err);
      return { ok: false, error: 'Error inesperado al borrar todos los productos' };
    }
  }, [clave, onError]);

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