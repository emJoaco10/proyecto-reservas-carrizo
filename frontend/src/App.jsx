import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import './styles/App.css';
import DetalleProductos from './pages/DetalleProductos';
import { Footer } from './components/Footer';
import Administracion from './pages/Administracion';
import AgregarProducto from './pages/AgregarProducto';
import ListaProductosAdmin from './pages/ListaProductosAdmin';
import DetalleProductosGaleria from './pages/DetalleProductosGaleria';
import { EditarProducto } from './pages/EditarProducto';
import RegistroUsuario from './pages/RegistroUsuario';
import IniciarSesion from "./pages/IniciarSesion";
import MiPerfil from './pages/MiPerfil';
import AdministracionProductos from './pages/AdministracionProductos';
import AdministracionUsuarios from './pages/AdministracionUsuarios';
import AdministracionCaracteristicas from './pages/AdministracionCaracteristicas';
import ListaCaracteristicas from './pages/ListaCaracteristicas';
import AgregarCaracteristicas from './pages/AgregarCaracteristicas';
import ListaUsuariosAdmin from './pages/ListaUsuariosAdmin';
import EditarCaracteristica from './pages/EditarCaracteristica';
import AsociarProductoCaracteristica from './pages/AsociarProductoCaracteristica';
import AgregarCategorias from './pages/AgregarCategorias';
import AdministracionCategorias from './pages/AdministracionCategorias';
import Reserva from './pages/Reserva';

/**
 * Componente principal de la aplicación React.
 *
 * ESTRUCTURA DE LAYOUT:
 * - Header: Navegación global (fixed)
 * - main: Contenido dinámico según ruta
 * - Footer: Información legal (global)
 *
 * ROUTING:
 * - / → Página principal con productos aleatorios
 * - /administración → Panel admin (desktop-only)
 * - /agregar-producto → Formulario para agregar productos
 * - /lista-productos → Tabla de productos para admin
 * - /producto/:id → Detalle de producto específico
 *
 * El routing usa React Router v6 con BrowserRouter.
 * Header y Footer son globales, el contenido cambia según la ruta.
 */
const App = () => {
  return (
    <Router>
      {/* Header global - navegación y branding */}
      <Header />

      {/* Contenido principal - cambia según ruta */}
      <main>
        <Routes>
          {/* Página principal - productos aleatorios */}
          <Route path="/" element={<Main />} />

          {/* Panel de administración - solo desktop */}
          <Route path="/administración" element={<Administracion />} />

          {/* Agregar nuevo producto */}
          <Route path='/agregar-producto' element={<AgregarProducto />} />

          {/* Listar productos para admin */}
          <Route path='/lista-productos' element={<ListaProductosAdmin />} />

          {/* Detalle de producto - parámetro dinámico :id */}
          <Route path="/producto/:id" element={<DetalleProductos />} />

          {/* Detalle de producto para galería - con ID */}
          <Route path="/producto/:id/galeria" element={<DetalleProductosGaleria />} />

          {/* Edición de producto - parámetro dinámico :id */}
          <Route path="/admin/producto/editar/:id" element={<EditarProducto />} />

          <Route path="/registro-usuario" element={<RegistroUsuario />} />

          <Route path="/iniciar-sesion" element={<IniciarSesion />} />

          <Route path="/mi-perfil" element={<MiPerfil />} />

          <Route path="/usuarios-admin" element={<AdministracionUsuarios />} />

          <Route path="/productos-admin" element={<AdministracionProductos />} />

          <Route path="/caracteristicas-admin" element={<AdministracionCaracteristicas />} />

          <Route path="/categorias-admin" element={<AdministracionCategorias />} />

          <Route path="/lista-caracteristicas" element={<ListaCaracteristicas />} />

          <Route path="/agregar-caracteristica" element={<AgregarCaracteristicas />} />

          <Route path="/editar-caracteristica/:id" element={<EditarCaracteristica />} />

          <Route path="/asociar-producto-caracteristica/:id" element={<AsociarProductoCaracteristica />} />

          <Route path="/lista-usuarios" element={<ListaUsuariosAdmin />} />

          <Route path="/agregar-categoria" element={<AgregarCategorias />} />

          <Route path="/reserva/:id" element={<Reserva />} />
        </Routes>
      </main>

      {/* Footer global - información legal */}
      <Footer />
    </Router>
  );
};

export default App;