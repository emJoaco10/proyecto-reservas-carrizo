package com.example.demo.dto;

import java.time.LocalDate;

public class DisponibilidadDTO {

    private Long reservaId;
    private Long productoId;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;

    public DisponibilidadDTO() {}

    public DisponibilidadDTO(
            Long reservaId,
            Long productoId,
            LocalDate fechaInicio,
            LocalDate fechaFin
    ) {
        this.reservaId = reservaId;
        this.productoId = productoId;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

    public Long getReservaId() {
        return reservaId;
    }

    public void setReservaId(Long reservaId) {
        this.reservaId = reservaId;
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
