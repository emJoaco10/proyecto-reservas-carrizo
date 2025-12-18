import { useState, useEffect } from 'react';
import useProductosLocalStorage from '../hooks/useProductosLocalStorage';
import { filesToObjectURLs, revokeObjectURLs } from '../helpers/imageUtils';
import { validarProducto } from '../helpers/validaciones';
import '../styles/pages/AgregarProducto.css';
import { obtenerImagenesPorTipo } from '../helpers/imageUtils';

const AgregarProducto = () => {
  const { productos, guardarProducto, borrarTodos } = useProductosLocalStorage({ onError: console.error });

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('');
  const [imagenesFiles, setImagenesFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [subiendo, setSubiendo] = useState(false);

  // Generar previews al seleccionar imágenes y revocarlas correctamente en cleanup
  useEffect(() => {
    if (!imagenesFiles || imagenesFiles.length === 0) {
      setPreviews([]);
      return;
    }

    const urls = filesToObjectURLs(imagenesFiles);
    setPreviews(urls);

    return () => {
      if (urls && urls.length > 0) revokeObjectURLs(urls);
    };
  }, [imagenesFiles]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit disparado');
    setError('');
    setExito('');

    // validarProducto devuelve string de error o falsy
    const errValidacion = validarProducto({ nombre, descripcion, tipo });
    if (errValidacion) {
      console.log('Validación fallida:', errValidacion);
      setError(errValidacion);
      return;
    }

    const nombreExiste = productos.some(
      (p) => p.nombre.toLowerCase() === nombre.trim().toLowerCase()
    );
    if (nombreExiste) {
      console.log('Nombre duplicado');
      setError('El nombre del producto ya existe. Por favor, elige otro nombre.');
      return;
    }

    setSubiendo(true);
    console.log('Llamando guardarProducto...');

    const resultado = await guardarProducto({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      tipo,
      imagenesFiles: imagenesFiles.length > 0 ? imagenesFiles : null,
      imagenesUrls: imagenesFiles.length === 0 ? obtenerImagenesPorTipo(tipo) : null
    });

    console.log('Resultado de guardarProducto:', resultado);
    setSubiendo(false);

    if (!resultado || !resultado.ok) {
      console.log('Error al guardar:', resultado?.error);
      setError(resultado?.error || 'Error al guardar el producto.');
    } else {
      console.log('Producto guardado con éxito');
      setExito('Producto guardado correctamente.');
      setNombre('');
      setDescripcion('');
      setTipo('');
      setImagenesFiles([]);
      if (previews && previews.length > 0) revokeObjectURLs(previews);
      setPreviews([]);
    }

    // Depuración temporal
    console.log('Contenido actual de localStorage:', localStorage.getItem('productos'));
  };

  const handleImagenes = (e) => {
    setImagenesFiles(Array.from(e.target.files));
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
        <label htmlFor="tipo">Tipo de propiedad:</label>
        <select
          id="tipo"
          name="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
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
        />

        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

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
      </form>

      <button className="btn btn-danger" onClick={handleBorrarTodo}>
        Borrar todos los productos
      </button>

      {error && <p className="mensaje-error">{error}</p>}
      {exito && <p className="mensaje-exito">{exito}</p>}
    </div>
  );
};

export default AgregarProducto;