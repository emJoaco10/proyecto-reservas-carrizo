// src/components/GaleriaProductos.jsx
import React, { useMemo } from 'react';
import useImageError from '../hooks/useImageError';
import '../styles/components/GaleriaProductos.css';

const GaleriaProductos = ({ imagenes = [], tipo = '', onVerMas = () => {} }) => {
  const { handleImgError } = useImageError();

  // Normalizar y limitar a 5 imágenes; la generación de fallback la hace DetalleProducto
  const imgs = useMemo(() => {
    const clean = Array.isArray(imagenes) ? imagenes.filter(Boolean) : [];
    return clean.slice(0, 5);
  }, [imagenes]);

  const imagenPrincipal = imgs[0];
  const imagenesSecundarias = imgs.slice(1, 5);

  return (
    <section className="galeria-producto" aria-label="Galería de imágenes del producto">
      <div className="imagen-principal">
        {imagenPrincipal ? (
          <img
            src={imagenPrincipal}
            alt={`Imagen principal ${tipo ? `de ${tipo}` : 'del producto'}`}
            loading="lazy"
            onError={handleImgError}
            width="1200"
            height="800"
            style={{ objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div className="placeholder-principal" aria-hidden="true" />
        )}
      </div>

      <div className="imagenes-secundarias">
        {imagenesSecundarias.map((src) => (
          <div key={src} className="grid-item">
            <img
              src={src}
              alt={`Imagen de ${tipo || 'producto'}`}
              loading="lazy"
              onError={handleImgError}
              width="400"
              height="267"
              style={{ objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}

        <button className="ver-mas" onClick={onVerMas} aria-label="Ver más imágenes">
          Ver más
        </button>
      </div>
    </section>
  );
};

export default React.memo(GaleriaProductos);
