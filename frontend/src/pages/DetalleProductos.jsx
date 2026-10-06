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
import { MessageCircle } from 'lucide-react';

const DetalleProductos = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProductoById, loading, error } = useProductoAPI();
  const [producto, setProducto] = useState(null);
  const [mensajeWhatsApp, setMensajeWhatsApp] = useState(null);
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState({
    fechaInicio: null,
    fechaFin: null
  });

  const handleWhatsApp = useCallback(() => {
    const numeroWhatsApp = '543804778013';

    try {
      if (!numeroWhatsApp || !/^\d+$/.test(numeroWhatsApp)) {
        setMensajeWhatsApp({
          tipo: 'error',
          texto: 'No se pudo iniciar el contacto por WhatsApp.'
        });

        return;
      }

      const mensaje = encodeURIComponent(
        'Hola, tengo una consulta sobre este alojamiento.'
      );

      const urlWhatsApp =
        `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

      window.open(urlWhatsApp, '_blank');

      setMensajeWhatsApp({
        tipo: 'exito',
        texto: 'WhatsApp se abrió correctamente. Podés enviar tu consulta desde allí.'
      });

    } catch (error) {
      console.error('Error al abrir WhatsApp:', error);

      setMensajeWhatsApp({
        tipo: 'error',
        texto: 'Ocurrió un error al intentar abrir WhatsApp. Intentá nuevamente.'
      });
    }
  }, []);

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

            <div className="contenedor-whatsapp">

              <div className="aviso-whatsapp">
                Al continuar, serás redirigido a WhatsApp para comunicarte con
                Reservas Carrizo. No compartimos datos personales desde esta aplicación.
              </div>

              <button
                type="button"
                className="whatsapp-flotante"
                onClick={handleWhatsApp}
                aria-label="Contactar por WhatsApp"
                title="Contactar por WhatsApp"
              >
                <MessageCircle size={28} strokeWidth={2.5} />
              </button>

            </div>

            {mensajeWhatsApp && (
              <div className="modal-whatsapp-overlay">
                <div
                  className={`modal-whatsapp ${mensajeWhatsApp.tipo}`}
                  role="alert"
                >

                  <div className="modal-whatsapp-icon">
                    {mensajeWhatsApp.tipo === 'exito' ? '✓' : '⚠'}
                  </div>

                  <h3>
                    {mensajeWhatsApp.tipo === 'exito'
                      ? 'WhatsApp'
                      : 'No se pudo abrir WhatsApp'}
                  </h3>

                  <p>
                    {mensajeWhatsApp.texto}
                  </p>

                  <button
                    type="button"
                    className="modal-whatsapp-boton"
                    onClick={() => setMensajeWhatsApp(null)}
                  >
                    Entendido
                  </button>

                </div>
              </div>
            )}
          </>
        )}

      </div>
    </main>
  );
};

export default DetalleProductos;