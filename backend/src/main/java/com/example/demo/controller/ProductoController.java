package com.example.demo.controller;
import com.example.demo.dto.CategoriaDTO;
import com.example.demo.dto.ProductoDTO;
import com.example.demo.model.Categoria;
import com.example.demo.model.Producto;
import com.example.demo.repository.CategoriaRepository;
import com.example.demo.service.ProductoService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import java.util.Optional;
import jakarta.validation.Valid;

/**
 * Controller REST encargado de exponer las operaciones relacionadas
 * con productos y algunas consultas relacionadas con categorías.
 *
 * Ruta base: /api/producto
 *
 * El Controller recibe las solicitudes HTTP, delega la lógica de negocio
 * al ProductoService y devuelve DTOs al frontend.
 */
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/producto")
public class ProductoController {

    /**
     * Servicio inyectado para acceso a lógica de negocio.
     * Spring lo instancia automáticamente (inyección de dependencias).
     */
    private final ProductoService productoService;
    private final CategoriaRepository categoriaRepository;

    /**
     * Constructor utilizado por Spring para inyectar las dependencias
     * necesarias para gestionar productos y consultar categorías.
     */
    public ProductoController(ProductoService productoService, CategoriaRepository categoriaRepository) {
        this.productoService = productoService;
        this.categoriaRepository = categoriaRepository;
    }

    /**
     * Registra un nuevo producto.
     *
     * Recibe un ProductoDTO, convierte los datos necesarios a una entidad
     * Producto y delega el guardado al ProductoService.
     *
     * El Service se encarga de validar que no exista otro producto
     * con el mismo nombre.
     *
     * @param productoDTO datos del producto que se desea registrar
     * @return producto creado convertido a ProductoDTO
     */
    @PostMapping
    public ResponseEntity<?> registrarProducto(
            @Valid @RequestBody ProductoDTO productoDTO) {

        try {

            // 1. Mapeo DTO → Entity
            Producto producto = new Producto();

            producto.setNombre(productoDTO.getNombre());
            producto.setDescripcion(productoDTO.getDescripcion());
            producto.setImagenes(productoDTO.getImagenes());

            // 2. Asociar categoría seleccionada
            if (productoDTO.getCategoria() == null
                    || productoDTO.getCategoria().getId() == null) {

                throw new IllegalArgumentException(
                        "La categoría es obligatoria"
                );
            }

            Categoria categoria = categoriaRepository
                    .findById(productoDTO.getCategoria().getId())
                    .orElseThrow(() ->
                            new IllegalArgumentException(
                                    "Categoría no encontrada"
                            )
                    );

            producto.setCategoria(categoria);

            // 3. Guardar producto
            Producto nuevo =
                    productoService.guardarProducto(producto);

            // 4. Obtener DTO completo
            Optional<ProductoDTO> dto =
                    productoService.obtenerPorId(nuevo.getId());

            return dto.map(ResponseEntity::ok)
                    .orElseGet(() ->
                            ResponseEntity.status(500)
                                    .body(new ProductoDTO(
                                            null,
                                            null,
                                            null,
                                            null,
                                            null,
                                            null
                                    ))
                    );

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    /**
     * Obtiene una cantidad fija de productos aleatorios.
     *
     * Actualmente solicita 10 productos al Service.
     *
     * @return lista de productos aleatorios como ProductoDTO
     */
    @GetMapping("/aleatorios")
    public ResponseEntity<List<ProductoDTO>> obtenerAleatorios() {
        List<ProductoDTO> dtos = productoService.obtenerProductosAleatorios(10);

        return ResponseEntity.ok(dtos);
    }

    /**
     * Busca productos cuyo nombre contenga el texto indicado.
     *
     * Recibe el texto de búsqueda mediante el parámetro "texto"
     * y delega la consulta al ProductoService.
     *
     * @param texto texto utilizado como criterio de búsqueda
     * @return lista de productos coincidentes como ProductoDTO
     */
    @GetMapping("/buscar")
    public ResponseEntity<List<ProductoDTO>> buscarPorNombre(
            @RequestParam String texto) {

        List<ProductoDTO> productos =
                productoService.buscarPorNombre(texto);

        return ResponseEntity.ok(productos);
    }

    /**
     * Obtiene un producto específico mediante su ID.
     *
     * @param id identificador del producto
     * @return ProductoDTO correspondiente al producto encontrado
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> obtenerPorId(@PathVariable Long id) {
        ProductoDTO dto = productoService.obtenerPorId(id)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));
        return ResponseEntity.ok(dto);
    }

    /**
     * Obtiene productos utilizando paginación.
     *
     * Los parámetros permiten indicar qué página consultar y cuántos
     * productos incluir en cada página.
     *
     * Valores predeterminados:
     * - page = 0
     * - size = 10
     *
     * @param page número de página, comenzando desde 0
     * @param size cantidad de productos por página
     * @return página de productos como ProductoDTO
     */
    @GetMapping("/paginados")
    public ResponseEntity<Page<ProductoDTO>> obtenerPaginados(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<ProductoDTO> dtos = productoService.obtenerPaginados(page, size);
        return ResponseEntity.ok(dtos);
    }

    /**
     * Obtiene todos los productos para las funcionalidades administrativas.
     *
     * La consulta no utiliza paginación.
     *
     * @return lista completa de productos como ProductoDTO
     */
    @GetMapping("/admin")
    public ResponseEntity<List<ProductoDTO>> obtenerTodosParaAdmin() {
        List<ProductoDTO> dtos = productoService.obtenerTodos();

        return ResponseEntity.ok(dtos);
    }


    /**
     * Elimina todos los productos registrados.
     *
     * Es una operación destructiva y debe utilizarse principalmente
     * durante tareas de testing o reseteo de datos.
     *
     * @return mensaje de confirmación
     */
    @DeleteMapping
    public ResponseEntity<String> borrarTodos() {
        String mensaje = productoService.borrarTodos();
        return ResponseEntity.ok(mensaje);
    }


    /**
     * Elimina un producto específico mediante su ID.
     *
     * El Service verifica previamente que el producto exista.
     *
     * @param id identificador del producto a eliminar
     * @return mensaje de confirmación
     */

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarProducto(@PathVariable Long id) {
        String mensaje = productoService.eliminarProducto(id);
        return ResponseEntity.ok(mensaje);
    }


    /**
     * Asigna una categoría existente a un producto.
     *
     * Recibe el ID de la categoría en el cuerpo de la solicitud.
     *
     * @param id identificador del producto
     * @param categoriaId identificador de la categoría
     * @return producto actualizado como ProductoDTO
     */
    @PutMapping("/{id}/categoria")
    public ResponseEntity<ProductoDTO> asignarCategoria(@PathVariable Long id, @RequestBody Long categoriaId) {
        ProductoDTO actualizado = productoService.asignarCategoria(id, categoriaId);
        return ResponseEntity.ok(actualizado);
    }

    /**
     * Asigna una lista de características existentes a un producto.
     *
     * @param id identificador del producto
     * @param caracteristicasId lista de IDs de características
     * @return producto actualizado como ProductoDTO
     */
    @PutMapping("/{id}/caracteristicas")
    public ResponseEntity<ProductoDTO> asignarCaracteristicas(
            @PathVariable Long id,
            @RequestBody List<Long> caracteristicasId) {

        ProductoDTO actualizado =
                productoService.asignarCaracteristicas(id, caracteristicasId);

        return ResponseEntity.ok(actualizado);

    }

    /**
     * Obtiene los productos asociados a una categoría específica.
     *
     * Se utiliza para el filtrado por categoría.
     *
     * @param id identificador de la categoría
     * @return lista de productos pertenecientes a la categoría
     */
    @GetMapping("/categoria/{id}")
    public ResponseEntity<List<ProductoDTO>> obtenerPorCategoria(@PathVariable Long id) {
        List<ProductoDTO> dtos = productoService.obtenerPorCategoria(id);
        return ResponseEntity.ok(dtos);
    }

    /**
     * Obtiene productos pertenecientes a una o varias categorías.
     *
     * Recibe los IDs de las categorías mediante el parámetro de consulta
     * "ids".
     *
     * Ejemplo:
     * /api/producto/categoriasFiltro?ids=1,2
     *
     * @param ids lista de IDs de categorías
     * @return productos pertenecientes a las categorías indicadas
     */
    @GetMapping("/categoriasFiltro")
    public ResponseEntity<List<ProductoDTO>> obtenerPorCategorias(@RequestParam List<Long> ids) {

        return ResponseEntity.ok(
                productoService.obtenerPorCategorias(ids)
        );
    }

    /**
     * Obtiene las categorías disponibles.
     *
     * Consulta el CategoriaRepository y convierte cada entidad Categoria
     * a un CategoriaDTO antes de enviarla al frontend.
     *
     * Este endpoint es utilizado para cargar las categorías disponibles
     * en las funcionalidades de filtrado y gestión de productos.
     *
     * @return lista de categorías como CategoriaDTO
     */
    @GetMapping("/categorias")
    public ResponseEntity<List<CategoriaDTO>> getCategorias() {
    List<CategoriaDTO> categorias = categoriaRepository.findAll()
            .stream()
            .map(c -> new CategoriaDTO(c.getId(), c.getNombre()))
            .toList();

    return ResponseEntity.ok(categorias);
}


    /**
     * Actualiza un producto existente.
     *
     * Recibe un ProductoDTO con los nuevos datos y delega la actualización
     * al ProductoService.
     *
     * La lógica de actualización incluye los datos principales del producto,
     * su categoría y sus características.
     *
     * @param id identificador del producto
     * @param productoDTO datos actualizados del producto
     * @return producto actualizado como ProductoDTO
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProductoDTO> actualizarProducto(
            @PathVariable Long id,
            @Valid @RequestBody ProductoDTO productoDTO) {
        ProductoDTO actualizado = productoService.actualizarProducto(id, productoDTO);
        return ResponseEntity.ok(actualizado);
    }
}

