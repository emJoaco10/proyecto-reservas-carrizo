import React, { useState } from "react";
import useUsuarioAPI from "../hooks/useUsuarioAPI";
import {
  validarNombreUsuario,
  validarApellido,
  validarEmail,
  validarPassword
} from "../helpers/validaciones";
import "../styles/components/Formulario.css";

/**
 * Administra el formulario de registro de usuarios, la validación de sus campos,
 * el envío de los datos y la presentación de los estados de carga, error y éxito.
 * Este componente no recibe props.
 */
const RegistroUsuarioFormulario = () => {

  // useUsuarioAPI proporciona usuario, loading, error y registerUsuario.
  const {
    usuario,
    loading,
    error,
    registerUsuario
  } = useUsuarioAPI();

  // Valores ingresados en los campos del formulario.
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  // Mensajes de validación de cada campo.
  const [errores, setErrores] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: ""
  });

  // Mensaje que se muestra cuando el registro se completa correctamente.
  const [mensajeExito, setMensajeExito] = useState("");

  /** Extrae el campo modificado, actualiza su valor, limpia su error y restablece el éxito. */
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


  /**
   * Ejecuta las validaciones de nombre, apellido, correo y contraseña, actualiza
   * errores y devuelve true si hay algún mensaje de error; de lo contrario, false.
   */
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


  /**
   * Evita el envío tradicional, limpia el éxito y valida los datos. Si son válidos,
   * intenta registrar al usuario; al completarse, muestra el éxito y reinicia campos
   * y errores. Si ocurre una excepción, la registra en la consola.
   */
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

      {/* Formulario con validación propia: noValidate evita la validación nativa del navegador. */}
      <h2>Crear cuenta</h2>


      {/* Campos de nombre, apellido, correo electrónico y contraseña con errores condicionales. */}
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


      {/* El texto refleja loading y el botón se deshabilita durante la carga. */}
      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Registrando..."
          : "Crear cuenta"}
      </button>


      {/* Error proporcionado por useUsuarioAPI. */}

      {error && (
        <p className="mensaje-error">
          {error}
        </p>
      )}


      {/* Muestra mensajeExito cuando contiene un valor. */}

      {mensajeExito && (
        <p className="mensaje-exito">
          {mensajeExito}
        </p>
      )}

    </form>
  );
};

export default RegistroUsuarioFormulario;