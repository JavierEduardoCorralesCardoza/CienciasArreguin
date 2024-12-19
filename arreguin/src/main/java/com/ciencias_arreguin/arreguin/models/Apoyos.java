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
    private AlumnoPorEvento id_alumno_por_evento_apoyo;
    
    @ManyToOne
    @JoinColumn(name = "IdAsesorPorEventoApoyo")
    private AsesorPorEvento id_asesor_por_evento_apoyo;

    public int getId_apoyo() {
        return id_apoyo;
    }

    public void setId_apoyo(int id_apoyo) {
        this.id_apoyo = id_apoyo;
    }

    public String getPatrocinador_apoyo() {
        return patrocinador_apoyo;
    }

    public void setPatrocinador_apoyo(String patrocinador_apoyo) {
        this.patrocinador_apoyo = patrocinador_apoyo;
    }

    public String getDescripcion_apoyo() {
        return descripcion_apoyo;
    }

    public void setDescripcion_apoyo(String descripcion_apoyo) {
        this.descripcion_apoyo = descripcion_apoyo;
    }

    public AlumnoPorEvento getId_alumno_por_evento_apoyo() {
        return id_alumno_por_evento_apoyo;
    }

    public void setId_alumno_por_evento_apoyo(AlumnoPorEvento id_alumno_por_evento_apoyo) {
        this.id_alumno_por_evento_apoyo = id_alumno_por_evento_apoyo;
    }

    public AsesorPorEvento getId_asesor_por_evento_apoyo() {
        return id_asesor_por_evento_apoyo;
    }

    public void setId_asesor_por_evento_apoyo(AsesorPorEvento id_asesor_por_evento_apoyo) {
        this.id_asesor_por_evento_apoyo = id_asesor_por_evento_apoyo;
    }
    
}
