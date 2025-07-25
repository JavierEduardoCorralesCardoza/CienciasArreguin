package com.ciencias_arreguin.arreguin.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ciencias_arreguin.arreguin.dtos.AlumnosDTO;
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
    public List<AlumnosDTO> getAlumnos() {
        return alumnos_services.getAlumnos();
    }

    @GetMapping("/busqueda")
    public AlumnosDTO getAlumnoById(@RequestParam int id) {
        return alumnos_services.getAlumnoById(id);
    }

    @PostMapping
    public AlumnosDTO postAlumno(@RequestBody AlumnosDTO alumno) {
        return alumnos_services.postAlumno(alumno);
    }

    @PostMapping("/image")
    public ResponseEntity<Map<String, String>> postAlumnoImage(@RequestParam MultipartFile image) {
        return alumnos_services.postAlumnoImage(image);
    }

    @PutMapping("/{id}")
    public AlumnosDTO putAlumno(@PathVariable int id, @RequestBody AlumnosDTO alumno) {
        return alumnos_services.putAlumno(id, alumno);
    }

    @DeleteMapping("/{id}")
    public AlumnosDTO deleteAlumno(@PathVariable int id) {
        return alumnos_services.deleteAlumno(id);
    }
}