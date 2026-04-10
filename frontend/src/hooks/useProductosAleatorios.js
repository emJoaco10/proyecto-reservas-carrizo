import { useState, useEffect } from 'react';
import axios from 'axios';

const useProductosAleatorios = ({ onError } = {}) => {
  const [productosAleatorios, setProductosAleatorios] = useState([]);

  useEffect(() => {
    const fetchAleatorios = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/producto/aleatorios");
        console.log("[useProductosAleatorios] Datos recibidos:", response.data);
        setProductosAleatorios(response.data); // Esto ya es List<ProductoDTO>
      } catch (err) {
        console.error("[useProductosAleatorios] Error:", err);
        if (typeof onError === "function") onError(err);
        setProductosAleatorios([]);
      }
    };

    fetchAleatorios();
  }, [onError]);

  return productosAleatorios;
};

export default useProductosAleatorios;