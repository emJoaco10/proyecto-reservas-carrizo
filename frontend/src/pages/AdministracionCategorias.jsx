import { Link } from "react-router-dom";

const AdministracionCategorias = () => {
    

  return (

    <section className="bloque">

      <h1>Administración de categorías</h1>

      <p>
        Gestioná las categorías de los alojamientos.
      </p>

      <Link to="/agregar-categoria">
        <button className="btn btn-filled">
          Agregar categoría
        </button>
      </Link>

    </section>

  );

};

export default AdministracionCategorias;