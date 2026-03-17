import { useState, useEffect } from "react";
import axios from "axios";
import { leerLocal, escribirLocal } from "../helpers/storageUtils";

const useProductosLocalStorage = ({ clave = "productos", onError } = {}) => {
  const [productos, setProductos] = useState([]);

  // Cargar productos desde backend al montar
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("/api/producto/admin"); 
        setProductos(response.data); // List<ProductoDTO>
        escribirLocal(clave, response.data); // cache en localStorage
      } catch (err) {
        console.error("[useProductosLocalStorage] Error:", err);
        if (typeof onError === "function") onError(err);
        // fallback: leer desde localStorage
        const productosGuardados = leerLocal(clave, [], onError);
        setProductos(productosGuardados);
      }
    };

    fetchProductos();
  }, [clave, onError]);

  // Guardar producto en backend y actualizar cache
  const guardarProducto = async (productoDTO) => {
    try {
      const response = await axios.post("/api/producto", productoDTO);
      const nuevoProducto = response.data; // ProductoDTO
      const nuevosProductos = [...productos, nuevoProducto];
      setProductos(nuevosProductos);
      escribirLocal(clave, nuevosProductos);
      return nuevoProducto;
    } catch (err) {
      console.error("[useProductosLocalStorage] Error al guardar:", err);
      if (typeof onError === "function") onError(err);
      throw err;
    }
  };

  // Eliminar producto en backend y actualizar cache
  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`/api/producto/${id}`);
      const nuevosProductos = productos.filter(p => p.id !== id);
      setProductos(nuevosProductos);
      escribirLocal(clave, nuevosProductos);
    } catch (err) {
      console.error("[useProductosLocalStorage] Error al eliminar:", err);
      if (typeof onError === "function") onError(err);
      throw err;
    }
  };

  return { productos, guardarProducto, eliminarProducto };
};

export default useProductosLocalStorage;