package com.example.demo.controller;

import com.example.demo.dto.DisponibilidadDTO;
import com.example.demo.service.ReservaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/reserva")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservaController {

    private final ReservaService reservaService;

    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    /**
     * Obtiene los períodos reservados de un producto.
     *
     * @param productoId identificador del producto
     * @return lista de períodos reservados
     */
    @GetMapping("/disponibilidad/{productoId}")
    public ResponseEntity<List<DisponibilidadDTO>> obtenerDisponibilidad(
            @PathVariable Long productoId
    ) {
        List<DisponibilidadDTO> disponibilidad =
                reservaService.obtenerDisponibilidadPorProducto(productoId);

        return ResponseEntity.ok(disponibilidad);
    }

    @GetMapping("/puede-valorar/{productoId}")
    public ResponseEntity<Boolean> puedeValorar(
            @PathVariable Long productoId,
            Authentication authentication
    ) {
        String email = authentication.getName();

        boolean puedeValorar =
                reservaService.tieneReservaFinalizada(
                        email,
                        productoId
                );

        return ResponseEntity.ok(puedeValorar);
    }
}