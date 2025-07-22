package com.ciencias_arreguin.arreguin.dtos;

public class LoginResponseDTO {
    private String token;
    private String tipoUsuario;
    private int idUsuario;
    private String nombreUsuario;
    private String mensaje;

    public LoginResponseDTO() {}

    public LoginResponseDTO(String token, String tipoUsuario, int idUsuario, String nombreUsuario, String mensaje) {
        this.token = token;
        this.tipoUsuario = tipoUsuario;
        this.idUsuario = idUsuario;
        this.nombreUsuario = nombreUsuario;
        this.mensaje = mensaje;
    }

    // Getters y setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public String getTipoUsuario() { return tipoUsuario; }
    public void setTipoUsuario(String tipoUsuario) { this.tipoUsuario = tipoUsuario; }
    
    public int getIdUsuario() { return idUsuario; }
    public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }
    
    public String getNombreUsuario() { return nombreUsuario; }
    public void setNombreUsuario(String nombreUsuario) { this.nombreUsuario = nombreUsuario; }
    
    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
}