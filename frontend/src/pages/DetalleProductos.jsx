import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InfoProducto from '../components/InfoProducto';
import CaracteristicasListado from '../components/CaracteristicasListado';
import CalendarioDisponibilidad from '../components/CalendarioDisponibilidad';
import useProductoAPI from '../hooks/useProductoAPI';
import '../styles/pages/DetalleProductos.css';
import PoliticasProducto from '../components/PoliticasProducto';
import ValoracionesProducto from '../components/ValoracionesProducto';

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
    if (id && producto) {
      navigate(`/producto/${id}/galeria`, {
        state: { producto }
      });
    }
  }, [navigate, id, producto]);

  return (
    <main className="detalle-producto-page">
      <div className="container detalle-producto">

        {loading && (
          <div className="detalle-producto__estado">
            <p>Cargando producto...</p>
          </div>
        )}

        {error && (
          <div
            className="detalle-producto__estado detalle-producto__estado--error"
            role="alert"
          >
            <p>
              Error al cargar el producto: {error}
            </p>
          </div>
        )}

        {!loading && !error && producto && (
          <>
            {/* Información principal y disponibilidad */}
            <div className="detalle-producto__principal">

              <InfoProducto
                producto={producto}
                onVerMas={onVerMas}
              />

              <CalendarioDisponibilidad
                productoId={id}
              />

            </div>

            {/* Características */}
            <section className="detalle-producto__caracteristicas">
              <div className="detalle-producto__seccion-header">
                <h2>Características</h2>
                <p>
                  Todo lo que ofrece este alojamiento.
                </p>
              </div>

              <CaracteristicasListado
                caracteristicas={producto.caracteristicas || []}
              />
            </section>

            {/* Políticas */}
            <PoliticasProducto />

            {/* Valoraciones */}
            <ValoracionesProducto
              productoId={id}
              producto={producto}
            />
          </>
        )}

      </div>
    </main>
  );
};

export default DetalleProductos;