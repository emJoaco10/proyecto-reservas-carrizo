import { useEffect, useRef, useState } from "react";
import useCategoriaAPI from "../hooks/useCategoriaAPI";
import {
  validarNombreCategoria,
  validarDescripcionCategoria,
  validarImagenCategoria,
  validarArchivoImagen
} from "../helpers/validaciones";
import "../styles/components/FormularioCategoria.css";

const FormularioCategoria = ({
  categoriaInicial = null,
  modoEdicion = false,
  onExito
}) => {

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    imagen: ""
  });

  const {
    registerCategoria,
    editCategoria,
    loading
  } = useCategoriaAPI();

  const [imagenPreview, setImagenPreview] = useState("");

  const [errores, setErrores] = useState({
    nombre: "",
    descripcion: "",
    imagen: ""
  });

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const inputImagenRef = useRef(null);

  /*
   * Cargar los datos de la categoría cuando estamos editando.
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
   * Actualiza el campo modificado.
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
   * Valida todos los campos del formulario.
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
   * Envía la categoría para crear o actualizar.
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
   * Procesa la imagen seleccionada.
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

        {modoEdicion && (
          <small>
            Si no seleccionás una nueva imagen, se conservará la actual.
          </small>
        )}

      </div>

      {mensaje && (
        <div
          className={`mensaje-formulario ${tipoMensaje}`}
        >
          {mensaje}
        </div>
      )}

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