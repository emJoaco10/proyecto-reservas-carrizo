package com.example.demo.repository;

import com.example.demo.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
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

    /**
     * Busca todos los productos que pertenezcan a la categoría indicada por su id.
     *
     * @param categoriaId id de la categoría
     * @return Lista de productos que pertenecen a la categoría
     */
    List<Producto> findByCategoriaId(Long categoriaId);

}


