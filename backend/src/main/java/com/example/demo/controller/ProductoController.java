package com.example.demo.controller;
import com.example.demo.dto.ProductoDTO;
import com.example.demo.model.Producto;
import com.example.demo.service.ProductoService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import java.util.Optional;

/**
 * Controller REST para gestionar productos.
 *
 * PROPÓSITO: Exponer endpoints HTTP para operaciones CRUD de productos.
 *
 * RUTA BASE: /api/producto
 *
 * Endpoints:
 * - POST /api/producto → Registrar nuevo producto
 * - GET /api/producto/aleatorios → Obtener aleatorios
 * - GET /api/producto/{id} → Obtener por ID
 * - GET /api/producto/paginados → Obtener paginados
 * - GET /api/producto/admin → Obtener todos (para admin)
 * - DELETE /api/producto → Eliminar todos
 * - DELETE /api/producto/{id} → Eliminar uno
 *
 * PATRÓN: Siempre se retorna ProductoDTO, nunca Entity directo.
 *
 * CORS: Habilitado para http://localhost:5173 (frontend Vite)
 *
 * @author Backend Team
 * @version 1.0
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

    /**
     * Constructor con inyección de ProductoService.
     */
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    /**
     * POST /api/producto
     *
     * Registra un nuevo producto en la base de datos.
     *
     * FLUJO:
     * 1. Recibe ProductoDTO en cuerpo JSON
     * 2. Convierte DTO → Entity (Producto)
     * 3. Llama a ProductoService.guardarProducto() para validación y persistencia
     * 4. Convierte Entity guardado → DTO para respuesta JSON
     * 5. Retorna 200 OK con producto creado
     *
     * VALIDACIÓN: El Service valida que el nombre no sea duplicado.
     * Si falla, retorna 400 Bad Request con mensaje de error.
     *
     * @param productoDTO DTO con datos del producto a crear
     * @return ResponseEntity con ProductoDTO guardado (id asignado por BD)
     */
    @PostMapping
    public ResponseEntity<?> registrarProducto(@RequestBody ProductoDTO productoDTO) {

        try{
            // 1. Mapeo DTO → Entity
            Producto producto = new Producto();
            producto.setNombre(productoDTO.getNombre());
            producto.setDescripcion(productoDTO.getDescripcion());
            producto.setTipo(productoDTO.getTipo());
            producto.setImagenes(productoDTO.getImagenes());

            // 2. Guardar en servicio (valida duplicados, persiste)
            Producto nuevo = productoService.guardarProducto(producto);

        // 3. Obtener DTO usando el método del servicio que ya maneja el mapeo
        Optional<ProductoDTO> dto = productoService.obtenerPorId(nuevo.getId());

            ;return dto.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(500)
                            .body(new ProductoDTO(null, null, null, null, null, null)));

        } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
    }

    /**
     * GET /api/producto/aleatorios
     *
     * Obtiene una lista de productos aleatorios.
     *
     * FLUJO:
     * 1. Llama a ProductoService.obtenerProductosAleatorios(10)
     * 2. Convierte cada Entity a DTO
     * 3. Retorna lista de DTOs
     *
     * USAR: En frontend para mostrar recomendaciones en home.
     * Cada llamada retorna productos diferentes (baraja la lista).
     *
     * @return ResponseEntity con List<ProductoDTO> aleatorios
     */
    @GetMapping("/aleatorios")
    public ResponseEntity<List<ProductoDTO>> obtenerAleatorios() {
        List<ProductoDTO> dtos = productoService.obtenerProductosAleatorios(10);

        return ResponseEntity.ok(dtos);
    }

    /**
     * GET /api/producto/{id}
     * <p>
     * Obtiene un producto específico por su ID.
     * <p>
     * FLUJO:
     * 1. Extrae ID de la URL (path variable)
     * 2. Llama a ProductoService.obtenerPorId(id)
     * 3. Si existe, convierte Entity → DTO y retorna 200
     * 4. Si no existe, retorna 404 Not Found
     * <p>
     * USAR: En frontend para cargar detalle de producto.
     *
     * @param id ID del producto a obtener
     * @return ResponseEntity con ProductoDTO si existe, 404 si no
     */
    @GetMapping("/{id}")
    public ResponseEntity<Optional<ProductoDTO>> obtenerPorId(@PathVariable Long id) {
        Optional<ProductoDTO> dto = productoService.obtenerPorId(id);
        return ResponseEntity.ok(dto);
    }

    /**
     * GET /api/producto/paginados?page=0&size=10
     *
     * Obtiene productos con paginación.
     *
     * FLUJO:
     * 1. Extrae parámetros page y size de la query string
     * 2. Llama a ProductoService.obtenerPaginados(page, size)
     * 3. Convierte Page<Entity> → Page<DTO>
     * 4. Retorna objeto Page con metadata (total, páginas, etc.)
     *
     * USAR: En admin panel o listado con scroll infinito.
     *
     * PARÁMETROS POR DEFECTO:
     * - page: 0 (primera página)
     * - size: 10 (10 elementos por página)
     *
     * @param page Número de página (0-indexed)
     * @param size Elementos por página
     * @return ResponseEntity con Page<ProductoDTO>
     */
    @GetMapping("/paginados")
    public ResponseEntity<Page<ProductoDTO>> obtenerPaginados(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<ProductoDTO> dtos = productoService.obtenerPaginados(page, size);
        return ResponseEntity.ok(dtos);
    }

    /**
     * GET /api/producto/admin
     *
     * Obtiene TODOS los productos sin paginación.
     * Destinado al panel de administración.
     *
     * FLUJO:
     * 1. Llama a ProductoService.obtenerTodos()
     * 2. Convierte cada Entity a DTO
     * 3. Retorna lista completa
     *
     * CUIDADO: Para tablas grandes, puede ser lento.
     * Considerar paginar en el futuro.
     *
     * USAR: En ListaProductosAdmin.jsx para llenar tabla de admin.
     *
     * @return ResponseEntity con List<ProductoDTO> todos
     */
    @GetMapping("/admin")
    public ResponseEntity<List<ProductoDTO>> obtenerTodosParaAdmin() {
        List<ProductoDTO> dtos = productoService.obtenerTodos();

        return ResponseEntity.ok(dtos);
    }


    /**
     * DELETE /api/producto
     *
     * Elimina TODOS los productos de la base de datos.
     *
     * ⚠️ PELIGRO: Operación destructiva sin recuperación.
     *
     * USAR: Solo en testing o reseteo de datos.
     * En producción, proteger con JWT o admin-only.
     *
     * @return ResponseEntity con mensaje de confirmación
     */
    @DeleteMapping
    public ResponseEntity<String> borrarTodos() {
        String mensaje = productoService.borrarTodos();
        return ResponseEntity.ok(mensaje);
    }


    /**
     * DELETE /api/producto/{id}
     *
     * Elimina un producto específico por su ID.
     *
     * FLUJO:
     * 1. Extrae ID de la URL
     * 2. Llama a ProductoService.eliminarProducto(id)
     * 3. Si existe y se elimina, retorna 200 OK
     * 4. Si no existe, retorna 404 Not Found
     *
     * VALIDACIÓN: El Service verifica que el producto exista antes de eliminar.
     * Si no existe, retorna 404 con mensaje de error.
     *
     * USAR: En panel admin para eliminar productos.
     *
     * @param id ID del producto a eliminar
     * @return ResponseEntity con mensaje de confirmación o error
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarProducto(@PathVariable Long id) {
        String mensaje = productoService.eliminarProducto(id);
        return ResponseEntity.ok(mensaje);
    }


    /**
     * PUT /api/producto/{id}/categoria
     *
     * Asigna una categoría a un producto existente.
     * Recibe el ID de la categoría en el body (JSON number) y devuelve el ProductoDTO actualizado.
     *
     * @param id ID del producto al que se asignará la categoría
     * @param categoriaId ID de la categoría en el body
     * @return ResponseEntity con ProductoDTO actualizado
     */
    @PutMapping("/{id}/categoria")
    public ResponseEntity<ProductoDTO> asignarCategoria(@PathVariable Long id, @RequestBody Long categoriaId) {
        ProductoDTO actualizado = productoService.asignarCategoria(id, categoriaId);
        return ResponseEntity.ok(actualizado);
    }

    /**
     * GET /api/producto/categoria/{id}
     *
     * Obtiene los productos que pertenecen a una categoría específica.
     * Llama a productoService.obtenerPorCategoria(id) y retorna la lista de ProductoDTO.
     *
     * @param id ID de la categoría por la cual filtrar
     * @return ResponseEntity con List<ProductoDTO> filtrados por la categoría
     */
    @GetMapping("/categoria/{id}")
    public ResponseEntity<List<ProductoDTO>> obtenerPorCategoria(@PathVariable Long id) {
        List<ProductoDTO> dtos = productoService.obtenerPorCategoria(id);
        return ResponseEntity.ok(dtos);
    }

}
