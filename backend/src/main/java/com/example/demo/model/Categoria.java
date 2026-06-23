package com.example.demo.model;

import jakarta.persistence.*;
import java.util.List;

/** * Entidad JPA que representa una Categoría de productos en la plataforma de Reservas Carrizo.
 * Mapea la tabla 'categorias' en la base de datos H2. * Permite clasificar y organizar los productos disponibles.
 * @author Backend Team * @version 1.0
 */
@Entity
@Table(name = "categorias")
public class Categoria {

    /**     * Identificador único de la categoría.
     *  Autoincrement generado por la BD.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**     * Nombre único de la categoría.
     * Campo obligatorio para evitar duplicados.
     * CONSTRAINT: unique + not null en BD.
     */
    @Column(unique = true, nullable = false)
    private String nombre;

    /**     * Relación OneToMany con Producto.
     *Una categoría puede tener muchos productos asociados.
     * mappedBy = "categoria" indica que la FK está en Producto.
     * cascade = ALL permite eliminar productos al eliminar categoría.
     * orphanRemoval = true elimina productos huérfanos si se desasocian.
     */
    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Producto> productos;

    /**     * Constructor con parámetros.
     * Utilizado para crear instancias de Categoría con datos iniciales.
     * @param nombre Nombre único de la categoría
     */
    public Categoria(String nombre) {
        this.nombre = nombre;
    }

    /**     * Constructor sin parámetros.
     * Requerido por JPA para instanciar entidades desde la BD.
     */
    public Categoria() {
    }

    // ===================== GETTERS Y SETTERS =====================
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Producto> getProductos() {
        return productos;
    }

    public void setProductos(List<Producto> productos) {
        this.productos = productos;
    }
}
