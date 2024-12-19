package com.ciencias_arreguin.arreguin.models;

import jakarta.persistence.*;

@Entity
@Table(name = "AlumnoPorEvento")
public class AlumnoPorEvento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdAlumnoPorEvento")
    private int id_alumno_por_evento;
    
    @Column(name = "ResultadoAlumnoPorEvento", nullable = false)
    private String resultado_alumno_por_evento;
    
    @ManyToOne
    @JoinColumn(name = "IdAlumnoEvento", nullable = false)
    private Alumnos id_alumno_evento;
    
    @ManyToOne
    @JoinColumn(name = "IdEventoAlumno", nullable = false)
    private Eventos id_evento_alumno;

    public int getId_alumno_por_evento() {
        return id_alumno_por_evento;
    }

    public void setId_alumno_por_evento(int id_alumno_por_evento) {
        this.id_alumno_por_evento = id_alumno_por_evento;
    }

    public String getResultado_alumno_por_evento() {
        return resultado_alumno_por_evento;
    }

    public void setResultado_alumno_por_evento(String resultado_alumno_por_evento) {
        this.resultado_alumno_por_evento = resultado_alumno_por_evento;
    }

    public Alumnos getId_alumno_evento() {
        return id_alumno_evento;
    }

    public void setId_alumno_evento(Alumnos id_alumno_evento) {
        this.id_alumno_evento = id_alumno_evento;
    }

    public Eventos getId_evento_alumno() {
        return id_evento_alumno;
    }

    public void setId_evento_alumno(Eventos id_evento_alumno) {
        this.id_evento_alumno = id_evento_alumno;
    }
    
}
