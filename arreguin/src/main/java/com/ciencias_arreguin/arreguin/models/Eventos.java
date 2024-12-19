package com.ciencias_arreguin.arreguin.models;

import java.time.LocalDate;
import java.util.List;

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
    private LocalDate fecha_evento;

    @OneToMany(mappedBy = "idEventoAlumno")
    private List<AlumnoPorEvento> lista_alumno_por_evento;

    public int getId_evento() {
        return id_evento;
    }

    public void setId_evento(int id_evento) {
        this.id_evento = id_evento;
    }

    public String getNombre_evento() {
        return nombre_evento;
    }

    public void setNombre_evento(String nombre_evento) {
        this.nombre_evento = nombre_evento;
    }

    public LocalDate getFecha_evento() {
        return fecha_evento;
    }

    public void setFecha_evento(LocalDate fecha_evento) {
        this.fecha_evento = fecha_evento;
    }

    public List<AlumnoPorEvento> getLista_alumno_por_evento() {
        return lista_alumno_por_evento;
    }

    public void setLista_alumno_por_evento(List<AlumnoPorEvento> lista_alumno_por_evento) {
        this.lista_alumno_por_evento = lista_alumno_por_evento;
    }
    
}
