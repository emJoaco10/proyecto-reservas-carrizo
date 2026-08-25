package com.example.demo.controller;

import com.example.demo.dto.CategoriaDTO;
import com.example.demo.service.CategoriaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

/**
 * Controller REST encargado de gestionar las categorías.
 *
 * Expone los endpoints para consultar categorías y crear nuevas.
 * La lógica de negocio se delega al CategoriaService.
 */
@RestController
@RequestMapping("/api/categoria")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoriaController {

    private final CategoriaService categoriaService;

    /**
     * Constructor utilizado por Spring para inyectar el servicio
     * encargado de gestionar las categorías.
     *
     * @param categoriaService servicio de categorías
     */
    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    /**
     * Obtiene todas las categorías registradas.
     *
     * @return lista de categorías como CategoriaDTO
     */
    @GetMapping
    public ResponseEntity<List<CategoriaDTO>> obtenerTodas() {

        return ResponseEntity.ok(
                categoriaService.obtenerTodas()
        );
    }

    /**
     * Obtiene una categoría específica mediante su ID.
     *
     * @param id identificador de la categoría
     * @return categoría encontrada como CategoriaDTO
     */
    @GetMapping("/{id}")
    public ResponseEntity<CategoriaDTO> obtenerPorId(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                categoriaService.obtenerPorId(id)
        );
    }

    /**
     * Crea una nueva categoría.
     *
     * Los datos recibidos se validan mediante Bean Validation antes
     * de ser enviados al CategoriaService.
     *
     * Si la creación es exitosa, devuelve HTTP 201 CREATED con
     * la categoría creada.
     *
     * @param dto datos de la categoría a crear
     * @return categoría creada como CategoriaDTO
     */
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
