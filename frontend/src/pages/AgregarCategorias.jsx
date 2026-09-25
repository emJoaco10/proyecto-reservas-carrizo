import FormularioCategoria from "../components/FormularioCategoria";
import BreadcrumAdministracion from "../components/BreadcrumAdministracion";
import "../styles/pages/CategoriaFormulario.css";

const AgregarCategorias = () => {



  return (

    <section className="bloque">

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

      <h1>Agregar categoría</h1>

      <p className="descripcion-pagina">
        Creá una nueva categoría para organizar tus alojamientos.
      </p>

      <FormularioCategoria />

    </section>

  );

};

export default AgregarCategorias;