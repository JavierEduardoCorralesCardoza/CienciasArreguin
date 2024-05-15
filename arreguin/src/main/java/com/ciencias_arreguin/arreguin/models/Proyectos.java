package com.ciencias_arreguin.arreguin.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Proyectos")
public class Proyectos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdProyecto")
    private int idProyecto;
    
    @Column(name = "NombreProyecto", nullable = false)
    private String nombreProyecto;
    
    @Column(name = "CategoriaProyecto", nullable = false)
    private String categoriaProyecto;
    
    @Column(name = "DescripcionProyecto", nullable = false)
    private String descripcionProyecto;
}
