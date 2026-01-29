package com.example.demo.controller;
import com.example.demo.dto.ProductoDTO;
import com.example.demo.model.Producto;
import com.example.demo.service.ProductoService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/producto")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @PostMapping
    public ResponseEntity<?> registrarProducto(@RequestBody ProductoDTO productoDTO) {
        try {
            Producto producto = new Producto();
            producto.setNombre(productoDTO.getNombre());
            producto.setDescripcion(productoDTO.getDescripcion());
            producto.setTipo(productoDTO.getTipo());
            
            if (productoDTO.getImagenes() != null) {
                producto.setImagenes(productoDTO.getImagenes());
            }

            Producto nuevo = productoService.guardarProducto(producto);

            ProductoDTO dto = new ProductoDTO(
                    nuevo.getId(),
                    nuevo.getNombre(),
                    nuevo.getDescripcion(),
                    nuevo.getTipo(),
                    nuevo.getImagenes()
            );

            return ResponseEntity.ok(dto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/aleatorios")
    public ResponseEntity<List<ProductoDTO>> obtenerAleatorios() {
        List<Producto> aleatorios = productoService.obtenerProductosAleatorios(10);
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

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id) {
        Optional<Producto> producto = productoService.obtenerPorId(id);

        if (producto.isPresent()) {
            Producto p = producto.get();
            ProductoDTO dto = new ProductoDTO(
                    p.getId(),
                    p.getNombre(),
                    p.getDescripcion(),
                    p.getTipo(),
                    p.getImagenes()
            );
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(404).body("Producto no encontrado");
        }
    }

    @GetMapping("/paginados")
    public ResponseEntity<Page<ProductoDTO>> obtenerPaginados(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<Producto> productos = productoService.obtenerPaginados(page, size);

        Page<ProductoDTO> dtos = productos.map(p -> new ProductoDTO(
                p.getId(),
                p.getNombre(),
                p.getDescripcion(),
                p.getTipo(),
                p.getImagenes()
        ));

        return ResponseEntity.ok(dtos);
    }

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

    @DeleteMapping
    public ResponseEntity<?> borrarTodos(){
        productoService.borrarTodos();
        return ResponseEntity.ok("Todos los productos se eliminaron correctamente");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Long id) {
        try {
            productoService.eliminarProducto(id);
            return ResponseEntity.ok("Producto eliminado correctamente");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

}
