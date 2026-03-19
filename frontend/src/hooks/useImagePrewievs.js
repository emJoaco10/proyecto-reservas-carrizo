// src/hooks/useImagePreviews.js
import { useState, useEffect } from 'react';
import { filesToObjectURLs, revokeObjectURLs } from '../helpers/imageUtils';

const useImagePreviews = (files, options, onError) => {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (!files || files.length === 0) {
      setPreviews([]);
      return;
    }

    const urls = filesToObjectURLs(files, options, (err) => {
      if (onError) onError(err);
    });

    setPreviews(urls);

    return () => {
      revokeObjectURLs(urls);
    };
  }, [files, options, onError]);

  const clearPreviews = () => {
    revokeObjectURLs(previews);
    setPreviews([]);
  };

  return { previews, clearPreviews };
};

export default useImagePreviews;