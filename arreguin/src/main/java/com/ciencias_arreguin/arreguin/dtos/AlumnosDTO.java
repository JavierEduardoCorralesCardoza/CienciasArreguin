package com.ciencias_arreguin.arreguin.dtos;

public class AlumnosDTO {
    private int idAlumno;
    private String correoAlumno;
    private String contrasenaAlumno;
    private String nombreAlumno;
    private String imagenAlumno;

    // Constructor vacío
    public AlumnosDTO() {}

    // Constructor con parámetros
    public AlumnosDTO(int idAlumno, String correoAlumno, String contrasenaAlumno, 
                      String nombreAlumno, String imagenAlumno) {
        this.idAlumno = idAlumno;
        this.correoAlumno = correoAlumno;
        this.contrasenaAlumno = contrasenaAlumno;
        this.nombreAlumno = nombreAlumno;
        this.imagenAlumno = imagenAlumno;
    }

    // Getters y Setters
    public int getIdAlumno() {
        return idAlumno;
    }

    public void setIdAlumno(int idAlumno) {
        this.idAlumno = idAlumno;
    }

    public String getCorreoAlumno() {
        return correoAlumno;
    }

    public void setCorreoAlumno(String correoAlumno) {
        this.correoAlumno = correoAlumno;
    }

    public String getContrasenaAlumno() {
        return contrasenaAlumno;
    }

    public void setContrasenaAlumno(String contrasenaAlumno) {
        this.contrasenaAlumno = contrasenaAlumno;
    }

    public String getNombreAlumno() {
        return nombreAlumno;
    }

    public void setNombreAlumno(String nombreAlumno) {
        this.nombreAlumno = nombreAlumno;
    }

    public String getImagenAlumno() {
        return imagenAlumno;
    }

    public void setImagenAlumno(String imagenAlumno) {
        this.imagenAlumno = imagenAlumno;
    }
}