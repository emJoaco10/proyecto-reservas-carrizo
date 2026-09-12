import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/components/BuscadorProductos.css';
import useProductoAPI from '../hooks/useProductoAPI';
/**
 * Bloque principal de búsqueda de productos.
 *
 * Permite ingresar una palabra clave y seleccionar
 * un rango de fechas para realizar posteriormente
 * la búsqueda de productos.
 */
const BuscadorProductos = () => {

  const { fetchProductosPorBusqueda } = useProductoAPI();

  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const [resultados, setResultados] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  /**
   * Actualiza la fecha inicial y final seleccionadas.
   */
  const handleCambioFechas = (fechas) => {

    const [inicio, fin] = fechas;

    setFechaInicio(inicio);
    setFechaFin(fin);
  };

  /**
   * Limpia completamente el rango seleccionado.
   */
  const handleLimpiarFechas = () => {

    setFechaInicio(null);
    setFechaFin(null);
  };

  /**
   * Convierte una fecha JavaScript al formato
   * DD/MM/YYYY para mostrarla al usuario.
   */
  const formatearFecha = (fecha) => {

    if (!fecha) return '';

    return fecha.toLocaleDateString('es-AR');
  };

  /**
   * Ejecuta la búsqueda de productos utilizando
   * la palabra clave ingresada por el usuario.
   */
  const handleBuscar = async () => {

    const texto = textoBusqueda.trim();

    if (!texto) {
      setResultados([]);
      setMensaje('Ingresá una palabra clave para realizar la búsqueda.');
      return;
    }

    setBuscando(true);
    setMensaje('');

    try {

      const productosEncontrados =
        await fetchProductosPorBusqueda(texto);

      setResultados(productosEncontrados);

      if (productosEncontrados.length === 0) {
        setMensaje('No se encontraron productos.');
      }

    } catch (error) {

      console.error(
        '[BuscadorProductos] Error al realizar búsqueda:',
        error
      );

      setResultados([]);
      setMensaje('No se pudo realizar la búsqueda.');

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

        <div className="buscador-productos__campo">

          <label htmlFor="busqueda-producto">
            ¿Qué estás buscando?
          </label>

          <input
            id="busqueda-producto"
            type="text"
            placeholder="Ingresá una palabra clave..."
            value={textoBusqueda}
            onChange={(e) => setTextoBusqueda(e.target.value)}
          />

        </div>

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

      {mensaje && (
        <p className="buscador-productos__mensaje">
          {mensaje}
        </p>
      )}

      {resultados.length > 0 && (
        <div className="buscador-productos__resultados">

          <h3>
            Resultados de búsqueda
          </h3>

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

              </article>

            ))}

          </div>

        </div>
      )}

    </section>
  );
};
export default BuscadorProductos;