package com.example.demo.model;

import jakarta.persistence.*;

/**
 * Entidad JPA que representa un Usuario registrado en la plataforma.
 *
 * Mapea la tabla 'usuarios' en la base de datos H2.
 * Almacena información de autenticación y perfil de usuario.
 *
 * NOTA: La contraseña se almacena hasheada usando BCryptPasswordEncoder.
 *
 * @author Backend Team
 * @version 1.0
 */
@Entity
@Table(name = "usuarios")
public class Usuario {

    /**
     * Identificador único del usuario.
     * Autoincrement generado por la BD.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nombre completo del usuario.
     * Campo opcional para perfil público.
     */
    private String nombre;

    /**
     * Email único del usuario.
     * Utilizado como identificador secundario para login.
     * CONSTRAINT: unique en BD.
     */
    @Column(unique = true)
    private String email;

    /**
     * Contraseña del usuario (almacenada hasheada).
     * IMPORTANTE: Nunca transmitir en texto plano.
     * Se codifica con BCryptPasswordEncoder en la capa de servicio.
     */
    private String contraseña;

    /**
     * Constructor con parámetros.
     * Utilizado para crear instancias de Usuario con datos iniciales.
     *
     * @param email Email único del usuario
     * @param contraseña Contraseña en texto plano (será hasheada en el servicio)
     * @param nombre Nombre completo del usuario
     */
    public Usuario(String email, String contraseña, String nombre) {
        this.email = email;
        this.contraseña = contraseña;
        this.nombre = nombre;
    }

    /**
     * Constructor sin parámetros.
     * Requerido por JPA para instanciar entidades desde la BD.
     */
    public Usuario(){};

    // ===================== GETTERS Y SETTERS =====================

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public String getNombre() {return nombre;}
    public void setNombre(String nombre) {this.nombre = nombre;}

    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}

    /**
     * CUIDADO: Este setter debería aplicar hashing en controlador/servicio.
     * No pasar contraseñas en texto plano directamente.
     */
    public String getContraseña() {return contraseña;}
    public void setContraseña(String contraseña) {this.contraseña = contraseña;}
}
