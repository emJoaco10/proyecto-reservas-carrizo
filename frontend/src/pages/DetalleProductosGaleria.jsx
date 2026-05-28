import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getProductoById } from '../services/productoService'
import '../styles/pages/DetalleProductosGaleria.css'

/**
 * Componente DetalleProductosGaleria
 * Muestra el detalle completo de un producto obtenido por su ID desde la URL
 * Gestiona estados de carga, error y los datos del producto
 */
const DetalleProductosGaleria = () => {
  // Obtiene el ID del producto de los parámetros de la URL
  const { id } = useParams()

  const location = useLocation()

  const productoDesdeEstado = location.state?.producto
  
  // Estado para almacenar los datos del producto
  const [producto, setProducto] = useState(productoDesdeEstado || null)
  
  // Estado para controlar si se está cargando el producto
  const [loading, setLoading] = useState(productoDesdeEstado ? false : true)
  
  // Estado para almacenar mensajes de error
  const [error, setError] = useState(null)

  /**
   * useEffect: Hook de efecto para cargar el producto cuando cambia el ID
   * Se ejecuta cuando el componente se monta o cuando el ID cambia
   */
  useEffect(() => {
    /**
     * cargarProducto: Función asincrónica que obtiene los datos del producto
     * Maneja la solicitud, éxito y errores del servicio getProductoById
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

  // Renderiza mensaje de carga mientras se obtienen los datos
  if (loading) return <div>Cargando...</div>
  
  // Renderiza mensaje de error si ocurrió algún problema
  if (error) return <div>Error: {error}</div>
  
  // Renderiza mensaje si no se encuentra el producto
  if (!producto) return <div>Producto no encontrado</div>

  // Renderiza el contenido del detalle del producto
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
