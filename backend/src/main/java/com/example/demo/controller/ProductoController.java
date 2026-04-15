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
        try {
            // 1. Mapeo DTO → Entity
            Producto producto = new Producto();
            producto.setNombre(productoDTO.getNombre());
            producto.setDescripcion(productoDTO.getDescripcion());
            producto.setTipo(productoDTO.getTipo());
            
            if (productoDTO.getImagenes() != null) {
                producto.setImagenes(productoDTO.getImagenes());
            }

            // 2. Guardar en servicio (valida duplicados, persiste)
            Producto nuevo = productoService.guardarProducto(producto);

            // 3. Mapeo Entity → DTO para respuesta
            ProductoDTO dto = new ProductoDTO(
                    nuevo.getId(),
                    nuevo.getNombre(),
                    nuevo.getDescripcion(),
                    nuevo.getTipo(),
                    nuevo.getImagenes()
            );

            return ResponseEntity.ok(dto);

        } catch (IllegalArgumentException e) {
            // Si hay error de validación (ej: nombre duplicado)
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
        List<Producto> aleatorios = productoService.obtenerProductosAleatorios(10);

        // Mapeo Entity → DTO en stream
        List<ProductoDTO> dtos = aleatorios.stream().
                map(p -> new ProductoDTO(
                        p.getId(),
                        p.getNombre(),
                        p.getDescripcion(),
                        p.getTipo(),
                        p.getImagenes()
                )).toList();

        return ResponseEntity.ok(dtos);
    }

    /**
     * GET /api/producto/{id}
     *
     * Obtiene un producto específico por su ID.
     *
     * FLUJO:
     * 1. Extrae ID de la URL (path variable)
     * 2. Llama a ProductoService.obtenerPorId(id)
     * 3. Si existe, convierte Entity → DTO y retorna 200
     * 4. Si no existe, retorna 404 Not Found
     *
     * USAR: En frontend para cargar detalle de producto.
     *
     * @param id ID del producto a obtener
     * @return ResponseEntity con ProductoDTO si existe, 404 si no
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id) {
        Optional<Producto> producto = productoService.obtenerPorId(id);

        if (producto.isPresent()) {
            Producto p = producto.get();

            // Mapeo Entity → DTO
            ProductoDTO dto = new ProductoDTO(
                    p.getId(),
                    p.getNombre(),
                    p.getDescripcion(),
                    p.getTipo(),
                    p.getImagenes()
            );
            return ResponseEntity.ok(dto);

        } else {
            // Producto no encontrado
            return ResponseEntity.status(404).body("Producto no encontrado");
        }
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

        Page<Producto> productos = productoService.obtenerPaginados(page, size);

        // Mapeo Page<Entity> → Page<DTO>
        Page<ProductoDTO> dtos = productos.map(p -> new ProductoDTO(
                p.getId(),
                p.getNombre(),
                p.getDescripcion(),
                p.getTipo(),
                p.getImagenes()
        ));

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
        List<Producto> productos = productoService.obtenerTodos();

        // Convertir entidades a DTOs
        List<ProductoDTO> dtos = productos.stream()
                .map(p -> new ProductoDTO(
                        p.getId(),
                        p.getNombre(),
                        p.getDescripcion(),
                        p.getTipo(),
                        p.getImagenes()
                ))
                .toList();

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
    public ResponseEntity<?> borrarTodos(){
        productoService.borrarTodos();
        return ResponseEntity.ok("Todos los productos se eliminaron correctamente");
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
    public ResponseEntity<?> eliminarProducto(@PathVariable Long id) {
        try {
            productoService.eliminarProducto(id);
            return ResponseEntity.ok("Producto eliminado correctamente");

        } catch (IllegalArgumentException e) {
            // Producto no existe
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

}
