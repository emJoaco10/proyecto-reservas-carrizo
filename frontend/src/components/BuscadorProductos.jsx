import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/components/BuscadorProductos.css';
import useProductoAPI from '../hooks/useProductoAPI';
import useReservaAPI from '../hooks/useReservaAPI';
import { Link } from 'react-router-dom';

/**
 * Permite buscar productos por palabra clave, consultar resultados según su
 * disponibilidad para un rango de fechas, mostrar sugerencias y presentar
 * los productos encontrados.
 */
const BuscadorProductos = () => {

  // Productos usados para las sugerencias y la operación de búsqueda por texto.
  const {
    productos,
    fetchProductosPorBusqueda
  } = useProductoAPI();

  // Operación que consulta productos según el rango de fechas seleccionado.
  const { fetchProductosDisponibles } = useReservaAPI();

  // Criterios de búsqueda y estado de interfaz: resultados, carga, mensaje y sugerencias.
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const [resultados, setResultados] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  /**
   * Convierte el valor recibido a texto, normaliza sus caracteres y quita
   * espacios externos para comparar sin distinguir mayúsculas ni diacríticos.
   * @param {*} texto Valor que se desea normalizar.
   * @returns {string} Texto normalizado.
   */
  const normalizarTexto = (texto = '') => {
    return String(texto)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  };

  /**
  * Ordena una copia según la coincidencia del nombre con la búsqueda:
  * coincidencia exacta, nombre que comienza con el texto, palabra del nombre
  * que comienza con el texto, nombre que lo contiene y, por último, los demás.
  * @param {Array} resultados Productos que se van a ordenar.
  * @param {string} texto Texto buscado.
  * @returns {Array} Copia ordenada de los productos.
   */
  const ordenarResultadosPorRelevancia = (
    resultados,
    texto
  ) => {

    const busqueda = normalizarTexto(texto);

    return [...resultados].sort((a, b) => {

      const nombreA = normalizarTexto(a.nombre);
      const nombreB = normalizarTexto(b.nombre);

      const palabrasA = nombreA.split(/\s+/);
      const palabrasB = nombreB.split(/\s+/);

      const puntajeA =
        nombreA === busqueda
          ? 1
          : nombreA.startsWith(busqueda)
            ? 2
            : palabrasA.some((palabra) =>
              palabra.startsWith(busqueda)
            )
              ? 3
              : nombreA.includes(busqueda)
                ? 4
                : 5;

      const puntajeB =
        nombreB === busqueda
          ? 1
          : nombreB.startsWith(busqueda)
            ? 2
            : palabrasB.some((palabra) =>
              palabra.startsWith(busqueda)
            )
              ? 3
              : nombreB.includes(busqueda)
                ? 4
                : 5;

      return puntajeA - puntajeB;
    });
  };



  /** Filtra por coincidencia textual con el nombre y limita las sugerencias a cinco productos. */
  const sugerencias = textoBusqueda.trim()
    ? productos
      .filter((producto) =>
        producto?.nombre
          ?.toLowerCase()
          .includes(textoBusqueda.trim().toLowerCase())
      )
      .slice(0, 5)
    : [];

  /**
  * Actualiza el texto, limpia el mensaje y habilita las sugerencias.
  * @param {React.ChangeEvent<HTMLInputElement>} e Evento de cambio del campo.
   */
  const handleCambioBusqueda = (e) => {

    const valor = e.target.value;

    setTextoBusqueda(valor);
    setMensaje('');
    setMostrarSugerencias(true);
  };

  /**
  * Coloca el nombre elegido en el campo, oculta las sugerencias y limpia el mensaje.
  * @param {string} nombre Nombre del producto elegido.
   */
  const handleSeleccionarSugerencia = (nombre) => {

    setTextoBusqueda(nombre);
    setMostrarSugerencias(false);
    setMensaje('');
  };

  /**
  * Actualiza las fechas inicial y final a partir del rango recibido.
  * @param {Array<Date|null>} fechas Rango con fecha inicial y fecha final.
   */
  const handleCambioFechas = (fechas) => {

    const [inicio, fin] = fechas;

    setFechaInicio(inicio);
    setFechaFin(fin);
  };

  /**
  * Restablece ambas fechas del rango a null.
   */
  const handleLimpiarFechas = () => {

    setFechaInicio(null);
    setFechaFin(null);
  };

  /**
  * Devuelve una cadena vacía si no hay fecha; de lo contrario, usa el formato
  * local es-AR.
  * @param {Date|null} fecha Fecha que se desea mostrar.
  * @returns {string} Fecha localizada o cadena vacía.
   */
  const formatearFecha = (fecha) => {

    if (!fecha) return '';

    return fecha.toLocaleDateString('es-AR');
  };

  /**
  * Valida que haya texto o un rango completo, y que ambas fechas estén
  * seleccionadas. Con un rango consulta por disponibilidad y, si hay texto,
  * filtra la respuesta por nombre normalizado y la ordena por relevancia.
  * Sin rango consulta por texto y ordena la respuesta. Actualiza los resultados
  * y los mensajes de ausencia de coincidencias o error; al finalizar la consulta,
  * restablece el estado de carga.
   */
  const handleBuscar = async () => {
    const texto = textoBusqueda.trim();

    setMostrarSugerencias(false);
    setMensaje('');

    if (!texto && (!fechaInicio || !fechaFin)) {
      setResultados([]);
      setMensaje(
        'Ingresá una palabra clave o seleccioná un rango de fechas para realizar la búsqueda.'
      );
      return;
    }

    if ((fechaInicio && !fechaFin) || (!fechaInicio && fechaFin)) {
      setResultados([]);
      setMensaje(
        'Seleccioná una fecha de inicio y una fecha de finalización.'
      );
      return;
    }

    setBuscando(true);

    try {
      let productosEncontrados = [];

      /*
       * Búsqueda por disponibilidad
       */
      if (fechaInicio && fechaFin) {
        const fechaInicioFormateada =
          fechaInicio.toISOString().split('T')[0];

        const fechaFinFormateada =
          fechaFin.toISOString().split('T')[0];

        productosEncontrados =
          await fetchProductosDisponibles(
            fechaInicioFormateada,
            fechaFinFormateada
          );

        /*
         * Si además se ingresó texto,
         * filtramos los productos disponibles
         * por nombre.
         */
        if (texto) {
          const textoNormalizado = normalizarTexto(texto);

          productosEncontrados =
            productosEncontrados.filter((producto) =>
              normalizarTexto(producto.nombre)
                .includes(textoNormalizado)
            );

          productosEncontrados =
            ordenarResultadosPorRelevancia(
              productosEncontrados,
              texto
            );
        }
      }

      /*
       * Búsqueda solamente por texto
       */
      else {
        productosEncontrados =
          await fetchProductosPorBusqueda(texto);

        productosEncontrados =
          ordenarResultadosPorRelevancia(
            productosEncontrados,
            texto
          );
      }

      setResultados(productosEncontrados);

      if (productosEncontrados.length === 0) {
        setMensaje(
          fechaInicio && fechaFin
            ? 'No se encontraron productos disponibles para las fechas seleccionadas.'
            : 'No se encontraron productos.'
        );
      }

    } catch (error) {
      console.error(
        '[BuscadorProductos] Error al realizar búsqueda:',
        error
      );

      setResultados([]);

      setMensaje(
        'No se pudo realizar la búsqueda.'
      );

    } finally {
      setBuscando(false);
    }
  };

  return (
    <section className="buscador-productos">

      <div className="buscador-productos__encabezado">

        <h2>
          Buscar productos
        </h2>

        <p>
          Encontrá los productos que mejor se adapten
          a lo que estás buscando.
        </p>

      </div>

      <div className="buscador-productos__contenido">

        {/* Campo de búsqueda por palabra clave y sugerencias de autocompletado. */}
        <div className="buscador-productos__campo">

          <label htmlFor="busqueda-producto">
            ¿Qué estás buscando?
          </label>

          <div className="buscador-productos__autocompletado">

            <input
              id="busqueda-producto"
              type="text"
              placeholder="Ingresá una palabra clave..."
              value={textoBusqueda}
              onChange={handleCambioBusqueda}
              onFocus={() => {
                if (textoBusqueda.trim()) {
                  setMostrarSugerencias(true);
                }
              }}
              autoComplete="off"
            />

            {mostrarSugerencias &&
              sugerencias.length > 0 && (
                <ul
                  className="buscador-productos__sugerencias"
                  role="listbox"
                >

                  {sugerencias.map((producto) => (

                    <li
                      key={producto.id}
                      role="option"
                      aria-selected="false"
                      onMouseDown={() =>
                        handleSeleccionarSugerencia(
                          producto.nombre
                        )
                      }
                    >
                      {producto.nombre}
                    </li>

                  ))}

                </ul>
              )}

          </div>

        </div>

        {/* Selector del rango de fechas usado para consultar disponibilidad. */}
        <div className="buscador-productos__campo">

          <label htmlFor="rango-fechas">
            Fechas
          </label>

          <DatePicker
            id="rango-fechas"
            selected={fechaInicio}
            onChange={handleCambioFechas}
            startDate={fechaInicio}
            endDate={fechaFin}
            selectsRange
            dateFormat="dd/MM/yyyy"
            placeholderText="Seleccioná un rango"
            minDate={new Date()}
            isClearable
            monthsShown={2}
            className="buscador-productos__datepicker"
          />

        </div>

        {/* Inicia la búsqueda y refleja el estado de carga mientras está en curso. */}
        <button
          type="button"
          className="buscador-productos__boton"
          onClick={handleBuscar}
          disabled={buscando}
        >
          {buscando
            ? 'Buscando...'
            : 'Realizar búsqueda'}
        </button>

      </div>

      {/* Presenta el rango seleccionado (aunque esté incompleto) y permite limpiarlo. */}
      {(fechaInicio || fechaFin) && (
        <div className="buscador-productos__rango">

          <p>
            <strong>Rango seleccionado:</strong>{' '}

            {fechaInicio
              ? formatearFecha(fechaInicio)
              : 'Seleccioná fecha de inicio'}

            {' → '}

            {fechaFin
              ? formatearFecha(fechaFin)
              : 'Seleccioná fecha de fin'}
          </p>

          <button
            type="button"
            className="buscador-productos__limpiar"
            onClick={handleLimpiarFechas}
          >
            Limpiar fechas
          </button>

        </div>
      )}

      {/* Mensajes informativos o de error asociados a la búsqueda. */}
      {mensaje && (
        <p className="buscador-productos__mensaje">
          {mensaje}
        </p>
      )}

      {/* Lista los resultados con sus valoraciones y acceso al detalle de cada producto. */}
      {resultados.length > 0 && (
        <div className="buscador-productos__resultados">

          <h3>
            {fechaInicio && fechaFin
              ? 'Productos disponibles'
              : 'Resultados de búsqueda'}
          </h3>

          {fechaInicio && fechaFin && (
            <p className="buscador-productos__resultado-rango">
              Disponibilidad para{' '}
              <strong>{formatearFecha(fechaInicio)}</strong>
              {' → '}
              <strong>{formatearFecha(fechaFin)}</strong>
            </p>
          )}

          <div className="buscador-productos__lista-resultados">

            {resultados.map((producto) => (

              <article
                key={producto.id}
                className="buscador-productos__resultado"
              >

                <h4>
                  {producto.nombre}
                </h4>

                <p>
                  {producto.descripcion}
                </p>

                <div className="buscador-productos__valoracion">

                  <div className="buscador-productos__estrellas">
                    {[1, 2, 3, 4, 5].map((estrella) => (
                      <span
                        key={estrella}
                        className={
                          estrella <= Math.round(
                            producto.puntuacionPromedio || 0
                          )
                            ? "buscador-productos__estrella buscador-productos__estrella--activa"
                            : "buscador-productos__estrella"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <span className="buscador-productos__promedio">
                    {(producto.puntuacionPromedio || 0).toFixed(1)}
                  </span>

                  <span className="buscador-productos__cantidad">
                    ({producto.cantidadValoraciones || 0}{' '}
                    {producto.cantidadValoraciones === 1
                      ? 'valoración'
                      : 'valoraciones'})
                  </span>

                </div>

                <Link
                  to={`/producto/${producto.id}`}
                  className="btn-ver-producto"
                >
                  Ver producto
                </Link>

              </article>

            ))}

          </div>

        </div>
      )}

    </section>
  );
};

export default BuscadorProductos;