// Hooks de React para gestionar el estado local y los efectos del componente.
import React, { useEffect, useState } from 'react'
// Permite obtener el identificador del producto desde la ruta actual.
import { useParams } from 'react-router-dom'
// Muestra la navegación jerárquica del área de administración.
import BreadcrumAdministracion from "../components/BreadcrumAdministracion";
// Proporciona las operaciones de consulta y edición de productos.
import useProductoAPI from '../hooks/useProductoAPI'
// Selector de categoría empleado durante la edición del producto.
import { CategorySelector } from '../components/CategorySelector'
// Validaciones del nombre y la descripción del producto.
import {
  validarNombre,
  validarDescripcion
} from '../helpers/validaciones'
// Utilidades para crear y liberar URLs temporales de vistas previas.
import {
  filesToObjectURLs,
  revokeObjectURLs
} from '../helpers/imageUtils'
// Estilos específicos de esta página.
import '../styles/pages/EditarProducto.css'

/** Tamaño máximo permitido para cada archivo de imagen: 5 MB. */
const MAX_FILE_SIZE = 5 * 1024 * 1024
/** Tipos MIME admitidos para los archivos de imagen. */
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp'
]
/** Cantidad máxima de imágenes permitidas por producto. */
const MAX_FILES = 10

/**
 * Página de edición que obtiene el identificador del producto desde la ruta,
 * carga sus datos y permite modificar el nombre, la descripción y la categoría.
 *
 * Permite quitar imágenes de los datos locales del producto y seleccionar
 * imágenes nuevas, valida los datos y las restricciones de los archivos,
 * genera vistas previas temporales y convierte los archivos seleccionados a
 * Base64 al preparar los cambios. Intenta guardar la actualización mediante
 * `editProducto` y presenta los estados de carga y los mensajes de error
 * correspondientes; el resultado depende de esa operación.
 */
export const EditarProducto = () => {

  const { id } = useParams()

  const {
    fetchProductoById,
    editProducto
  } = useProductoAPI()

  // Datos del producto que se está editando, incluidos sus cambios locales.
  const [producto, setProducto] = useState(null)
  // Indica si está en curso la carga inicial solicitada para el producto.
  const [loading, setLoading] = useState(true)

  // Mensaje general para errores de carga o de intento de actualización.
  const [error, setError] = useState(null)

  // Mensajes de validación asociados a campos concretos del formulario.
  const [errores, setErrores] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    imagenes: ''
  })

  // Archivos nuevos seleccionados por el usuario; aún no se envían al guardar.
  const [imagenesFiles, setImagenesFiles] = useState([])
  // URLs temporales que se usan para mostrar los archivos nuevos seleccionados.
  const [previews, setPreviews] = useState([])


  /**
  * Consulta el producto identificado por `id` y actualiza el estado local.
  * Comprueba que exista el identificador, activa la carga y limpia el error
  * general antes de consultar. Si la consulta falla, registra el error en
  * consola y establece un mensaje general; siempre desactiva la carga en
  * `finally`. La dependencia `[id]` hace que el efecto se ejecute al montarse
  * y cuando cambie ese identificador.
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
  * Genera vistas previas temporales para los archivos seleccionados.
  * Si no hay archivos, limpia las vistas previas. En caso contrario, pasa los
  * archivos y las restricciones a `filesToObjectURLs`, guarda las URLs
  * resultantes y registra en los errores de imágenes los errores comunicados
  * por el callback. La limpieza libera esas URLs mediante
  * `revokeObjectURLs`; la dependencia `[imagenesFiles]` vuelve a ejecutar el
  * efecto cuando cambia la selección.
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
  * Convierte un archivo en una promesa cuyo resultado procede de
  * `FileReader.readAsDataURL`.
  * @param {File} file Archivo que se leerá como Data URL.
  * @returns {Promise<string|ArrayBuffer|null>} Resultado de la lectura.
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
  * Obtiene y valida los archivos seleccionados: comprueba que haya selección,
  * que no se supere `MAX_FILES`, que todos los tipos MIME estén permitidos y
  * que ningún archivo exceda `MAX_FILE_SIZE`. Actualiza el error de imágenes
  * y la lista de archivos según el resultado de esas comprobaciones; no los
  * guarda en el backend.
  * @param {React.ChangeEvent<HTMLInputElement>} e Evento del selector de archivos.
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
  * Valida y prepara los cambios del producto e intenta guardarlos mediante
  * `editProducto`.
  *
  * Se detiene si falta `id` o `producto`; valida nombre, descripción,
  * categoría y cantidad total de imágenes. Si hay errores, los actualiza y
  * detiene el flujo. Si la validación pasa, limpia los errores, conserva las
  * imágenes que permanecen en `producto.imagenes`, convierte a Base64 los
  * archivos nuevos cuando los hay y los agrega a las existentes. Construye
  * `productoParaGuardar` y llama a `editProducto`. Si recibe un producto
  * actualizado, actualiza el estado, limpia archivos y vistas previas y
  * muestra el mensaje de éxito. Las excepciones se registran en consola y
  * establecen un error general; esta función no redirige a otra página.
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

      {/* Navegación jerárquica: Administración → Administración de productos → Editar producto. */}
      <BreadcrumAdministracion
        items={[
          {
            label: "Administración",
            path: "/administracion"
          },
          {
            label: "Administración de productos",
            path: "/productos-admin"
          },
          {
            label: "Editar producto"
          }
        ]}
      />

      {/* ====================================== */}
      {/* ENCABEZADO */}
      {/* ====================================== */}
      {/* Título y descripción de la tarea de edición. */}

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
      {/* Mensaje general de carga o actualización, anunciado con prioridad mediante aria-live. */}

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
      {/* Mientras carga se muestra el indicador; después, el formulario requiere un producto disponible. */}

      {loading ? (

        <div className="editar-producto__loading-message">
          Cargando producto...
        </div>

      ) : producto ? (

        <div className="editar-producto__form">


          {/* ================================== */}
          {/* NOMBRE */}
          {/* ================================== */}
          {/* El campo actualiza el nombre en producto y limpia su error al cambiar. */}

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
          {/* El campo actualiza la descripción en producto y limpia su error al cambiar. */}

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
          {/* El selector recibe el producto y la categoría actual; onChange actualiza la categoría local. */}

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
          {/* Sección de imágenes actuales y nuevas; el contador muestra la cantidad actual frente al límite. */}

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
            {/* Galería de imágenes del producto; quitar una imagen solo la filtra del estado local. */}

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
                {/* Estado alternativo cuando no hay imágenes actuales. */}

                Este producto no tiene imágenes.
              </div>

            )}


            {/* ================================= */}
            {/* AGREGAR IMÁGENES */}
            {/* ================================= */}
            {/* Selector de archivos que informa los formatos y el límite de tamaño admitidos. */}

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
                  `imagenes-input ${errores.imagenes
                    ? 'input-error'
                    : ''
                  }`
                }
              />

              {errores.imagenes && (
                < p className="mensaje-error-campo">
                  {/* Error de validación asociado a la selección o cantidad de imágenes. */}
                  {errores.imagenes}
                </p>

              )}

            </div>


            {/* ================================= */}
            {/* NUEVAS IMÁGENES */}
            {/* ================================= */}
            {/* Vistas previas temporales de las nuevas imágenes seleccionadas. */}

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
          {/* Acción que ejecuta las validaciones y el intento de guardar los cambios. */}

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
        {/* Mensaje alternativo si no hay producto y tampoco se muestra un error general. */ }
        No se encontró el producto.
      </p>

      )

      )}

    </div >
  )
}