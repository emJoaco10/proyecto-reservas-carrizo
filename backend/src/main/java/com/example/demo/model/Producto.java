package com.example.demo.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nombre;

    private String descripcion;

    private String tipo;
    @ElementCollection
    private List<String> imagenes;


    public Producto(String nombre, String descripcion, String tipo, List<String> imagenes) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.imagenes = imagenes;
    }

    public Producto(){};

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