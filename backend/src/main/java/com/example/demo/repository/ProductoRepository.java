package com.example.demo.repository;

import com.example.demo.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Interfaz Repository para la entidad Producto.
 *
 * Hereda de JpaRepository, proporcionando operaciones CRUD automáticas:
 * - save(), saveAll()
 * - findById(), findAll()
 * - delete(), deleteById(), deleteAll()
 * - exists()
 *
 * Métodos personalizados:
 * - findByNombre(): busca producto por nombre único
 *
 * Spring Data JPA genera automáticamente la implementación en tiempo de ejecución.
 *
 * @author Backend Team
 * @version 1.0
 */
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    /**
     * Busca un producto por su nombre único.
     *
     * Útil para validar duplicados antes de guardar.
     * Retorna Optional para manejar casos donde no existe el producto.
     *
     * @param nombre Nombre del producto a buscar
     * @return Optional<Producto> con el producto si existe, vacío si no
     */
    Optional<Producto> findByNombre(String nombre);
}

