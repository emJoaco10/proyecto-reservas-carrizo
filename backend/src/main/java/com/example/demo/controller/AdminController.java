package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/administracion")
public class AdminController {

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
