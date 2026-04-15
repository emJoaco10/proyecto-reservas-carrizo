import React, { useMemo } from 'react';
import useImageError from '../hooks/useImageError';
import { obtenerImagenesPorTipo } from '../helpers/imageUtils';
import '../styles/components/GaleriaProductos.css';

// Componente de galería de imágenes para un producto.
// - Muestra una imagen principal y hasta 4 secundarias.
// - Usa un hook para manejar errores de carga de imágenes.
// - Si no hay imágenes, obtiene imágenes locales según el tipo.
const GaleriaProductos = ({ imagenes = [], tipo = '', onVerMas = () => {} }) => {

  // Hook: devuelve función para manejar errores en imágenes.
  const { handleImgError } = useImageError();

  // useMemo: calcula las imágenes a mostrar solo cuando cambian 'imagenes' o 'tipo'.
  const imgs = useMemo(() => {

    // Limpia el array: filtra valores nulos o falsy.
    const clean = Array.isArray(imagenes) ? imagenes.filter(Boolean) : [];

    // Si hay imágenes válidas, toma las primeras 5.
    // Si no, obtiene imágenes locales según el tipo.
    return clean.length > 0 ? clean.slice(0, 5) : obtenerImagenesPorTipo(tipo, 5);
  }, [imagenes, tipo]);

  // Desestructura: la primera imagen es principal, el resto secundarias.
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

// React.memo: evita renders innecesarios si las props no cambian.
export default React.memo(GaleriaProductos);