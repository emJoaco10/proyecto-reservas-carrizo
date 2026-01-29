package com.example.demo.dto;

import java.util.List;

public class ProductoDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private String tipo;
    private List<String> imagenes;

    public ProductoDTO() {}

    public ProductoDTO(Long id, String nombre, String descripcion, String tipo, List<String> imagenes) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.imagenes = imagenes;
    }

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
