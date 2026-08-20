import { useState, useRef } from "react";
import useCategoriaAPI from "../hooks/useCategoriaAPI";
import "../styles/components/FormularioCategoria.css";

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

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    setMensaje("");
    setTipoMensaje("");

    if (!formData.nombre.trim()) {
      setMensaje("El nombre de la categoría es obligatorio.");
      setTipoMensaje("error");
      return;
    }

    if (!formData.descripcion.trim()) {
      setMensaje("La descripción de la categoría es obligatoria.");
      setTipoMensaje("error");
      return;
    }

    if (!formData.imagen) {
      setMensaje("Debés seleccionar una imagen para la categoría.");
      setTipoMensaje("error");
      return;
    }

    try {

      await registerCategoria(formData);

      setMensaje("Categoría creada correctamente.");
      setTipoMensaje("exito");

      setFormData({
        nombre: "",
        descripcion: "",
        imagen: ""
      });

      setImagenPreview("");

      if (inputImagenRef.current) {
        inputImagenRef.current.value = "";
      }

    } catch (error) {

      console.error(
        "Error al crear la categoría:",
        error
      );

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

    if (!formatosPermitidos.includes(archivo.type)) {

      alert(
        "Formato no válido. Utilizá JPG, PNG o WEBP."
      );

      event.target.value = "";

      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024;

    if (archivo.size > MAX_SIZE) {

      alert("La imagen no puede superar los 5 MB.");

      event.target.value = "";

      return;
    }

    // Preview inmediato de la imagen seleccionada
    const previewUrl = URL.createObjectURL(archivo);

    if (imagenPreview) {
      URL.revokeObjectURL(imagenPreview);
    }

    setImagenPreview(previewUrl);

    // Conversión de la imagen a Base64
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
    <form className="formulario-categoria"
      onSubmit={handleSubmit}>

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
        <div className={`mensaje-formulario ${tipoMensaje}`}>
          {mensaje}
        </div>
      )}

      <div className="acciones-formulario">

        <button
          type="submit"
          className="btn btn-filled"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear categoría"}
        </button>

      </div>

    </form>
  );
};

export default FormularioCategoria;