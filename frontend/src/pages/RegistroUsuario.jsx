import React from "react";
import RegistroUsuarioFormulario from "../components/RegistroUsuarioFormulario";
import "../styles/pages/RegistroUsuario.css";

const RegistroUsuario = () => {
  return (
    <div className="registro-container">
      <h1>Registro de Usuario</h1>
      <RegistroUsuarioFormulario />
    </div>
  );
};

export default RegistroUsuario;
