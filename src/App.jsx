import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import './styles/App.css';
import DetalleProductos from './pages/DetalleProductos';
import { Footer } from './components/Footer';
import Administracion from './pages/Administracion';
import AgregarProducto from './pages/AgregarProducto';
import ListaProductosAdmin from './pages/ListaProductosAdmin';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/administración" element={<Administracion />} />
          <Route path='/agregar-producto' element={<AgregarProducto />} />
          <Route path='/lista-productos' element={<ListaProductosAdmin />} />
          <Route path="/producto/:id" element={<DetalleProductos />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;