package com.ciencias_arreguin.arreguin.dtos;

public class ParticipacionesDTO {
    private int idParticipacion;
    private int idAlumnoParticipacion;
    private int idAsesorParticipacion;
    private int idEventoParticipacion;
    private int idProyectoParticipacion;
    private Integer idApoyoAlumnoParticipacion; // Nullable
    private Integer idApoyoAsesorParticipacion; // Nullable

    // Constructor vacío
    public ParticipacionesDTO() {}

    // Constructor con parámetros
    public ParticipacionesDTO(int idParticipacion, int idAlumnoParticipacion, 
                             int idAsesorParticipacion, int idEventoParticipacion, 
                             int idProyectoParticipacion, Integer idApoyoAlumnoParticipacion, 
                             Integer idApoyoAsesorParticipacion) {
        this.idParticipacion = idParticipacion;
        this.idAlumnoParticipacion = idAlumnoParticipacion;
        this.idAsesorParticipacion = idAsesorParticipacion;
        this.idEventoParticipacion = idEventoParticipacion;
        this.idProyectoParticipacion = idProyectoParticipacion;
        this.idApoyoAlumnoParticipacion = idApoyoAlumnoParticipacion;
        this.idApoyoAsesorParticipacion = idApoyoAsesorParticipacion;
    }

    // Getters y Setters
    public int getIdParticipacion() {
        return idParticipacion;
    }

    public void setIdParticipacion(int idParticipacion) {
        this.idParticipacion = idParticipacion;
    }

    public int getIdAlumnoParticipacion() {
        return idAlumnoParticipacion;
    }

    public void setIdAlumnoParticipacion(int idAlumnoParticipacion) {
        this.idAlumnoParticipacion = idAlumnoParticipacion;
    }

    public int getIdAsesorParticipacion() {
        return idAsesorParticipacion;
    }

    public void setIdAsesorParticipacion(int idAsesorParticipacion) {
        this.idAsesorParticipacion = idAsesorParticipacion;
    }

    public int getIdEventoParticipacion() {
        return idEventoParticipacion;
    }

    public void setIdEventoParticipacion(int idEventoParticipacion) {
        this.idEventoParticipacion = idEventoParticipacion;
    }

    public int getIdProyectoParticipacion() {
        return idProyectoParticipacion;
    }

    public void setIdProyectoParticipacion(int idProyectoParticipacion) {
        this.idProyectoParticipacion = idProyectoParticipacion;
    }

    public Integer getIdApoyoAlumnoParticipacion() {
        return idApoyoAlumnoParticipacion;
    }

    public void setIdApoyoAlumnoParticipacion(Integer idApoyoAlumnoParticipacion) {
        this.idApoyoAlumnoParticipacion = idApoyoAlumnoParticipacion;
    }

    public Integer getIdApoyoAsesorParticipacion() {
        return idApoyoAsesorParticipacion;
    }

    public void setIdApoyoAsesorParticipacion(Integer idApoyoAsesorParticipacion) {
        this.idApoyoAsesorParticipacion = idApoyoAsesorParticipacion;
    }
}
