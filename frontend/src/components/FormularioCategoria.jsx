import { useState, useRef } from "react";
import useCategoriaAPI from "../hooks/useCategoriaAPI";
import "../styles/components/FormularioCategoria.css";

/**
 * Formulario utilizado para crear nuevas categorías.
 *
 * Gestiona los datos del formulario, validaciones, selección de imagen,
 * vista previa y envío de la categoría mediante useCategoriaAPI.
 */
const FormularioCategoria = () => {

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
  });

  const { registerCategoria, loading } = useCategoriaAPI();

  const [imagenPreview, setImagenPreview] = useState("");

  const [mensaje, setMensaje] = useState("");

  const [tipoMensaje, setTipoMensaje] = useState("");

  const inputImagenRef = useRef(null);

  /**
   * Actualiza el campo del formulario que fue modificado.
   *
   * Utiliza el atributo "name" del elemento para identificar
   * qué propiedad debe actualizarse dentro de formData.
   */
  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Valida y envía el formulario para crear una nueva categoría.
   *
   * Antes de realizar la petición verifica que nombre, descripción
   * e imagen estén completos. Si la creación es exitosa, limpia
   * el formulario y la vista previa.
   *
   * También gestiona los errores relacionados con categorías
   * duplicadas y otros errores provenientes de la API.
   */
  const handleSubmit = async (event) => {

    event.preventDefault();

    setMensaje("");
    setTipoMensaje("");

    // Validar los campos obligatorios.
    if (!formData.nombre.trim()) {
      setMensaje(
        "El nombre de la categoría es obligatorio."
      );
      setTipoMensaje("error");
      return;
    }

    if (!formData.descripcion.trim()) {
      setMensaje(
        "La descripción de la categoría es obligatoria."
      );
      setTipoMensaje("error");
      return;
    }

    if (!formData.imagen) {
      setMensaje(
        "Debés seleccionar una imagen para la categoría."
      );
      setTipoMensaje("error");
      return;
    }

    try {

      // Enviar los datos al backend mediante el hook de categorías.
      await registerCategoria(formData);

      setMensaje(
        "Categoría creada correctamente."
      );
      setTipoMensaje("exito");

      // Limpiar los datos del formulario después de crear la categoría.
      setFormData({
        nombre: "",
        descripcion: "",
        imagen: ""
      });

      setImagenPreview("");

      // Limpiar manualmente el input de archivo.
      if (inputImagenRef.current) {
        inputImagenRef.current.value = "";
      }

    } catch (error) {

      console.error(
        "Error al crear la categoría:",
        error
      );

      /*
       * Si el backend informa que el nombre ya existe,
       * se muestra un mensaje específico al usuario.
       */
      if (error.response?.status === 409) {

        setMensaje(
          "Ya existe una categoría con ese nombre."
        );

      } else {

        setMensaje(
          "No se pudo crear la categoría. Intentá nuevamente."
        );
      }

      setTipoMensaje("error");
    }
  };

  /**
   * Procesa la imagen seleccionada por el usuario.
   *
   * Valida el formato y tamaño del archivo, genera una vista previa
   * mediante una Object URL y convierte la imagen a Base64 para
   * almacenarla dentro de formData y enviarla al backend.
   */
  const handleImagenChange = (event) => {

    const archivo = event.target.files[0];

    if (!archivo) {
      return;
    }

    const formatosPermitidos = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    // Validar el formato de la imagen.
    if (!formatosPermitidos.includes(archivo.type)) {

      alert(
        "Formato no válido. Utilizá JPG, PNG o WEBP."
      );

      event.target.value = "";

      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024;

    // Validar que la imagen no supere los 5 MB.
    if (archivo.size > MAX_SIZE) {

      alert(
        "La imagen no puede superar los 5 MB."
      );

      event.target.value = "";

      return;
    }

    /*
     * Crear una Object URL para mostrar inmediatamente
     * una vista previa de la imagen seleccionada.
     */
    const previewUrl =
      URL.createObjectURL(archivo);

    // Liberar la URL anterior antes de crear una nueva.
    if (imagenPreview) {
      URL.revokeObjectURL(imagenPreview);
    }

    setImagenPreview(previewUrl);

    /*
     * Convertir la imagen a Base64 para almacenarla en formData
     * y enviarla posteriormente al backend.
     */
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
        />

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
        />

      </div>

      <div className="campo-formulario">

        <label htmlFor="imagen">
          Imagen
        </label>

        <input
          type="file"
          id="imagen"
          name="imagen"
          accept="image/*"
          onChange={handleImagenChange}
          ref={inputImagenRef}
        />

        {imagenPreview && (

          <div className="imagen-preview">

            <img
              src={imagenPreview}
              alt="Vista previa de la categoría"
            />

          </div>

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
            ? "Creando..."
            : "Crear categoría"}
        </button>

      </div>

    </form>
  );
};

export default FormularioCategoria;