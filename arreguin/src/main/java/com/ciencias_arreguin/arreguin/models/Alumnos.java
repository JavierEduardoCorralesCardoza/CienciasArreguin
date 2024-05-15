package com.ciencias_arreguin.arreguin.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
}
