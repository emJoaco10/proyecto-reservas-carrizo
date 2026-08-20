package com.example.demo.controller;

import com.example.demo.dto.CategoriaDTO;
import com.example.demo.service.CategoriaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/categoria")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }


    // Obtener todas las categorías
    @GetMapping
    public ResponseEntity<List<CategoriaDTO>> obtenerTodas() {

        return ResponseEntity.ok(
                categoriaService.obtenerTodas()
        );
    }


    // Obtener una categoría por ID
    @GetMapping("/{id}")
    public ResponseEntity<CategoriaDTO> obtenerPorId(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                categoriaService.obtenerPorId(id)
        );
    }


    // Crear una categoría
    @PostMapping
    public ResponseEntity<CategoriaDTO> crear(
            @Valid @RequestBody CategoriaDTO dto
    ) {

        CategoriaDTO categoriaCreada =
                categoriaService.crear(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(categoriaCreada);
    }
}
