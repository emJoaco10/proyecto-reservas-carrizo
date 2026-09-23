package com.example.demo.service;

import com.example.demo.dto.ValoracionDTO;
import com.example.demo.model.Producto;
import com.example.demo.model.Reserva;
import com.example.demo.model.Usuario;
import com.example.demo.model.Valoracion;
import com.example.demo.repository.ProductoRepository;
import com.example.demo.repository.ReservaRepository;
import com.example.demo.repository.UsuarioRepository;
import com.example.demo.repository.ValoracionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ValoracionService {

    private final ValoracionRepository valoracionRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;
    private final ReservaRepository reservaRepository;

    public ValoracionService(
            ValoracionRepository valoracionRepository,
            UsuarioRepository usuarioRepository,
            ProductoRepository productoRepository,
            ReservaRepository reservaRepository) {

        this.valoracionRepository = valoracionRepository;
        this.usuarioRepository = usuarioRepository;
        this.productoRepository = productoRepository;
        this.reservaRepository = reservaRepository;
    }

    public ValoracionDTO crearValoracion(
            String email,
            Long productoId,
            Integer puntuacion,
            String comentario) {

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("Usuario no encontrado"));

        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Producto no encontrado"));

        if (puntuacion == null || puntuacion < 1 || puntuacion > 5) {
            throw new IllegalArgumentException(
                    "La puntuación debe estar entre 1 y 5");
        }

        boolean tieneReservaFinalizada = reservaRepository.findAll()
                .stream()
                .anyMatch(reserva ->
                        reserva.getUsuario().getId().equals(usuario.getId())
                                && reserva.getProducto().getId().equals(producto.getId())
                                && reserva.getFechaFin().isBefore(LocalDate.now())
                );

        if (!tieneReservaFinalizada) {
            throw new IllegalStateException(
                    "Solo podés valorar un producto si tenés una reserva finalizada");
        }

        if (valoracionRepository.existsByUsuarioAndProducto(
                usuario,
                producto)) {

            throw new IllegalStateException(
                    "Ya valoraste este producto");
        }

        Valoracion valoracion = new Valoracion();

        valoracion.setUsuario(usuario);
        valoracion.setProducto(producto);
        valoracion.setPuntuacion(puntuacion);
        valoracion.setComentario(comentario);

        Valoracion guardada = valoracionRepository.save(valoracion);

        return convertirADTO(guardada);
    }

    public List<ValoracionDTO> obtenerValoraciones(Long productoId) {

        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Producto no encontrado"));

        return valoracionRepository
                .findByProductoOrderByFechaDesc(producto)
                .stream()
                .map(this::convertirADTO)
                .toList();
    }

    public Double obtenerPromedio(Long productoId) {

        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Producto no encontrado"));

        List<Valoracion> valoraciones =
                valoracionRepository.findByProducto(producto);

        if (valoraciones.isEmpty()) {
            return 0.0;
        }

        return valoraciones.stream()
                .mapToInt(Valoracion::getPuntuacion)
                .average()
                .orElse(0.0);
    }

    public Long obtenerCantidad(Long productoId) {

        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Producto no encontrado"));

        return valoracionRepository.countByProducto(producto);
    }

    private ValoracionDTO convertirADTO(Valoracion valoracion) {

        Usuario usuario = valoracion.getUsuario();

        String nombreUsuario = usuario.getNombre();

        if (usuario.getApellido() != null
                && !usuario.getApellido().isBlank()) {

            nombreUsuario += " " + usuario.getApellido();
        }

        return new ValoracionDTO(
                valoracion.getId(),
                nombreUsuario,
                valoracion.getPuntuacion(),
                valoracion.getComentario(),
                valoracion.getFecha()
        );
    }

    public boolean yaValoro(
            String email,
            Long productoId
    ) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("Usuario no encontrado"));

        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Producto no encontrado"));

        return valoracionRepository.existsByUsuarioAndProducto(
                usuario,
                producto
        );
    }
}
