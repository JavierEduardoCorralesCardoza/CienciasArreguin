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
    private Proyectos idProyectoEvento;
    
    @ManyToOne
    @JoinColumn(name = "IdEventoProyecto", nullable = false)
    private Eventos idEventoProyecto;

    public int getIdProyectoPorEvento() {
        return idProyectoPorEvento;
    }

    public void setIdProyectoPorEvento(int idProyectoPorEvento) {
        this.idProyectoPorEvento = idProyectoPorEvento;
    }

    public Proyectos getIdProyectoEvento() {
        return idProyectoEvento;
    }

    public void setIdProyectoEvento(Proyectos idProyectoEvento) {
        this.idProyectoEvento = idProyectoEvento;
    }

    public Eventos getIdEventoProyecto() {
        return idEventoProyecto;
    }

    public void setIdEventoProyecto(Eventos idEventoProyecto) {
        this.idEventoProyecto = idEventoProyecto;
    }
    
}
