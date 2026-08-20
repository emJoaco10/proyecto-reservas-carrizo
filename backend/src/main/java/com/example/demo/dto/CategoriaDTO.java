package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;

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

    @NotBlank(message = "El nombre de la categoría es obligatorio")
    private String nombre;

    @NotBlank(message = "La descripción de la categoría es obligatoria")
    private String descripcion;

    @NotBlank(message = "La imagen de la categoría es obligatoria")
    private String imagen;

    // Constructor vacío (Jackson necesita esto)
    public CategoriaDTO() {}

    public CategoriaDTO(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    // Constructor con parámetros
    public CategoriaDTO(Long id, String nombre,  String descripcion, String imagen) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;

    }

    // ===================== GETTERS Y SETTERS =====================
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() {return descripcion;}
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getImagen() {return imagen;}
    public void setImagen(String imagen) { this.imagen = imagen; }
}

