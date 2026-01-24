import placeholder from '../assets/placeholder.png';
import { useCallback } from 'react';

// Si preferís que el bundler gestione el asset, importá desde src/assets:
// import placeholder from '../assets/placeholder.png';
// y luego usar PLACEHOLDER = placeholder;

export default function useImageError() {

  const PLACEHOLDER = placeholder;
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
