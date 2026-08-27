package com.example.demo.controller;

import com.example.demo.dto.ReservaDTO;
import com.example.demo.dto.ProductoDTO;
import com.example.demo.service.ReservaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

/**
 * Controller REST encargado de gestionar las reservas.
 *
 * Expone los endpoints relacionados con la creación y consulta
 * de reservas. La lógica de negocio se delega al ReservaService.
 */
@RestController
@RequestMapping("/api/reserva")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservaController {

    private final ReservaService reservaService;

    /**
     * Constructor utilizado por Spring para inyectar el servicio
     * encargado de gestionar las reservas.
     *
     * @param reservaService servicio de reservas
     */
    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    /**
     * Crea una nueva reserva.
     *
     * El ReservaService valida las fechas, verifica que existan
     * el usuario y el producto y comprueba que no exista una
     * reserva que se superponga con el rango solicitado.
     *
     * @param dto datos de la reserva
     * @return reserva creada como ReservaDTO
     */
    @PostMapping
    public ResponseEntity<ReservaDTO> crearReserva(@RequestBody ReservaDTO dto) {

        ReservaDTO reservaCreada =
                reservaService.crearReserva(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(reservaCreada);
    }

    /**
     * Obtiene los productos disponibles para un rango de fechas.
     *
     * Los resultados se devuelven como ProductoDTO para evitar
     * exponer directamente las entidades JPA.
     *
     * @param fechaInicio fecha inicial del rango
     * @param fechaFin fecha final del rango
     * @return lista de productos disponibles
     */
    @GetMapping("/disponibles")
    public ResponseEntity<List<ProductoDTO>> obtenerProductosDisponibles(
            @RequestParam LocalDate fechaInicio,
            @RequestParam LocalDate fechaFin) {

        List<ProductoDTO> productos =
                reservaService.obtenerProductosDisponibles(
                        fechaInicio,
                        fechaFin
                );

        return ResponseEntity.ok(productos);
    }

    /**
     * Consulta si un producto está disponible para un rango
     * determinado de fechas.
     *
     * @param productoId identificador del producto
     * @param fechaInicio fecha inicial del rango
     * @param fechaFin fecha final del rango
     * @return resultado indicando si el producto está disponible
     */
    @GetMapping("/disponibilidad/{productoId}")
    public ResponseEntity<Boolean> estaDisponible(
            @PathVariable Long productoId,
            @RequestParam LocalDate fechaInicio,
            @RequestParam LocalDate fechaFin) {

        boolean disponible =
                reservaService.estaDisponible(
                        productoId,
                        fechaInicio,
                        fechaFin
                );

        return ResponseEntity.ok(disponible);
    }
}
