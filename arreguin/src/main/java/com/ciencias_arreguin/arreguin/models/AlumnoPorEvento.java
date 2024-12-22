package com.ciencias_arreguin.arreguin.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
@Table(name = "AlumnoPorEvento")
public class AlumnoPorEvento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdAlumnoPorEvento")
    private int idAlumnoPorEvento;
    
    @Column(name = "ResultadoAlumnoPorEvento", nullable = false)
    private String resultadoAlumnoPorEvento;
    
    @ManyToOne
    @JoinColumn(name = "IdAlumnoEvento", nullable = false)
    private Alumnos idAlumnoEvento;
    
    @ManyToOne
    @JoinColumn(name = "IdEventoAlumno", nullable = false)
    private Eventos idEventoAlumno;

    @OneToMany(mappedBy = "idAlumnoPorEventoApoyo")
    @JsonBackReference(value = "alumno-evento-apoyo")
    private List<Apoyos> listaApoyos;

    public int getIdAlumnoPorEvento() {
        return idAlumnoPorEvento;
    }

    public void setIdAlumnoPorEvento(int idAlumnoPorEvento) {
        this.idAlumnoPorEvento = idAlumnoPorEvento;
    }

    public String getResultadoAlumnoPorEvento() {
        return resultadoAlumnoPorEvento;
    }

    public void setResultadoAlumnoPorEvento(String resultadoAlumnoPorEvento) {
        this.resultadoAlumnoPorEvento = resultadoAlumnoPorEvento;
    }

    @JsonProperty("idAlumnoEvento")
    public Alumnos getIdAlumnoEvento() {
        return idAlumnoEvento;
    }

    public void setIdAlumnoEvento(Alumnos idAlumnoEvento) {
        this.idAlumnoEvento = idAlumnoEvento;
    }

    @JsonProperty("idEventoAlumno")
    public Eventos getIdEventoAlumno() {
        return idEventoAlumno;
    }

    public void setIdEventoAlumno(Eventos idEventoAlumno) {
        this.idEventoAlumno = idEventoAlumno;
    }

    public List<Apoyos> getListaApoyos() {
        return listaApoyos;
    }

    public void setListaApoyos(List<Apoyos> listaApoyos) {
        this.listaApoyos = listaApoyos;
    }
    
}
