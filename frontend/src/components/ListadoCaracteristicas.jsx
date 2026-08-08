import { useEffect, useState } from "react";
import useCaracteristicaAPI from "../hooks/useCaracteristicaAPI";
import CaracteristicaCard from "./CaracteristicaCard";
import ConfirmacionModal from "./ConfirmacionModal";
import {useNavigate} from "react-router-dom";
import "../styles/components/ListadoCaracteristicas.css";

const ListadoCaracteristicas = () => {

  const navigate = useNavigate();

  const [caracteristicas, setCaracteristicas] = useState([]);

  const [modalAbierto, setModalAbierto] = useState(false);

  const [caracteristicaSeleccionada, setCaracteristicaSeleccionada] = useState(null);

  const { obtenerCaracteristicas, eliminarCaracteristica } = useCaracteristicaAPI();

  useEffect(() => {

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

    navigate(`/editar-caracteristica/${caracteristica.id}`);

};

  const abrirModalEliminar = (caracteristica) => {

    setCaracteristicaSeleccionada(caracteristica);

    setModalAbierto(true);

  };

  const confirmarEliminar = async () => {

    try {

      await eliminarCaracteristica(caracteristicaSeleccionada.id);

      setCaracteristicas((anteriores) =>
        anteriores.filter(
          (c) => c.id !== caracteristicaSeleccionada.id
        )
      );

      setModalAbierto(false);

      setCaracteristicaSeleccionada(null);

    } catch (error) {

      console.error(error);

    }

  };

  const cancelarEliminar = () => {

    setModalAbierto(false);

    setCaracteristicaSeleccionada(null);

  };

  const asociarProducto = (caracteristica) => {

    navigate(`/asociar-producto-caracteristica/${caracteristica.id}`);

};

  return (

    <section className="bloque">

      <h2>Lista de características</h2>

      <p>
        Aquí podrás administrar las características disponibles para los productos.
      </p>

      <div className="lista-caracteristicas">

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