import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCaracteristicaAPI from "../hooks/useCaracteristicaAPI";
import IconSelector from "./IconSelector";
import {
  validarNombreCaracteristica,
  validarIconoCaracteristica
} from "../helpers/validaciones";
import "../styles/components/Formulario.css";

const FormularioCaracteristicas = ({
  modo = "crear",
  caracteristica = null
}) => {

  const navigate = useNavigate();

  const {
    registrarCaracteristica,
    editarCaracteristica
  } = useCaracteristicaAPI();

  const [formData, setFormData] = useState({
    nombre: "",
    icono: ""
  });

  const [errores, setErrores] = useState({
    nombre: "",
    icono: ""
  });

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  useEffect(() => {

    if (modo === "editar" && caracteristica) {

      setFormData({
        nombre: caracteristica.nombre || "",
        icono: caracteristica.icono || ""
      });

    }

  }, [modo, caracteristica]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrores((prev) => ({
      ...prev,
      [name]: ""
    }));

    setMensaje("");
    setTipoMensaje("");
  };

  const validarFormulario = () => {

    const nuevosErrores = {
      nombre: validarNombreCaracteristica(formData.nombre),
      icono: validarIconoCaracteristica(formData.icono)
    };

    setErrores(nuevosErrores);

    return (
      !nuevosErrores.nombre &&
      !nuevosErrores.icono
    );
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMensaje("");
    setTipoMensaje("");

    const formularioValido = validarFormulario();

    if (!formularioValido) {
      return;
    }

    try {

      if (modo === "crear") {

        await registrarCaracteristica(formData);

        setMensaje(
          "Característica creada correctamente."
        );

        setTipoMensaje("exito");

        setFormData({
          nombre: "",
          icono: ""
        });

      } else {

        await editarCaracteristica(
          caracteristica.id,
          formData
        );

        setMensaje(
          "Característica actualizada correctamente."
        );

        setTipoMensaje("exito");

        navigate("/lista-caracteristicas");

      }

    } catch (error) {

      console.error(
        "Error al guardar característica:",
        error
      );

      setMensaje(
        error.response?.data?.message ||
        error.message ||
        "Ocurrió un error al guardar la característica."
      );

      setTipoMensaje("error");
    }
  };

  return (

    <section className="bloque">

      <form
        className="formulario"
        onSubmit={handleSubmit}
        noValidate
      >

        <h2>
          {modo === "crear"
            ? "Agregar característica"
            : "Editar característica"}
        </h2>

        <div className="campo-formulario">

          <label htmlFor="nombre">
            Nombre
          </label>

          <input
            id="nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingrese el nombre"
            className={
              errores.nombre
                ? "input-error"
                : ""
            }
          />

          {errores.nombre && (
            <p className="mensaje-error">
              {errores.nombre}
            </p>
          )}

        </div>

        <div className="campo-formulario">

          <label>
            Ícono
          </label>

          <IconSelector
            value={formData.icono}
            onChange={handleChange}
          />

          {errores.icono && (
            <p className="mensaje-error">
              {errores.icono}
            </p>
          )}

        </div>

        {mensaje && (
          <div
            className={`mensaje-formulario ${tipoMensaje}`}
          >
            {mensaje}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-filled"
        >

          {modo === "crear"
            ? "Guardar característica"
            : "Guardar cambios"}

        </button>

      </form>

    </section>
  );
};

export default FormularioCaracteristicas;