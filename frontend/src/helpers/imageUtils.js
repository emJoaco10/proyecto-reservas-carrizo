// Convierte archivos a objectURLs para previsualización.
// - Recorre la lista de archivos recibida.
// - Valida tamaño máximo y tipos permitidos.
// - Si pasa las validaciones, crea un objectURL con URL.createObjectURL.
// - Devuelve un array de URLs para mostrar imágenes en el navegador.
// - Usa onError para reportar problemas sin romper la app.
export const filesToObjectURLs = (fileList, { maxSize, allowedTypes } = {}, onError) => {
  try {
    return Array.from(fileList || []).reduce((urls, file) => {
      if (maxSize && file.size > maxSize) {
        onError?.(new Error(`File too large: ${file.name}`));
        return urls;
      }
      if (allowedTypes?.length && !allowedTypes.includes(file.type)) {
        onError?.(new Error(`Invalid file type: ${file.name}`));
        return urls;
      }
      try {
        urls.push(URL.createObjectURL(file));
      } catch (err) {
        console.error('[filesToObjectURLs] Error:', err);
        onError?.(err);
      }
      return urls;
    }, []);
  } catch (err) {
    console.error('[filesToObjectURLs] Error general:', err);
    onError?.(err);
    return [];
  }
};

// Revoca objectURLs para liberar memoria.
// - Recorre las URLs y si empiezan con 'blob:', las revoca.
// - Evita fugas de memoria en el navegador.
export const revokeObjectURLs = (urls = []) =>
  urls.forEach(u => u.startsWith('blob:') && URL.revokeObjectURL(u));

// Verifica si una URL es un objectURL.
// - Devuelve true si la URL empieza con 'blob:', false en caso contrario.
export const isObjectURL = (url) => url?.startsWith('blob:');

// Obtiene imágenes locales según el tipo de producto.
// - Normaliza el tipo recibido (minúsculas, sin espacios).
// - Usa un mapa de tipos para devolver rutas de imágenes locales.
// - Si no encuentra el tipo, usa una imagen genérica.
// - Devuelve un array con la cantidad solicitada.
export const obtenerImagenesPorTipo = (tipo = '', count = 1) => {
  const limpio = tipo.trim().toLowerCase();

  const mapByType = {
    casa: ['/img/casa-proyecto.jpg'],
    departamento: ['/img/depto-proyecto.jpg'],
    hotel: ['/img/hotel-proyecto.jpg']
  };

  const base = mapByType[limpio] || mapByType.generico;

  return Array.from({ length: count }, (_, i) => base[i % base.length]);
};
