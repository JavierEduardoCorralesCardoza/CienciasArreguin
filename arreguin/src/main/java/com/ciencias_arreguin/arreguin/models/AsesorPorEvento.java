package com.ciencias_arreguin.arreguin.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

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

    @OneToMany(mappedBy = "idAsesorPorEventoApoyo")
    @JsonBackReference(value = "asesor-evento-apoyo")
    private List<Apoyos> listaApoyos;

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

    public List<Apoyos> getListaApoyos() {
        return listaApoyos;
    }

    public void setListaApoyos(List<Apoyos> listaApoyos) {
        this.listaApoyos = listaApoyos;
    }
    
}
