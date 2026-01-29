package com.example.demo.controller;
import com.example.demo.model.Producto;
import com.example.demo.service.ProductoService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import java.util.Optional;

@RestController
@RequestMapping("/api/producto")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @PostMapping
    public ResponseEntity<?> registrarProducto(@RequestBody Producto producto) {
        try {
            Producto nuevo = productoService.guardarProducto(producto);
            return ResponseEntity.ok(nuevo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/aleatorios")
    public ResponseEntity<List<Producto>> obtenerAleatorios() {
        List<Producto> aleatorios = productoService.obtenerProductosAleatorios(10);
        return ResponseEntity.ok(aleatorios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id) {
        Optional<Producto> producto = productoService.obtenerPorId(id);

        if (producto.isPresent()) {
            return ResponseEntity.ok(producto.get());
        } else {
            return ResponseEntity.status(404).body("Producto no encontrado");
        }
    }

    @GetMapping
    public ResponseEntity<Page<Producto>> obtenerPaginados(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<Producto> productos = productoService.obtenerPaginados(page, size);
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/admin")
    public ResponseEntity<List<Producto>> obtenerTodosParaAdmin() {
        List<Producto> productos = productoService.obtenerTodos();
        return ResponseEntity.ok(productos);
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
