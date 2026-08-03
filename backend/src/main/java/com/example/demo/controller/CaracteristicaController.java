package com.example.demo.controller;

import com.example.demo.dto.CaracteristicaDTO;
import com.example.demo.service.CaracteristicaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/caracteristica")
@CrossOrigin(origins = "http://localhost:5173")
public class CaracteristicaController {

    private final CaracteristicaService caracteristicaService;

    public CaracteristicaController(CaracteristicaService caracteristicaService) {
        this.caracteristicaService = caracteristicaService;
    }

    @GetMapping
    public ResponseEntity<List<CaracteristicaDTO>> obtenerTodas() {

        return ResponseEntity.ok(caracteristicaService.obtenerTodas());

    }

    @PostMapping
    public ResponseEntity<CaracteristicaDTO> guardar(
            @RequestBody CaracteristicaDTO caracteristicaDTO) {

        CaracteristicaDTO nuevaCaracteristica =
                caracteristicaService.guardar(caracteristicaDTO);

        return ResponseEntity.ok(nuevaCaracteristica);

    }

    @PutMapping("/{id}")
    public ResponseEntity<CaracteristicaDTO> actualizar(
            @PathVariable Long id,
            @RequestBody CaracteristicaDTO caracteristicaDTO) {

        CaracteristicaDTO actualizada =
                caracteristicaService.actualizar(id, caracteristicaDTO);

        return ResponseEntity.ok(actualizada);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                caracteristicaService.eliminar(id)
        );

    }

}
