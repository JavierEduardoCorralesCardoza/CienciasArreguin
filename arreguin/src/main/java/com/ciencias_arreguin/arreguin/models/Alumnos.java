package com.ciencias_arreguin.arreguin.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Alumnos")
public class Alumnos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdAlumno")
    private int idAlumno;

    @Column(name = "CorreoAlumno", nullable = false, length = 45)
    private String correoAlumno;

    @Column(name = "ContrasenaAlumno", nullable = false, length = 45)
    private String contrasenaAlumno;

    @Column(name = "NombreAlumno", nullable = false, length = 45)
    private String nombreAlumno;

    @Column(name = "ImagenAlumno", length = 45)
    private String imagenAlumno;

    @OneToMany(mappedBy = "idAlumnoParticipacion", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference(value = "alumno-participacion")
    private List<Participaciones> listaAlumnoParticipacion;

    public int getIdAlumno() {
        return idAlumno;
    }

    public void setIdAlumno(int idAlumno) {
        this.idAlumno = idAlumno;
    }

    public String getCorreoAlumno() {
        return correoAlumno;
    }

    public void setCorreoAlumno(String correoAlumno) {
        this.correoAlumno = correoAlumno;
    }

    public String getContrasenaAlumno() {
        return contrasenaAlumno;
    }

    public void setContrasenaAlumno(String contrasenaAlumno) {
        this.contrasenaAlumno = contrasenaAlumno;
    }

    public String getNombreAlumno() {
        return nombreAlumno;
    }

    public void setNombreAlumno(String nombreAlumno) {
        this.nombreAlumno = nombreAlumno;
    }

    public String getImagenAlumno() {
        return imagenAlumno;
    }

    public void setImagenAlumno(String imagenAlumno) {
        this.imagenAlumno = imagenAlumno;
    }

    public List<Participaciones> getListaAlumnoParticipacion() {
        return listaAlumnoParticipacion;
    }

    public void setListaAlumnoParticipacion(List<Participaciones> listaAlumnoParticipacion) {
        this.listaAlumnoParticipacion = listaAlumnoParticipacion;
    }
    
}
