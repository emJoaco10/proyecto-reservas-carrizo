package com.example.demo.dto;

/**
 * Data Transfer Object (DTO) para la entidad Categoria.
 *
 * PROPÓSITO: Transferir datos de Categoria entre Backend y Frontend.
 * Evita exponer la entidad JPA completa.
 *
 * Contiene solo los campos necesarios para el cliente.
 */
public class CategoriaDTO {

    private Long id;
    private String nombre;

    // Constructor vacío (Jackson necesita esto)
    public CategoriaDTO() {}

    // Constructor con parámetros
    public CategoriaDTO(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    // ===================== GETTERS Y SETTERS =====================
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
}

