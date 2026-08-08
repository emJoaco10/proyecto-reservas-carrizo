import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCaracteristicaAPI from "../hooks/useCaracteristicaAPI";
import IconSelector from "./IconSelector";
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

  useEffect(() => {

    if (modo === "editar" && caracteristica) {

      setFormData({
        nombre: caracteristica.nombre,
        icono: caracteristica.icono
      });

    }

  }, [modo, caracteristica]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.icono) {

      alert("Debe seleccionar un ícono.");

      return;

    }

    try {

      if (modo === "crear") {

        await registrarCaracteristica(formData);

        alert("Característica creada correctamente.");

        setFormData({
          nombre: "",
          icono: ""
        });

      } else {

        await editarCaracteristica(
          caracteristica.id,
          formData
        );

        alert("Característica actualizada correctamente.");

        navigate("/lista-caracteristicas");

      }

    } catch (error) {

      console.error(error);

      alert(error.message || "Ocurrió un error.");

    }

  };

  return (

    <section className="bloque">

      <form
        className="formulario"
        onSubmit={handleSubmit}
      >

        <h2>

          {modo === "crear"
            ? "Agregar característica"
            : "Editar característica"}

        </h2>

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
          required
        />

        <label>

          Ícono

        </label>

        <IconSelector
          value={formData.icono}
          onChange={handleChange}
        />

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