package com.ciencias_arreguin.arreguin.dtos;

public class ApoyosDTO {
    private int idApoyo;
    private String patrocinadorApoyo;
    private String descripcionApoyo;

    // Constructor vacío
    public ApoyosDTO() {}

    // Constructor con parámetros
    public ApoyosDTO(int idApoyo, String patrocinadorApoyo, String descripcionApoyo) {
        this.idApoyo = idApoyo;
        this.patrocinadorApoyo = patrocinadorApoyo;
        this.descripcionApoyo = descripcionApoyo;
    }

    // Getters y Setters
    public int getIdApoyo() {
        return idApoyo;
    }

    public void setIdApoyo(int idApoyo) {
        this.idApoyo = idApoyo;
    }

    public String getPatrocinadorApoyo() {
        return patrocinadorApoyo;
    }

    public void setPatrocinadorApoyo(String patrocinadorApoyo) {
        this.patrocinadorApoyo = patrocinadorApoyo;
    }

    public String getDescripcionApoyo() {
        return descripcionApoyo;
    }

    public void setDescripcionApoyo(String descripcionApoyo) {
        this.descripcionApoyo = descripcionApoyo;
    }
}