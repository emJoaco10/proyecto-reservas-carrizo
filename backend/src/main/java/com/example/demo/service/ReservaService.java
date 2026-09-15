package com.example.demo.service;

import com.example.demo.dto.DisponibilidadDTO;
import com.example.demo.model.Reserva;
import com.example.demo.repository.ReservaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;

    public ReservaService(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    /**
     * Obtiene la disponibilidad de un producto
     * a partir de sus reservas.
     *
     * @param productoId identificador del producto
     * @return lista de períodos reservados
     */
    public List<DisponibilidadDTO> obtenerDisponibilidadPorProducto(
            Long productoId
    ) {
        return reservaRepository.findByProductoId(productoId)
                .stream()
                .map(this::convertirADisponibilidadDTO)
                .toList();
    }

    /**
     * Convierte una Reserva en DisponibilidadDTO.
     */
    private DisponibilidadDTO convertirADisponibilidadDTO(
            Reserva reserva
    ) {
        return new DisponibilidadDTO(
                reserva.getId(),
                reserva.getProducto().getId(),
                reserva.getFechaInicio(),
                reserva.getFechaFin()
        );
    }
}