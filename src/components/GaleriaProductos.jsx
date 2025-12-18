import './GaleriaProductos.css';

const GaleriaProductos = ({ imagenes }) => {
  if (!imagenes || imagenes.length === 0) return null;

  const imagenPrincipal = imagenes[0];
  const imagenesSecundarias = imagenes.slice(1, 5); // Máximo 4

  return (
    <div className="galeria-producto">
      <div className="imagen-principal">
        <img src={imagenPrincipal} alt="Imagen principal del producto" />
      </div>

      <div className="imagenes-secundarias">
        {imagenesSecundarias.map((img, i) => (
          <img key={i} src={img} alt={`Imagen secundaria ${i + 1}`} />
        ))}
        <button className="ver-mas">Ver más</button>
      </div>
    </div>
  );
};

export default GaleriaProductos;