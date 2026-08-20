import FormularioCategoria from "../components/FormularioCategoria";

const AgregarCategorias = () => {



  return (

    <section className="bloque">

      <h1>Agregar categoría</h1>

      <p className="descripcion-pagina">
        Creá una nueva categoría para organizar tus alojamientos.
      </p>

      <FormularioCategoria />

    </section>

  );

};

export default AgregarCategorias;