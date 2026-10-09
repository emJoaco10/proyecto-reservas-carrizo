import { useEffect, useRef, useState } from "react";
import useCategoriaAPI from "../hooks/useCategoriaAPI";
import {
  validarNombreCategoria,
  validarDescripcionCategoria,
  validarImagenCategoria,
  validarArchivoImagen
} from "../helpers/validaciones";
import "../styles/components/FormularioCategoria.css";

/**
 * Permite crear o editar una categoría mediante un formulario con nombre,
 * descripción e imagen.
 * @param {Object|null} props.categoriaInicial Datos de la categoría usados al editar; por defecto, `null`.
 * @param {boolean} props.modoEdicion Indica si el formulario funciona en modo edición; por defecto, `false`.
 * @param {Function} [props.onExito] Función opcional invocada tras una operación exitosa, que recibe el resultado obtenido.
 */
const FormularioCategoria = ({
  categoriaInicial = null,
  modoEdicion = false,
  onExito
}) => {

  // Datos editables del formulario: nombre, descripción e imagen.
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    imagen: ""
  });

  // Operaciones para crear o editar categorías y estado de carga de la API.
  const {
    registerCategoria,
    editCategoria,
    loading
  } = useCategoriaAPI();

  // URL utilizada para mostrar la vista previa de la imagen.
  const [imagenPreview, setImagenPreview] = useState("");

  // Mensajes de validación asociados a cada campo.
  const [errores, setErrores] = useState({
    nombre: "",
    descripcion: "",
    imagen: ""
  });

  // Mensaje informativo y clasificación visual del resultado.
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  // Referencia al selector de archivos para poder acceder a su valor.
  const inputImagenRef = useRef(null);

  /*
   * En modo edición, carga los datos de la categoría inicial y establece su
   * imagen como vista previa.
   */
  useEffect(() => {

    if (!modoEdicion || !categoriaInicial) {
      return;
    }

    setFormData({
      nombre: categoriaInicial.nombre || "",
      descripcion: categoriaInicial.descripcion || "",
      imagen: categoriaInicial.imagen || ""
    });

    setImagenPreview(categoriaInicial.imagen || "");

  }, [modoEdicion, categoriaInicial]);

  /**
   * Actualiza el campo modificado, limpia su error y restablece los mensajes generales.
   * @param {Event} event Evento de cambio del campo.
   */
  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Limpiamos el error del campo que el usuario está corrigiendo.
    setErrores((prev) => ({
      ...prev,
      [name]: ""
    }));

    setMensaje("");
    setTipoMensaje("");
  };

  /**
   * Valida nombre, descripción e imagen, actualiza los errores y devuelve si el formulario es válido.
   * @returns {boolean} Indica si no hay errores de validación.
   */
  const validarFormulario = () => {

    const nuevosErrores = {
      nombre: validarNombreCategoria(formData.nombre),
      descripcion: validarDescripcionCategoria(
        formData.descripcion
      ),
      imagen: validarImagenCategoria(formData.imagen)
    };

    setErrores(nuevosErrores);

    return (
      !nuevosErrores.nombre &&
      !nuevosErrores.descripcion &&
      !nuevosErrores.imagen
    );
  };

  /**
   * Evita el envío predeterminado, limpia mensajes, valida los datos y crea o edita la categoría.
   * En edición, llama a `editCategoria` con el identificador inicial y los datos del formulario;
   * en creación, llama a `registerCategoria` y restablece los campos, la vista previa y el input de imagen.
   * Tras el éxito, establece el tipo de mensaje e invoca `onExito` con el resultado si está disponible.
   * Si ocurre un error, lo registra en consola y muestra un mensaje específico para HTTP 409 o uno
   * general según el modo de operación.
   * @param {Event} event Evento de envío del formulario.
   */
  const handleSubmit = async (event) => {

    event.preventDefault();

    setMensaje("");
    setTipoMensaje("");

    const formularioValido = validarFormulario();

    if (!formularioValido) {
      return;
    }

    try {

      let resultado;

      if (modoEdicion) {

        resultado = await editCategoria(
          categoriaInicial.id,
          formData
        );

        setMensaje(
          "Categoría actualizada correctamente."
        );

      } else {

        resultado = await registerCategoria(formData);

        setMensaje(
          "Categoría creada correctamente."
        );

        setFormData({
          nombre: "",
          descripcion: "",
          imagen: ""
        });

        setImagenPreview("");

        if (inputImagenRef.current) {
          inputImagenRef.current.value = "";
        }
      }

      setTipoMensaje("exito");

      if (onExito) {
        onExito(resultado);
      }

    } catch (error) {

      console.error(
        modoEdicion
          ? "Error al actualizar la categoría:"
          : "Error al crear la categoría:",
        error
      );

      if (error.response?.status === 409) {

        setMensaje(
          "Ya existe una categoría con ese nombre."
        );

      } else {

        setMensaje(
          modoEdicion
            ? "No se pudo actualizar la categoría. Intentá nuevamente."
            : "No se pudo crear la categoría. Intentá nuevamente."
        );
      }

      setTipoMensaje("error");
    }
  };

  /**
   * Procesa la imagen seleccionada: obtiene el archivo y lo valida con `validarArchivoImagen`.
   * Si no hay archivo, no continúa; si no supera la validación, actualiza el error y limpia el input.
   * Para un archivo válido, limpia el error de imagen y los mensajes anteriores, crea una URL temporal
   * y revoca la vista previa anterior si es una URL `blob:` antes de actualizar `imagenPreview`.
   * Lee el archivo con `FileReader` y actualiza `formData.imagen` cuando se dispara `reader.onload`.
   * @param {Event} event Evento de cambio del selector de archivos.
   */
  const handleImagenChange = (event) => {

    const archivo = event.target.files[0];

    if (!archivo) {
      return;
    }

    const errorImagen = validarArchivoImagen(archivo);

    if (errorImagen) {

      setErrores((prev) => ({
        ...prev,
        imagen: errorImagen
      }));

      event.target.value = "";

      return;
    }

    // Si la imagen es válida, eliminamos el error.
    setErrores((prev) => ({
      ...prev,
      imagen: ""
    }));

    setMensaje("");
    setTipoMensaje("");

    const previewUrl =
      URL.createObjectURL(archivo);

    if (
      imagenPreview &&
      imagenPreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(imagenPreview);
    }

    setImagenPreview(previewUrl);

    const reader = new FileReader();

    reader.onload = () => {

      setFormData((prev) => ({
        ...prev,
        imagen: reader.result
      }));
    };

    reader.readAsDataURL(archivo);
  };

  return (
    <form
      className="formulario-categoria"
      onSubmit={handleSubmit}
      noValidate
    >

      {/* `noValidate` deja la validación a cargo de la lógica del componente. */}
      {/* Campos de nombre y descripción con sus respectivos mensajes de error. */}
      <div className="campo-formulario">

        <label htmlFor="nombre">
          Nombre
        </label>

        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ingrese el nombre de la categoría"
          className={errores.nombre ? "input-error" : ""}
        />

        {errores.nombre && (
          <p className="mensaje-error">
            {errores.nombre}
          </p>
        )}

      </div>

      <div className="campo-formulario">

        <label htmlFor="descripcion">
          Descripción
        </label>

        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Ingrese una descripción de la categoría"
          rows="4"
          className={errores.descripcion ? "input-error" : ""}
        />

        {errores.descripcion && (
          <p className="mensaje-error">
            {errores.descripcion}
          </p>
        )}

      </div>

      {/* Selector de imagen, validación del archivo y vista previa. */}
      <div className="campo-formulario">

        <label htmlFor="imagen">
          Imagen
        </label>

        <input
          type="file"
          id="imagen"
          name="imagen"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImagenChange}
          ref={inputImagenRef}
          className={errores.imagen ? "input-error" : ""}
        />

        {errores.imagen && (
          <p className="mensaje-error">
            {errores.imagen}
          </p>
        )}

        {imagenPreview && (

          <div className="imagen-preview">

            <img
              src={imagenPreview}
              alt="Vista previa de la categoría"
            />

          </div>

        )}

        {/* En edición, se informa que la imagen actual se conserva si no se selecciona otra. */}
        {modoEdicion && (
          <small>
            Si no seleccionás una nueva imagen, se conservará la actual.
          </small>
        )}

      </div>

      {/* Presenta el mensaje de resultado solo cuando hay contenido. */}
      {mensaje && (
        <div
          className={`mensaje-formulario ${tipoMensaje}`}
        >
          {mensaje}
        </div>
      )}

      {/* Envío deshabilitado durante la carga, con texto según el modo y el estado. */}
      <div className="acciones-formulario">

        <button
          type="submit"
          className="btn btn-filled"
          disabled={loading}
        >
          {loading
            ? modoEdicion
              ? "Guardando..."
              : "Creando..."
            : modoEdicion
              ? "Guardar cambios"
              : "Crear categoría"}
        </button>

      </div>

    </form>
  );
};

export default FormularioCategoria;