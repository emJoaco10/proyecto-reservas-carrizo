import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCaracteristicaAPI from "../hooks/useCaracteristicaAPI";
import IconSelector from "./IconSelector";
import {
  validarNombreCaracteristica,
  validarIconoCaracteristica
} from "../helpers/validaciones";
import "../styles/components/Formulario.css";

/**
 * Permite crear o editar una característica mediante un formulario de nombre e icono.
 * @param {Object} props Propiedades del componente.
 * @param {"crear"|"editar"} [props.modo="crear"] Determina si el formulario crea o edita una característica.
 * @param {Object|null} [props.caracteristica=null] Datos de la característica que se va a editar.
 */
const FormularioCaracteristicas = ({
  modo = "crear",
  caracteristica = null
}) => {

  // Permite navegar a la lista de características después de una edición exitosa.
  const navigate = useNavigate();

  // Operaciones del hook para registrar o editar características.
  const {
    registrarCaracteristica,
    editarCaracteristica
  } = useCaracteristicaAPI();

  // Nombre e icono ingresados en el formulario.
  const [formData, setFormData] = useState({
    nombre: "",
    icono: ""
  });

  // Mensajes de validación asociados a cada campo.
  const [errores, setErrores] = useState({
    nombre: "",
    icono: ""
  });

  // Mensaje y tipo que informan el resultado de la operación.
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  // Inicializa el formulario con los datos recibidos por propiedades al editar.
  // Si el nombre o el icono no están disponibles, utiliza una cadena vacía.
  useEffect(() => {

    if (modo === "editar" && caracteristica) {

      setFormData({
        nombre: caracteristica.nombre || "",
        icono: caracteristica.icono || ""
      });

    }

  }, [modo, caracteristica]);

  /**
   * Actualiza el campo modificado, limpia su error y restablece los mensajes generales.
   * @param {Event} e Evento de cambio del campo.
   */
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

  /**
   * Valida el nombre y el icono, actualiza los errores y señala si ambos son válidos.
   * @returns {boolean} Indica si los dos campos superaron sus validaciones.
   */
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

  /**
   * Evita el envío predeterminado, limpia mensajes previos y valida los datos antes de operar.
   * En creación registra la característica mediante el hook, informa el éxito y restablece los campos.
   * En edición actualiza mediante el hook usando el identificador y los datos del formulario,
   * informa el éxito y navega a la lista de características.
   * Si ocurre un error, lo registra en consola y muestra el mensaje de la respuesta, del error
   * o el texto alternativo definido para ese caso.
   * @param {Event} e Evento de envío del formulario.
   * @returns {Promise<void>} Promesa que finaliza al completar el procesamiento del envío.
   */
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

      {/* Formulario de creación o edición; noValidate deja la validación a la lógica del componente. */}
      <form
        className="formulario"
        onSubmit={handleSubmit}
        noValidate
      >

        {/* El encabezado indica el modo actual del formulario. */}
        <h2>
          {modo === "crear"
            ? "Agregar característica"
            : "Editar característica"}
        </h2>

        {/* Campo de nombre y, si corresponde, su mensaje de error. */}
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

        {/* Selector de iconos y, si corresponde, su mensaje de error. */}
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

        {/* Presenta condicionalmente el resultado de la operación. */}
        {mensaje && (
          <div
            className={`mensaje-formulario ${tipoMensaje}`}
          >
            {mensaje}
          </div>
        )}

        {/* El texto del botón distingue entre guardar una creación y una edición. */}
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