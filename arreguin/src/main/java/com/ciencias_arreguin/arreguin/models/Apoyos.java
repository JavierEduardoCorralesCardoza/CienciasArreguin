package com.ciencias_arreguin.arreguin.models;

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
    
    @ManyToOne
    @JoinColumn(name = "IdAlumnoPorEventoApoyo")
    private AlumnoPorEvento alumnoPorEventoApoyo;
    
    @ManyToOne
    @JoinColumn(name = "IdAsesorPorEventoApoyo")
    private AsesorPorEvento asesorPorEventoApoyo;
}
