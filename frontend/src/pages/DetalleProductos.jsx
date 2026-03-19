// src/pages/DetalleProducto.jsx
import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/pages/DetalleProductos.css';
import { obtenerImagenesPorTipo } from '../helpers/imageUtils';
import { obtenerProductoPorId } from '../helpers/productoUtils';
import useProductosLocalStorage from '../hooks/useProductosLocalStorage';
import GaleriaProductos from '../components/GaleriaProductos';

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { productos } = useProductosLocalStorage();
  const producto = obtenerProductoPorId(productos, id); 

  const imagenes = useMemo(() => {
    if (!producto) return [];
    const imgs = Array.isArray(producto.imagenes) ? producto.imagenes.filter(Boolean) : [];
    if (imgs.length > 0) return imgs.slice(0, 5);

    const tipoNormalizado = String(producto.tipo || '').trim();
    const seed = producto.id ?? Date.now();
    return obtenerImagenesPorTipo(tipoNormalizado, 5, 1200, 800, seed);
  }, [producto]);

  if (!producto) return <p>Producto no encontrado.</p>;

  return (
    <div className="detalle-producto">
      <header className="detalle-header">
        <h2>{producto.nombre}</h2>
        <button className="btn-volver" onClick={() => navigate(-1)}>← Volver</button>
      </header>

      <main className="detalle-body">
        <p>{producto.descripcion}</p>

        <GaleriaProductos
          imagenes={imagenes}
          tipo={producto.tipo}
          onVerMas={() => {
            console.log("Ver más imágenes del producto", producto.id);
          }}
        />
      </main>
    </div>
  );
};

export default DetalleProducto;