// Formulario reutilizable que presenta los campos de una categoría.
import FormularioCategoria from "../components/FormularioCategoria";
// Navegación jerárquica de la sección administrativa.
import BreadcrumAdministracion from "../components/BreadcrumAdministracion";
// Estilos específicos de esta página.
import "../styles/pages/CategoriaFormulario.css";

/**
 * Presenta la interfaz para crear una nueva categoría y organizar los alojamientos.
 * No recibe props; la página delega la presentación del formulario en FormularioCategoria.
 */
const AgregarCategorias = () => {



  return (

    <section className="bloque">

      {/* Breadcrumb con tres niveles: Administración (/administracion), Administración de categorías (/categorias-admin) y Agregar categoría (página actual, sin path). */}
      <BreadcrumAdministracion
        items={[
          {
            label: "Administración",
            path: "/administracion"
          },
          {
            label: "Administración de categorías",
            path: "/categorias-admin"
          },
          {
            label: "Agregar categoría"
          }
        ]}
      />

      {/* Identifica el propósito principal de la pantalla. */}
      <h1>Agregar categoría</h1>

      {/* Ofrece una breve descripción de la acción disponible. */}
      <p className="descripcion-pagina">
        Creá una nueva categoría para organizar tus alojamientos.
      </p>

      {/* Incorpora el formulario para crear la categoría, sin describir su funcionamiento interno. */}
      <FormularioCategoria />

    </section>

  );

};

export default AgregarCategorias;