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

    public int getIdProyecto() {
        return idProyecto;
    }

    public void setIdProyecto(int idProyecto) {
        this.idProyecto = idProyecto;
    }

    public String getNombreProyecto() {
        return nombreProyecto;
    }

    public void setNombreProyecto(String nombreProyecto) {
        this.nombreProyecto = nombreProyecto;
    }

    public String getCategoriaProyecto() {
        return categoriaProyecto;
    }

    public void setCategoriaProyecto(String categoriaProyecto) {
        this.categoriaProyecto = categoriaProyecto;
    }

    public String getDescripcionProyecto() {
        return descripcionProyecto;
    }

    public void setDescripcionProyecto(String descripcionProyecto) {
        this.descripcionProyecto = descripcionProyecto;
    }
    
}
