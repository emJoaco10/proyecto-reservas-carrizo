package com.example.demo.dto;

import java.time.LocalDate;

public class ReservaDTO {

    private Long id;
    private Long productoId;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;

    public ReservaDTO() {
    }

    public ReservaDTO(
            Long id,
            Long productoId,
            LocalDate fechaInicio,
            LocalDate fechaFin) {

        this.id = id;
        this.productoId = productoId;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
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
}   
