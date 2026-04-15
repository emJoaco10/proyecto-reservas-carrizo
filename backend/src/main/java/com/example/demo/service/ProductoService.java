package com.example.demo.service;

import com.example.demo.model.Producto;
import com.example.demo.repository.ProductoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * Servicio de lógica de negocio para la entidad Producto.
 *
 * Encapsula todas las operaciones relacionadas con productos:
 * - Validación de duplicados
 * - Recuperación de datos (aleatorios, paginados, todos)
 * - Eliminación de productos
 *
 * Comunica con ProductoRepository para acceso a datos.
 *
 * IMPORTANTE: La validación se realiza AQUÍ, no en el Controller.
 *
 * @author Backend Team
 * @version 1.0
 */
@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    /**
     * Inyección de dependencia del Repository.
     * Spring instancia automáticamente ProductoRepository.
     */
    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    /**
     * Guarda un nuevo producto en la base de datos.
     *
     * VALIDACIÓN: Verifica que no exista otro producto con el mismo nombre.
     * Si existe, lanza IllegalArgumentException.
     *
     * @param producto Objeto Producto a guardar
     * @return Producto guardado con ID asignado por la BD
     * @throws IllegalArgumentException si el nombre ya está en uso
     */
    public Producto guardarProducto (Producto producto){
        // Validación: buscar duplicados por nombre
        Optional<Producto> existente = productoRepository.findByNombre(producto.getNombre());
        if (existente.isPresent()) {
            throw new IllegalArgumentException("El nombre ya está en uso");
        }
        return productoRepository.save(producto);
    }

    /**
     * Obtiene una cantidad limitada de productos de forma aleatoria.
     *
     * Flujo:
     * 1. Obtiene TODOS los productos de la BD
     * 2. Baraja la lista con Collections.shuffle()
     * 3. Limita el resultado a la cantidad solicitada
     *
     * NOTA: Para bases de datos grandes, considerar usar SQL RANDOM() en el futuro.
     *
     * @param cantidad Número máximo de productos a retornar
     * @return Lista de productos aleatorios (máx. 'cantidad' elementos)
     */
    public List<Producto> obtenerProductosAleatorios(int cantidad) {
        List<Producto> todos = productoRepository.findAll();
        Collections.shuffle(todos);
        return todos.stream().limit(cantidad).toList();
    }

    /**
     * Obtiene un producto por su ID.
     *
     * @param id ID único del producto
     * @return Optional<Producto> con el producto si existe, vacío si no
     */
    public Optional<Producto> obtenerPorId(Long id) {
        return productoRepository.findById(id);
    }

    /**
     * Obtiene productos con paginación.
     *
     * Útil para listados grandes en el frontend.
     * Retorna un objeto Page con:
     * - content: lista de productos en la página actual
     * - totalElements: cantidad total de productos
     * - totalPages: cantidad total de páginas
     * - currentPage: página solicitada
     *
     * @param page Número de página (0-indexed)
     * @param size Cantidad de elementos por página
     * @return Page<Producto> con datos paginados
     */
    public Page<Producto> obtenerPaginados(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productoRepository.findAll(pageable);
    }

    /**
     * Obtiene TODOS los productos sin paginación.
     *
     * CUIDADO: Para tablas muy grandes, puede ser lento.
     * Preferir obtenerPaginados() para producción.
     *
     * @return Lista completa de todos los productos
     */
    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    /**
     * Elimina TODOS los productos de la base de datos.
     *
     * CUIDADO: Operación destructiva sin recuperación.
     * Usar solo en casos de reseteo o testing.
     */
    public void borrarTodos() {
        productoRepository.deleteAll();
    }

    /**
     * Elimina un producto específico por ID.
     *
     * VALIDACIÓN: Verifica que el producto exista antes de eliminarlo.
     * Si no existe, lanza IllegalArgumentException.
     *
     * @param id ID del producto a eliminar
     * @throws IllegalArgumentException si el producto no existe
     */
    public void eliminarProducto(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new IllegalArgumentException("El producto no existe");
        }
        productoRepository.deleteById(id);
    }
}


