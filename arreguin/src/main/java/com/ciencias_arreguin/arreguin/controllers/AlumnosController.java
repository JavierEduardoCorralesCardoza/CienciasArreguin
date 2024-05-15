package com.ciencias_arreguin.arreguin.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ciencias_arreguin.arreguin.models.Alumnos;
import com.ciencias_arreguin.arreguin.services.AlumnosServices;

@RestController
@RequestMapping("/alumnos")
public class AlumnosController {
     @Autowired
    private AlumnosServices alumnos_services;

    @GetMapping
    public List<Alumnos> getAlumnos() {
        return alumnos_services.getAlumnos();
    }

}
