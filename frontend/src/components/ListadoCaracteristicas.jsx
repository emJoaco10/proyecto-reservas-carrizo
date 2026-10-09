import { useEffect, useState } from "react";
import useCaracteristicaAPI from "../hooks/useCaracteristicaAPI";
import CaracteristicaCard from "./CaracteristicaCard";
import ConfirmacionModal from "./ConfirmacionModal";
import {useNavigate} from "react-router-dom";
import "../styles/components/ListadoCaracteristicas.css";

/**
 * Lista y permite administrar las características disponibles para los productos.
 * No recibe props.
 */
const ListadoCaracteristicas = () => {

  // Permite navegar programáticamente a las rutas de edición y asociación.
  const navigate = useNavigate();

  // Almacena la lista de características obtenidas.
  const [caracteristicas, setCaracteristicas] = useState([]);

  // Controla la visibilidad del modal de confirmación.
  const [modalAbierto, setModalAbierto] = useState(false);

  // Almacena la característica seleccionada para eliminar.
  const [caracteristicaSeleccionada, setCaracteristicaSeleccionada] = useState(null);

  // El hook proporciona las operaciones para obtener y eliminar características.
  const { obtenerCaracteristicas, eliminarCaracteristica } = useCaracteristicaAPI();

  // Ejecuta la carga al montarse y cuando cambia la dependencia obtenerCaracteristicas.
  useEffect(() => {

    // Consulta los datos de forma asíncrona, actualiza el estado y registra errores en consola.
    const fetchCaracteristicas = async () => {

      try {

        const data = await obtenerCaracteristicas();

        setCaracteristicas(data);

      } catch (error) {

        console.error(
          "Error al obtener las características:",
          error
        );

      }

    };

    fetchCaracteristicas();

  }, [obtenerCaracteristicas]);

  const editarCaracteristica = (caracteristica) => {

    // Navega a la ruta de edición correspondiente al identificador recibido.
    navigate(`/editar-caracteristica/${caracteristica.id}`);

};

  const abrirModalEliminar = (caracteristica) => {

    // Guarda la característica elegida y abre el modal de confirmación.
    setCaracteristicaSeleccionada(caracteristica);

    setModalAbierto(true);

  };

  const confirmarEliminar = async () => {

    try {

      // Solicita la eliminación y, si tiene éxito, filtra la lista local y cierra el modal.
      await eliminarCaracteristica(caracteristicaSeleccionada.id);

      setCaracteristicas((anteriores) =>
        anteriores.filter(
          (c) => c.id !== caracteristicaSeleccionada.id
        )
      );

      setModalAbierto(false);

      setCaracteristicaSeleccionada(null);

    } catch (error) {

      // Registra en consola los errores de la operación de eliminación.
      console.error(error);

    }

  };

  const cancelarEliminar = () => {

    // Cierra el modal y limpia la característica seleccionada.
    setModalAbierto(false);

    setCaracteristicaSeleccionada(null);

  };

  const asociarProducto = (caracteristica) => {

    // Navega a la ruta para asociar un producto con la característica indicada.
    navigate(`/asociar-producto-caracteristica/${caracteristica.id}`);

};

  return (

    <section className="bloque">

      {/* Título de la sección y texto descriptivo de la administración de características. */}
      <h2>Lista de características</h2>

      <p>
        Aquí podrás administrar las características disponibles para los productos.
      </p>

      <div className="lista-caracteristicas">

        {/* Genera una tarjeta por característica y le pasa callbacks para editar, eliminar y asociar. */}
        {caracteristicas.map((caracteristica) => (

          <CaracteristicaCard
            key={caracteristica.id}
            caracteristica={caracteristica}
            onEditar={editarCaracteristica}
            onEliminar={abrirModalEliminar}
            onAsociar={asociarProducto}
          />

        ))}

      </div>

        {/* Modal configurable con callbacks para confirmar o cancelar la eliminación.
          El mensaje usa el nombre seleccionado mediante encadenamiento opcional. */}
      <ConfirmacionModal

        abierto={modalAbierto}

        titulo="Eliminar característica"

        mensaje={`¿Desea eliminar la característica "${caracteristicaSeleccionada?.nombre}"?`}

        textoConfirmar="Eliminar"

        textoCancelar="Cancelar"

        onConfirmar={confirmarEliminar}

        onCancelar={cancelarEliminar}

        claseBotonConfirmar="btn btn-danger"

      />

    </section>

  );

};

export default ListadoCaracteristicas;