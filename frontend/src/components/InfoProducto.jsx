import React from 'react';
import '../styles/components/InfoProducto.css';

const InfoProducto = ({ producto, onVerMas }) => {
  if (!producto) {
    return <div>No hay producto disponible</div>;
  }

  const {
    nombre,
    descripcion,
    imagenes = [],
    id
  } = producto;

  const imagenPrincipal =
    imagenes && imagenes.length > 0
      ? imagenes[0]
      : null;

  return (
    <div className="info-producto">
      <div className="info-producto__contenido">
        <h2>{nombre}</h2>

        <p>{descripcion}</p>

        {imagenPrincipal ? (
          <img
            className="imagen-principal"
            src={imagenPrincipal}
            alt={`Imagen principal de ${nombre}`}
          />
        ) : (
          <div className="placeholder-imagen">
            Sin imagen
          </div>
        )}

        <button
          type="button"
          className="btn-ver-mas"
          onClick={() => onVerMas && onVerMas(id)}
        >
          Ver galería
        </button>
      </div>
    </div>
  );
};

export default InfoProducto;