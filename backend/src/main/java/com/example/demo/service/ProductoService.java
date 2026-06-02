package com.example.demo.service;

import com.example.demo.dto.ProductoDTO;
import com.example.demo.dto.CategoriaDTO;
import com.example.demo.model.Categoria;
import com.example.demo.model.Producto;
import com.example.demo.repository.CategoriaRepository;
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
    private final CategoriaRepository categoriaRepository;

    /**
     * Inyección de dependencia del Repository.
     * Spring instancia automáticamente ProductoRepository.
     */
    public ProductoService(ProductoRepository productoRepository, CategoriaRepository categoriaRepository) {
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
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
    public List<ProductoDTO> obtenerProductosAleatorios(int cantidad) {
        List<Producto> todos = productoRepository.findAll();
        Collections.shuffle(todos);
        return todos.stream()
                .limit(cantidad)
                .map(this::mapearProductoADTO)
                .toList();
    }

    /**
     * Obtiene un producto por su ID.
     *
     * @param id ID único del producto
     * @return Optional<Producto> con el producto si existe, vacío si no
     */
    public Optional<ProductoDTO> obtenerPorId(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));

        return Optional.of(mapearProductoADTO(producto));
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
    public Page<ProductoDTO> obtenerPaginados(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Producto> productos = productoRepository.findAll(pageable);

        return productos.map(this::mapearProductoADTO);
    }

    /**
     * Obtiene TODOS los productos sin paginación.
     *
     * CUIDADO: Para tablas muy grandes, puede ser lento.
     * Preferir obtenerPaginados() para producción.
     *
     * @return Lista completa de todos los productos
     */
    public List<ProductoDTO> obtenerTodos() {
        List<Producto> productos = productoRepository.findAll();

        return productos.stream()
                .map(this::mapearProductoADTO)
                .toList();
    }

    /**
     * Elimina TODOS los productos de la base de datos.
     *
     * CUIDADO: Operación destructiva sin recuperación.
     * Usar solo en casos de reseteo o testing.
     */
    public String borrarTodos() {
        productoRepository.deleteAll();
        return "Todos los productos se eliminaron correctamente";
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
    public String eliminarProducto(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new IllegalArgumentException("El producto no existe");
        }
        productoRepository.deleteById(id);
        return "Producto eliminado correctamente";
    }

    /**     * Asigna una categoría a un producto y retorna el ProductoDTO actualizado.*
     *  * @param productoId  id del producto
     *  * @param categoriaId id de la categoría a asignar
     *  * @return ProductoDTO actualizado con la categoría asignada
     *  * @throws IllegalArgumentException si producto o categoría no existen
     *  */
    public ProductoDTO asignarCategoria(Long productoId, Long categoriaId) {
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));

        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new IllegalArgumentException("Categoria no encontrada"));

        producto.setCategoria(categoria);
        Producto actualizado = productoRepository.save(producto);

        return mapearProductoADTO(actualizado);
    }

    /** * Obtiene todos los productos pertenecientes a una categoría determinada.
     * FLUJO:
     * 1. Llama a productoRepository.findByCategoriaId(categoriaId)
     * 2. Convierte cada entidad Producto a ProductoDTO incluyendo la categoría
     * 3. Retorna la lista de DTOs * * USAR: Endpoint de filtrado por categoría en el frontend (lista por categoría).
     * @param categoriaId id de la categoría por la cual filtrar productos * @return List<ProductoDTO> con los productos que pertenecen a la categoría */
    public List<ProductoDTO> obtenerPorCategoria(Long categoriaId) {
        List<Producto> productos = productoRepository.findByCategoriaId(categoriaId);

        return productos.stream()
                .map(this::mapearProductoADTO)
                .toList();
    }

    /**     * Método auxiliar privado para mapear una entidad Producto a ProductoDTO.
     * FLUJO:
     * 1. Extrae datos de la entidad Producto
     * 2. Si la categoría existe, mapea Categoria a CategoriaDTO
     * 3. Construye y retorna ProductoDTO con todos los datos
     * VENTAJA: Centraliza la lógica de mapeo para evitar duplicación en todos los métodos.
     * @param producto Entidad Producto a mapear     * @return ProductoDTO mapeado con CategoriaDTO si existe
     */
    private ProductoDTO mapearProductoADTO(Producto producto) {
        CategoriaDTO categoriaDTO = null;

        if (producto.getCategoria() != null) {
            Categoria categoria = producto.getCategoria();
            categoriaDTO = new CategoriaDTO(categoria.getId(), categoria.getNombre());
        }

        return new ProductoDTO(
                producto.getId(),
                producto.getNombre(),
                producto.getDescripcion(),
                producto.getTipo(),
                producto.getImagenes(),
                categoriaDTO
        );
    }
}


