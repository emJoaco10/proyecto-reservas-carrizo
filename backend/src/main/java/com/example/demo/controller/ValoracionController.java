package com.example.demo.controller;

public class ValidacionController package com.example.demo.controller;

import com.example.demo.dto.ValoracionDTO;
import com.example.demo.service.ValoracionService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/api/valoraciones")
public class ValoracionController {

    private final ValoracionService valoracionService;

    public ValoracionController(ValoracionService valoracionService) {
        this.valoracionService = valoracionService;
    }

    @GetMapping("/producto/{productoId}")
    public ResponseEntity<List<ValoracionDTO>> obtenerValoraciones(
            @PathVariable Long productoId) {

        return ResponseEntity.ok(
                valoracionService.obtenerValoraciones(productoId)
        );
    }

    @PostMapping("/producto/{productoId}")
    public ResponseEntity<ValoracionDTO> crearValoracion(
            @PathVariable Long productoId,
            @Valid @RequestBody CrearValoracionRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        ValoracionDTO valoracion = valoracionService.crearValoracion(
                email,
                productoId,
                request.getPuntuacion(),
                request.getComentario()
        );

        return ResponseEntity.ok(valoracion);
    }

    public static class CrearValoracionRequest {

        @NotNull(message = "La puntuación es obligatoria")
        @Min(value = 1, message = "La puntuación mínima es 1")
        @Max(value = 5, message = "La puntuación máxima es 5")
        private Integer puntuacion;

        private String comentario;

        public Integer getPuntuacion() {
            return puntuacion;
        }

        public void setPuntuacion(Integer puntuacion) {
            this.puntuacion = puntuacion;
        }

        public String getComentario() {
            return comentario;
        }

        public void setComentario(String comentario) {
            this.comentario = comentario;
        }
    }
}{
}
