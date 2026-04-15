import placeholder from '../assets/placeholder.png';
import { useCallback } from 'react';

// Hook personalizado para manejar errores de carga de imágenes.
// - Devuelve una función 'handleImgError' que reemplaza la imagen fallida por un placeholder.
// - También expone la constante PLACEHOLDER para usarla directamente si se necesita.
export default function useImageError() {

  // Constante: ruta de la imagen placeholder que se usará como fallback.
  const PLACEHOLDER = placeholder;

  // Función de manejo de error en imágenes.
  // - Se envuelve en useCallback para que sea estable y no se recree en cada render.
  const handleImgError = useCallback((e) => {

    // Si no hay un target válido en el evento, termina.
    if (!e?.currentTarget) return;
    try {
      const img = e.currentTarget;

      // Evita bucles infinitos: si la imagen ya es el placeholder, no hace nada.
      if (typeof img.src === 'string' && img.src.includes(PLACEHOLDER)) return;

      // Reemplaza la imagen fallida por el placeholder.
      img.src = PLACEHOLDER;
    } catch (err) {
      console.error('useImageError: error manejando onError de imagen', err);
    }
  }, []); // Dependencias vacías: la función se crea una sola vez.

  // Retorno del hook: expone la función de manejo y la constante placeholder.
  return { handleImgError, PLACEHOLDER };
}
