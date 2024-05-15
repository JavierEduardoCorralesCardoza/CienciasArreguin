package com.ciencias_arreguin.arreguin.models;

import java.sql.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "Eventos")
public class Eventos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdEvento")
    private int id_evento;
    
    @Column(name = "NombreEvento", nullable = false)
    private String nombre_evento;
    
    @Column(name = "FechaEvento", nullable = false)
    private Date fecha_evento;
    
    @ManyToOne
    @JoinColumn(name = "IdAsesorEvento", nullable = false)
    private Asesores asesor_evento;
}
