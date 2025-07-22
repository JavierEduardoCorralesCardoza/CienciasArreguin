package com.ciencias_arreguin.arreguin.dtos;

public class AsesoresDTO {
    private int idAsesor;
    private String correoAsesor;
    private String contrasenaAsesor;
    private String nombreAsesor;
    private String imagenAsesor;
    private String rolAsesor;

    // Constructor vacío
    public AsesoresDTO() {}

    // Constructor con parámetros
    public AsesoresDTO(int idAsesor, String correoAsesor, String contrasenaAsesor, 
                       String nombreAsesor, String imagenAsesor, String rolAsesor) {
        this.idAsesor = idAsesor;
        this.correoAsesor = correoAsesor;
        this.contrasenaAsesor = contrasenaAsesor;
        this.nombreAsesor = nombreAsesor;
        this.imagenAsesor = imagenAsesor;
        this.rolAsesor = rolAsesor;
    }

    // Getters y Setters
    public int getIdAsesor() {
        return idAsesor;
    }

    public void setIdAsesor(int idAsesor) {
        this.idAsesor = idAsesor;
    }

    public String getCorreoAsesor() {
        return correoAsesor;
    }

    public void setCorreoAsesor(String correoAsesor) {
        this.correoAsesor = correoAsesor;
    }

    public String getContrasenaAsesor() {
        return contrasenaAsesor;
    }

    public void setContrasenaAsesor(String contrasenaAsesor) {
        this.contrasenaAsesor = contrasenaAsesor;
    }

    public String getNombreAsesor() {
        return nombreAsesor;
    }

    public void setNombreAsesor(String nombreAsesor) {
        this.nombreAsesor = nombreAsesor;
    }

    public String getImagenAsesor() {
        return imagenAsesor;
    }

    public void setImagenAsesor(String imagenAsesor) {
        this.imagenAsesor = imagenAsesor;
    }

    public String getRolAsesor() {
        return rolAsesor;
    }

    public void setRolAsesor(String rolAsesor) {
        this.rolAsesor = rolAsesor;
    }
}