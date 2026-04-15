package com.example.demo.repository;

import com.example.demo.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * Interfaz Repository para la entidad Usuario.
 *
 * Hereda de JpaRepository, proporcionando operaciones CRUD automáticas:
 * - save(), saveAll()
 * - findById(), findAll()
 * - delete(), deleteById(), deleteAll()
 * - exists()
 *
 * Métodos personalizados:
 * - findByEmail(): busca usuario por email único (para login)
 *
 * Spring Data JPA genera automáticamente la implementación en tiempo de ejecución.
 *
 * @author Backend Team
 * @version 1.0
 */
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

    /**
     * Busca un usuario por su email único.
     *
     * Utilizado en proceso de login y validación de email existente.
     * Retorna Optional para manejar casos donde el usuario no existe.
     *
     * @param email Email del usuario a buscar
     * @return Optional<Usuario> con el usuario si existe, vacío si no
     */
    Optional<Usuario> findByEmail(String email);
}


