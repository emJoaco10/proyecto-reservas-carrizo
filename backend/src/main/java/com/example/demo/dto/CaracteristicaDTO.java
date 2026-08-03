package com.example.demo.dto;

public class CaracteristicaDTO {
    private Long id;

    private String nombre;

    private String icono;

    public CaracteristicaDTO() {
    }

    public CaracteristicaDTO(Long id, String nombre, String icono) {
        this.id = id;
        this.nombre = nombre;
        this.icono = icono;
    }

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

    public String getIcono() {
        return icono;
    }

    public void setIcono(String icono) {
        this.icono = icono;
    }
}
