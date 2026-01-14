import '../styles/components/Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="app-header">
      <div className="container header-content">
        <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
        <span className="slogan">Tu viaje comienza aquí</span>
        </div>
      
      <div className="header-right">
        <button className="btn btn-outline">Crear cuenta</button>
        <button className="btn btn-filled">Iniciar sesión</button>
      </div>
      </div>
    </header>
  );
};

export default Header;