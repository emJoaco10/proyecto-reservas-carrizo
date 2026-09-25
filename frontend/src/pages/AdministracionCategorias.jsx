import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCategoriaAPI from "../hooks/useCategoriaAPI";
import "../styles/pages/AdministracionCategorias.css";
import BreadcrumAdministracion from "../components/BreadcrumAdministracion";

const AdministracionCategorias = () => {

  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  const {
    categorias,
    loading,
    error,
    fetchCategorias,
    removeCategoria
  } = useCategoriaAPI();

  useEffect(() => {
    fetchCategorias();
  }, []);

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

        {loading && (
          <p>Cargando categorías...</p>
        )}

        {error && (
          <p role="alert">
            {error}
          </p>
        )}

        {!loading && !error && categorias.length === 0 && (
          <p>
            No hay categorías registradas.
          </p>
        )}

        {!loading && !error && categorias.length > 0 && (

          <div className="administracion-categorias-grid">

            {categorias.map((categoria) => (

              <article
                key={categoria.id}
                className="administracion-categoria-card"
              >

                <div>
                  <h3>{categoria.nombre}</h3>

                  <p>
                    {categoria.descripcion}
                  </p>
                </div>

                <div className="administracion-categoria-card__acciones">

                  <Link
                    to={`/editar-categoria/${categoria.id}`}
                    className="btn btn-filled"
                  >
                    Editar
                  </Link>

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

            <p>
              ¿Estás seguro de eliminar la categoría{" "}
              <strong>
                "{categoriaAEliminar.nombre}"
              </strong>?
            </p>

            <p>
              Los productos asociados no serán eliminados.
              Quedarán disponibles sin categoría.
            </p>

            <div className="modal-confirmacion__acciones">

              <button
                type="button"
                className="btn"
                onClick={() => setCategoriaAEliminar(null)}
                disabled={eliminando}
              >
                Cancelar
              </button>

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