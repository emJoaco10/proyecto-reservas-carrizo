package com.example.demo.repository;

import com.example.demo.model.Producto;
import com.example.demo.model.Usuario;
import com.example.demo.model.Valoracion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ValoracionRepository extends JpaRepository<Valoracion, Long> {

    List<Valoracion> findByProductoOrderByFechaDesc(Producto producto);

    Optional<Valoracion> findByUsuarioAndProducto(
            Usuario usuario,
            Producto producto
    );

    boolean existsByUsuarioAndProducto(
            Usuario usuario,
            Producto producto
    );

    long countByProducto(Producto producto);

    List<Valoracion> findByProducto(Producto producto);
}