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
}
