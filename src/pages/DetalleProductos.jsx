
import { useParams, useNavigate } from 'react-router-dom'; // Hooks para acceder a parámetros de la URL y navegar entre rutas
import { useEffect, useState } from 'react'; // Hooks para manejar estado y efectos secundarios
import '../styles/pages/DetalleProductos.css'; // Estilos específicos para esta página

const DetalleProducto = () => {
    // useParams permite acceder a los parámetros dinámicos de la URL
    // En este caso, obtenemos el "id" del producto desde la ruta "/producto/:id"
    const { id } = useParams();

    // useNavigate permite programáticamente navegar entre rutas
    // Lo usamos para volver atrás con un botón
    const navigate = useNavigate();

    // useState define el estado local para guardar el producto encontrado
    const [producto, setProducto] = useState(null);

    // useEffect se ejecuta cuando el componente se monta o cuando cambia el "id"
    // Acá buscamos el producto correspondiente en localStorage
    useEffect(() => {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];

        // Buscamos el producto cuyo id coincida con el parámetro de la URL
        const encontrado = productos.find(p => p.id === Number(id));

        // Actualizamos el estado con el producto encontrado
        setProducto(encontrado);
    }, [id]); // Se vuelve a ejecutar si cambia el "id"

    // Si no se encuentra el producto, mostramos un mensaje de error
    if (!producto) return <p>Producto no encontrado.</p>;

    return (
        <div className="detalle-producto">
            {/* Header con título alineado a la izquierda y botón de volver a la derecha */}
            <header className="detalle-header">
                <h2>{producto.nombre}</h2>
                <button className="btn-volver" onClick={() => navigate(-1)}>← Volver</button>
            </header>

            {/* Contenido principal con descripción e imágenes */}
            <main className="detalle-body">
                <p>{producto.descripcion}</p>

                {/* Mostramos las imágenes si existen */}
                {producto.imagenes.length > 0 && (
                    <div className="imagenes">
                        {producto.imagenes.map((img, i) => (
                            <img key={i} src={img} alt={`Imagen ${i + 1}`} />))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default DetalleProducto;