import React, { useMemo } from 'react';
import useImageError from '../hooks/useImageError';
import { obtenerImagenesPorTipo } from '../helpers/imageUtils';
import '../styles/components/GaleriaProductos.css';

const GaleriaProductos = ({ imagenes = [], tipo = '', onVerMas = () => {} }) => {
  const { handleImgError } = useImageError();

  const imgs = useMemo(() => {
    const clean = Array.isArray(imagenes) ? imagenes.filter(Boolean) : [];
    return clean.length > 0 ? clean.slice(0, 5) : obtenerImagenesPorTipo(tipo, 5);
  }, [imagenes, tipo]);

  const [imagenPrincipal, ...imagenesSecundarias] = Array.isArray(imgs) ? imgs : [];

  return (
    <section className="galeria-producto" aria-label="Galería de imágenes del producto">
      <div className="imagen-principal">
        <img
          src={imagenPrincipal}
          alt={`Imagen principal ${tipo ? `de ${tipo}` : 'del producto'}`}
          loading="lazy"
          onError={handleImgError}
          width="1200"
          height="800"
          style={{ objectFit: 'cover', display: 'block' }}
        />
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