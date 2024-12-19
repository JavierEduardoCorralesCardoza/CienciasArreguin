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
    private Proyectos id_proyecto_evento;
    
    @ManyToOne
    @JoinColumn(name = "IdEventoProyecto", nullable = false)
    private Eventos id_evento_proyecto;

    public int getId_proyecto_por_evento() {
        return id_proyecto_por_evento;
    }

    public void setId_proyecto_por_evento(int id_proyecto_por_evento) {
        this.id_proyecto_por_evento = id_proyecto_por_evento;
    }

    public Proyectos getId_proyecto_evento() {
        return id_proyecto_evento;
    }

    public void setId_proyecto_evento(Proyectos id_proyecto_evento) {
        this.id_proyecto_evento = id_proyecto_evento;
    }

    public Eventos getId_evento_proyecto() {
        return id_evento_proyecto;
    }

    public void setId_evento_proyecto(Eventos id_evento_proyecto) {
        this.id_evento_proyecto = id_evento_proyecto;
    }
    
}
