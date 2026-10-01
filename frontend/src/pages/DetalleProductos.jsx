import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InfoProducto from '../components/InfoProducto';
import CaracteristicasListado from '../components/CaracteristicasListado';
import CalendarioDisponibilidad from '../components/CalendarioDisponibilidad';
import useProductoAPI from '../hooks/useProductoAPI';
import '../styles/pages/DetalleProductos.css';
import PoliticasProducto from '../components/PoliticasProducto';
import ValoracionesProducto from '../components/ValoracionesProducto';
import { leerLocal } from '../helpers/storageUtils';

const DetalleProductos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProductoById, loading, error } = useProductoAPI();
  const [producto, setProducto] = useState(null);
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState({
    fechaInicio: null,
    fechaFin: null
  });

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

  const handleFechasSeleccionadas = useCallback(({ fechaInicio, fechaFin }) => {
    setFechasSeleccionadas({
      fechaInicio,
      fechaFin
    });
  }, []);

  const onReservar = useCallback(() => {
    const usuario = leerLocal("usuario");

    const { fechaInicio, fechaFin } = fechasSeleccionadas;

    // No permite reservar si no se seleccionaron ambas fechas
    if (!fechaInicio || !fechaFin) {
      return;
    }

    if (!usuario) {
      navigate("/iniciar-sesion", {
        state: {
          desdeReserva: true,
          reserva: {
            productoId: id,
            fechaInicio,
            fechaFin
          }
        }
      });

      return;
    }

    navigate(`/reserva/${id}`, {
      state: {
        fechaInicio,
        fechaFin
      }
    });
  }, [navigate, id, fechasSeleccionadas]);

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

              <div className="detalle-producto__disponibilidad">

                <CalendarioDisponibilidad
                  productoId={id}
                  onFechasSeleccionadas={handleFechasSeleccionadas}
                />

                <section className="detalle-producto__reserva">

                  <h2>Reservar</h2>

                  <p>
                    Seleccioná las fechas disponibles para realizar tu reserva.
                  </p>

                  <div className="detalle-producto__fechas">

                    <div className="detalle-producto__fecha">
                      <span>Fecha de ingreso</span>

                      <strong>
                        {fechasSeleccionadas.fechaInicio
                          ? new Date(
                            fechasSeleccionadas.fechaInicio
                          ).toLocaleDateString("es-AR")
                          : "No seleccionada"}
                      </strong>
                    </div>

                    <div className="detalle-producto__fecha">
                      <span>Fecha de salida</span>

                      <strong>
                        {fechasSeleccionadas.fechaFin
                          ? new Date(
                            fechasSeleccionadas.fechaFin
                          ).toLocaleDateString("es-AR")
                          : "No seleccionada"}
                      </strong>
                    </div>

                  </div>

                  <button
                    type="button"
                    className="detalle-producto__btn-reservar"
                    onClick={onReservar}
                    disabled={
                      !fechasSeleccionadas.fechaInicio ||
                      !fechasSeleccionadas.fechaFin
                    }
                  >
                    Reservar
                  </button>

                </section>

              </div>

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