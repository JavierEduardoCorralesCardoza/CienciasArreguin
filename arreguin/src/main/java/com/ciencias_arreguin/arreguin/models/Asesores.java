package com.ciencias_arreguin.arreguin.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Asesores")
public class Asesores {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdAsesor")
    private int idAsesor;
    
    @Column(name = "CorreoAsesor", nullable = false)
    private String correoAsesor;
    
    @Column(name = "ContrasenaAsesor", nullable = false)
    private String contrasenaAsesor;
    
    @Column(name = "NombreAsesor", nullable = false)
    private String nombreAsesor;
    
    @Column(name = "ImagenAsesor")
    private String imagenAsesor;

    public int getIdAsesor() {
        return idAsesor;
    }

    public void setIdAsesor(int idAsesor) {
        this.idAsesor = idAsesor;
    }

    public String getCorreoAsesor() {
        return correoAsesor;
    }

    public void setCorreoAsesor(String correoAsesor) {
        this.correoAsesor = correoAsesor;
    }

    public String getContrasenaAsesor() {
        return contrasenaAsesor;
    }

    public void setContrasenaAsesor(String contrasenaAsesor) {
        this.contrasenaAsesor = contrasenaAsesor;
    }

    public String getNombreAsesor() {
        return nombreAsesor;
    }

    public void setNombreAsesor(String nombreAsesor) {
        this.nombreAsesor = nombreAsesor;
    }

    public String getImagenAsesor() {
        return imagenAsesor;
    }

    public void setImagenAsesor(String imagenAsesor) {
        this.imagenAsesor = imagenAsesor;
    }
}
