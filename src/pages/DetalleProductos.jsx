// src/pages/DetalleProducto.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/pages/DetalleProductos.css';
import { obtenerImagenesPorTipo } from '../helpers/imageUtils';
import GaleriaProductos from '../components/GaleriaProductos';

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    try {
      const productos = JSON.parse(localStorage.getItem('productos')) || [];
      const encontrado = productos.find((p) => String(p.id) === String(id));
      setProducto(encontrado || null);
    } catch (err) {
      // si falla el parse, evitar romper la app
      console.warn('DetalleProducto: error leyendo productos de localStorage', err);
      setProducto(null);
    }
  }, [id]);

  const imagenes = useMemo(() => {
    if (!producto) return [];
    const imgs = Array.isArray(producto.imagenes) ? producto.imagenes.filter(Boolean) : [];
    if (imgs.length > 0) return imgs.slice(0, 5);

    // Normalizar tipo y usar seed determinista por producto.id
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
          onVerMas={() => { /* abrir modal o navegar a galería completa */ }}
        />
      </main>
    </div>
  );
};

export default DetalleProducto;