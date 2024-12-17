package com.ciencias_arreguin.arreguin.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Proyectos")
public class Proyectos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdProyecto")
    private int id_proyecto;
    
    @Column(name = "NombreProyecto", nullable = false)
    private String nombre_proyecto;
    
    @Column(name = "CategoriaProyecto", nullable = false)
    private String categoria_proyecto;
    
    @Column(name = "DescripcionProyecto", nullable = false)
    private String descripcion_proyecto;

    public int getId_proyecto() {
        return id_proyecto;
    }

    public void setId_proyecto(int id_proyecto) {
        this.id_proyecto = id_proyecto;
    }

    public String getNombre_proyecto() {
        return nombre_proyecto;
    }

    public void setNombre_proyecto(String nombre_proyecto) {
        this.nombre_proyecto = nombre_proyecto;
    }

    public String getCategoria_proyecto() {
        return categoria_proyecto;
    }

    public void setCategoria_proyecto(String categoria_proyecto) {
        this.categoria_proyecto = categoria_proyecto;
    }

    public String getDescripcion_proyecto() {
        return descripcion_proyecto;
    }

    public void setDescripcion_proyecto(String descripcion_proyecto) {
        this.descripcion_proyecto = descripcion_proyecto;
    }
    
}
