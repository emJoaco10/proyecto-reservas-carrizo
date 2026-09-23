package com.example.demo.repository;

import com.example.demo.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    List<Reserva> findByProductoId(Long productoId);

    boolean existsByUsuarioEmailAndProductoIdAndFechaFinBefore(
            String email,
            Long productoId,
            LocalDate fecha
    );
}
