package com.ciencias_arreguin.arreguin.dtos;

import java.time.LocalDate;

public class EventosDTO {
    private int idEvento;
    private String nombreEvento;
    private LocalDate fechaEvento;

    // Constructor vacío
    public EventosDTO() {}

    // Constructor con parámetros
    public EventosDTO(int idEvento, String nombreEvento, LocalDate fechaEvento) {
        this.idEvento = idEvento;
        this.nombreEvento = nombreEvento;
        this.fechaEvento = fechaEvento;
    }

    // Getters y Setters
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
}