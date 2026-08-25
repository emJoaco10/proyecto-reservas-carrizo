import { useState, useEffect } from 'react';
import useProductoAPI from '../hooks/useProductoAPI';
import { filesToObjectURLs, revokeObjectURLs } from '../helpers/imageUtils';
import { validarProducto } from '../helpers/validaciones';
import '../styles/pages/AgregarProducto.css';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILES = 10;

/**
 * Página para registrar nuevos productos.
 *
 * Gestiona los datos del formulario, validaciones, selección de imágenes,
 * generación de previews y envío del producto al backend.
 */
const AgregarProducto = () => {
  const { addProducto, removeAllProductos } = useProductoAPI();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenesFiles, setImagenesFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [subiendo, setSubiendo] = useState(false);

  /**
   * Genera las URLs temporales utilizadas para mostrar la vista previa
   * de las imágenes seleccionadas.
   *
   * Las URLs se revocan cuando cambian los archivos o el componente
   * se desmonta para evitar mantener recursos innecesarios en memoria.
   */
  useEffect(() => {
    if (!imagenesFiles || imagenesFiles.length === 0) {
      setPreviews([]);
      return;
    }

    const urls = filesToObjectURLs(
      imagenesFiles,
      {
        maxSize: MAX_FILE_SIZE,
        allowedTypes: ALLOWED_TYPES
      },
      (err) =>
        setError(
          err.message || 'Error procesando imágenes'
        )
    );

    setPreviews(urls);

    return () => {
      revokeObjectURLs(urls);
    };
  }, [imagenesFiles]);

  /**
   * Convierte un archivo de imagen en una cadena Base64.
   *
   * Este formato permite enviar las imágenes dentro del objeto
   * del producto hacia el backend.
   *
   * @param {File} file Archivo de imagen seleccionado.
   * @returns {Promise<string>} Imagen convertida a Base64.
   */
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () =>
        resolve(reader.result);

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });

  /**
   * Procesa el envío del formulario de creación de producto.
   *
   * Antes de realizar la petición valida los datos principales
   * y las imágenes seleccionadas. Si las validaciones son correctas,
   * convierte las imágenes a Base64 y utiliza addProducto() para
   * registrar el producto.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setExito('');

    // Validar los datos principales del producto.
    const errMsg = validarProducto({
      nombre,
      descripcion
    });

    if (errMsg) {
      setError(errMsg);
      return;
    }

    // Validar cantidad, formato y tamaño de las imágenes.
    if (imagenesFiles?.length > 0) {

      if (imagenesFiles.length > MAX_FILES) {
        setError(
          `Máximo ${MAX_FILES} imágenes permitidas.`
        );
        return;
      }

      const invalidType = imagenesFiles.find(
        (f) => !ALLOWED_TYPES.includes(f.type)
      );

      if (invalidType) {
        setError(
          `Formato no permitido: ${invalidType.name}`
        );
        return;
      }

      const tooLarge = imagenesFiles.find(
        (f) => f.size > MAX_FILE_SIZE
      );

      if (tooLarge) {
        setError(
          `La imagen ${tooLarge.name} supera ${
            Math.round(
              MAX_FILE_SIZE / (1024 * 1024)
            )
          }MB`
        );
        return;
      }
    }

    setSubiendo(true);

    try {
      // Convertir todas las imágenes seleccionadas a Base64.
      const imagenesBase64 =
        await Promise.all(
          imagenesFiles.map(fileToBase64)
        );

      // Crear el producto mediante el hook de comunicación con la API.
      const nuevo = await addProducto({
        nombre,
        descripcion,
        imagenes: imagenesBase64
      });

      setSubiendo(false);

      if (!nuevo) {
        revokeObjectURLs(previews);
        setError(
          'No se pudo guardar el producto'
        );
        return;
      }

      // Limpiar el formulario después de una creación exitosa.
      setImagenesFiles([]);
      setNombre('');
      setDescripcion('');
      setError('');
      setExito(
        'Producto guardado correctamente.'
      );

      setTimeout(
        () => setExito(''),
        4000
      );

    } catch (err) {

      console.error(
        '[AgregarProducto] Error al guardar:',
        err
      );

      setError(
        'Error inesperado al guardar el producto'
      );

      setSubiendo(false);
    }
  };

  /**
   * Procesa los archivos seleccionados en el input de imágenes.
   *
   * Verifica la cantidad máxima, el formato permitido y el tamaño
   * de cada archivo antes de almacenarlos en el estado.
   *
   * @param {Event} e Evento generado por el input de archivos.
   */
  const handleImagenes = (e) => {
    const files = Array.from(
      e.target.files || []
    );

    if (files.length === 0) {
      setImagenesFiles([]);
      setPreviews([]);
      setError('');
      return;
    }

    if (files.length > MAX_FILES) {
      setError(
        `Podés subir hasta ${MAX_FILES} imágenes por producto.`
      );
      return;
    }

    const invalidType = files.find(
      (f) => !ALLOWED_TYPES.includes(f.type)
    );

    if (invalidType) {
      setError(
        `Formato no permitido: ${invalidType.name}`
      );
      return;
    }

    const tooLarge = files.find(
      (f) => f.size > MAX_FILE_SIZE
    );

    if (tooLarge) {
      setError(
        `La imagen "${tooLarge.name}" supera el límite de ${
          Math.round(
            MAX_FILE_SIZE / (1024 * 1024)
          )
        }MB.`
      );
      return;
    }

    setError('');
    setImagenesFiles(files);
  };

  /**
   * Elimina todos los productos mediante el endpoint correspondiente.
   *
   * Esta función está destinada a la operación administrativa
   * de borrado completo de productos.
   */
  const handleBorrarTodo = async () => {
    try {

      await removeAllProductos();

      setExito(
        'Todos los productos han sido eliminados.'
      );

      setError('');

    } catch (err) {

      console.error(
        '[AgregarProducto] Error al borrar todos:',
        err
      );

      setError(
        'No se pudo borrar todo'
      );
    }
  };

  return (
    <div className="agregar-producto">

      <h2>Registrar producto</h2>

      <form
        className="form-producto"
        onSubmit={handleSubmit}
      >

        {/* Datos principales del producto. */}
        <div className="form-section">

          <label htmlFor="nombre">
            Nombre del producto:
          </label>

          <input
            id="nombre"
            name="nombre"
            type="text"
            value={nombre}
            onChange={(e) =>
              setNombre(e.target.value)
            }
            required
            className={
              error && error.includes('nombre')
                ? 'input-error'
                : ''
            }
          />

          <label htmlFor="descripcion">
            Descripción:
          </label>

          <textarea
            id="descripcion"
            name="descripcion"
            value={descripcion}
            onChange={(e) =>
              setDescripcion(e.target.value)
            }
            required
            className={
              error && error.includes('descripcion')
                ? 'input-error'
                : ''
            }
          />

        </div>

        {/* Selección de imágenes y envío del formulario. */}
        <div className="form-actions">

          <label htmlFor="imagenes">
            Imágenes:
          </label>

          <input
            id="imagenes"
            name="imagenes"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImagenes}
          />

          {previews.length > 0 && (
            <div className="preview-imagenes">

              {previews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`preview ${i + 1}`}
                />
              ))}

            </div>
          )}

          <button
            type="submit"
            disabled={subiendo}
          >
            {subiendo
              ? 'Guardando...'
              : 'Guardar producto'}
          </button>

        </div>
      </form>

      {/* Operación administrativa de borrado completo. */}
      <button
        className="btn btn-danger"
        onClick={() => {
          if (
            confirm(
              '¿Seguro que querés borrar todos los productos?'
            )
          ) {
            handleBorrarTodo();
          }
        }}
      >
        Borrar todos los productos
      </button>

      {error && (
        <p
          className="mensaje-error"
          aria-live="assertive"
        >
          {error}
        </p>
      )}

      {exito && (
        <p
          className="mensaje-exito"
          aria-live="polite"
        >
          {exito}
        </p>
      )}

    </div>
  );
};

export default AgregarProducto;