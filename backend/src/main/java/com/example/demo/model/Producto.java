package com.example.demo.model;

import jakarta.persistence.*;
import java.util.List;

/**
 * Entidad JPA que representa un Producto en la plataforma de Reservas Carrizo.
 *
 * Mapea la tabla 'productos' en la base de datos H2.
 * Contiene información sobre propiedades disponibles (casas, departamentos, hoteles).
 *
 * @author Backend Team
 * @version 1.0
 */
@Entity
@Table(name = "productos")
public class Producto {

    /**
     * Identificador único del producto.
     * Autoincrement generado por la BD.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nombre único del producto.
     * Campo obligatorio para evitar duplicados.
     * CONSTRAINT: unique + not null en BD.
     */
    @Column(unique = true, nullable = false)
    private String nombre;

    /**
     * Descripción detallada del producto.
     * Puede contener información sobre amenidades, características, etc.
     */
    private String descripcion;

    /**
     * Clasificación del tipo de propiedad.
     * Valores válidos: 'casa', 'departamento', 'hotel'
     */
    private String tipo;

    /**
     * Lista de URLs o base64 de imágenes del producto.
     * Almacenada como tabla separada en BD (ElementCollection).
     * Puede ser vacía si no hay imágenes disponibles.
     */
    @ElementCollection
    private List<String> imagenes;

    /**
     * Constructor con parámetros.
     * Utilizado para crear instancias de Producto con datos iniciales.
     *
     * @param nombre Nombre único del producto
     * @param descripcion Descripción del producto
     * @param tipo Tipo de propiedad (casa|departamento|hotel)
     * @param imagenes Lista de URLs/base64 de imágenes
     */
    public Producto(String nombre, String descripcion, String tipo, List<String> imagenes) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.imagenes = imagenes;
    }

    /**
     * Constructor sin parámetros.
     * Requerido por JPA para instanciar entidades desde la BD.
     */
    public Producto(){};

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