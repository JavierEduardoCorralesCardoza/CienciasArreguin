package com.ciencias_arreguin.arreguin.dtos;

public class LoginResponseDTO {
    private String token;
    private String tipoUsuario;
    private int idUsuario;
    private String nombreUsuario;
    private String mensaje;
    private String rol; // Nuevo campo para el rol del asesor

    public LoginResponseDTO() {}

    public LoginResponseDTO(String token, String tipoUsuario, int idUsuario, String nombreUsuario, String mensaje) {
        this.token = token;
        this.tipoUsuario = tipoUsuario;
        this.idUsuario = idUsuario;
        this.nombreUsuario = nombreUsuario;
        this.mensaje = mensaje;
        this.rol = null; // Por defecto null para alumnos
    }

    public LoginResponseDTO(String token, String tipoUsuario, int idUsuario, String nombreUsuario, String mensaje, String rol) {
        this.token = token;
        this.tipoUsuario = tipoUsuario;
        this.idUsuario = idUsuario;
        this.nombreUsuario = nombreUsuario;
        this.mensaje = mensaje;
        this.rol = rol;
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

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    /**
     * Método de conveniencia para verificar si el usuario es admin
     */
    public boolean isAdmin() {
        return "admin".equalsIgnoreCase(this.rol);
    }
}