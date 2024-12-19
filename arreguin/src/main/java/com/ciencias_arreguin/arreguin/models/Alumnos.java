package com.ciencias_arreguin.arreguin.models;

import java.util.List;

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
    private int id_alumno;

    @Column(name = "CorreoAlumno", nullable = false, length = 45)
    private String correo_alumno;

    @Column(name = "ContrasenaAlumno", nullable = false, length = 45)
    private String contrasena_alumno;

    @Column(name = "NombreAlumno", nullable = false, length = 45)
    private String nombre_alumno;

    @Column(name = "ImagenAlumno", length = 45)
    private String imagen_alumno;

    @OneToMany(mappedBy = "idAlumnoEvento")
    private List<AlumnoPorEvento> lista_alumno_por_evento;

    public int getId_alumno() {
        return id_alumno;
    }

    public void setId_alumno(int id_alumno) {
        this.id_alumno = id_alumno;
    }

    public String getCorreo_alumno() {
        return correo_alumno;
    }

    public void setCorreo_alumno(String correo_alumno) {
        this.correo_alumno = correo_alumno;
    }

    public String getContrasena_alumno() {
        return contrasena_alumno;
    }

    public void setContrasena_alumno(String contrasena_alumno) {
        this.contrasena_alumno = contrasena_alumno;
    }

    public String getNombre_alumno() {
        return nombre_alumno;
    }

    public void setNombre_alumno(String nombre_alumno) {
        this.nombre_alumno = nombre_alumno;
    }

    public String getImagen_alumno() {
        return imagen_alumno;
    }

    public void setImagen_alumno(String imagen_alumno) {
        this.imagen_alumno = imagen_alumno;
    }

    public List<AlumnoPorEvento> getLista_alumno_por_evento() {
        return lista_alumno_por_evento;
    }

    public void setLista_alumno_por_evento(List<AlumnoPorEvento> lista_alumno_por_evento) {
        this.lista_alumno_por_evento = lista_alumno_por_evento;
    }
    
}
