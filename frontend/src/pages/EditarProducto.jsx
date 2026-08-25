import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useProductoAPI from '../hooks/useProductoAPI'
import { CategorySelector } from '../components/CategorySelector'
import '../styles/pages/EditarProducto.css'

/**
 * Página encargada de cargar y editar la información de un producto.
 *
 * Actualmente permite consultar un producto mediante su ID y modificar
 * su categoría. La actualización se realiza mediante useProductoAPI.
 */
export const EditarProducto = () => {
  const { id } = useParams()
  const { fetchProductoById, editProducto } = useProductoAPI()

  const [producto, setProducto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /**
   * Carga el producto correspondiente al ID recibido en la URL.
   *
   * Se ejecuta cuando cambia el ID del producto. Mientras se realiza
   * la consulta se mantiene el estado de carga y, si ocurre un error,
   * se muestra el mensaje correspondiente.
   */
  useEffect(() => {
    if (!id) return

    const cargarProducto = async () => {
      setLoading(true)
      setError(null)

      try {
        const resultado = await fetchProductoById(id)
        setProducto(resultado)
      } catch (err) {
        setError(
          'No se pudo cargar el producto. Intenta nuevamente.'
        )
      } finally {
        setLoading(false)
      }
    }

    cargarProducto()
  }, [id])

  /**
   * Guarda los cambios realizados sobre el producto.
   *
   * Antes de enviarlos verifica que exista un producto y que tenga
   * nombre y descripción. Luego utiliza editProducto() para actualizar
   * la información en el backend.
   */
  const handleGuardar = async () => {
    if (!id || !producto) return

    if (!producto.nombre || !producto.descripcion) {
      alert(
        "El producto debe tener nombre y descripción antes de guardar"
      )
      return
    }

    const actualizado =
      await editProducto(id, producto)

    if (actualizado) {
      console.log(
        "Producto actualizado en backend:",
        actualizado
      )

      alert(
        "Producto actualizado correctamente"
      )
    }
  }

  return (
    <div className="editar-producto">

      <h2 className="editar-producto__title">
        Edición de productos
      </h2>

      {error && (
        <p className="error-message editar-producto__error-message">
          {error}
        </p>
      )}

      {loading ? (

        <p className="loading-message editar-producto__loading-message">
          Cargando producto...
        </p>

      ) : producto ? (

        <div className="editar-producto__detalle">

          <p className="editar-producto__producto-nombre">
            Producto: {producto.nombre || producto.name}
          </p>

          <p className="editar-producto__producto-id">
            ID: {producto.id || id}
          </p>

          <button
            className="editar-producto__guardar-button"
            type="button"
            onClick={handleGuardar}
          >
            Guardar
          </button>

        </div>

      ) : (

        !error && (
          <p className="editar-producto__not-found">
            No se encontró el producto.
          </p>
        )

      )}

      <div className="editar-producto__category-selector">

        <CategorySelector
          producto={producto}
          value={producto?.categoria?.id || ''}
          onChange={(categoriaID) => {

            /*
             * Actualiza el estado local del producto con la categoría
             * seleccionada. La modificación se envía al backend
             * cuando se ejecuta handleGuardar().
             */
            setProducto({
              ...producto,
              nombre: producto.nombre ?? "",
              descripcion: producto.descripcion ?? "",
              categoria: {
                id: categoriaID
              }
            })
          }}
        />

      </div>

      <div className="edit-product-fields editar-producto__fields">
        {/* Espacio reservado para futuros campos de edición. */}
      </div>

    </div>
  )
}