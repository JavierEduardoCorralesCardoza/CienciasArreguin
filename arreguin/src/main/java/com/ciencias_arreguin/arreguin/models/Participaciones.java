package com.ciencias_arreguin.arreguin.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Participaciones")
public class Participaciones {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdParticipacion")
    private int idParticipacion;

    @ManyToOne
    @JoinColumn(name = "IdAlumnoParticipacion", nullable = false)
    private Alumnos idAlumnoParticipacion;

    @ManyToOne
    @JoinColumn(name = "IdAsesorParticipacion", nullable = false)
    private Asesores idAsesorParticipacion;

    @ManyToOne
    @JoinColumn(name = "IdEventoParticipacion", nullable = false)
    private Eventos idEventoParticipacion;

    @ManyToOne
    @JoinColumn(name = "IdProyectoParticipacion", nullable = false)
    private Proyectos idProyectoParticipacion;

    @ManyToOne
    @JoinColumn(name = "IdApoyoAlumnoParticipacion", nullable = true)
    private Apoyos idApoyoAlumnoParticipacion;

    @ManyToOne
    @JoinColumn(name = "IdApoyoAsesorParticipacion", nullable = true)
    private Apoyos idApoyoAsesorParticipacion;

    public int getIdParticipacion() {
        return idParticipacion;
    }

    public void setIdParticipacion(int idParticipacion) {
        this.idParticipacion = idParticipacion;
    }

    public Alumnos getIdAlumnoParticipacion() {
        return idAlumnoParticipacion;
    }

    public void setIdAlumnoParticipacion(Alumnos idAlumnoParticipacion) {
        this.idAlumnoParticipacion = idAlumnoParticipacion;
    }

    public Asesores getIdAsesorParticipacion() {
        return idAsesorParticipacion;
    }

    public void setIdAsesorParticipacion(Asesores idAsesorParticipacion) {
        this.idAsesorParticipacion = idAsesorParticipacion;
    }

    public Eventos getIdEventoParticipacion() {
        return idEventoParticipacion;
    }

    public void setIdEventoParticipacion(Eventos idEventoParticipacion) {
        this.idEventoParticipacion = idEventoParticipacion;
    }

    public Proyectos getIdProyectoParticipacion() {
        return idProyectoParticipacion;
    }

    public void setIdProyectoParticipacion(Proyectos idProyectoParticipacion) {
        this.idProyectoParticipacion = idProyectoParticipacion;
    }

    public Apoyos getIdApoyoAlumnoParticipacion() {
        return idApoyoAlumnoParticipacion;
    }

    public void setIdApoyoAlumnoParticipacion(Apoyos idApoyoAlumnoParticipacion) {
        this.idApoyoAlumnoParticipacion = idApoyoAlumnoParticipacion;
    }

    public Apoyos getIdApoyoAsesorParticipacion() {
        return idApoyoAsesorParticipacion;
    }

    public void setIdApoyoAsesorParticipacion(Apoyos idApoyoAsesorParticipacion) {
        this.idApoyoAsesorParticipacion = idApoyoAsesorParticipacion;
    }
}
