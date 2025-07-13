package com.ciencias_arreguin.arreguin.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "Apoyos")
public class Apoyos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdApoyo")
    private int idApoyo;
    
    @Column(name = "PatrocinadorApoyo", nullable = false)
    private String patrocinadorApoyo;
    
    @Column(name = "DescripcionApoyo", nullable = false)
    private String descripcionApoyo;
    
    @OneToMany(mappedBy = "idApoyoAlumnoParticipacion", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference(value = "apoyo-alumno-participacion")
    private List<Participaciones> listaApoyoAlumnoParticipacion;

    @OneToMany(mappedBy = "idApoyoAsesorParticipacion", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference(value = "apoyo-asesor-participacion")
    private List<Participaciones> listaApoyoAsesorParticipacion;

    public int getIdApoyo() {
        return idApoyo;
    }

    public void setIdApoyo(int idApoyo) {
        this.idApoyo = idApoyo;
    }

    public String getPatrocinadorApoyo() {
        return patrocinadorApoyo;
    }

    public void setPatrocinadorApoyo(String patrocinadorApoyo) {
        this.patrocinadorApoyo = patrocinadorApoyo;
    }

    public String getDescripcionApoyo() {
        return descripcionApoyo;
    }

    public void setDescripcionApoyo(String descripcionApoyo) {
        this.descripcionApoyo = descripcionApoyo;
    }

    public List<Participaciones> getListaApoyoAlumnoParticipacion() {
        return listaApoyoAlumnoParticipacion;
    }

    public void setListaApoyoAlumnoParticipacion(List<Participaciones> listaApoyoAlumnoParticipacion) {
        this.listaApoyoAlumnoParticipacion = listaApoyoAlumnoParticipacion;
    }

    public List<Participaciones> getListaApoyoAsesorParticipacion() {
        return listaApoyoAsesorParticipacion;
    }

    public void setListaApoyoAsesorParticipacion(List<Participaciones> listaApoyoAsesorParticipacion) {
        this.listaApoyoAsesorParticipacion = listaApoyoAsesorParticipacion;
    }
    
}
