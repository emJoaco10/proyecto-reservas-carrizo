import React from 'react';
import '../styles/components/PoliticasProducto.css';

const PoliticasProducto = () => {
  const politicas = [
    {
      titulo: 'Check-in y check-out',
      descripcion:
        'El ingreso y la salida del alojamiento deben realizarse dentro de los horarios establecidos para garantizar una correcta preparación del espacio.'
    },
    {
      titulo: 'Capacidad del alojamiento',
      descripcion:
        'La cantidad de huéspedes debe respetar la capacidad máxima indicada para el alojamiento. No se permite superar el número de personas informado al momento de la reserva.'
    },
    {
      titulo: 'Cuidado del alojamiento',
      descripcion:
        'Se solicita cuidar las instalaciones, muebles y elementos disponibles. Cualquier daño ocasionado durante la estadía deberá ser informado.'
    },
    {
      titulo: 'Ruidos y convivencia',
      descripcion:
        'Se debe mantener un nivel de ruido adecuado para favorecer el descanso y la buena convivencia, especialmente durante los horarios de descanso.'
    },
    {
      titulo: 'Mascotas',
      descripcion:
        'El ingreso de mascotas deberá ser consultado previamente y dependerá de las condiciones particulares del alojamiento.'
    },
    {
      titulo: 'Prohibido fumar',
      descripcion:
        'No está permitido fumar dentro de los espacios interiores del alojamiento. Se deberán utilizar únicamente los sectores habilitados, cuando correspondan.'
    }
  ];

  return (
    <section className="politicas-producto">

      <div className="politicas-producto__header">
        <h2>Políticas</h2>

        <p>
          Información importante para una estadía segura y confortable.
        </p>
      </div>

      <div className="politicas-producto__grid">

        {politicas.map((politica, index) => (
          <article
            key={index}
            className="politica-card"
          >
            <h3>{politica.titulo}</h3>

            <p>{politica.descripcion}</p>
          </article>
        ))}

      </div>

    </section>
  );
};

export default PoliticasProducto;