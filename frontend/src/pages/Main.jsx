import { Link } from 'react-router-dom';
import '../styles/pages/Main.css';
import ListadoProductos from '../components/ListadoProductos';

/**
 * Página principal (Home) de la aplicación.
 *
 * ESTRUCTURA:
 * - 4 bloques principales en layout vertical
 * - Fondo verde claro según identidad de marca
 * - Contenido centrado con ancho máximo
 *
 * BLOQUES:
 * 1. "Buscador" - Placeholder para futuras funcionalidades
 * 2. "Categorías" - Placeholder para futuras funcionalidades
 * 3. "Recomendaciones" - Lista de productos aleatorios (funcional)
 * 4. "Panel de administración" - Enlace al panel admin
 *
 * FUNCIONALIDAD ACTUAL:
 * - Solo el bloque de recomendaciones está implementado
 * - Los otros bloques son placeholders con estilos
 * - Enlace al panel admin con navegación React Router
 *
 * FUTURO:
 * - Implementar buscador real
 * - Agregar filtros por categoría
 * - Posiblemente más secciones dinámicas
 */
const Main = () => {
  return (
    <div className="main-container">

      {/* Placeholder para buscador - futuro desarrollo */}
      <section className="bloque">Buscador</section>

      {/* Placeholder para categorías - futuro desarrollo */}
      <section className="bloque">Categorías</section>

      {/* Sección funcional: Productos aleatorios */}
      <section className="bloque">
        <h2>Recomendaciones</h2>
        <ListadoProductos />
      </section>

      {/* Sección funcional: Enlace al panel admin */}
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