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
import com.example.demo.dto.ReservaHistorialDTO;

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

        if (dto.getCantidadHuespedes() == null || dto.getCantidadHuespedes() <= 0) {
            throw new IllegalArgumentException(
                    "La cantidad de huéspedes es obligatoria y debe ser mayor a 0");
        }

        if (dto.getDni() == null || dto.getDni().trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "El DNI es obligatorio");
        }

        if (dto.getEdadesHuespedes() == null || dto.getEdadesHuespedes().trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "La edad de los huéspedes es obligatoria");
        }

        String[] edades = dto.getEdadesHuespedes()
                .split(",");

        int cantidadEdades = 0;

        for (String edad : edades) {
            if (!edad.trim().isEmpty()) {
                cantidadEdades++;
            }
        }

        if (cantidadEdades != dto.getCantidadHuespedes()) {
            throw new IllegalArgumentException(
                    "La cantidad de edades debe coincidir con la cantidad de huéspedes");
        }

        if (dto.getObservaciones() == null || dto.getObservaciones().trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "Las observaciones son obligatorias");
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
        reserva.setCantidadHuespedes(dto.getCantidadHuespedes());
        reserva.setDni(dto.getDni());
        reserva.setEdadesHuespedes(dto.getEdadesHuespedes());
        reserva.setObservaciones(dto.getObservaciones());

        Reserva guardada = reservaRepository.save(reserva);

        return new ReservaDTO(
                guardada.getId(),
                guardada.getProducto().getId(),
                guardada.getFechaInicio(),
                guardada.getFechaFin(),
                guardada.getCantidadHuespedes(),
                guardada.getDni(),
                guardada.getEdadesHuespedes(),
                guardada.getObservaciones()
        );
    }

    public List<ReservaHistorialDTO> obtenerReservasDelUsuario(String email) {

        LocalDate hoy = LocalDate.now();

        List<Reserva> reservas =
                reservaRepository.findByUsuarioEmailOrderByFechaInicioDesc(email);

        return reservas.stream()
                .map(reserva -> {

                    String estado;

                    if (reserva.getFechaFin().isBefore(hoy)) {
                        estado = "FINALIZADA";
                    } else if (reserva.getFechaInicio().isAfter(hoy)) {
                        estado = "PRÓXIMA";
                    } else {
                        estado = "EN CURSO";
                    }

                    return new ReservaHistorialDTO(
                            reserva.getId(),
                            reserva.getProducto().getId(),
                            reserva.getProducto().getNombre(),
                            reserva.getFechaInicio(),
                            reserva.getFechaFin(),
                            reserva.getCantidadHuespedes(),
                            estado
                    );
                })
                .toList();
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