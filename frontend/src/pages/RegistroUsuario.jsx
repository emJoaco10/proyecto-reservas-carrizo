// React permite definir y renderizar el componente de esta página.
import React from "react";
// Formulario encargado de presentar y gestionar el registro de usuarios.
import RegistroUsuarioFormulario from "../components/RegistroUsuarioFormulario";
// Estilos específicos de la página de registro.
import "../styles/pages/RegistroUsuario.css";

/**
 * Página destinada al registro de usuarios.
 */
const RegistroUsuario = () => {
  // Contenedor principal que agrupa el título y el formulario de registro.
  return (
    <div className="registro-container">
      {/* Encabezado que identifica esta página como el espacio de registro de usuarios. */}
      <h1>Registro de Usuario</h1>
      {/* Componente que presenta y gestiona el formulario de registro. */}
      <RegistroUsuarioFormulario />
    </div>
  );
};

export default RegistroUsuario;
