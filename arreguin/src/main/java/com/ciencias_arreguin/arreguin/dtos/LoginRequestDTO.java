package com.ciencias_arreguin.arreguin.dtos;

public class LoginRequestDTO {
    private String correo;
    private String contrasena;

    public LoginRequestDTO() {}

    public LoginRequestDTO(String correo, String contrasena) {
        this.correo = correo;
        this.contrasena = contrasena;
    }

    // Getters y setters
    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }
    
    public String getContrasena() { return contrasena; }
    public void setContrasena(String contrasena) { this.contrasena = contrasena; }
}
