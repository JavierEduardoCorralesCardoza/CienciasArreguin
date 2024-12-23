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

    @OneToMany(mappedBy = "idEventoParticipacion")
    @JsonBackReference(value = "evento-participacion")
    private List<Participaciones> listaEventoParticipacion;

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

    public List<Participaciones> getListaEventoParticipacion() {
        return listaEventoParticipacion;
    }

    public void setListaEventoParticipacion(List<Participaciones> listaEventoParticipacion) {
        this.listaEventoParticipacion = listaEventoParticipacion;
    }
    
}
