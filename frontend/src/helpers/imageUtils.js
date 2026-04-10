// Convierte archivos a objectURLs para previsualización
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

// Revoca objectURLs para liberar memoria
export const revokeObjectURLs = (urls = []) =>
  urls.forEach(u => u.startsWith('blob:') && URL.revokeObjectURL(u));

// Verifica si una URL es un objectURL
export const isObjectURL = (url) => url?.startsWith('blob:');

// Obtiene imágenes locales según el tipo de producto
export const obtenerImagenesPorTipo = (tipo = '', count = 1) => {
  const limpio = tipo.trim().toLowerCase();

  // Mapa de imágenes locales en src/assets/img/
  const mapByType = {
    casa: ['/img/casa-proyecto.jpg'],
    departamento: ['/img/depto-proyecto.jpg'],
    hotel: ['/img/hotel-proyecto.jpg']
  };

  // Selecciona el set según el tipo, o usa genérico
  const base = mapByType[limpio] || mapByType.generico;

  // Devuelve un array con la cantidad solicitada
  return Array.from({ length: count }, (_, i) => base[i % base.length]);
};
