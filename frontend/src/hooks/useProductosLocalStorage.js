import { useState, useEffect } from "react";
import axios from "axios";
import { leerLocal, escribirLocal } from "../helpers/storageUtils";

const useProductosLocalStorage = ({ clave = "productos", onError } = {}) => {
  const [productos, setProductos] = useState([]);

  // Cargar productos desde backend al montar
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/producto/admin"); 
        setProductos(response.data); 
        escribirLocal(clave, response.data); 
      } catch (err) {
        console.error("[useProductosLocalStorage] Error:", err);
        if (typeof onError === "function") onError(err);
        
        const productosGuardados = leerLocal(clave, [], onError);
        setProductos(productosGuardados);
      }
    };

    fetchProductos();
  }, [clave]);

  // Guardar producto en backend y actualizar cache
  const guardarProducto = async (productoDTO) => {
    try {
      const response = await axios.post("http://localhost:8080/api/producto", productoDTO);
      const nuevoProducto = response.data; // ProductoDTO
      const nuevosProductos = [...productos, nuevoProducto];
      setProductos(nuevosProductos);
      escribirLocal(clave, nuevosProductos);
      return { ok: true, data: nuevoProducto };
    } catch (err) {
      console.error("[useProductosLocalStorage] Error al guardar:", err);
      if (typeof onError === "function") onError(err);
      return { ok: false, error: err.message };
    }
  };

  // Eliminar producto en backend y actualizar cache
  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/producto/${id}`);
      const nuevosProductos = productos.filter(p => p.id !== id);
      setProductos(nuevosProductos);
      escribirLocal(clave, nuevosProductos);
    } catch (err) {
      console.error("[useProductosLocalStorage] Error al eliminar:", err);
      if (typeof onError === "function") onError(err);
      throw err;
    }
  };

  const borrarTodos = async () => {
  try {
    await axios.delete("http://localhost:8080/api/producto"); // nuevo endpoint en el controlador
    setProductos([]);
    escribirLocal(clave, []);
    return { ok: true };
  } catch (err) {
    console.error("[useProductosLocalStorage] Error al borrar todos:", err);
    if (typeof onError === "function") onError(err);
    return { ok: false, error: err.message };
  }
};

  return { productos, guardarProducto, eliminarProducto, borrarTodos };
};

export default useProductosLocalStorage;