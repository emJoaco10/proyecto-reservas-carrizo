import React, { useState } from "react";
import useUsuarioAPI from "../hooks/useUsuarioAPI";
import {
  validarNombreUsuario,
  validarApellido,
  validarEmail,
  validarPassword
} from "../helpers/validaciones";
import "../styles/components/Formulario.css";

const RegistroUsuarioFormulario = () => {

  const {
    usuario,
    loading,
    error,
    registerUsuario
  } = useUsuarioAPI();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const [errores, setErrores] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: ""
  });

  const [mensajeExito, setMensajeExito] = useState("");

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    /*
     * Limpiamos el error del campo mientras
     * el usuario vuelve a escribir.
     */
    setErrores({
      ...errores,
      [name]: ""
    });

    setMensajeExito("");
  };


  const validarFormulario = () => {

    const nuevosErrores = {
      nombre: validarNombreUsuario(formData.nombre),
      apellido: validarApellido(formData.apellido),
      email: validarEmail(formData.email),
      password: validarPassword(formData.password)
    };

    setErrores(nuevosErrores);

    return Object.values(nuevosErrores).some(
      (mensaje) => mensaje !== ""
    );
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setMensajeExito("");

    const formularioInvalido = validarFormulario();

    if (formularioInvalido) {
      return;
    }

    try {

      await registerUsuario(formData);

      setMensajeExito(
        "Usuario registrado con éxito"
      );

      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
      });

      setErrores({
        nombre: "",
        apellido: "",
        email: "",
        password: ""
      });

    } catch (err) {

      console.error(
        "Error al registrar usuario:",
        err
      );
    }
  };


  return (
    <form
      className="formulario"
      onSubmit={handleSubmit}
      noValidate
    >

      <h2>Crear cuenta</h2>


      {/* NOMBRE */}

      <div className="campo-formulario">

        <label htmlFor="nombre">
          Nombre
        </label>

        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className={errores.nombre ? "input-error" : ""}
        />

        {errores.nombre && (
          <p className="mensaje-error">
            {errores.nombre}
          </p>
        )}

      </div>


      {/* APELLIDO */}

      <div className="campo-formulario">

        <label htmlFor="apellido">
          Apellido
        </label>

        <input
          type="text"
          id="apellido"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          className={errores.apellido ? "input-error" : ""}
        />

        {errores.apellido && (
          <p className="mensaje-error">
            {errores.apellido}
          </p>
        )}

      </div>


      {/* EMAIL */}

      <div className="campo-formulario">

        <label htmlFor="email">
          Correo electrónico
        </label>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          className={errores.email ? "input-error" : ""}
        />

        {errores.email && (
          <p className="mensaje-error">
            {errores.email}
          </p>
        )}

      </div>


      {/* CONTRASEÑA */}

      <div className="campo-formulario">

        <label htmlFor="password">
          Contraseña
        </label>

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className={errores.password ? "input-error" : ""}
        />

        {errores.password && (
          <p className="mensaje-error">
            {errores.password}
          </p>
        )}

      </div>


      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Registrando..."
          : "Crear cuenta"}
      </button>


      {/* ERROR DEL BACKEND */}

      {error && (
        <p className="mensaje-error">
          {error}
        </p>
      )}


      {/* ÉXITO */}

      {mensajeExito && (
        <p className="mensaje-exito">
          {mensajeExito}
        </p>
      )}

    </form>
  );
};

export default RegistroUsuarioFormulario;