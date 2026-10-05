package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

/**
 * Entidad JPA que representa una Reserva en la plataforma de Reservas Carrizo.
 *
 * Una reserva relaciona un usuario con un producto durante un rango de fechas.
 *
 * @author Backend Team
 * @version 1.0
 */
@Entity
@Table(name = "reservas")
public class Reserva {

    /**
     * Identificador único de la reserva.
     * Autoincrement generado por la BD.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Usuario que realiza la reserva.
     */
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    /**
     * Producto reservado.
     */
    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    /**
     * Fecha de inicio de la reserva.
     */
    @Column(nullable = false)
    private LocalDate fechaInicio;

    /**
     * Fecha de finalización de la reserva.
     */
    @Column(nullable = false)
    private LocalDate fechaFin;

    /**
     * Cantidad de huéspedes de la reserva.
     * Dato obligatorio.
     */
    @Column(nullable = false)
    private Integer cantidadHuespedes;

    /**
     * DNI del huésped que realiza la reserva.
     * Dato obligatorio.
     */
    @Column(nullable = false)
    private String dni;

    /**
     * Edades de los huéspedes.
     * Dato obligatorio.
     */
    @Column(nullable = false)
    private String edadesHuespedes;

    /**
     * Observaciones adicionales realizadas por el usuario.
     * Dato obligatorio.
     */
    @Column(nullable = false, length = 500)
    private String observaciones;

    /**
     * Constructor vacío requerido por JPA.
     */
    public Reserva() {}

    /**
     * Constructor con parámetros.
     *
     * @param usuario Usuario que realiza la reserva
     * @param producto Producto reservado
     * @param fechaInicio Fecha de inicio
     * @param fechaFin Fecha de finalización
     */
    public Reserva(
            Usuario usuario,
            Producto producto,
            LocalDate fechaInicio,
            LocalDate fechaFin
    ) {
        this.usuario = usuario;
        this.producto = producto;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

    // ===================== GETTERS Y SETTERS =====================

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public Usuario getUsuario() {return usuario;}
    public void setUsuario(Usuario usuario) {this.usuario = usuario;}

    public Producto getProducto() {return producto;}
    public void setProducto(Producto producto) {this.producto = producto;}

    public LocalDate getFechaInicio() {return fechaInicio;}
    public void setFechaInicio(LocalDate fechaInicio) {this.fechaInicio = fechaInicio;}

    public LocalDate getFechaFin() {return fechaFin;}
    public void setFechaFin(LocalDate fechaFin) {this.fechaFin = fechaFin;}

    public Integer getCantidadHuespedes() {return cantidadHuespedes;}
    public void setCantidadHuespedes(Integer cantidadHuespedes) {this.cantidadHuespedes = cantidadHuespedes;}

    public String getDni() {return dni;}
    public void setDni(String dni) {this.dni = dni;}

    public String getEdadesHuespedes() {return edadesHuespedes;}
    public void setEdadesHuespedes(String edadesHuespedes) {this.edadesHuespedes = edadesHuespedes;}

    public String getObservaciones() {return observaciones;}
    public void setObservaciones(String observaciones) {this.observaciones = observaciones;}
}
