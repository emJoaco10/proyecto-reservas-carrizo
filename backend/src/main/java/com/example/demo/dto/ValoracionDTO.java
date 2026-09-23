package com.example.demo.dto;

import java.time.LocalDate;

public class ValoracionDTO {

    private Long id;
    private String nombreUsuario;
    private Integer puntuacion;
    private String comentario;
    private LocalDate fecha;

    public ValoracionDTO() {
    }

    public ValoracionDTO(
            Long id,
            String nombreUsuario,
            Integer puntuacion,
            String comentario,
            LocalDate fecha) {

        this.id = id;
        this.nombreUsuario = nombreUsuario;
        this.puntuacion = puntuacion;
        this.comentario = comentario;
        this.fecha = fecha;
    }

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public String getNombreUsuario() {return nombreUsuario;}
    public void setNombreUsuario(String nombreUsuario) {this.nombreUsuario = nombreUsuario;}

    public Integer getPuntuacion() {return puntuacion;}
    public void setPuntuacion(Integer puntuacion) {this.puntuacion = puntuacion;}

    public String getComentario() {return comentario;}
    public void setComentario(String comentario) {this.comentario = comentario;}

    public LocalDate getFecha() {return fecha;}
    public void setFecha(LocalDate fecha) {this.fecha = fecha;}
}
