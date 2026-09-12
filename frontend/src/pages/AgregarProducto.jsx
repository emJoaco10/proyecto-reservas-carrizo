import { useState, useEffect } from 'react';
import useProductoAPI from '../hooks/useProductoAPI';
import { filesToObjectURLs, revokeObjectURLs } from '../helpers/imageUtils';
import { validarProducto } from '../helpers/validaciones';
import useCategoriaAPI from '../hooks/useCategoriaAPI';
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
  const { categorias, fetchCategorias } = useCategoriaAPI();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [imagenesFiles, setImagenesFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [errores, setErrores] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    imagenes: ''
  });

  const [exito, setExito] = useState('');
  const [subiendo, setSubiendo] = useState(false);

  /**
   * Genera las URLs temporales utilizadas para mostrar
   * la vista previa de las imágenes seleccionadas.
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
      (err) => {
        setErrores((prev) => ({
          ...prev,
          imagenes: err.message || 'Error procesando imágenes'
        }));
      }
    );

    setPreviews(urls);

    return () => {
      revokeObjectURLs(urls);
    };
  }, [imagenesFiles]);

  /**
   * Obtiene las categorías disponibles.
   */
  useEffect(() => {
    fetchCategorias();
  }, []);

  /**
   * Convierte un archivo de imagen a Base64.
   */
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });

  /**
   * Envía el formulario de creación del producto.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setExito('');

    const nuevosErrores = {
      nombre: '',
      descripcion: '',
      categoria: '',
      imagenes: ''
    };

    // --------------------------------
    // Validar nombre y descripción
    // --------------------------------

    const errNombre = validarProducto({
      nombre,
      descripcion: ''
    });

    if (errNombre) {
      nuevosErrores.nombre = errNombre;
    }

    const errDescripcion = validarProducto({
      nombre: 'Producto válido',
      descripcion
    });

    if (errDescripcion) {
      nuevosErrores.descripcion = errDescripcion;
    }

    // --------------------------------
    // Validar categoría
    // --------------------------------

    if (!categoriaId) {
      nuevosErrores.categoria = 'La categoría es obligatoria.';
    }

    // --------------------------------
    // Validar imágenes
    // --------------------------------

    if (imagenesFiles?.length > 0) {

      if (imagenesFiles.length > MAX_FILES) {
        nuevosErrores.imagenes =
          `Máximo ${MAX_FILES} imágenes permitidas.`;
      } else {

        const invalidType = imagenesFiles.find(
          (f) => !ALLOWED_TYPES.includes(f.type)
        );

        if (invalidType) {
          nuevosErrores.imagenes =
            `Formato no permitido: ${invalidType.name}`;
        }

        const tooLarge = imagenesFiles.find(
          (f) => f.size > MAX_FILE_SIZE
        );

        if (tooLarge && !nuevosErrores.imagenes) {
          nuevosErrores.imagenes =
            `La imagen ${tooLarge.name} supera ${Math.round(
              MAX_FILE_SIZE / (1024 * 1024)
            )}MB.`;
        }
      }
    }

    // --------------------------------
    // Mostrar errores y detener envío
    // --------------------------------

    if (Object.values(nuevosErrores).some(Boolean)) {
      setErrores(nuevosErrores);
      return;
    }

    setErrores({
      nombre: '',
      descripcion: '',
      categoria: '',
      imagenes: ''
    });

    setSubiendo(true);

    try {

      // Convertir imágenes a Base64
      const imagenesBase64 = await Promise.all(
        imagenesFiles.map(fileToBase64)
      );

      // Crear producto
      const nuevo = await addProducto({
        nombre,
        descripcion,
        imagenes: imagenesBase64,
        categoria: {
          id: Number(categoriaId)
        }
      });

      setSubiendo(false);

      if (!nuevo) {
        setErrores({
          nombre: '',
          descripcion: '',
          categoria: '',
          imagenes: 'No se pudo guardar el producto.'
        });
        return;
      }

      // --------------------------------
      // Limpiar formulario
      // --------------------------------

      setImagenesFiles([]);
      setNombre('');
      setDescripcion('');
      setCategoriaId('');

      setErrores({
        nombre: '',
        descripcion: '',
        categoria: '',
        imagenes: ''
      });

      setExito('Producto guardado correctamente.');

      setTimeout(() => {
        setExito('');
      }, 4000);

    } catch (err) {

      console.error(
        '[AgregarProducto] Error al guardar:',
        err
      );

      setErrores({
        nombre: '',
        descripcion: '',
        categoria: '',
        imagenes: 'Error inesperado al guardar el producto.'
      });

      setSubiendo(false);
    }
  };

  /**
   * Procesa los archivos seleccionados.
   */
  const handleImagenes = (e) => {
    const files = Array.from(
      e.target.files || []
    );

    if (files.length === 0) {
      setImagenesFiles([]);
      setPreviews([]);

      setErrores((prev) => ({
        ...prev,
        imagenes: ''
      }));

      return;
    }

    // Cantidad máxima
    if (files.length > MAX_FILES) {
      setErrores((prev) => ({
        ...prev,
        imagenes:
          `Podés subir hasta ${MAX_FILES} imágenes por producto.`
      }));
      return;
    }

    // Formato
    const invalidType = files.find(
      (f) => !ALLOWED_TYPES.includes(f.type)
    );

    if (invalidType) {
      setErrores((prev) => ({
        ...prev,
        imagenes:
          `Formato no permitido: ${invalidType.name}`
      }));
      return;
    }

    // Tamaño
    const tooLarge = files.find(
      (f) => f.size > MAX_FILE_SIZE
    );

    if (tooLarge) {
      setErrores((prev) => ({
        ...prev,
        imagenes:
          `La imagen "${tooLarge.name}" supera el límite de ${Math.round(
            MAX_FILE_SIZE / (1024 * 1024)
          )}MB.`
      }));
      return;
    }

    // Archivos correctos
    setErrores((prev) => ({
      ...prev,
      imagenes: ''
    }));

    setImagenesFiles(files);
  };

  /**
   * Elimina todos los productos.
   */
  const handleBorrarTodo = async () => {
    try {

      await removeAllProductos();

      setExito(
        'Todos los productos han sido eliminados.'
      );

      setErrores({
        nombre: '',
        descripcion: '',
        categoria: '',
        imagenes: ''
      });

    } catch (err) {

      console.error(
        '[AgregarProducto] Error al borrar todos:',
        err
      );

      setErrores((prev) => ({
        ...prev,
        imagenes: 'No se pudo borrar todo.'
      }));
    }
  };

  return (
    <div className="agregar-producto">

      <h2>Registrar producto</h2>

      <form
        className="form-producto"
        onSubmit={handleSubmit}
      >

        {/* ========================= */}
        {/* DATOS DEL PRODUCTO */}
        {/* ========================= */}

        <div className="form-section">

          {/* NOMBRE */}

          <label htmlFor="nombre">
            Nombre del producto:
          </label>

          <input
            id="nombre"
            name="nombre"
            type="text"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);

              if (errores.nombre) {
                setErrores((prev) => ({
                  ...prev,
                  nombre: ''
                }));
              }
            }}
            required
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

          {/* DESCRIPCIÓN */}

          <label htmlFor="descripcion">
            Descripción:
          </label>

          <textarea
            id="descripcion"
            name="descripcion"
            value={descripcion}
            onChange={(e) => {
              setDescripcion(e.target.value);

              if (errores.descripcion) {
                setErrores((prev) => ({
                  ...prev,
                  descripcion: ''
                }));
              }
            }}
            required
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

          {/* CATEGORÍA */}

          <label htmlFor="categoria">
            Categoría:
          </label>

          <select
            id="categoria"
            name="categoria"
            value={categoriaId}
            onChange={(e) => {
              setCategoriaId(e.target.value);

              if (errores.categoria) {
                setErrores((prev) => ({
                  ...prev,
                  categoria: ''
                }));
              }
            }}
            required
            className={
              errores.categoria
                ? 'input-error'
                : ''
            }
          >

            <option value="">
              Seleccioná una categoría
            </option>

            {categorias.map((categoria) => (
              <option
                key={categoria.id}
                value={categoria.id}
              >
                {categoria.nombre}
              </option>
            ))}

          </select>

          {errores.categoria && (
            <p className="mensaje-error-campo">
              {errores.categoria}
            </p>
          )}

        </div>

        {/* ========================= */}
        {/* IMÁGENES */}
        {/* ========================= */}

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
            className={
              errores.imagenes
                ? 'input-error'
                : ''
            }
          />

          {errores.imagenes && (
            <p className="mensaje-error-campo">
              {errores.imagenes}
            </p>
          )}

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

      {/* ========================= */}
      {/* ZONA DE PELIGRO */}
      {/* ========================= */}

      <section className="zona-peligro">

        <div className="zona-peligro__contenido">

          <h3 className="zona-peligro__titulo">
            Zona de administración
          </h3>

          <p className="zona-peligro__subtitulo">
            Eliminación de productos
          </p>

          <p className="zona-peligro__descripcion">
            Esta acción eliminará todos los productos registrados.
            Esta operación no se puede deshacer.
          </p>

        </div>

        <button
          type="button"
          className="zona-peligro__button"
          onClick={() => {

            const confirmar = window.confirm(
              '⚠️ ATENCIÓN\n\n' +
              'Estás a punto de eliminar TODOS los productos.\n\n' +
              'Esta operación no se puede deshacer.\n\n' +
              '¿Querés continuar?'
            );

            if (confirmar) {
              handleBorrarTodo();
            }

          }}
        >
          🗑️ Borrar todos los productos
        </button>

      </section>

      {/* ========================= */}
      {/* MENSAJE DE ÉXITO */}
      {/* ========================= */}

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