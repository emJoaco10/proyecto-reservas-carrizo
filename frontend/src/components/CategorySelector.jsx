import React, { useEffect } from 'react'
import useProductoAPI from '../hooks/useProductoAPI'
import '../styles/components/CategorySelector.css'

export const CategorySelector = ({
  producto,
  value = '',
  onChange = () => {}
}) => {

  const productoApi = useProductoAPI()

  useEffect(() => {
    productoApi?.fetchCategorias?.()
  }, [])

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
        onChange={(e) => {
          const nuevaCategoriaId = Number(e.target.value)

          // Solo informa al componente padre.
          // La actualización en backend se hará al presionar "Guardar".
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
              key={categoria.id ?? categoria}
              value={categoria.id ?? categoria}
            >
              {categoria.nombre ?? categoria}
            </option>
          ))}
      </select>

    </div>
  )
}