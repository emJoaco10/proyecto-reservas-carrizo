import { Link } from 'react-router-dom';
import '../styles/pages/Main.css';
import ListadoProductos from '../components/ListadoProductos';

const Main = () => {
  return (
    <div className="main-container">
      <section className="bloque">Buscador</section>
      <section className="bloque">Categorías</section>
      <section className="bloque">
        <h2>Recomendaciones</h2>
        <ListadoProductos />
      </section>
      <section className="bloque">
        <h2>Registrar producto</h2>
        <p>Como administrador, podés agregar nuevos productos para mantener actualizado el catálogo.</p>
        <Link to="/agregar-producto">
          <button className="btn btn-filled">Agregar producto</button>
        </Link>
      </section>
    </div>
  );
};

export default Main;