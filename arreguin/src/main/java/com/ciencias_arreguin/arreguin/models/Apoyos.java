package com.ciencias_arreguin.arreguin.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Apoyos")
public class Apoyos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdApoyo")
    private int id_apoyo;
    
    @Column(name = "PatrocinadorApoyo", nullable = false)
    private String patrocinador_apoyo;
    
    @Column(name = "DescripcionApoyo", nullable = false)
    private String descripcion_apoyo;
    
    @ManyToOne
    @JoinColumn(name = "IdAlumnoPorEventoApoyo")
    private AlumnoPorEvento alumno_por_evento_apoyo;
    
    @ManyToOne
    @JoinColumn(name = "IdAsesorPorEventoApoyo")
    private AsesorPorEvento asesor_por_evento_apoyo;
}
