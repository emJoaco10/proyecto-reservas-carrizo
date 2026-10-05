package com.example.demo.dto;

import java.time.LocalDate;

public class ReservaDTO {

    private Long id;
    private Long productoId;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private Integer cantidadHuespedes;
    private String dni;
    private String edadesHuespedes;
    private String observaciones;

    public ReservaDTO() {
    }

    public ReservaDTO(
            Long id,
            Long productoId,
            LocalDate fechaInicio,
            LocalDate fechaFin,
            Integer cantidadHuespedes,
            String dni,
            String edadesHuespedes,
            String observaciones) {

        this.id = id;
        this.productoId = productoId;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.cantidadHuespedes = cantidadHuespedes;
        this.dni = dni;
        this.edadesHuespedes = edadesHuespedes;
        this.observaciones = observaciones;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductoId() {
        return productoId;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Integer getCantidadHuespedes() {
        return cantidadHuespedes;
    }

    public void setCantidadHuespedes(Integer cantidadHuespedes) {
        this.cantidadHuespedes = cantidadHuespedes;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getEdadesHuespedes() {
        return edadesHuespedes;
    }

    public void setEdadesHuespedes(String edadesHuespedes) {
        this.edadesHuespedes = edadesHuespedes;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}   
