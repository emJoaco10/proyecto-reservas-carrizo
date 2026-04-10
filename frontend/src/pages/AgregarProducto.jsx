// src/pages/AgregarProducto.jsx
import { useState, useCallback, useMemo } from 'react';
import useProductosLocalStorage from '../hooks/useProductosLocalStorage';
import { validarProducto, validarImagenes } from '../helpers/validaciones';
import useImagePreviews from '../hooks/useImagePreviews';
import '../styles/pages/AgregarProducto.css';

const MAX_FILE_SIZE = 5 * 1024 * 1024; 
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILES = 10;

const AgregarProducto = () => {
  const { guardarProducto, borrarTodos } = useProductosLocalStorage({ onError: console.error });

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('');
  const [imagenesFiles, setImagenesFiles] = useState([]);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [subiendo, setSubiendo] = useState(false);

  const options = useMemo(() => ({
    maxSize: MAX_FILE_SIZE,
    allowedTypes: ALLOWED_TYPES,
  }), []);

  const handleError = useCallback((err) => {
    setError(err.message || 'Error procesando imágenes');
  }, []);

  const { previews, clearPreviews } = useImagePreviews(imagenesFiles, options, handleError);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setExito('');

    // Validación de campos
    const errMsg = validarProducto({ nombre, descripcion, tipo });
    if (errMsg) { setError(errMsg); return; }

    // Validación de imágenes centralizada
    const imgErr = validarImagenes(imagenesFiles, { maxSize: MAX_FILE_SIZE, allowedTypes: ALLOWED_TYPES, maxFiles: MAX_FILES });
    if (imgErr) { setError(imgErr); return; }

    setSubiendo(true);
    const result = await guardarProducto({ nombre, descripcion, tipo, imagenes: [] });
    setSubiendo(false);

    if (!result.ok) {
      clearPreviews();
      setError(result.error || 'No se pudo guardar el producto');
      return;
    }

    clearPreviews();
    setImagenesFiles([]);
    setNombre('');
    setDescripcion('');
    setTipo('');
    setExito('Producto guardado correctamente.');
    setTimeout(() => setExito(''), 4000);
  };

  const handleImagenes = (e) => {
    const files = Array.from(e.target.files || []);
    setError('');
    setImagenesFiles(files);
  };

  const handleBorrarTodo = async () => {
    const res = await borrarTodos();
    if (res && res.ok) {
      setExito('Todos los productos han sido eliminados.');
      setError('');
    } else {
      setError(res?.error || 'No se pudo borrar todo');
    }
  };

  return (
    <div className="agregar-producto">
      <h2>Registrar producto</h2>

      <form className="form-producto" onSubmit={handleSubmit}>
        {/* Columna izquierda: datos */}
        <div className="form-section">
          <label htmlFor="tipo">Tipo de propiedad:</label>
          <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} required>
            <option value="">Seleccionar tipo</option>
            <option value="casa">Casa</option>
            <option value="departamento">Departamento</option>
            <option value="hotel">Hotel</option>
          </select>

          <label htmlFor="nombre">Nombre del producto:</label>
          <input id="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

          <label htmlFor="descripcion">Descripción:</label>
          <textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        </div>

        {/* Columna derecha: imágenes y acción */}
        <div className="form-actions">
          <label htmlFor="imagenes">Imágenes:</label>
          <input id="imagenes" type="file" multiple accept="image/*" onChange={handleImagenes} />

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

      <button className="btn btn-danger" onClick={() => confirm('¿Seguro que querés borrar todos los productos?') && handleBorrarTodo()}>
        Borrar todos los productos
      </button>

      {error && <p className="mensaje-error" aria-live="assertive">{error}</p>}
      {exito && <p className="mensaje-exito" aria-live="polite">{exito}</p>}
    </div>
  );
};

export default AgregarProducto;