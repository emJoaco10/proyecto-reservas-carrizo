package com.example.demo.dto;

public class LoginResponseDTO {

    private UsuarioDTO usuario;
    private String token;

    public LoginResponseDTO() {
    }

    public LoginResponseDTO(UsuarioDTO usuario, String token) {
        this.usuario = usuario;
        this.token = token;
    }

    public UsuarioDTO getUsuario() {return usuario;}
    public void setUsuario(UsuarioDTO usuario) {this.usuario = usuario;}

    public String getToken() {return token;}
    public void setToken(String token) {this.token = token;}
}
