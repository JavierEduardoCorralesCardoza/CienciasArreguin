package com.ciencias_arreguin.arreguin.models;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "Eventos")
public class Eventos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdEvento")
    private int idEvento;
    
    @Column(name = "NombreEvento", nullable = false)
    private String nombreEvento;
    
    @Column(name = "FechaEvento", nullable = false)
    private LocalDate fechaEvento;

    @OneToMany(mappedBy = "idEventoAlumno")
    @JsonBackReference(value = "evento-alumno")
    private List<AlumnoPorEvento> listaAlumnoPorEvento;

    @OneToMany(mappedBy = "idEventoAsesor")
    @JsonBackReference(value = "evento-asesor")
    private List<AsesorPorEvento> listaAsesorPorEvento;

    @OneToMany(mappedBy = "idEventoProyecto")
    @JsonBackReference(value = "evento-proyecto")
    private List<ProyectoPorEvento> listaProyectoPorEvento;

    public int getIdEvento() {
        return idEvento;
    }

    public void setIdEvento(int idEvento) {
        this.idEvento = idEvento;
    }

    public String getNombreEvento() {
        return nombreEvento;
    }

    public void setNombreEvento(String nombreEvento) {
        this.nombreEvento = nombreEvento;
    }

    public LocalDate getFechaEvento() {
        return fechaEvento;
    }

    public void setFechaEvento(LocalDate fechaEvento) {
        this.fechaEvento = fechaEvento;
    }

    public List<AlumnoPorEvento> getListaAlumnoPorEvento() {
        return listaAlumnoPorEvento;
    }

    public void setListaAlumnoPorEvento(List<AlumnoPorEvento> listaAlumnoPorEvento) {
        this.listaAlumnoPorEvento = listaAlumnoPorEvento;
    }

    public List<AsesorPorEvento> getListaAsesorPorEvento() {
        return listaAsesorPorEvento;
    }

    public void setListaAsesorPorEvento(List<AsesorPorEvento> listaAsesorPorEvento) {
        this.listaAsesorPorEvento = listaAsesorPorEvento;
    }

    public List<ProyectoPorEvento> getListaProyectoPorEvento() {
        return listaProyectoPorEvento;
    }

    public void setListaProyectoPorEvento(List<ProyectoPorEvento> listaProyectoPorEvento) {
        this.listaProyectoPorEvento = listaProyectoPorEvento;
    }
    
}
