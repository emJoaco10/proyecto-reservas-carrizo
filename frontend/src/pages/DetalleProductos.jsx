import React, { useEffect, useState, useCallback } from 'react';
// Hooks de navegación para leer el parámetro de ruta y cambiar de página.
import { useParams, useNavigate } from 'react-router-dom';
// Componentes que presentan la información y las características del alojamiento.
import InfoProducto from '../components/InfoProducto';
import CaracteristicasListado from '../components/CaracteristicasListado';
// Calendario para consultar y seleccionar fechas de disponibilidad.
import CalendarioDisponibilidad from '../components/CalendarioDisponibilidad';
// Consulta del producto y estados de carga y error asociados.
import useProductoAPI from '../hooks/useProductoAPI';
// Estilos específicos de esta página.
import '../styles/pages/DetalleProductos.css';
// Secciones de políticas y valoraciones del alojamiento.
import PoliticasProducto from '../components/PoliticasProducto';
import ValoracionesProducto from '../components/ValoracionesProducto';
// Lectura de los datos de usuario almacenados localmente.
import { leerLocal } from '../helpers/storageUtils';
// Icono del acceso de contacto por WhatsApp.
import { MessageCircle } from 'lucide-react';

/**
 * Presenta la página de detalle de un alojamiento.
 * Obtiene el identificador desde la ruta y carga el producto mediante
 * `useProductoAPI`; muestra su información, características, políticas y
 * valoraciones. Integra el calendario y conserva las fechas seleccionadas,
 * dirige al flujo de reserva según exista un usuario almacenado localmente y
 * permite intentar abrir WhatsApp para realizar una consulta, mostrando el
 * resultado de ese intento.
 *
 * @returns {JSX.Element} Página de detalle del alojamiento.
 */
const DetalleProductos = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  // `loading` y `error` son estados proporcionados por el hook, no estados locales.
  const { fetchProductoById, loading, error } = useProductoAPI();
  /** @type {[object|null, Function]} Información del alojamiento cargado. */
  const [producto, setProducto] = useState(null);
  /** @type {[object|null, Function]} Datos que controlan el modal de resultado de WhatsApp. */
  const [mensajeWhatsApp, setMensajeWhatsApp] = useState(null);
  /** @type {[{fechaInicio: (string|null), fechaFin: (string|null)}, Function]} Fechas elegidas en el calendario. */
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState({
    fechaInicio: null,
    fechaFin: null
  });

  /**
   * Intenta abrir el contacto de WhatsApp con el número configurado y un
   * mensaje predefinido codificado para URL. Valida que el número contenga
   * únicamente dígitos e intenta abrir el enlace en una pestaña nueva; luego
   * actualiza el mensaje mostrado en el modal. No verifica si el usuario
   * finalmente envía la consulta; las excepciones se registran en consola.
   *
   * @returns {void}
   */
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

  /**
   * Si existe un identificador de ruta, consulta el producto mediante
   * `fetchProductoById` y guarda el resultado en `producto`. No implementa un
   * manejo local adicional de errores.
   *
   * Dependencias: `id` y `fetchProductoById`, para reaccionar a cambios de
   * identificador o de la función de consulta.
   */
  useEffect(() => {
    if (!id) return;

    const cargarProducto = async () => {
      const data = await fetchProductoById(id);
      setProducto(data);
    };

    cargarProducto();
  }, [id, fetchProductoById]);

  /**
   * Navega a la galería del producto cuando existen `id` y `producto`,
   * transmitiendo el producto mediante el estado de navegación.
   *
   * @returns {void}
   */
  const onVerMas = useCallback(() => {
    if (id && producto) {
      navigate(`/producto/${id}/galeria`, {
        state: { producto }
      });
    }
  }, [navigate, id, producto]);

  /**
   * Recibe las fechas de inicio y fin comunicadas por el calendario y las
   * guarda en el estado local.
   *
   * @param {{fechaInicio: string|null, fechaFin: string|null}} fechas Fechas seleccionadas.
   * @returns {void}
   */
  const handleFechasSeleccionadas = useCallback(({ fechaInicio, fechaFin }) => {
    setFechasSeleccionadas({
      fechaInicio,
      fechaFin
    });
  }, []);

  /**
   * Inicia la navegación del flujo de reserva con las fechas seleccionadas.
   * Lee el usuario mediante `leerLocal("usuario")`; si falta alguna fecha no
   * continúa. Sin usuario local, dirige al inicio de sesión y transmite los
   * datos necesarios para retomar el flujo; con usuario local, navega a la ruta
   * de reserva y transmite las fechas. La lectura local no valida la sesión en
   * el backend ni crea aquí una reserva.
   *
   * @returns {void}
   */
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
    // Contenedor general de la página de detalle.
    <main className="detalle-producto-page">
      <div className="container detalle-producto">

        {/* Estado de carga informado por useProductoAPI. */}
        {loading && (
          <div className="detalle-producto__estado">
            <p>Cargando producto...</p>
          </div>
        )}

        {/* Error de consulta informado por useProductoAPI. */}
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

        {/* El contenido del alojamiento se presenta solo cuando la consulta terminó sin error y hay producto. */}
        {!loading && !error && producto && (
          <>
            {/* Información principal y disponibilidad */}
            <div className="detalle-producto__principal">

              <InfoProducto
                producto={producto}
                onVerMas={onVerMas}
              />

              <div className="detalle-producto__disponibilidad">

                {/* Calendario que comunica las fechas seleccionadas al estado local. */}
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

                    {/* Resumen de fechas; muestra un texto alternativo si aún no se seleccionaron. */}
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

                  {/* La acción queda deshabilitada hasta contar con ambas fechas. */}
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

              {/* Usa una lista vacía como alternativa si el producto no incluye características. */}
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

            {/* Acceso de contacto por WhatsApp y aviso sobre la redirección externa. */}
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

            {/* Modal condicional cuyo contenido visual depende del resultado guardado en mensajeWhatsApp. */}
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

                  {/* Cierra el modal limpiando su estado. */}
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