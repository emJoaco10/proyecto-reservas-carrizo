package com.example.demo.dto;

import java.time.LocalDate;

public class ReservaHistorialDTO {

    private Long id;
    private Long productoId;
    private String productoNombre;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private Integer cantidadHuespedes;
    private String estado;

    public ReservaHistorialDTO() {
    }

    public ReservaHistorialDTO(
            Long id,
            Long productoId,
            String productoNombre,
            LocalDate fechaInicio,
            LocalDate fechaFin,
            Integer cantidadHuespedes,
            String estado
    ) {
        this.id = id;
        this.productoId = productoId;
        this.productoNombre = productoNombre;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.cantidadHuespedes = cantidadHuespedes;
        this.estado = estado;
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

    public String getProductoNombre() {
        return productoNombre;
    }

    public void setProductoNombre(String productoNombre) {
        this.productoNombre = productoNombre;
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

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}