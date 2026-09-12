import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useProductoAPI from '../hooks/useProductoAPI'
import { CategorySelector } from '../components/CategorySelector'
import {
  validarNombre,
  validarDescripcion
} from '../helpers/validaciones'
import {
  filesToObjectURLs,
  revokeObjectURLs
} from '../helpers/imageUtils'
import '../styles/pages/EditarProducto.css'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp'
]
const MAX_FILES = 10

/**
 * Página encargada de cargar y editar la información de un producto.
 *
 * Permite modificar:
 * - Nombre
 * - Descripción
 * - Categoría
 * - Imágenes
 */
export const EditarProducto = () => {

  const { id } = useParams()

  const {
    fetchProductoById,
    editProducto
  } = useProductoAPI()

  const [producto, setProducto] = useState(null)
  const [loading, setLoading] = useState(true)

  // Error general de carga/API
  const [error, setError] = useState(null)

  // Errores específicos de cada campo
  const [errores, setErrores] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    imagenes: ''
  })

  const [imagenesFiles, setImagenesFiles] = useState([])
  const [previews, setPreviews] = useState([])


  /**
   * Carga el producto correspondiente al ID recibido.
   */
  useEffect(() => {

    if (!id) return

    const cargarProducto = async () => {

      setLoading(true)
      setError(null)

      try {

        const resultado =
          await fetchProductoById(id)

        setProducto(resultado)

      } catch (err) {

        console.error(
          '[EditarProducto] Error al cargar producto:',
          err
        )

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
   * Genera las previsualizaciones de las nuevas imágenes.
   */
  useEffect(() => {

    if (
      !imagenesFiles ||
      imagenesFiles.length === 0
    ) {

      setPreviews([])
      return
    }

    const urls = filesToObjectURLs(
      imagenesFiles,
      {
        maxSize: MAX_FILE_SIZE,
        allowedTypes: ALLOWED_TYPES
      },
      (err) => {

        setErrores((prev) => ({
          ...prev,
          imagenes:
            err.message ||
            'Error procesando imágenes'
        }))

      }
    )

    setPreviews(urls)

    return () => {
      revokeObjectURLs(urls)
    }

  }, [imagenesFiles])


  /**
   * Convierte un archivo en Base64.
   */
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {

      const reader = new FileReader()

      reader.onloadend = () =>
        resolve(reader.result)

      reader.onerror = reject

      reader.readAsDataURL(file)

    })


  /**
   * Procesa las imágenes seleccionadas.
   */
  const handleImagenes = (e) => {

    const files = Array.from(
      e.target.files || []
    )

    // No se seleccionaron archivos
    if (files.length === 0) {

      setImagenesFiles([])
      setPreviews([])

      setErrores((prev) => ({
        ...prev,
        imagenes: ''
      }))

      return
    }


    // Cantidad máxima
    if (files.length > MAX_FILES) {

      setErrores((prev) => ({
        ...prev,
        imagenes:
          `Podés subir hasta ${MAX_FILES} imágenes por producto.`
      }))

      return
    }


    // Formato
    const invalidType = files.find(
      (file) =>
        !ALLOWED_TYPES.includes(file.type)
    )

    if (invalidType) {

      setErrores((prev) => ({
        ...prev,
        imagenes:
          `Formato no permitido: ${invalidType.name}`
      }))

      return
    }


    // Tamaño
    const tooLarge = files.find(
      (file) =>
        file.size > MAX_FILE_SIZE
    )

    if (tooLarge) {

      setErrores((prev) => ({
        ...prev,
        imagenes:
          `La imagen "${tooLarge.name}" supera el límite de 5MB.`
      }))

      return
    }


    // Todo correcto
    setErrores((prev) => ({
      ...prev,
      imagenes: ''
    }))

    setImagenesFiles(files)
  }


  /**
   * Guarda los cambios realizados sobre el producto.
   */
  const handleGuardar = async () => {

    if (!id || !producto) {
      return
    }


    // ==========================================
    // VALIDACIONES
    // ==========================================

    const nuevosErrores = {
      nombre: '',
      descripcion: '',
      categoria: '',
      imagenes: ''
    }


    // Nombre
    const errorNombre =
      validarNombre(producto.nombre)

    if (errorNombre) {
      nuevosErrores.nombre = errorNombre
    }


    // Descripción
    const errorDescripcion =
      validarDescripcion(producto.descripcion)

    if (errorDescripcion) {
      nuevosErrores.descripcion =
        errorDescripcion
    }


    // Categoría
    if (!producto.categoria?.id) {

      nuevosErrores.categoria =
        'La categoría es obligatoria.'
    }


    // Cantidad total de imágenes
    const cantidadImagenesActuales =
      producto.imagenes?.length || 0

    const cantidadNuevas =
      imagenesFiles.length

    if (
      cantidadImagenesActuales +
      cantidadNuevas >
      MAX_FILES
    ) {

      nuevosErrores.imagenes =
        `Un producto puede tener como máximo ${MAX_FILES} imágenes.`
    }


    // Si existen errores, mostrarlos
    if (
      Object.values(nuevosErrores)
        .some(Boolean)
    ) {

      setErrores(nuevosErrores)
      return
    }


    // Limpiar errores
    setErrores({
      nombre: '',
      descripcion: '',
      categoria: '',
      imagenes: ''
    })


    try {

      // ==========================================
      // PREPARAR IMÁGENES
      // ==========================================

      let imagenesActualizadas =
        producto.imagenes || []


      if (imagenesFiles.length > 0) {

        const nuevasImagenes =
          await Promise.all(
            imagenesFiles.map(fileToBase64)
          )

        imagenesActualizadas = [
          ...imagenesActualizadas,
          ...nuevasImagenes
        ]
      }


      // ==========================================
      // PRODUCTO A GUARDAR
      // ==========================================

      const productoParaGuardar = {
        ...producto,
        imagenes: imagenesActualizadas
      }


      // ==========================================
      // ACTUALIZAR
      // ==========================================

      const actualizado =
        await editProducto(
          id,
          productoParaGuardar
        )


      if (actualizado) {

        setProducto(actualizado)

        setImagenesFiles([])

        setPreviews([])

        alert(
          'Producto actualizado correctamente'
        )
      }

    } catch (err) {

      console.error(
        'Error al actualizar producto:',
        err
      )

      setError(
        'No se pudo actualizar el producto.'
      )
    }
  }


  return (
    <div className="editar-producto">

      {/* ====================================== */}
      {/* ENCABEZADO */}
      {/* ====================================== */}

      <div className="editar-producto__header">

        <h2 className="editar-producto__title">
          Edición de producto
        </h2>

        <p className="editar-producto__subtitle">
          Modificá la información del producto y guardá los cambios.
        </p>

      </div>


      {/* ====================================== */}
      {/* ERROR GENERAL */}
      {/* ====================================== */}

      {error && (

        <div
          className="editar-producto__error-message"
          aria-live="assertive"
        >
          {error}
        </div>

      )}


      {/* ====================================== */}
      {/* CARGANDO */}
      {/* ====================================== */}

      {loading ? (

        <div className="editar-producto__loading-message">
          Cargando producto...
        </div>

      ) : producto ? (

        <div className="editar-producto__form">


          {/* ================================== */}
          {/* NOMBRE */}
          {/* ================================== */}

          <div className="campo-edicion">

            <label htmlFor="nombre">
              Nombre del producto
            </label>

            <input
              id="nombre"
              type="text"
              value={producto.nombre || ''}
              onChange={(e) => {

                setProducto({
                  ...producto,
                  nombre: e.target.value
                })

                if (errores.nombre) {

                  setErrores((prev) => ({
                    ...prev,
                    nombre: ''
                  }))
                }

              }}
              className={
                errores.nombre
                  ? 'input-error'
                  : ''
              }
            />

            {errores.nombre && (

              <p className="mensaje-error-campo">
                {errores.nombre}
              </p>

            )}

          </div>


          {/* ================================== */}
          {/* DESCRIPCIÓN */}
          {/* ================================== */}

          <div className="campo-edicion">

            <label htmlFor="descripcion">
              Descripción
            </label>

            <textarea
              id="descripcion"
              value={
                producto.descripcion || ''
              }
              onChange={(e) => {

                setProducto({
                  ...producto,
                  descripcion: e.target.value
                })

                if (errores.descripcion) {

                  setErrores((prev) => ({
                    ...prev,
                    descripcion: ''
                  }))
                }

              }}
              rows="5"
              className={
                errores.descripcion
                  ? 'input-error'
                  : ''
              }
            />

            {errores.descripcion && (

              <p className="mensaje-error-campo">
                {errores.descripcion}
              </p>

            )}

          </div>


          {/* ================================== */}
          {/* CATEGORÍA */}
          {/* ================================== */}

          <div className="editar-producto__category-selector">

            <CategorySelector
              producto={producto}
              value={
                producto?.categoria?.id || ''
              }
              onChange={(categoriaID) => {

                setProducto({
                  ...producto,
                  categoria: {
                    id: Number(categoriaID)
                  }
                })

                if (errores.categoria) {

                  setErrores((prev) => ({
                    ...prev,
                    categoria: ''
                  }))
                }

              }}
            />

            {errores.categoria && (

              <p className="mensaje-error-campo">
                {errores.categoria}
              </p>

            )}

          </div>


          {/* ================================== */}
          {/* IMÁGENES */}
          {/* ================================== */}

          <div className="imagenes-edicion">


            <div className="imagenes-edicion__header">

              <h3>
                Imágenes del producto
              </h3>

              <span className="imagenes-edicion__contador">

                {producto.imagenes?.length || 0}
                {' / '}
                {MAX_FILES}

              </span>

            </div>


            {/* ================================= */}
            {/* IMÁGENES ACTUALES */}
            {/* ================================= */}

            {producto?.imagenes?.length > 0 ? (

              <div className="imagenes-seccion">

                <p className="imagenes-seccion__titulo">
                  Imágenes actuales
                </p>

                <div className="imagenes-grid">

                  {producto.imagenes.map(
                    (src, index) => (

                      <div
                        className="imagen-edicion"
                        key={index}
                      >

                        <div className="imagen-edicion__preview">

                          <img
                            src={src}
                            alt={`Imagen actual ${index + 1}`}
                          />

                        </div>

                        <button
                          type="button"
                          className="imagen-edicion__eliminar"
                          onClick={() => {

                            setProducto({
                              ...producto,
                              imagenes:
                                producto.imagenes.filter(
                                  (_, i) =>
                                    i !== index
                                )
                            })

                          }}
                        >
                          🗑️ Eliminar
                        </button>

                      </div>

                    )
                  )}

                </div>

              </div>

            ) : (

              <div className="imagenes-vacias">
                Este producto no tiene imágenes.
              </div>

            )}


            {/* ================================= */}
            {/* AGREGAR IMÁGENES */}
            {/* ================================= */}

            <div className="imagenes-agregar">

              <p className="imagenes-seccion__titulo">
                Agregar nuevas imágenes
              </p>

              <label
                htmlFor="imagenes"
                className="imagenes-upload"
              >

                <span className="imagenes-upload__icon">
                  +
                </span>

                <span>
                  Seleccionar imágenes
                </span>

                <small>
                  JPG, PNG o WEBP · Máximo 5 MB por imagen
                </small>

              </label>

              <input
                id="imagenes"
                name="imagenes"
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImagenes}
                className={
                  `imagenes-input ${
                    errores.imagenes
                      ? 'input-error'
                      : ''
                  }`
                }
              />

              {errores.imagenes && (

                <p className="mensaje-error-campo">
                  {errores.imagenes}
                </p>

              )}

            </div>


            {/* ================================= */}
            {/* NUEVAS IMÁGENES */}
            {/* ================================= */}

            {previews.length > 0 && (

              <div className="imagenes-seccion nuevas-imagenes">

                <p className="imagenes-seccion__titulo">
                  Nuevas imágenes seleccionadas
                </p>

                <div className="imagenes-grid">

                  {previews.map(
                    (src, index) => (

                      <div
                        className="imagen-edicion imagen-edicion--nueva"
                        key={index}
                      >

                        <div className="imagen-edicion__preview">

                          <img
                            src={src}
                            alt={`Nueva imagen ${index + 1}`}
                          />

                        </div>

                        <span className="imagen-nueva-label">
                          Nueva
                        </span>

                      </div>

                    )
                  )}

                </div>

              </div>

            )}

          </div>


          {/* ================================== */}
          {/* GUARDAR */}
          {/* ================================== */}

          <div className="editar-producto__acciones">

            <button
              className="editar-producto__guardar-button"
              type="button"
              onClick={handleGuardar}
            >
              Guardar cambios
            </button>

          </div>

        </div>

      ) : (

        !error && (

          <p className="editar-producto__not-found">
            No se encontró el producto.
          </p>

        )

      )}

    </div>
  )
}