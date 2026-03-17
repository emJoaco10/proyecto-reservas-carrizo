import { useState, useEffect } from 'react';
import axios from 'axios';

const useProductosAleatorios = ({ onError } = {}) => {
  const [productosAleatorios, setProductosAleatorios] = useState([]);

  useEffect(() => {
    const fetchAleatorios = async () => {
      try {
        const response = await axios.get("/api/productos/aleatorios");
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