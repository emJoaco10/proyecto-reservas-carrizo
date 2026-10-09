import React from 'react';
import '../styles/components/InfoProducto.css';
import CompartirProducto from './CompartirProducto';

/**
 * Muestra la información principal de un producto y ofrece acciones para compartirlo y acceder a su galería.
 * @param {Object} props
 * @param {Object} props.producto Información del producto; se utilizan nombre, descripcion, imagenes e id.
 * @param {Function} [props.onVerMas] Función opcional que recibe el identificador del producto al solicitar su galería.
 */
const InfoProducto = ({ producto, onVerMas }) => {
  // Si no hay un producto disponible, se informa al usuario en lugar de mostrar el contenido.
  if (!producto) {
    return <div>No hay producto disponible</div>;
  }

  // Se extraen los datos utilizados; imagenes adopta una colección vacía si no está definida.
  const {
    nombre,
    descripcion,
    imagenes = [],
    id
  } = producto;

  // Se toma la primera imagen disponible; si la colección está vacía, se usa null.
  const imagenPrincipal =
    imagenes && imagenes.length > 0
      ? imagenes[0]
      : null;

  return (
    <div className="info-producto">
      {/* Las clases CSS organizan la presentación visual del contenedor y su sección de contenido. */}
      <div className="info-producto__contenido">

        {/* El encabezado reúne el nombre del producto y la opción para compartirlo. */}
        <div className="info-producto__titulo">
          <h2>{nombre}</h2>

          <CompartirProducto producto={producto} />
        </div>

        {/* Se presenta la descripción del producto. */}
        <p>{descripcion}</p>

        {/* Se muestra la imagen principal o, si no está disponible, el marcador correspondiente. */}
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

        {/* El botón solicita ver la galería llamando a onVerMas con el id si la función existe. */}
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