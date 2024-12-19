package com.ciencias_arreguin.arreguin.models;

import jakarta.persistence.*;

@Entity
@Table(name = "AsesorPorEvento")
public class AsesorPorEvento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdAsesorPorEvento")
    private int id_asesor_por_evento;
    
    @ManyToOne
    @JoinColumn(name = "IdAsesorEvento", nullable = false)
    private Asesores id_asesor_evento;
    
    @ManyToOne
    @JoinColumn(name = "IdEventoAsesor", nullable = false)
    private Eventos id_evento_asesor;

    public int getId_asesor_por_evento() {
        return id_asesor_por_evento;
    }

    public void setId_asesor_por_evento(int id_asesor_por_evento) {
        this.id_asesor_por_evento = id_asesor_por_evento;
    }

    public Asesores getId_asesor_evento() {
        return id_asesor_evento;
    }

    public void setId_asesor_evento(Asesores id_asesor_evento) {
        this.id_asesor_evento = id_asesor_evento;
    }

    public Eventos getId_evento_asesor() {
        return id_evento_asesor;
    }

    public void setId_evento_asesor(Eventos id_evento_asesor) {
        this.id_evento_asesor = id_evento_asesor;
    }
    
}
