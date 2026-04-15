import { useState, useEffect } from 'react';
import axios from 'axios';

// Hook personalizado para obtener productos aleatorios desde el backend.
// - Usa estado React para guardar la lista.
// - Usa useEffect para pedir datos al montar.
// - Devuelve directamente la lista de productos aleatorios.
const useProductosAleatorios = ({ onError } = {}) => {
  // Estado React: guarda la lista de productos aleatorios.
  // Inicialmente es un array vacío.
  const [productosAleatorios, setProductosAleatorios] = useState([]);

  // Efecto: se ejecuta al montar el componente (y si cambia onError).
  useEffect(() => {

    // Función asíncrona para pedir productos al backend.
    const fetchAleatorios = async () => {
      try {

        // Llamada GET al endpoint de productos aleatorios.
        const response = await axios.get("http://localhost:8080/api/producto/aleatorios");

        // Log de depuración: muestra los datos recibidos en consola.
        console.log("[useProductosAleatorios] Datos recibidos:", response.data);

        // Actualiza el estado con los productos recibidos.
        // response.data ya es una lista de ProductoDTO.
        setProductosAleatorios(response.data); 
        
      } catch (err) {
        // Si ocurre un error en la petición, se captura aquí.
        console.error("[useProductosAleatorios] Error:", err);

        // Si existe un callback de error, lo ejecuta.
        if (typeof onError === "function") onError(err);

        // Como fallback, deja el estado vacío.
        setProductosAleatorios([]);
      }
    };

    // Ejecuta la función al montar.
    fetchAleatorios();
  }, [onError]); // Dependencia: se vuelve a ejecutar si cambia la función onError.

  // Retorno del hook: expone directamente la lista de productos aleatorios.
  return productosAleatorios;
};

export default useProductosAleatorios;