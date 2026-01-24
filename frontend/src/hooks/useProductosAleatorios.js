import { useState, useEffect } from 'react';
import { leerLocal } from '../helpers/storageUtils';
import { obtenerProductosAleatorios } from '../helpers/productoUtils';

const useProductosAleatorios = ({ clave = 'productos', onError } = {}) => {
  const [productosAleatorios, setProductosAleatorios] = useState([]);

  useEffect(() => {
    try {
      const productosGuardados = leerLocal(clave, [], onError);
      const seleccionados = obtenerProductosAleatorios(productosGuardados, 10);
      setProductosAleatorios(seleccionados);
    } catch (err) {
      console.error('[useProductosAleatorios] Error:', err);
      if (typeof onError === 'function') onError(err);
      setProductosAleatorios([]);
    }
  }, [clave, onError]);

  return productosAleatorios;
};

export default useProductosAleatorios;