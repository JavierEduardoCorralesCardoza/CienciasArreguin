package com.ciencias_arreguin.arreguin.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

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

    @Column(name = "rolAsesor", nullable = false)
    private String rolAsesor;

    @OneToMany(mappedBy = "idAsesorParticipacion", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference(value = "asesor-participacion")
    private List<Participaciones> listaAsesorParticipacion;

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

    public String getRolAsesor() {
        return rolAsesor;
    }

    public void setRolAsesor(String rolAsesor) {
        this.rolAsesor = rolAsesor;
    }

    public List<Participaciones> getListaAsesorParticipacion() {
        return listaAsesorParticipacion;
    }

    public void setListaAsesorParticipacion(List<Participaciones> listaAsesorParticipacion) {
        this.listaAsesorParticipacion = listaAsesorParticipacion;
    }
    
}
