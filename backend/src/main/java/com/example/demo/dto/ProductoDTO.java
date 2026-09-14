package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;

/**
 * Data Transfer Object (DTO) para la entidad Producto.
 *
 * PROPÓSITO: Transferir datos de Producto entre Backend y Frontend.
 * Desacopla la estructura interna (Entity) de la API REST.
 */
public class ProductoDTO {

    /**
     * ID único del producto.
     */
    private Long id;

    /**
     * Nombre único del producto.
     */
    @NotBlank(message = "El nombre del producto es obligatorio")
    private String nombre;

    /**
     * Descripción del producto.
     */
    @NotBlank(message = "La descripción del producto es obligatoria")
    private String descripcion;

    /**
     * Lista de URLs o base64 de imágenes.
     */
    private List<String> imagenes;

    @NotNull(message = "La categoría es obligatoria")
    private CategoriaDTO categoriaDTO;

    private List<CaracteristicaDTO> caracteristicas = new ArrayList<>();

    /**
     * Constructor sin parámetros.
     */
    public ProductoDTO() {}

    /**
     * Constructor completo.
     */
    public ProductoDTO(
            Long id,
            String nombre,
            String descripcion,
            List<String> imagenes,
            CategoriaDTO categoriaDTO,
            List<CaracteristicaDTO> caracteristicas) {

        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagenes = imagenes;
        this.categoriaDTO = categoriaDTO;
        this.caracteristicas = caracteristicas;
    }

    // ===================== GETTERS Y SETTERS =====================

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public String getNombre() {return nombre;}
    public void setNombre(String nombre) {this.nombre = nombre;}

    public String getDescripcion() {return descripcion;}
    public void setDescripcion(String descripcion) {this.descripcion = descripcion;}

    public List<String> getImagenes() {return imagenes;}
    public void setImagenes(List<String> imagenes) {this.imagenes = imagenes;}

    public CategoriaDTO getCategoria() {return categoriaDTO;}
    public void setCategoria(CategoriaDTO categoriaDTO) {this.categoriaDTO = categoriaDTO;}

    public List<CaracteristicaDTO> getCaracteristicas() {return caracteristicas;}
    public void setCaracteristicas(List<CaracteristicaDTO> caracteristicas) {this.caracteristicas = caracteristicas;}
}
