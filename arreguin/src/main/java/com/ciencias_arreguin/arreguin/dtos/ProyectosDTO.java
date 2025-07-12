package com.ciencias_arreguin.arreguin.dtos;

public class ProyectosDTO {
    private int idProyecto;
    private String nombreProyecto;
    private String categoriaProyecto;
    private String descripcionProyecto;

    // Constructor vacío
    public ProyectosDTO() {}

    // Constructor con parámetros
    public ProyectosDTO(int idProyecto, String nombreProyecto, String categoriaProyecto, 
                        String descripcionProyecto) {
        this.idProyecto = idProyecto;
        this.nombreProyecto = nombreProyecto;
        this.categoriaProyecto = categoriaProyecto;
        this.descripcionProyecto = descripcionProyecto;
    }

    // Getters y Setters
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