package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CaracteristicaDTO {

    private Long id;

    @NotBlank(message = "El nombre de la característica es obligatorio")
    @Size(
            min = 2,
            max = 100,
            message = "El nombre de la característica debe tener entre 2 y 100 caracteres"
    )
    private String nombre;

    @NotBlank(message = "El ícono de la característica es obligatorio")
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
