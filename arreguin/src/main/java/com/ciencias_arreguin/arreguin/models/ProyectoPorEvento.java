package com.ciencias_arreguin.arreguin.models;

import jakarta.persistence.*;

@Entity
@Table(name = "ProyectoPorEvento")
public class ProyectoPorEvento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdProyectoPorEvento")
    private int idProyectoPorEvento;
    
    @ManyToOne
    @JoinColumn(name = "IdProyectoEvento", nullable = false)
    private Proyectos proyectoEvento;
    
    @ManyToOne
    @JoinColumn(name = "IdEventoProyecto", nullable = false)
    private Eventos eventoProyecto;
}
