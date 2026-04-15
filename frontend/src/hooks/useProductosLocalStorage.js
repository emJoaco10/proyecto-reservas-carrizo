import { useState, useEffect } from "react";
import axios from "axios";
import { leerLocal, escribirLocal } from "../helpers/storageUtils";

// Hook personalizado para manejar productos con persistencia en localStorage.
// - Combina estado React, llamadas al backend y almacenamiento local.
// - Devuelve productos y funciones CRUD para manipularlos.
const useProductosLocalStorage = ({ clave = "productos", onError } = {}) => {

  // Estado React: guarda la lista de productos en memoria.
  // Cada vez que se actualiza con setProductos, el componente se re-renderiza.
  const [productos, setProductos] = useState([]);

  // Efecto: se ejecuta al montar el componente (y si cambia 'clave').
  // Intenta cargar productos desde el backend. Si falla, usa localStorage como fallback.
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // Llamada GET al backend para obtener productos administrables.
        const response = await axios.get("http://localhost:8080/api/producto/admin"); 

        // Actualiza el estado con los productos recibidos.
        setProductos(response.data); 

        // Sincroniza también en localStorage para persistencia.
        escribirLocal(clave, response.data); 
      } catch (err) {
        console.error("[useProductosLocalStorage] Error:", err);

        // Si hay callback de error, lo ejecuta.
        if (typeof onError === "function") onError(err);
        
        // Si el backend falla, recupera productos guardados en localStorage.
        const productosGuardados = leerLocal(clave, [], onError);
        setProductos(productosGuardados);
      }
    };

    // Ejecuta la función al montar.
    fetchProductos();
  }, [clave]); // Dependencia: se vuelve a ejecutar si cambia la clave.

  // Función para guardar un producto nuevo en backend y actualizar cache/localStorage.
  const guardarProducto = async (productoDTO) => {
    try {
      // POST al backend con el producto nuevo.
      const response = await axios.post("http://localhost:8080/api/producto", productoDTO);
      const nuevoProducto = response.data; 

      // Crea una nueva lista agregando el producto.
      const nuevosProductos = [...productos, nuevoProducto];

      // Actualiza estado y localStorage.
      setProductos(nuevosProductos);
      escribirLocal(clave, nuevosProductos);

      // Devuelve resultado exitoso.
      return { ok: true, data: nuevoProducto };
    } catch (err) {
      console.error("[useProductosLocalStorage] Error al guardar:", err);
      if (typeof onError === "function") onError(err);
      return { ok: false, error: err.message };
    }
  };

  // Función para eliminar un producto por id en backend y actualizar cache/localStorage.
  const eliminarProducto = async (id) => {
    try {
      // DELETE al backend con el id del producto.
      await axios.delete(`http://localhost:8080/api/producto/${id}`);

      // Filtra la lista actual para quitar el producto eliminado.
      const nuevosProductos = productos.filter(p => p.id !== id);

      // Actualiza estado y localStorage.
      setProductos(nuevosProductos);
      escribirLocal(clave, nuevosProductos);
    } catch (err) {
      console.error("[useProductosLocalStorage] Error al eliminar:", err);
      if (typeof onError === "function") onError(err);
      throw err; // Propaga el error para que el componente lo maneje.
    }
  };

  // Función para borrar todos los productos en backend y limpiar cache/localStorage.
  const borrarTodos = async () => {
  try {
    // DELETE al backend con endpoint que borra todos.
    await axios.delete("http://localhost:8080/api/producto"); // nuevo endpoint en el controlador
    
    // Limpia estado y localStorage.
    setProductos([]);
    escribirLocal(clave, []);

    return { ok: true };
  } catch (err) {
    console.error("[useProductosLocalStorage] Error al borrar todos:", err);
    if (typeof onError === "function") onError(err);
    return { ok: false, error: err.message };
  }
};

// Retorno del hook: expone estado y funciones CRUD.
  return { productos, guardarProducto, eliminarProducto, borrarTodos };
};

export default useProductosLocalStorage;