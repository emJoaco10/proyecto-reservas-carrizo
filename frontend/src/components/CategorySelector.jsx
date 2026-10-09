import React, { useEffect } from 'react'
import useProductoAPI from '../hooks/useProductoAPI'
import '../styles/components/CategorySelector.css'

/**
 * Muestra un selector de categorías para un producto y comunica al componente
 * padre la categoría elegida.
 *
 * @param {Object} props
 * @param {*} props.producto Referencia al producto recibido por el componente.
 * @param {string|number} [props.value=''] Valor seleccionado en el selector.
 * @param {(categoriaId: number) => void} [props.onChange=() => {}] Función que recibe el identificador numérico de la categoría seleccionada.
 */
export const CategorySelector = ({
  producto,
  value = '',
  onChange = () => {}
}) => {

  const productoApi = useProductoAPI()

  // Intenta solicitar las categorías al montar, si la API y el método están disponibles.
  useEffect(() => {
    productoApi?.fetchCategorias?.()
  }, [])

  // Obtiene el estado de categorías y carga, con valores alternativos para la lista y la API.
  const {
    categorias = [],
    loading,
    error,
  } = productoApi ?? {}

  return (
    <div className="category-selector">

      {/* Etiqueta asociada al selector de categorías. */}
      <label htmlFor="category-select">
        Categoría
      </label>

      {/* Selector controlado por value; queda deshabilitado durante la carga o si hay un error. */}
      <select
        id="category-select"
        value={value}
        onChange={(e) => {
          // Convierte la selección a número antes de comunicarla al componente padre.
          const nuevaCategoriaId = Number(e.target.value)

          // Solo informa al componente padre; el backend se actualizará al presionar «Guardar».
          onChange(nuevaCategoriaId)
        }}
        disabled={loading || !!error}
      >

        {/* La opción inicial muestra un texto distinto mientras se cargan las categorías. */}
        <option value="" disabled>
          {loading
            ? 'Cargando categorías...'
            : '-- Seleccionar categoría --'}
        </option>

        {/* Informa del error únicamente cuando la carga ya no está activa. */}
        {error && !loading && (
          <option value="" disabled>
            Error cargando categorías
          </option>
        )}

        {/* Construye una opción por categoría, usando el objeto como alternativa a sus campos. */}
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