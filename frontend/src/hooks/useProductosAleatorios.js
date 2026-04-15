import { useState, useEffect } from 'react';
import { leerLocal } from '../helpers/storageUtils';
import { obtenerProductosAleatorios } from '../helpers/productoUtils';

/**
 * Hook personalizado para obtener productos aleatorios desde localStorage.
 *
 * FUNCIONAMIENTO:
 * 1. Lee productos desde localStorage usando storageUtils
 * 2. Selecciona 10 productos aleatorios usando algoritmo Fisher-Yates
 * 3. Actualiza estado con la selección aleatoria
 * 4. Re-ejecuta cuando cambia la clave o callback de error
 *
 * USO PRINCIPAL: En página de inicio para mostrar recomendaciones aleatorias.
 *
 * @param {Object} options - Opciones del hook
 * @param {string} options.clave - Clave en localStorage (default: 'productos')
 * @param {Function} options.onError - Callback opcional para manejo de errores
 * @returns {Array} Array de productos aleatorios (máximo 10)
 *
 * EJEMPLO:
 *   const productosAleatorios = useProductosAleatorios();
 *   // Retorna array de hasta 10 productos aleatorios
 *
 *   const productos = useProductosAleatorios({ clave: 'misProductos' });
 *   // Lee desde clave personalizada
 */
const useProductosAleatorios = ({ clave = 'productos', onError } = {}) => {
  const [productosAleatorios, setProductosAleatorios] = useState([]);

  useEffect(() => {
    try {
      // 1. Leer productos desde localStorage
      const productosGuardados = leerLocal(clave, [], onError);

      // 2. Obtener selección aleatoria de 10 productos
      const seleccionados = obtenerProductosAleatorios(productosGuardados, 10);

      // 3. Actualizar estado
      setProductosAleatorios(seleccionados);
    } catch (err) {
      console.error('[useProductosAleatorios] Error:', err);
      if (typeof onError === 'function') onError(err);
      setProductosAleatorios([]);
    }
  }, [clave, onError]); // Re-ejecutar si cambian dependencias

  return productosAleatorios;
};

export default useProductosAleatorios;