// src/helpers/imageUtils.js

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

export const revokeObjectURLs = (urls = []) =>
  urls.forEach(u => u.startsWith('blob:') && URL.revokeObjectURL(u));

export const isObjectURL = (url) => url?.startsWith('blob:');

export const obtenerImagenesPorTipo = (tipo = '', count = 5, width = 1200, height = 800, seedBase = Date.now()) => {
  const limpio = tipo.trim().toLowerCase();
  const makePicsum = (i) => `https://picsum.photos/seed/${seedBase}-${i}/${width}/${height}`;
  const mapByType = {
    casa: [],
    departamento: [],
    hotel: []
  };
  const base = mapByType[limpio] || Array.from({ length: count }, (_, i) => makePicsum(i));
  return Array.from({ length: count }, (_, i) => base[i % base.length]);
};