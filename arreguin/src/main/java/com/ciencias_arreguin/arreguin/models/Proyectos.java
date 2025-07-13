package com.ciencias_arreguin.arreguin.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

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

    @OneToMany(mappedBy = "idProyectoParticipacion", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference(value = "proyecto-participacion")
    private List<Participaciones> listaProyectoParticipacion;

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

    public List<Participaciones> getListaProyectoParticipacion() {
        return listaProyectoParticipacion;
    }

    public void setListaProyectoParticipacion(List<Participaciones> listaProyectoParticipacion) {
        this.listaProyectoParticipacion = listaProyectoParticipacion;
    }
    
}
