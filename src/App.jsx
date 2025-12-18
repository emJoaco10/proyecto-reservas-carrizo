import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom';
import AgregarProducto from './pages/AgregarProducto';
import Header from './components/Header';
import Main from './pages/Main';
import './styles/App.css';
import DetalleProductos from './pages/DetalleProductos';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/agregar-producto" element={<AgregarProducto />} />
          <Route path="/producto/:id" element={<DetalleProductos />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;