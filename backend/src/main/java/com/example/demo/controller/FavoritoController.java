package com.example.demo.controller;

import com.example.demo.dto.ProductoDTO;
import com.example.demo.model.Producto;
import com.example.demo.service.FavoritoService;
import com.example.demo.service.ProductoService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.Producto;
import com.example.demo.service.FavoritoService;

import java.util.List;

@RestController
@RequestMapping("/api/favoritos")
public class FavoritoController {

    private final FavoritoService favoritoService;
    private final ProductoService productoService;

    public FavoritoController(FavoritoService favoritoService,  ProductoService productoService) {
        this.favoritoService = favoritoService;
        this.productoService = productoService;
    }

    /**
     * Agrega un producto a los favoritos del usuario autenticado.
     */
    @PostMapping("/{productoId}")
    public ResponseEntity<String> agregarFavorito(
            @PathVariable Long productoId,
            Authentication authentication) {

        String email = authentication.getName();

        favoritoService.agregarFavorito(email, productoId);

        return ResponseEntity.ok("Producto agregado a favoritos");
    }

    /**
     * Elimina un producto de los favoritos del usuario autenticado.
     */
    @DeleteMapping("/{productoId}")
    public ResponseEntity<String> eliminarFavorito(
            @PathVariable Long productoId,
            Authentication authentication) {

        String email = authentication.getName();

        favoritoService.eliminarFavorito(email, productoId);

        return ResponseEntity.ok("Producto eliminado de favoritos");
    }

    /**
     * Obtiene los favoritos del usuario autenticado.
     */
    @GetMapping
    public ResponseEntity<List<ProductoDTO>> obtenerFavoritos(
            Authentication authentication) {

        String email = authentication.getName();

        List<Producto> favoritos =
                favoritoService.obtenerFavoritos(email);

        List<ProductoDTO> favoritosDTO = favoritos.stream()
                .map(producto ->
                        productoService.obtenerPorId(producto.getId()).orElseThrow()
                )
                .toList();

        return ResponseEntity.ok(favoritosDTO);
    }
}
