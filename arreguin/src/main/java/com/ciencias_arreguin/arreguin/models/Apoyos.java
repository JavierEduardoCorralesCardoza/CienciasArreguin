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
    private AlumnoPorEvento idAlumnoPorEventoApoyo;
    
    @ManyToOne
    @JoinColumn(name = "IdAsesorPorEventoApoyo")
    private AsesorPorEvento idAsesorPorEventoApoyo;

    public int getIdApoyo() {
        return idApoyo;
    }

    public void setIdApoyo(int idApoyo) {
        this.idApoyo = idApoyo;
    }

    public String getPatrocinadorApoyo() {
        return patrocinadorApoyo;
    }

    public void setPatrocinadorApoyo(String patrocinadorApoyo) {
        this.patrocinadorApoyo = patrocinadorApoyo;
    }

    public String getDescripcionApoyo() {
        return descripcionApoyo;
    }

    public void setDescripcionApoyo(String descripcionApoyo) {
        this.descripcionApoyo = descripcionApoyo;
    }

    public AlumnoPorEvento getIdAlumnoPorEventoApoyo() {
        return idAlumnoPorEventoApoyo;
    }

    public void setIdAlumnoPorEventoApoyo(AlumnoPorEvento idAlumnoPorEventoApoyo) {
        this.idAlumnoPorEventoApoyo = idAlumnoPorEventoApoyo;
    }

    public AsesorPorEvento getIdAsesorPorEventoApoyo() {
        return idAsesorPorEventoApoyo;
    }

    public void setIdAsesorPorEventoApoyo(AsesorPorEvento idAsesorPorEventoApoyo) {
        this.idAsesorPorEventoApoyo = idAsesorPorEventoApoyo;
    }
    
}
