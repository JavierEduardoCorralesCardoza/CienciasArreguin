package com.ciencias_arreguin.arreguin.models;

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

    public Alumnos getIdAlumnoEvento() {
        return idAlumnoEvento;
    }

    public void setIdAlumnoEvento(Alumnos idAlumnoEvento) {
        this.idAlumnoEvento = idAlumnoEvento;
    }

    public Eventos getIdEventoAlumno() {
        return idEventoAlumno;
    }

    public void setIdEventoAlumno(Eventos idEventoAlumno) {
        this.idEventoAlumno = idEventoAlumno;
    }
    
}
