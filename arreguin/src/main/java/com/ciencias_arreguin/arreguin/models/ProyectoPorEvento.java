package com.ciencias_arreguin.arreguin.models;

import jakarta.persistence.*;

@Entity
@Table(name = "ProyectoPorEvento")
public class ProyectoPorEvento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdProyectoPorEvento")
    private int id_proyecto_por_evento;
    
    @ManyToOne
    @JoinColumn(name = "IdProyectoEvento", nullable = false)
    private Proyectos proyecto_evento;
    
    @ManyToOne
    @JoinColumn(name = "IdEventoProyecto", nullable = false)
    private Eventos evento_proyecto;
}
