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
        <h2>Panel de administración</h2>
        <p>Aqui podes encontrar las herramientas para gestionar tu negocio.</p>
        <Link to="/administración">
          <button className="btn btn-filled">Acceder al panel</button>
        </Link>
      </section>
    </div>
  );
};

export default Main;