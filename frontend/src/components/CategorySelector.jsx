import React, { useEffect } from 'react'
import useProductoAPI from '../hooks/useProductoAPI'
import '../styles/components/CategorySelector.css'

/**
 * Selector utilizado para mostrar las categorías disponibles
 * y asociar una categoría al producto seleccionado.
 *
 * Las categorías se obtienen mediante useProductoAPI.
 * Al seleccionar una categoría, se actualiza primero la asociación
 * mediante el endpoint correspondiente y luego se informa el cambio
 * al componente padre mediante onChange.
 */
export const CategorySelector = ({
  producto,
  value = '',
  onChange = () => {}
}) => {

  const productoApi = useProductoAPI()

  /**
   * Carga las categorías disponibles cuando se monta el componente.
   */
  useEffect(() => {
    productoApi?.fetchCategorias?.()
  }, [productoApi])

  const {
    categorias = [],
    loading,
    error,
  } = productoApi ?? {}

  return (
    <div className="category-selector">

      <label htmlFor="category-select">
        Categoría
      </label>

      <select
        id="category-select"
        value={value}
        onChange={async (e) => {

          /*
           * Convierte el valor seleccionado a número, actualiza
           * la asociación del producto en el backend y luego
           * notifica al componente padre.
           */
          const nuevaCategoriaId =
            Number(e.target.value)

          await productoApi?.setCategoriaProducto?.(
            producto.id,
            nuevaCategoriaId
          )

          onChange(nuevaCategoriaId)
        }}
        disabled={loading || !!error}
      >

        <option value="" disabled>
          {loading
            ? 'Cargando categorías...'
            : '-- Seleccionar categoría --'}
        </option>

        {error && !loading && (
          <option value="" disabled>
            Error cargando categorías
          </option>
        )}

        {!error &&
          categorias.map((categoria) => (
            <option
              key={
                categoria.id ?? categoria
              }
              value={
                categoria.id ?? categoria
              }
            >
              {categoria.nombre ?? categoria}
            </option>
          ))}
      </select>

    </div>
  )
}