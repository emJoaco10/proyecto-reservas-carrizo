import React, { useState } from "react";
import useUsuarioAPI from "../hooks/useUsuarioAPI";
import "../styles/components/RegistroUsuarioFormulario.css";

const RegistroUsuarioFormulario = () => {
  const { usuario, loading, error, registerUsuario } = useUsuarioAPI();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUsuario(formData);
      alert("Usuario registrado con éxito");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>Crear cuenta</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="apellido"
        placeholder="Apellido"
        value={formData.apellido}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        required
        minLength={8}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Registrando..." : "Crear cuenta"}
      </button>

      {error && <p>{error}</p>}
      {usuario && <p>Bienvenido {usuario.nombre}!</p>}
    </form>
  );
};

export default RegistroUsuarioFormulario;