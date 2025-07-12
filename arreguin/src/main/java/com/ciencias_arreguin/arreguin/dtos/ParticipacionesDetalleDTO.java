package com.ciencias_arreguin.arreguin.dtos;

import java.time.LocalDate;

public class ParticipacionesDetalleDTO {
    private int idParticipacion;
    private String nombreAlumno;
    private String correoAlumno;
    private String nombreAsesor;
    private String correoAsesor;
    private String nombreEvento;
    private LocalDate fechaEvento;
    private String nombreProyecto;
    private String categoriaProyecto;
    private String descripcionProyecto;
    private String patrocinadorApoyoAlumno;
    private String descripcionApoyoAlumno;
    private String patrocinadorApoyoAsesor;
    private String descripcionApoyoAsesor;

    // Constructor vacío
    public ParticipacionesDetalleDTO() {}

    // Constructor con parámetros principales
    public ParticipacionesDetalleDTO(int idParticipacion, String nombreAlumno, String correoAlumno,
                                   String nombreAsesor, String correoAsesor, String nombreEvento,
                                   LocalDate fechaEvento, String nombreProyecto, String categoriaProyecto,
                                   String descripcionProyecto) {
        this.idParticipacion = idParticipacion;
        this.nombreAlumno = nombreAlumno;
        this.correoAlumno = correoAlumno;
        this.nombreAsesor = nombreAsesor;
        this.correoAsesor = correoAsesor;
        this.nombreEvento = nombreEvento;
        this.fechaEvento = fechaEvento;
        this.nombreProyecto = nombreProyecto;
        this.categoriaProyecto = categoriaProyecto;
        this.descripcionProyecto = descripcionProyecto;
    }

    // Getters y Setters
    public int getIdParticipacion() {
        return idParticipacion;
    }

    public void setIdParticipacion(int idParticipacion) {
        this.idParticipacion = idParticipacion;
    }

    public String getNombreAlumno() {
        return nombreAlumno;
    }

    public void setNombreAlumno(String nombreAlumno) {
        this.nombreAlumno = nombreAlumno;
    }

    public String getCorreoAlumno() {
        return correoAlumno;
    }

    public void setCorreoAlumno(String correoAlumno) {
        this.correoAlumno = correoAlumno;
    }

    public String getNombreAsesor() {
        return nombreAsesor;
    }

    public void setNombreAsesor(String nombreAsesor) {
        this.nombreAsesor = nombreAsesor;
    }

    public String getCorreoAsesor() {
        return correoAsesor;
    }

    public void setCorreoAsesor(String correoAsesor) {
        this.correoAsesor = correoAsesor;
    }

    public String getNombreEvento() {
        return nombreEvento;
    }

    public void setNombreEvento(String nombreEvento) {
        this.nombreEvento = nombreEvento;
    }

    public LocalDate getFechaEvento() {
        return fechaEvento;
    }

    public void setFechaEvento(LocalDate fechaEvento) {
        this.fechaEvento = fechaEvento;
    }

    public String getNombreProyecto() {
        return nombreProyecto;
    }

    public void setNombreProyecto(String nombreProyecto) {
        this.nombreProyecto = nombreProyecto;
    }

    public String getCategoriaProyecto() {
        return categoriaProyecto;
    }

    public void setCategoriaProyecto(String categoriaProyecto) {
        this.categoriaProyecto = categoriaProyecto;
    }

    public String getDescripcionProyecto() {
        return descripcionProyecto;
    }

    public void setDescripcionProyecto(String descripcionProyecto) {
        this.descripcionProyecto = descripcionProyecto;
    }

    public String getPatrocinadorApoyoAlumno() {
        return patrocinadorApoyoAlumno;
    }

    public void setPatrocinadorApoyoAlumno(String patrocinadorApoyoAlumno) {
        this.patrocinadorApoyoAlumno = patrocinadorApoyoAlumno;
    }

    public String getDescripcionApoyoAlumno() {
        return descripcionApoyoAlumno;
    }

    public void setDescripcionApoyoAlumno(String descripcionApoyoAlumno) {
        this.descripcionApoyoAlumno = descripcionApoyoAlumno;
    }

    public String getPatrocinadorApoyoAsesor() {
        return patrocinadorApoyoAsesor;
    }

    public void setPatrocinadorApoyoAsesor(String patrocinadorApoyoAsesor) {
        this.patrocinadorApoyoAsesor = patrocinadorApoyoAsesor;
    }

    public String getDescripcionApoyoAsesor() {
        return descripcionApoyoAsesor;
    }

    public void setDescripcionApoyoAsesor(String descripcionApoyoAsesor) {
        this.descripcionApoyoAsesor = descripcionApoyoAsesor;
    }
}