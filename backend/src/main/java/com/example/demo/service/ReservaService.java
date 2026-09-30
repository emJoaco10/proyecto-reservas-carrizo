package com.example.demo.service;

import com.example.demo.dto.DisponibilidadDTO;
import com.example.demo.dto.ReservaDTO;
import com.example.demo.model.Reserva;
import com.example.demo.model.Usuario;
import com.example.demo.repository.ProductoRepository;
import com.example.demo.repository.ReservaRepository;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import com.example.demo.dto.ProductoDTO;
import com.example.demo.model.Producto;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final ProductoRepository productoRepository;
    private final UsuarioRepository  usuarioRepository;
    private final ProductoService productoService;

    public ReservaService(ReservaRepository reservaRepository, ProductoRepository productoRepository, ProductoService productoService, UsuarioRepository usuarioRepository) {
        this.reservaRepository = reservaRepository;
        this.productoRepository = productoRepository;
        this.productoService = productoService;
        this.usuarioRepository = usuarioRepository;
    }

    public ReservaDTO crearReserva(ReservaDTO dto, String email) {

        if (dto.getFechaInicio() == null || dto.getFechaFin() == null) {
            throw new IllegalArgumentException(
                    "Las fechas de inicio y fin son obligatorias");
        }

        if (dto.getFechaFin().isBefore(dto.getFechaInicio())) {
            throw new IllegalArgumentException(
                    "La fecha de fin no puede ser anterior a la fecha de inicio");
        }

        Producto producto = productoRepository.findById(dto.getProductoId())
                .orElseThrow(() ->
                        new IllegalArgumentException("El producto no existe"));

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("El usuario no existe"));

        List<Reserva> reservas =
                reservaRepository.findByProductoId(producto.getId());

        boolean existeSuperposicion = reservas.stream()
                .anyMatch(reserva ->
                        !reserva.getFechaFin().isBefore(dto.getFechaInicio())
                                && !reserva.getFechaInicio().isAfter(dto.getFechaFin())
                );

        if (existeSuperposicion) {
            throw new IllegalArgumentException(
                    "El producto no está disponible para las fechas seleccionadas");
        }

        Reserva reserva = new Reserva();

        reserva.setUsuario(usuario);
        reserva.setProducto(producto);
        reserva.setFechaInicio(dto.getFechaInicio());
        reserva.setFechaFin(dto.getFechaFin());

        Reserva guardada = reservaRepository.save(reserva);

        return new ReservaDTO(
                guardada.getId(),
                guardada.getProducto().getId(),
                guardada.getFechaInicio(),
                guardada.getFechaFin()
        );
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

    /**
     * Verifica si un usuario tiene una reserva finalizada
     * para un producto.
     *
     * @param email email del usuario
     * @param productoId identificador del producto
     * @return true si existe una reserva finalizada
     */
    public boolean tieneReservaFinalizada(
            String email,
            Long productoId
    ) {
        return reservaRepository
                .existsByUsuarioEmailAndProductoIdAndFechaFinBefore(
                        email,
                        productoId,
                        java.time.LocalDate.now()
                );
    }

    public List<ProductoDTO> obtenerProductosDisponibles(
            LocalDate fechaInicio,
            LocalDate fechaFin
    ) {
        if (fechaInicio == null || fechaFin == null) {
            throw new IllegalArgumentException(
                    "Las fechas de inicio y fin son obligatorias"
            );
        }

        if (fechaFin.isBefore(fechaInicio)) {
            throw new IllegalArgumentException(
                    "La fecha de fin no puede ser anterior a la fecha de inicio"
            );
        }

        List<Producto> productos = productoRepository.findAll();

        return productos.stream()
                .filter(producto -> {
                    List<Reserva> reservas =
                            reservaRepository.findByProductoId(producto.getId());

                    return reservas.stream().noneMatch(reserva ->
                            !reserva.getFechaFin().isBefore(fechaInicio)
                                    &&
                                    !reserva.getFechaInicio().isAfter(fechaFin)
                    );
                })
                .map(producto ->
                        productoService.obtenerPorId(producto.getId()).orElseThrow()
                )
                .toList();
    }
}