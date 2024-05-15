package com.ciencias_arreguin.arreguin.models;

import jakarta.persistence.*;

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
}
