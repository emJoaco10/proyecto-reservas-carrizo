/** Recurso importado que se utiliza como imagen de respaldo ante errores de carga. */
import placeholder from '../assets/placeholder.png';
import { useCallback } from 'react';

// Si preferís que el bundler gestione el asset, importá desde src/assets:
// import placeholder from '../assets/placeholder.png';
// y luego usar PLACEHOLDER = placeholder;

/**
 * Hook personalizado para gestionar errores de carga de imágenes.
 * No recibe parámetros y devuelve el callback `handleImgError` y el recurso
 * `PLACEHOLDER`, para que los componentes puedan reutilizarlo.
 *
 * @returns {{ handleImgError: Function, PLACEHOLDER: string }} Objeto con el manejador `onError` y la imagen de respaldo.
 */
export default function useImageError() {

  /** Recurso de respaldo que se asigna al origen de la imagen cuando falla su carga. */
  const PLACEHOLDER = placeholder;

  /**
   * Maneja el evento de error de carga de una imagen. Si `e.currentTarget` no
   * existe, finaliza sin cambios; de lo contrario, obtiene de allí la imagen.
   * Si `img.src` es un string que ya contiene `PLACEHOLDER`, no lo reasigna;
   * en caso contrario, asigna el recurso a `img.src`. Las excepciones durante
   * el procesamiento se registran mediante `console.error`.
   * Está definido con `useCallback` y un array de dependencias vacío.
   *
   * @param {React.SyntheticEvent<HTMLImageElement>} e Evento de error de carga.
   * @returns {void}
   */
  const handleImgError = useCallback((e) => {
    if (!e?.currentTarget) return;
    try {
      const img = e.currentTarget;
      // Evitar bucle si ya está el placeholder
      if (typeof img.src === 'string' && img.src.includes(PLACEHOLDER)) return;
      img.src = PLACEHOLDER;
    } catch (err) {
      console.error('useImageError: error manejando onError de imagen', err);
    }
  }, []);

  return { handleImgError, PLACEHOLDER };
}
