package com.example.demo.service;

import com.example.demo.dto.CaracteristicaDTO;
import com.example.demo.dto.ProductoDTO;
import com.example.demo.dto.CategoriaDTO;
import com.example.demo.model.Caracteristica;
import com.example.demo.model.Categoria;
import com.example.demo.model.Producto;
import com.example.demo.repository.CaracteristicaRepository;
import com.example.demo.repository.CategoriaRepository;
import com.example.demo.repository.ProductoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * Servicio de lógica de negocio para la entidad Producto.
 *
 * Centraliza las operaciones relacionadas con productos, incluyendo:
 * - Creación y actualización.
 * - Consultas y filtrado.
 * - Asociación de categorías.
 * - Asociación de características.
 * - Eliminación.
 * - Conversión de entidades a DTOs.
 *
 * La comunicación con la base de datos se realiza mediante los repositories
 * correspondientes.
 */
@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;
    private final CaracteristicaRepository caracteristicaRepository;

    /**
     * Constructor utilizado por Spring para inyectar los repositories
     * necesarios para gestionar productos, categorías y características.
     */
    public ProductoService(ProductoRepository productoRepository, CategoriaRepository categoriaRepository, CaracteristicaRepository caracteristicaRepository) {
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
        this.caracteristicaRepository = caracteristicaRepository;
    }

    /**
     * Registra un nuevo producto.
     *
     * Antes de guardarlo verifica que no exista otro producto con el mismo
     * nombre para evitar registros duplicados.
     *
     * @param producto producto que se desea registrar
     * @return producto guardado con su ID generado
     * @throws IllegalArgumentException si ya existe un producto con el mismo nombre
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
     * Obtiene una cantidad determinada de productos de forma aleatoria.
     *
     * Primero obtiene todos los productos, luego mezcla la lista y finalmente
     * limita la cantidad de resultados solicitada.
     *
     * @param cantidad cantidad máxima de productos a retornar
     * @return lista de productos aleatorios convertidos a ProductoDTO
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
     * Busca un producto por su identificador.
     *
     * @param id identificador del producto
     * @return Optional que contiene el ProductoDTO encontrado
     * @throws IllegalArgumentException si no existe un producto con ese ID
     */
    public Optional<ProductoDTO> obtenerPorId(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));

        return Optional.of(mapearProductoADTO(producto));
    }

    /**
     * Obtiene los productos utilizando paginación.
     *
     * La paginación permite consultar únicamente una parte de los productos
     * en cada solicitud, evitando cargar toda la información de una vez.
     *
     * @param page número de página, comenzando desde 0
     * @param size cantidad de productos por página
     * @return página de productos convertidos a ProductoDTO
     */
    public Page<ProductoDTO> obtenerPaginados(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Producto> productos = productoRepository.findAll(pageable);

        return productos.map(this::mapearProductoADTO);
    }

    /**
     * Obtiene todos los productos registrados.
     *
     * Este método no utiliza paginación, por lo que para una gran cantidad
     * de registros se recomienda utilizar obtenerPaginados().
     *
     * @return lista completa de productos convertidos a ProductoDTO
     */
    public List<ProductoDTO> obtenerTodos() {
        List<Producto> productos = productoRepository.findAll();

        return productos.stream()
                .map(this::mapearProductoADTO)
                .toList();
    }

    /**
     * Elimina todos los productos registrados.
     *
     * Es una operación destructiva y debe utilizarse únicamente cuando
     * sea necesario realizar un reseteo o durante tareas de testing.
     *
     * @return mensaje indicando que los productos fueron eliminados
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

    /**
     * Asocia una categoría existente a un producto.
     *
     * Busca tanto el producto como la categoría y actualiza la relación
     * antes de guardar los cambios.
     *
     * @param categoriaId identificador de la categoría
     * @param productoId identificador del producto
     * @return producto actualizado convertido a ProductoDTO
     * @throws IllegalArgumentException si el producto o la categoría no existen
     */
    public ProductoDTO asignarCategoria(Long productoId, Long categoriaId) {
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));

        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new IllegalArgumentException("Categoria no encontrada"));

        producto.setCategoria(categoria);
        Producto actualizado = productoRepository.save(producto);

        return mapearProductoADTO(actualizado);
    }

    /**
     * Obtiene todos los productos asociados a una categoría específica.
     *
     * Se utiliza principalmente para el filtrado de productos por categoría.
     *
     * @param categoriaId identificador de la categoría
     * @return lista de productos pertenecientes a la categoría
     */
    public List<ProductoDTO> obtenerPorCategoria(Long categoriaId) {
        List<Producto> productos = productoRepository.findByCategoriaId(categoriaId);

        return productos.stream()
                .map(this::mapearProductoADTO)
                .toList();
    }

    /**
     * Convierte una entidad Producto en un ProductoDTO.
     *
     * Además de los datos básicos del producto, incluye la información
     * necesaria de su categoría y características para enviarla al frontend.
     *
     * Este método centraliza el mapeo y evita repetir esta lógica en
     * los diferentes métodos del servicio.
     *
     * @param producto entidad Producto que se desea convertir
     * @return ProductoDTO correspondiente a la entidad recibida
     */
    private ProductoDTO mapearProductoADTO(Producto producto) {

        CategoriaDTO categoriaDTO = null;

        if (producto.getCategoria() != null) {

            Categoria categoria = producto.getCategoria();

            categoriaDTO = new CategoriaDTO(

                    categoria.getId(),
                    categoria.getNombre()
            );
        }

        List<CaracteristicaDTO> caracteristicasDTO = List.of();

        if (producto.getCaracteristicas() != null) {

            caracteristicasDTO = producto.getCaracteristicas()
                    .stream()
                    .map(caracteristica -> new CaracteristicaDTO(

                            caracteristica.getId(),
                            caracteristica.getNombre(),
                            caracteristica.getIcono()

                    ))
                    .toList();
        }
        return new ProductoDTO(

                producto.getId(),
                producto.getNombre(),
                producto.getDescripcion(),
                producto.getImagenes(),
                categoriaDTO,
                caracteristicasDTO
        );
    }

    /**
     * Obtiene los productos asociados a cualquiera de las categorías
     * indicadas.
     *
     * Se utiliza para soportar el filtrado mediante múltiples categorías.
     *
     * @param categoriaIds lista de identificadores de categorías
     * @return lista de productos pertenecientes a las categorías indicadas
     */
    public List<ProductoDTO> obtenerPorCategorias(List<Long> categoriaIds) {

        List<Producto> productos =
                productoRepository.findByCategoriaIdIn(categoriaIds);

        return productos.stream()
                .map(this::mapearProductoADTO)
                .toList();
    }

    /**
     * Actualiza un producto existente.
     *
     * Actualiza sus datos principales, categoría y características.
     * Si no se recibe una categoría, se elimina la asociación existente.
     *
     * Las características recibidas se buscan en la base de datos antes
     * de asociarlas al producto.
     *
     * @param id identificador del producto a actualizar
     * @param productoDTO datos actualizados del producto
     * @return producto actualizado convertido a ProductoDTO
     * @throws IllegalArgumentException si el producto, categoría o característica
     *                                  indicada no existe
     */
    public ProductoDTO actualizarProducto(Long id, ProductoDTO productoDTO) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));

        // Actualizar campos básicos
        producto.setNombre(productoDTO.getNombre());
        producto.setDescripcion(productoDTO.getDescripcion());
        producto.setImagenes(productoDTO.getImagenes());

        // Actualizar categoría si viene en el DTO
        if (productoDTO.getCategoria() != null && productoDTO.getCategoria().getId() != null) {
            Categoria categoria = categoriaRepository.findById(productoDTO.getCategoria().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Categoría no encontrada"));
            producto.setCategoria(categoria);
        } else {
            producto.setCategoria(null); // opcional: limpiar categoría si no se envía
        }
        // Actualizar características
        if (productoDTO.getCaracteristicas() != null) {

            List<Caracteristica> caracteristicas = productoDTO.getCaracteristicas()
                    .stream()
                    .map(caracteristicaDTO -> caracteristicaRepository.findById(caracteristicaDTO.getId())
                            .orElseThrow(() -> new IllegalArgumentException(
                                    "Característica no encontrada: " + caracteristicaDTO.getId())))
                    .toList();

            producto.setCaracteristicas(caracteristicas);
        }

        Producto actualizado = productoRepository.save(producto);
        return mapearProductoADTO(actualizado);
    }

    /**
     * Reemplaza las características asociadas a un producto.
     *
     * Recibe una lista de IDs, busca cada característica en la base de datos
     * y establece la lista resultante en el producto.
     *
     * @param productoId identificador del producto
     * @param caracteristicasId IDs de las características a asociar
     * @return producto actualizado convertido a ProductoDTO
     * @throws IllegalArgumentException si el producto o alguna característica
     *                                  no existe
     */
    public ProductoDTO asignarCaracteristicas(
            Long productoId,
            List<Long> caracteristicasId) {

        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Producto no encontrado"));

        List<Caracteristica> caracteristicas = new ArrayList<>(
                caracteristicasId.stream()
                        .map(id -> caracteristicaRepository.findById(id)
                                .orElseThrow(() ->
                                        new IllegalArgumentException(
                                                "Característica no encontrada: " + id)))
                        .toList()
        );

        producto.setCaracteristicas(caracteristicas);

        Producto actualizado = productoRepository.save(producto);

        return mapearProductoADTO(actualizado);

    }
}


