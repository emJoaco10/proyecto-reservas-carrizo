import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCategoriaAPI from "../hooks/useCategoriaAPI";
import "../styles/pages/AdministracionCategorias.css";
import BreadcrumAdministracion from "../components/BreadcrumAdministracion";

/**
 * Página para consultar y administrar las categorías de los alojamientos,
 * con acceso a las opciones de agregar, editar y eliminar categorías.
 * No recibe props.
 */
const AdministracionCategorias = () => {

  // Categoría seleccionada para solicitar su eliminación; controla la presentación del modal.
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);
  // Indica si la operación de eliminación está en curso.
  const [eliminando, setEliminando] = useState(false);

  // El hook proporciona la lista (categorias), sus estados (loading y error),
  // la carga de datos (fetchCategorias) y la solicitud de eliminación (removeCategoria).
  const {
    categorias,
    loading,
    error,
    fetchCategorias,
    removeCategoria
  } = useCategoriaAPI();

  // Solicita las categorías al montar el componente; el efecto no depende de cambios posteriores.
  useEffect(() => {
    fetchCategorias();
  }, []);

  /**
   * Si hay una categoría seleccionada, solicita su eliminación mediante su id.
   * Al iniciar activa eliminando; si tiene éxito limpia la selección, si falla
   * registra el error en consola y, en cualquier caso, restablece eliminando.
   */
  const confirmarEliminacion = async () => {

    if (!categoriaAEliminar) {
      return;
    }

    try {

      setEliminando(true);

      await removeCategoria(categoriaAEliminar.id);

      setCategoriaAEliminar(null);

    } catch (error) {

      console.error(
        "Error al eliminar categoría:",
        error
      );

    } finally {

      setEliminando(false);

    }
  };

  return (

    <section className="bloque">

      {/* Sección principal con navegación a /administracion y a la sección actual. */}
      <BreadcrumAdministracion
        items={[
          {
            label: "Administración",
            path: "/administracion"
          },
          {
            label: "Administración de categorías"
          }
        ]}
      />

      {/* Título, descripción y acceso para agregar una categoría. */}
      <h1>Administración de categorías</h1>

      <p>
        Gestioná las categorías de los alojamientos.
      </p>

      <Link to="/agregar-categoria">
        <button className="btn btn-filled">
          Agregar categoría
        </button>
      </Link>

      <div className="administracion-categorias-listado">

        <h2>Categorías existentes</h2>

        {/* Mensaje visible mientras loading es verdadero. */}
        {loading && (
          <p>Cargando categorías...</p>
        )}

        {/* Error del listado, presentado con semántica de alerta. */}
        {error && (
          <p role="alert">
            {error}
          </p>
        )}

        {/* Mensaje informativo cuando no hay carga, error ni categorías. */}
        {!loading && !error && categorias.length === 0 && (
          <p>
            No hay categorías registradas.
          </p>
        )}

        {/* Grid de tarjetas cuando hay categorías y no hay carga ni error. */}
        {!loading && !error && categorias.length > 0 && (

          <div className="administracion-categorias-grid">

            {categorias.map((categoria) => (

              <article
                key={categoria.id}
                className="administracion-categoria-card"
              >

                <div>
                  {/* Cada tarjeta muestra el nombre y la descripción de su categoría. */}
                  <h3>{categoria.nombre}</h3>

                  <p>
                    {categoria.descripcion}
                  </p>
                </div>

                <div className="administracion-categoria-card__acciones">

                  {/* Edita mediante la ruta /editar-categoria/${categoria.id}. */}
                  <Link
                    to={`/editar-categoria/${categoria.id}`}
                    className="btn btn-filled"
                  >
                    Editar
                  </Link>

                  {/* Selecciona la categoría para habilitar la presentación del modal. */}
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setCategoriaAEliminar(categoria)}
                  >
                    Eliminar
                  </button>

                </div>

              </article>

            ))}

          </div>

        )}

      </div>

  {/* Modal condicional con role="dialog", aria-modal y aria-labelledby para accesibilidad. */}
      {categoriaAEliminar && (
        <div
          className="modal-confirmacion-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-confirmacion-categoria"
        >

          <div className="modal-confirmacion">

            <h2 id="titulo-confirmacion-categoria">
              Confirmar eliminación
            </h2>

            {/* El mensaje identifica la categoría seleccionada por su nombre. */}
            <p>
              ¿Estás seguro de eliminar la categoría{" "}
              <strong>
                "{categoriaAEliminar.nombre}"
              </strong>?
            </p>

            {/* Informa que los productos asociados permanecen disponibles sin categoría. */}
            <p>
              Los productos asociados no serán eliminados.
              Quedarán disponibles sin categoría.
            </p>

            <div className="modal-confirmacion__acciones">

              {/* Cancelar cierra el modal y se deshabilita mientras se elimina. */}
              <button
                type="button"
                className="btn"
                onClick={() => setCategoriaAEliminar(null)}
                disabled={eliminando}
              >
                Cancelar
              </button>

              {/* Solicita la eliminación; se deshabilita y cambia el texto durante la operación. */}
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmarEliminacion}
                disabled={eliminando}
              >
                {eliminando
                  ? "Eliminando..."
                  : "Eliminar categoría"}
              </button>

            </div>

          </div>

        </div>
      )}

    </section>

  );

};

export default AdministracionCategorias;