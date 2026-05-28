package com.example.demo.dto;

import jakarta.persistence.Column;

import java.util.List;

/**
 * Data Transfer Object (DTO) para la entidad Producto.
 *
 * PROPÓSITO: Transferir datos de Producto entre Backend y Frontend.
 * Desacopla la estructura interna (Entity) de la API REST.
 *
 * DIFERENCIA Entity vs DTO:
 * - Entity (Producto): Mapea tabla en BD, contiene toda la lógica persistencia
 * - DTO (ProductoDTO): Ligero, solo datos necesarios para el cliente
 *
 * CONVERSIÓN: En ProductoController, siempre se convierte:
 * Producto (Entity) → ProductoDTO (respuesta JSON)
 *
 * VENTAJAS:
 * - Frontend recibe solo datos necesarios
 * - Cambios en Entity no afectan API REST
 * - Seguridad: no exponer campos internos sensibles
 *
 * @author Backend Team
 * @version 1.0
 */
public class ProductoDTO {

    /**
     * ID único del producto.
     */
    private Long id;

    /**
     * Nombre único del producto.
     */
    private String nombre;

    /**
     * Descripción del producto.
     */
    private String descripcion;

    /**
     * Tipo de propiedad: 'casa', 'departamento', 'hotel'
     */
    private String tipo;

    /**
     * Lista de URLs o base64 de imágenes.
     */
    @Column(columnDefinition = "TEXT")
    private List<String> imagenes;

    /**
     * Constructor sin parámetros (default).
     * Utilizado por Jackson para deserializar JSON a objeto.
     */
    public ProductoDTO() {}

    /**
     * Constructor con todos los parámetros.
     * Utilizado en Controllers para mapear Entity → DTO.
     *
     * @param id ID del producto
     * @param nombre Nombre del producto
     * @param descripcion Descripción del producto
     * @param tipo Tipo de propiedad
     * @param imagenes Lista de imágenes
     */
    public ProductoDTO(Long id, String nombre, String descripcion, String tipo, List<String> imagenes) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.imagenes = imagenes;
    }

    // ===================== GETTERS Y SETTERS =====================

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public String getNombre() {return nombre;}
    public void setNombre(String nombre) {this.nombre = nombre;}

    public String getDescripcion() {return descripcion;}
    public void setDescripcion(String descripcion) {this.descripcion = descripcion;}

    public String getTipo() {return tipo;}
    public void setTipo(String tipo) {this.tipo = tipo;}

    public List<String> getImagenes() {return imagenes;}
    public void setImagenes(List<String> imagenes) {this.imagenes = imagenes;}
}
