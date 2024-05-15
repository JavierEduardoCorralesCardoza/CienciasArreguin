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
}
