package com.example.demo.repository;

import com.example.demo.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/** * Repository JPA para la entidad Categoría. * * PROPÓSITO: Acceso a datos (CRUD) y consultas personalizadas para Categoria. * * Hereda automáticamente métodos CRUD: * - save(Categoria) → Guardar * - findById(Long) → Buscar por ID * - findAll() → Obtener todas * - delete(Categoria) → Eliminar * - deleteById(Long) → Eliminar por ID * * MÉTODOS PERSONALIZADOS: * - findByNombre(String nombre) → Buscar por nombre único * * @author Backend Team * @version 1.0 */
@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    /**     * Busca una categoría por su nombre único.     *     * FLUJO:     * 1. Spring Data genera automáticamente la query SQL: SELECT * FROM categorias WHERE nombre = ?     * 2. Retorna Optional que contiene la categoría si existe, o vacío si no     *     * USAR: Para validar nombres únicos, buscar categoría por nombre, etc.     *     * PARÁMETRO:     * @param nombre Nombre de la categoría a buscar (case-sensitive)     *     * @return Optional<Categoria> con la categoría si existe, Optional.empty() si no     */
    Optional<Categoria> findByNombre(String nombre);
}
