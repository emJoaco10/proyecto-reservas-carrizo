package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controller REST encargado de proporcionar información relacionada
 * con las funcionalidades disponibles para administración.
 *
 * Ruta base: /api/administracion
 */
@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/api/administracion")
public class AdminController {

    /**
     * Obtiene la lista de funcionalidades disponibles para el
     * panel de administración.
     *
     * Actualmente devuelve una lista estática con las operaciones
     * administrativas principales de la aplicación.
     *
     * @return lista de funciones administrativas
     */
    @GetMapping("/menu")
    public ResponseEntity<List<String>> obtenerFuncionesAdmin() {

        List<String> funciones = List.of(
                "Agregar producto",
                "Editar producto",
                "Eliminar producto",
                "Ver reservas",
                "Gestionar usuarios"
        );

        return ResponseEntity.ok(funciones);
    }
}
