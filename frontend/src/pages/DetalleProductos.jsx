import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InfoProducto from '../components/InfoProducto';
import useProductoAPI from '../hooks/useProductoAPI';
import '../styles/pages/DetalleProductos.css';

const DetalleProductos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProductoById, loading, error } = useProductoAPI();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    if (!id) return;

    const cargarProducto = async () => {
      const data = await fetchProductoById(id);
      setProducto(data);
    };

    cargarProducto();
  }, [id, fetchProductoById]);

  const onVerMas = useCallback(() => {
    if (id) {
      navigate(`/producto/${id}/galeria`);
    }
  }, [navigate, id]);

  return (
    <main>
      <div className="container detalle-producto-page">
        {loading && <p>Cargando producto...</p>}
        {error && <p role="alert">Error al cargar el producto: {error}</p>}
        {!loading && !error && producto && (
          <InfoProducto producto={producto} onVerMas={onVerMas} />
        )}
      </div>
    </main>
  );
};

export default DetalleProductos;
