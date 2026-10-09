// useEffect y useState gestionan el efecto de carga y los estados locales.
import React, { useEffect, useState } from 'react'
// useParams obtiene el identificador de la ruta y useLocation permite consultar el estado de navegación.
import { useParams, useLocation } from 'react-router-dom'
// Servicio que consulta un producto mediante su identificador.
import { getProductoById } from '../services/productoService'
// Estilos específicos de esta página.
import '../styles/pages/DetalleProductosGaleria.css'

/**
 * Componente DetalleProductosGaleria
 * Muestra el nombre, la descripción y una galería de imágenes del producto.
 * Obtiene el identificador con useParams y revisa con useLocation si la
 * navegación proporcionó el producto. Si no lo recibió y existe un ID, intenta
 * obtenerlo mediante getProductoById. Gestiona la carga, los errores y la
 * ausencia de datos del producto.
 */
const DetalleProductosGaleria = () => {
  // Identificador del producto indicado en los parámetros de la ruta.
  const { id } = useParams()

  const location = useLocation()

  // Producto recibido opcionalmente mediante el estado de navegación.
  const productoDesdeEstado = location.state?.producto
  
  // Datos que se mostrarán; inicialmente reutiliza el producto recibido por navegación, si existe.
  const [producto, setProducto] = useState(productoDesdeEstado || null)
  
  // Carga inicial, determinada por la disponibilidad del producto en la navegación.
  const [loading, setLoading] = useState(productoDesdeEstado ? false : true)
  
  // Mensaje de error capturado durante la consulta, si ocurre.
  const [error, setError] = useState(null)

  /**
  * Evalúa la carga al montar el componente y cuando cambian sus dependencias.
  * Solo consulta si no hay un producto recibido por navegación y existe un ID.
  * Dependencias: [id, productoDesdeEstado].
   */
  useEffect(() => {
    /**
    * Consulta getProductoById de forma asíncrona. Activa la carga antes de la
    * solicitud, guarda el resultado en producto si tiene éxito, captura las
    * excepciones y guarda err.message en error; finally desactiva la carga.
     */
    if (!productoDesdeEstado && id) {
      const cargarProducto = async () => {
        try {
          setLoading(true)
          const data = await getProductoById(id)
          setProducto(data)
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }
      cargarProducto()
    }
  }, [id, productoDesdeEstado])

  // Estado previo: muestra el indicador mientras loading sea verdadero.
  if (loading) return <div>Cargando...</div>
  
  // Estado previo: muestra el mensaje si existe un error.
  if (error) return <div>Error: {error}</div>
  
  // Estado previo: informa que no hay un producto para mostrar.
  if (!producto) return <div>Producto no encontrado</div>

  // Vista principal: el contenedor reúne el nombre, la descripción y la galería.
  // La imagen principal usa la primera imagen o una cadena vacía. Array.from
  // genera cuatro imágenes secundarias; cada posición usa la imagen siguiente
  // y recurre a la primera cuando no existe. Los textos alt incluyen el nombre.
  return (
    <div className="detalle-galeria">
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>

      <div className="galeria">
        <div className="imagen-principal">
          <img
        src={producto.imagenes?.[0] || ''}
        alt={`Imagen principal de ${producto.nombre}`}
        />
        </div>
        <div className="imagenes-secundarias">
         {Array.from({ length: 4 }, (_, i) => (
        <img
          key={i}
          src={producto.imagenes?.[i + 1] || producto.imagenes?.[0] || ''}
          alt={`Imagen ${i + 2} de ${producto.nombre}`}
        />
         ))}
        </div>
      </div>
    </div>
  )
}

export default DetalleProductosGaleria
