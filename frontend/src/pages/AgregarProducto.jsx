import { useState, useEffect } from 'react';
import useProductoAPI from '../hooks/useProductoAPI';
import { filesToObjectURLs, revokeObjectURLs } from '../helpers/imageUtils';
import { validarProducto } from '../helpers/validaciones';
import '../styles/pages/AgregarProducto.css';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILES = 10;

const AgregarProducto = () => {
  const { addProducto, removeAllProductos } = useProductoAPI();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('');
  const [imagenesFiles, setImagenesFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [subiendo, setSubiendo] = useState(false);

  // Generar previews al seleccionar imágenes y revocarlas correctamente en cleanup
  // useEffect para generar previews y revocarlos al desmontar o cuando cambian archivos
useEffect(() => {
    if (!imagenesFiles || imagenesFiles.length === 0) {
      setPreviews([]);
      return;
    }

    const urls = filesToObjectURLs(
      imagenesFiles,
      { maxSize: MAX_FILE_SIZE, allowedTypes: ALLOWED_TYPES },
      (err) => setError(err.message || 'Error procesando imágenes')
    );

    setPreviews(urls);

    return () => {
      revokeObjectURLs(urls);
    };
  }, [imagenesFiles]);

  // En el submit (antes de llamar a guardarProducto), validación defensiva
const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setExito('');

    const errMsg = validarProducto({ nombre, descripcion, tipo });
    if (errMsg) { setError(errMsg); return; }

    if (imagenesFiles?.length > 0) {
      if (imagenesFiles.length > MAX_FILES) {
        setError(`Máximo ${MAX_FILES} imágenes permitidas.`);
        return;
      }
      const invalidType = imagenesFiles.find(f => !ALLOWED_TYPES.includes(f.type));
      if (invalidType) {
        setError(`Formato no permitido: ${invalidType.name}`);
        return;
      }
      const tooLarge = imagenesFiles.find(f => f.size > MAX_FILE_SIZE);
      if (tooLarge) {
        setError(`La imagen ${tooLarge.name} supera ${Math.round(MAX_FILE_SIZE / (1024 * 1024))}MB`);
        return;
      }
    }

  setSubiendo(true);
    try {
      const nuevo = await addProducto({
        nombre,
        descripcion,
        tipo,
        imagenes: previews // enviamos las URLs generadas
      });
      setSubiendo(false);

      if (!nuevo) {
        revokeObjectURLs(previews);
        setError('No se pudo guardar el producto');
        return;
      }

      // éxito: limpiar y notificar
      revokeObjectURLs(previews);
      setPreviews([]);
      setImagenesFiles([]);
      setNombre('');
      setDescripcion('');
      setTipo('');
      setError('');
      setExito('Producto guardado correctamente.');
      setTimeout(() => setExito(''), 4000);
    } catch (err) {
      console.error('[AgregarProducto] Error al guardar:', err);
      setError('Error inesperado al guardar el producto');
      setSubiendo(false);
    }
  };

  // Handler del input file (reemplazar o añadir en el componente)
const handleImagenes = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) {
      setImagenesFiles([]);
      setPreviews([]);
      setError('');
      return;
    }

    if (files.length > MAX_FILES) {
      setError(`Podés subir hasta ${MAX_FILES} imágenes por producto.`);
      return;
    }

    const invalidType = files.find(f => !ALLOWED_TYPES.includes(f.type));
    if (invalidType) {
      setError(`Formato no permitido: ${invalidType.name}`);
      return;
    }

    const tooLarge = files.find(f => f.size > MAX_FILE_SIZE);
    if (tooLarge) {
      setError(`La imagen "${tooLarge.name}" supera el límite de ${Math.round(MAX_FILE_SIZE / (1024 * 1024))}MB.`);
      return;
    }

    setError('');
    setImagenesFiles(files);
  };

  const handleBorrarTodo = async () => {
    try {
      await removeAllProductos();
      setExito('Todos los productos han sido eliminados.');
      setError('');
    } catch (err) {
      console.error('[AgregarProducto] Error al borrar todos:', err);
      setError('No se pudo borrar todo');
    }
  };

  return (
    <div className="agregar-producto">
      <h2>Registrar producto</h2>

      <form className="form-producto" onSubmit={handleSubmit}>
  {/* Columna izquierda: datos */}
  <div className="form-section">
  <label htmlFor="tipo">Tipo de propiedad:</label>
  <select
    id="tipo"
    name="tipo"
    value={tipo}
    onChange={(e) => setTipo(e.target.value)}
    required
    className={error && error.includes('tipo') ? 'input-error' : ''}
  >
    <option value="">Seleccionar tipo</option>
    <option value="casa">Casa</option>
    <option value="departamento">Departamento</option>
    <option value="hotel">Hotel</option>
  </select>

  <label htmlFor="nombre">Nombre del producto:</label>
  <input
    id="nombre"
    name="nombre"
    type="text"
    value={nombre}
    onChange={(e) => setNombre(e.target.value)}
    required
    className={error && error.includes('nombre') ? 'input-error' : ''}
  />

  <label htmlFor="descripcion">Descripción:</label>
  <textarea
    id="descripcion"
    name="descripcion"
    value={descripcion}
    onChange={(e) => setDescripcion(e.target.value)}
    required
    className={error && error.includes('descripcion') ? 'input-error' : ''}
  />
</div>

  {/* Columna derecha: imágenes y acción */}
  <div className="form-actions">
    <label htmlFor="imagenes">Imágenes:</label>
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
          <img key={i} src={src} alt={`preview ${i + 1}`} />
        ))}
      </div>
    )}

    <button type="submit" disabled={subiendo}>
      {subiendo ? 'Guardando...' : 'Guardar producto'}
    </button>
  </div>
</form>

{/* Botón peligro debajo del formulario */}
<button
  className="btn btn-danger"
  onClick={() => {
    if (confirm('¿Seguro que querés borrar todos los productos?')) {
      handleBorrarTodo();
    }
  }}
>
  Borrar todos los productos
</button>

{error && (
  <p className="mensaje-error" aria-live="assertive">
    {error}
  </p>
)}
{exito && (
  <p className="mensaje-exito" aria-live="polite">
    {exito}
  </p>
)}
    </div>
  );
};

export default AgregarProducto;