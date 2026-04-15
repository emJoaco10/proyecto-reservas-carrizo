import { useState, useEffect } from 'react';
import { filesToObjectURLs, revokeObjectURLs } from '../helpers/imageUtils';

// Hook personalizado para generar y manejar previews de imágenes.
// - Convierte archivos en objectURLs para mostrarlos en pantalla.
// - Revoca esos objectURLs cuando ya no se usan, liberando memoria.
// - Devuelve la lista de previews y una función para limpiarlos manualmente.
const useImagePreviews = (files, options, onError) => {

  // Estado React: guarda las URLs de previsualización.
  // Inicialmente está vacío.
  const [previews, setPreviews] = useState([]);

  // Efecto: se ejecuta cada vez que cambian los 'files'.
  useEffect(() => {

    // Si no hay archivos, limpia previews y termina.
  if (!files || files.length === 0) {
    setPreviews([]);
    return;
  }

  // Convierte los archivos en objectURLs usando el helper.
  // Aplica validaciones (tamaño, tipo) según 'options'.
  // Si ocurre error, lo pasa al callback 'onError'.
  const urls = filesToObjectURLs(files, options, (err) => {
    if (onError) onError(err);
  });

 // Actualiza el estado con las URLs generadas.
  setPreviews(urls);

  // Cleanup: cuando cambian los archivos o se desmonta el componente,
    // revoca los objectURLs para liberar memoria.
  return () => revokeObjectURLs(urls);
}, [files]); // Dependencia: se ejecuta cada vez que cambian los archivos.

// Función manual para limpiar previews.
  // - Revoca los objectURLs actuales.
  // - Vacía el estado.
  const clearPreviews = () => {
    revokeObjectURLs(previews);
    setPreviews([]);
  };

  // Retorno del hook: expone la lista de previews y la función para limpiarlos.
  return { previews, clearPreviews };
};

export default useImagePreviews;