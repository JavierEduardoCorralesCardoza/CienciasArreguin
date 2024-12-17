package com.ciencias_arreguin.arreguin.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Asesores")
public class Asesores {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdAsesor")
    private int id_asesor;
    
    @Column(name = "CorreoAsesor", nullable = false)
    private String correo_asesor;
    
    @Column(name = "ContrasenaAsesor", nullable = false)
    private String contrasena_asesor;
    
    @Column(name = "NombreAsesor", nullable = false)
    private String nombre_asesor;
    
    @Column(name = "ImagenAsesor")
    private String imagen_asesor;

    public int getId_asesor() {
        return id_asesor;
    }

    public void setId_asesor(int id_asesor) {
        this.id_asesor = id_asesor;
    }

    public String getCorreo_asesor() {
        return correo_asesor;
    }

    public void setCorreo_asesor(String correo_asesor) {
        this.correo_asesor = correo_asesor;
    }

    public String getContrasena_asesor() {
        return contrasena_asesor;
    }

    public void setContrasena_asesor(String contrasena_asesor) {
        this.contrasena_asesor = contrasena_asesor;
    }

    public String getNombre_asesor() {
        return nombre_asesor;
    }

    public void setNombre_asesor(String nombre_asesor) {
        this.nombre_asesor = nombre_asesor;
    }

    public String getImagen_asesor() {
        return imagen_asesor;
    }

    public void setImagen_asesor(String imagen_asesor) {
        this.imagen_asesor = imagen_asesor;
    }
    
}
