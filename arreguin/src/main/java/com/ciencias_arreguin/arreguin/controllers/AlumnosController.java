package com.ciencias_arreguin.arreguin.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ciencias_arreguin.arreguin.models.Alumnos;
import com.ciencias_arreguin.arreguin.services.AlumnosServices;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/alumnos")
public class AlumnosController {

    @Autowired
    private AlumnosServices alumnos_services;

    @GetMapping
    public List<Alumnos> getAlumnos() {
        return alumnos_services.getAlumnos();
    }

    @GetMapping("/busqueda")
    public Alumnos getAlumnoById(@RequestParam int id) {
        return alumnos_services.getAlumnoById(id);
    }

    @PostMapping
    public Alumnos postAlumno(@RequestBody Alumnos alumno) {
        return alumnos_services.postAlumno(alumno);
    }

    @PutMapping("/{id}")
    public Alumnos putAlumno(@PathVariable int id, @RequestBody Alumnos alumno) {
        return alumnos_services.putAlumno(id, alumno);
    }
}
