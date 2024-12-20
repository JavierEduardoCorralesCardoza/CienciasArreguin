package com.ciencias_arreguin.arreguin.models;

import jakarta.persistence.*;

@Entity
@Table(name = "AsesorPorEvento")
public class AsesorPorEvento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdAsesorPorEvento")
    private int idAsesorPorEvento;
    
    @ManyToOne
    @JoinColumn(name = "IdAsesorEvento", nullable = false)
    private Asesores idAsesorEvento;
    
    @ManyToOne
    @JoinColumn(name = "IdEventoAsesor", nullable = false)
    private Eventos idEventoAsesor;

    public int getIdAsesorPorEvento() {
        return idAsesorPorEvento;
    }

    public void setIdAsesorPorEvento(int idAsesorPorEvento) {
        this.idAsesorPorEvento = idAsesorPorEvento;
    }

    public Asesores getIdAsesorEvento() {
        return idAsesorEvento;
    }

    public void setIdAsesorEvento(Asesores idAsesorEvento) {
        this.idAsesorEvento = idAsesorEvento;
    }

    public Eventos getIdEventoAsesor() {
        return idEventoAsesor;
    }

    public void setIdEventoAsesor(Eventos idEventoAsesor) {
        this.idEventoAsesor = idEventoAsesor;
    }
    
}
